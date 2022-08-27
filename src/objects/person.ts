import { GameObject } from '.';
import canvas, { drawLayer } from '../canvas';
import { degreeToRadian, getRandomInteger, getTimings } from '../utils';

type ColorState = {
  hair: string;
  eye: string;
  skin: string;
  top: string;
  bottom: string;
  shoe: string;
};

type PersonState = {
  position: {
    x: number;
    y: number;
    z: number;
  };
  colors: ColorState;
};

export const EYE_COLORS = ['#634e34', '#2e536f', '#1c7847'];
export const SKIN_COLORS = [
  '#8d5524',
  '#c68642',
  '#e0ac69',
  '#f1c27d',
  '#ffdbac',
];

const PADDING = 10;
const SPEED_MAX_MULTIPLE = 0.4;
const SPEED_MIN_MULTIPLE = -1;

const DISTANCE_PER_SECOND = 120;
const FRAME_RATE_PER_SECOND = 60;

/**
 * @description 1초 동안 움직이는 픽셀 거리
 */
const DEFAULT_SPEED = DISTANCE_PER_SECOND / FRAME_RATE_PER_SECOND;

export default class Person implements GameObject, PersonState {
  position: { x: number; y: number; z: number };
  move: {
    position: {
      x: number;
      y: number;
      z: number;
    };
    direction: {
      x: -1 | 1;
      y: -1 | 1;
      z: -1 | 1;
    };
  };
  intervals: number[];
  randomX: number;
  randomY: number;
  isMoving: boolean;
  defaultSpeed: number;
  colors: ColorState;

  constructor(defaultSpeed: number = DEFAULT_SPEED) {
    this.defaultSpeed = defaultSpeed;
  }

  init = (state: PersonState) => {
    const { position, colors } = state;
    this.position = position;
    this.move = {
      position: {
        x: 200,
        y: 200,
        z: 0,
      },
      direction: {
        x: 1,
        y: 1,
        z: 1,
      },
    };
    this.colors = colors;

    this.intervals = [
      getRandomInteger(1000, 3000),
      getRandomInteger(3000, 6000),
      getRandomInteger(6000, 8000),
      10_000,
    ];

    this.randomX = getRandomInteger(SPEED_MIN_MULTIPLE, SPEED_MAX_MULTIPLE);
    this.randomY = getRandomInteger(SPEED_MIN_MULTIPLE, SPEED_MAX_MULTIPLE);

    const changeRandomValues = () => {
      this.randomX = getRandomInteger(SPEED_MIN_MULTIPLE, SPEED_MAX_MULTIPLE);
      this.randomY = getRandomInteger(SPEED_MIN_MULTIPLE, SPEED_MAX_MULTIPLE);

      this.intervals = [
        getRandomInteger(1000, 3000),
        getRandomInteger(3000, 6000),
        getRandomInteger(6000, 8000),
        10_000,
      ];
    };

    setInterval(changeRandomValues, 10_000);

    const changeDirection = () => {
      getRandomInteger(-1, 1) > 0 && this.#changeDirectionX();
      getRandomInteger(-1, 1) > 0 && this.#changeDirectionY();
    };

    setInterval(changeDirection, 8_000);
  };

  update = (time: DOMHighResTimeStamp) => {
    this.draw(time);

    if (time % 10_000 < this.intervals[0]) {
      this.#randomMove();
      return;
    }
    if (time % 10_000 < this.intervals[1]) {
      this.#gentle();
      return;
    }
    if (time % 10_000 < this.intervals[2]) {
      const start = this.intervals[1] + Math.floor(time / 10_000) * 10_000;
      const duration = this.intervals[2] - this.intervals[1];
      this.#speedDown(getTimings({ time, start, duration }).progress);
      return;
    }
    if (time % 10_000 < this.intervals[3]) {
      const start = this.intervals[2] + Math.floor(time / 10_000) * 10_000;
      const duration = this.intervals[3] - this.intervals[2];
      this.#speedUp(getTimings({ time, start, duration }).progress);
      return;
    }
  };

  #randomMove = () => {
    this.isMoving = true;
    this.#moveX(this.defaultSpeed * (1 + this.randomX));
    this.#moveY(this.defaultSpeed * (1 + this.randomY));

