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
  id: number;
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
const SPEED_MAX_MULTIPLE = 0.3;
const SPEED_MIN_MULTIPLE = -1;

const DISTANCE_PER_SECOND = 24;
const FRAME_RATE_PER_SECOND = 60;

/**
 * @description 1초 동안 움직이는 픽셀 거리
 */
const DEFAULT_SPEED = DISTANCE_PER_SECOND / FRAME_RATE_PER_SECOND;

export default class Person implements GameObject, PersonState {
  id: number;
  position: { x: number; y: number; z: number };
  move: {
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
  moves: any[];

  constructor(defaultSpeed: number = DEFAULT_SPEED) {
    this.defaultSpeed = defaultSpeed;
  }

  init = (state: PersonState) => {
    const { id, position, colors } = state;
    this.id = id;
    this.position = position;
    this.move = {
      direction: {
        x: Math.round(Math.random()) ? 1 : -1,
        y: Math.round(Math.random()) ? 1 : -1,
        z: 1,
      },
    };
    this.colors = colors;

    const moves = [
      ...Array.from({ length: 12 }, () => this.#moveIdle),
      ...Array.from({ length: 4 }, () => this.#moveRandomX),
      ...Array.from({ length: 24 }, () => this.#moveGentleSlope),
      ...Array.from({ length: 8 }, () => this.#moveSpeedDownGentleSlope),
      ...Array.from({ length: 2 }, () => this.#moveSpeedUpGentleSlope),
      this.#moveSteepSlope,
      this.#moveRandomXY,
      this.#moveSpeedDownXY,
      this.#moveSpeedUpXY,
    ];

    const getRandomMoveIndex = () => {
      const randomIndex = Math.floor(getRandomInteger(0, moves.length - 1));
      return randomIndex;
    };
    const randomizeMoves = () => {
      this.moves = [moves[getRandomMoveIndex()], moves[getRandomMoveIndex()]];
    };
    const randomizeIntervals = () => {
      this.intervals = [getRandomInteger(4_000, 7_000)];
    };
    const randomizeXandY = () => {
      this.randomX = getRandomInteger(SPEED_MIN_MULTIPLE, SPEED_MAX_MULTIPLE);
      this.randomY = getRandomInteger(SPEED_MIN_MULTIPLE, SPEED_MAX_MULTIPLE);
    };
    const randomizeDirection = () => {
      getRandomInteger(-1, 1) > 0 && this.#changeDirectionX();
      getRandomInteger(-1, 1) > 0 && this.#changeDirectionY();
    };

    randomizeMoves();
    randomizeIntervals();
    randomizeXandY();

    setInterval(() => {
      randomizeXandY();
      randomizeIntervals();
      randomizeMoves();
    }, getRandomInteger(8_000, 16_000));

    setInterval(() => {
      randomizeDirection();
    }, getRandomInteger(8_000, 16_000));
  };

  update = (time: DOMHighResTimeStamp) => {
    this.draw(time);

    if (time % 10_000 < this.intervals[0]) {
      const start = 0 + Math.floor(time / 10_000) * 10_000;
      const duration = this.intervals[0];
      this.moves[0](getTimings({ time, start, duration }).progress);
      return;
    }

    const start = this.intervals[0] + Math.floor(time / 10_000) * 10_000;
    const duration = 10_000 - this.intervals[0];
    this.moves[1](getTimings({ time, start, duration }).progress);
  };

  #moveIdle = () => {
    this.isMoving = false;
  };

  #moveRandomX = () => {
    this.isMoving = true;
    this.#moveX(this.defaultSpeed * (1 + this.randomX));

    this.#stayInViewport();
  };

  #moveRandomXY = () => {
    this.isMoving = true;
    this.#moveX(this.defaultSpeed * (1 + this.randomX));
    this.#moveY(this.defaultSpeed * (1 + this.randomY) * 0.6);

    this.#stayInViewport();
  };

  #moveGentleSlope = () => {
    this.isMoving = true;
    this.#moveX(this.defaultSpeed);
    this.#moveY(this.defaultSpeed * 0.2);

    this.#stayInViewport();
  };

  #moveSteepSlope = () => {
    this.isMoving = true;
    this.#moveX(this.defaultSpeed);
    this.#moveY(this.defaultSpeed * 1.2);

    this.#stayInViewport();
  };

  #moveSpeedDownGentleSlope = (progress?: number) => {
    this.isMoving = true;
    if (progress === 1) return (this.isMoving = false);
    this.#moveX(this.defaultSpeed * (1 - progress));
    this.#moveY(this.defaultSpeed * 0.2 * (1 - progress));

    this.#stayInViewport();
  };

  #moveSpeedDownXY = (progress?: number) => {
    this.isMoving = true;
    if (progress === 1) return (this.isMoving = false);

    const naturalizedProgress = Math.max(0.8, progress);
    this.#moveX(this.defaultSpeed * (1 - naturalizedProgress));
    this.#moveY(this.defaultSpeed * (1 - naturalizedProgress));

    this.#stayInViewport();
  };

  #moveSpeedUpGentleSlope = (progress?: number) => {
    this.isMoving = true;
    this.#moveX(this.defaultSpeed * (1 + progress));
    this.#moveY(this.defaultSpeed * (1 + progress) * 0.2);

    this.#stayInViewport();
  };

  #moveSpeedUpXY = (progress?: number) => {
    this.isMoving = true;
    const naturalizedProgress = Math.max(Math.min(0.2, progress), 1);
    this.#moveX(this.defaultSpeed * (1 + naturalizedProgress));
    this.#moveY(this.defaultSpeed * (1 + naturalizedProgress) * 0.6);

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
        this.drawMovement(
          context,
          canvas,
          time,
          this.position,
          0.6 + 0.4 * (this.position.z / canvas.height),
        );
      } else {
        this.drawIdle(
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
        this.drawMovement(
          context,
          canvas,
          time,
          this.position,
          0.3 + 0.2 * (this.position.z / canvas.height),
        );
      } else {
        this.drawIdle(
          context,
          canvas,
          time,
          this.position,
          0.3 + 0.2 * (this.position.z / canvas.height),
        );
      }
    });
  };

  drawIdle(
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

  drawMovement(
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