    this.#stayInViewport();
  }; 
 
  #gentle = () => {
    this.isMoving = true;
    this.#moveX(this.defaultSpeed);
    this.#moveY(this.defaultSpeed * 0.2);

    this.#stayInViewport();
  };

  #steep = () => {
    this.isMoving = true;
    this.#moveX(this.defaultSpeed);
    this.#moveY(this.defaultSpeed * 1.2);

    this.#stayInViewport();
  };

  #speedDown = (progress?: number) => {
    this.isMoving = true;
    if (progress === 1) return (this.isMoving = false);
    this.#moveX(this.defaultSpeed * (1 - progress));
    this.#moveY(this.defaultSpeed * (1 - progress));

    this.#stayInViewport();
  };

  #speedUp = (progress?: number) => {
    this.isMoving = true;
    this.#moveX(this.defaultSpeed * progress);
    this.#moveY(this.defaultSpeed * progress);

    this.#stayInViewport();
  };

  remove = () => {
    return;
  };

  draw = (time: number) => {
    const layer1 = canvas.get('layer1'); // 확대
    const drawLayer1 = drawLayer(layer1);
    const layer2 = canvas.get('layer2'); // 축소
    const drawLayer2 = drawLayer(layer2);

    drawLayer1((context, canvas) => {
      if (this.isMoving) {
        this.#drawMovement(
          context,
          canvas,
          time,
          this.position,
          0.6 + 0.4 * (this.position.z / canvas.height),
        );
      } else {
        this.#drawIdle(
          context,
          canvas,
          time,
          this.position,
          0.6 + 0.4 * (this.position.z / canvas.height),
        );
      }
    });
    drawLayer2((context, canvas) => {
      if (this.isMoving) {
        this.#drawMovement(
          context,
          canvas,
          time,
          this.position,
          0.3 + 0.2 * (this.position.z / canvas.height),
        );
      } else {
        this.#drawIdle(
          context,
          canvas,
          time,
          this.position,
          0.3 + 0.2 * (this.position.z / canvas.height),
        );
      }
    });
  };

  #drawIdle(
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    time: number,
    position: { x: number; y: number },
    sizeRatio: number,
  ) {
    context.setTransform(
      -sizeRatio * this.move.direction.x,
      0,
      0,
      sizeRatio,
      position.x + (-2 + 4 * Number(this.move.direction.x === 1)) * sizeRatio,
      position.y + (-28 + Math.sin(time / 128)) * sizeRatio,
    );
    this.#drawArm(context);
    context.setTransform(
      -sizeRatio * this.move.direction.x, 
      0,
      0,
      sizeRatio,
      position.x,
      position.y + (24 + Math.sin(time / 128)) * sizeRatio,
    );
    this.#drawUpperBody(context);
    context.setTransform(
      -sizeRatio * this.move.direction.x,
      0,
      0,
      sizeRatio,
      position.x,
      position.y + (63 + Math.sin(time / 128)) * sizeRatio,
    );
    this.#drawLowerBody(context);
    context.setTransform(
      -sizeRatio * this.move.direction.x,
      0,
      0,
      sizeRatio,
      position.x,
      position.y + 16 * sizeRatio,
    );
    this.#drawLeg(context);
    context.setTransform(
      -sizeRatio * this.move.direction.x,
      0,
      0,
      sizeRatio,
      position.x + (14 + -28 * Number(this.move.direction.x === 1)) * sizeRatio,
      position.y + 16 * sizeRatio,
    );
    this.#drawLeg(context);
    context.setTransform(
      -sizeRatio * this.move.direction.x,
      0,
      0,
      sizeRatio,
      position.x,
      position.y + Math.sin(time / 128) * 2 * sizeRatio,
    );
    this.#drawHead(context);
    context.setTransform(
      -sizeRatio * this.move.direction.x,
      0,
      0,
      sizeRatio,
      position.x + (18 + -36 * Number(this.move.direction.x === 1)) * sizeRatio,
      position.y + (-28 + Math.sin(time / 128)) * sizeRatio,
    );
    this.#drawArm(context);
  }

  #drawMovement(
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    time: number,
    position: { x: number; y: number },
    sizeRatio: number,
  ) {
    context.setTransform(
      -sizeRatio * this.move.direction.x,
      0,
      0,
      sizeRatio,
      position.x + (-2 + 4 * Number(this.move.direction.x === 1)) * sizeRatio,
      position.y + (-28 + Math.sin(time / 64) * 2) * sizeRatio,
    );
    context.rotate(degreeToRadian(Math.sin(time / 128) * -8));
    this.#drawArm(context);
    context.setTransform(
      -sizeRatio * this.move.direction.x,
      0,
      0,
      sizeRatio,
      position.x,
      position.y + (24 + Math.sin(time / 128) * 2) * sizeRatio,
    );
    this.#drawUpperBody(context);
    context.setTransform(
      -sizeRatio * this.move.direction.x,
      0,
      0,
      sizeRatio,
      position.x,
      position.y + (63 + Math.sin(time / 128) * 2) * sizeRatio,
    );
    this.#drawLowerBody(context);
    context.setTransform(
      -sizeRatio * this.move.direction.x,
      0,
      0,
      sizeRatio,
      position.x,
      position.y + 16 * sizeRatio,
    );
    context.rotate(degreeToRadian(-2 + Math.sin(time / 128) * 14));
    this.#drawLeg(context);
    context.setTransform(
      -sizeRatio * this.move.direction.x,
      0,
      0,
      sizeRatio,
      position.x + (14 + -28 * Number(this.move.direction.x === 1)) * sizeRatio,
      position.y + 16 * sizeRatio,
    );
    context.rotate(degreeToRadian(5 + Math.sin(time / 128) * -14));
    this.#drawLeg(context);
    context.setTransform(
      -sizeRatio * this.move.direction.x,
      0,
      0,
      sizeRatio,
      position.x,
      position.y + Math.sin(time / 128) * 2 * sizeRatio,
    );
    this.#drawHead(context);
    context.setTransform(
      -sizeRatio * this.move.direction.x,
      0,
      0,
      sizeRatio,
      position.x + (18 + -36 * Number(this.move.direction.x === 1)) * sizeRatio,
      position.y + (-28 + Math.sin(time / 64) * 2) * sizeRatio,
    );
    context.rotate(degreeToRadian(Math.sin(time / 128) * 8));
    this.#drawArm(context);
  }

  #drawHead = (context: CanvasRenderingContext2D) => {
    context.fillStyle = this.colors.skin;
    context.fillRect(-12, -54, 24, 24);
    context.fillStyle = this.colors.eye;
    context.fillRect(-8, -46, 4, 4);
    context.fillRect(0, -46, 4, 4);
    context.fillStyle = this.colors.hair;
    context.fillRect(-16, -62, 28, 12);
    context.fillRect(8, -58, 6, 20);
  };

  #drawArm = (context: CanvasRenderingContext2D) => {
    context.fillStyle = this.colors.top;
    context.fillRect(-12, 0, 8, 38);
    context.fillStyle = this.colors.skin;
    context.fillRect(-12, 38, 8, 8);
  };

  #drawUpperBody = (context: CanvasRenderingContext2D) => {
    context.fillStyle = this.colors.top;
    context.fillRect(-12, -54, 24, 40);
  };

  #drawLowerBody = (context: CanvasRenderingContext2D) => {
    context.fillStyle = this.colors.bottom;
    context.fillRect(-12, -54, 24, 12);
  };

  #drawLeg = (context: CanvasRenderingContext2D) => {
    context.fillStyle = this.colors.bottom;
    context.fillRect(-12, 0, 10, 24);
    context.fillStyle = this.colors.shoe;
    context.fillRect(-14, 23, 12, 8);
  };

  #moveY(delta: number) {
    this.position.y = this.position.y + delta * this.move.direction.y;
    this.position.z = this.position.y;
  }

  #moveX(delta: number) {
    this.position.x = this.position.x + delta * this.move.direction.x;
  }

  #stayInViewport() {
    if (
      this.position.x < PADDING * -2 ||
      this.position.x >= document.body.clientWidth
    ) {
      this.#changeDirectionX();
    }
    if (
      this.position.y < PADDING * -1 ||
      this.position.y >= document.body.clientHeight
    ) {
      this.#changeDirectionY();
    }
  }

  #changeDirectionY() {
    this.move.direction.y = (-1 * this.move.direction.y) as -1 | 1;
  }

  #changeDirectionX() {
    this.move.direction.x = (-1 * this.move.direction.x) as -1 | 1;
  }
}
