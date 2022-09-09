import { GameObject } from '.';
import canvas, { drawLayer } from '../canvas';
import { RectType, Rect } from '../types/rect';
import { degreeToRadian, barrierRectFactory, getRandomIntegerFromRange, getTimings } from '../utils';

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
  barrier: Rect;
};

type Variation = 'glasses' | 'bald';

export const EYE_COLORS = ['#634e34', '#2e536f', '#1c7847'];
export const SKIN_COLORS = [
  '#8d5524',
  '#c68642',
  '#e0ac69',
  '#f1c27d',
  '#ffdbac',
];

export const LOWER_BODY_SIZE = 18
const PADDING = 10;
const SPEED_MAX_MULTIPLE = 0.3;
const SPEED_MIN_MULTIPLE = -0.7;

const DISTANCE_PER_SECOND = 24;
const FRAME_RATE_PER_SECOND = 60;

/**
 * @description 1프레임 동안 움직이는 픽셀 거리
 */
const DEFAULT_SPEED = DISTANCE_PER_SECOND / FRAME_RATE_PER_SECOND;
const MIN_SPEED = 0.1

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
  barrier: Rect;

  hitBoxPosition: RectType;
  isHit: boolean = false;

  correctAt: number = 0;
  deadAt: number = 0;

  variations: {
    [key in Variation]: boolean;
  } = {
    glasses: true,
    bald: true,
  }

  constructor(defaultSpeed: number = DEFAULT_SPEED) {
    this.defaultSpeed = defaultSpeed;
  }

  init = (state: PersonState) => {
    const { id, position, colors, barrier } = state;
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
    this.barrier = barrier;

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
      const randomIndex = Math.floor(getRandomIntegerFromRange(0, moves.length - 1));
      return randomIndex;
    };
    const randomizeMoves = () => {
      this.moves = [moves[getRandomMoveIndex()], moves[getRandomMoveIndex()]];
    };
    const randomizeIntervals = () => {
      this.intervals = [getRandomIntegerFromRange(4_000, 7_000)];
    };
    const randomizeXandY = () => {
      this.randomX = getRandomIntegerFromRange(SPEED_MIN_MULTIPLE, SPEED_MAX_MULTIPLE);
      this.randomY = getRandomIntegerFromRange(SPEED_MIN_MULTIPLE, SPEED_MAX_MULTIPLE);
    };
    const randomizeDirection = () => {
      getRandomIntegerFromRange(-1, 1) > 0 && this.#changeDirectionX();
      getRandomIntegerFromRange(-1, 1) > 0 && this.#changeDirectionY();
    };

    randomizeMoves();
    randomizeIntervals();
    randomizeXandY();

    setInterval(() => {
      randomizeXandY();
      randomizeIntervals();
      randomizeMoves();
    }, getRandomIntegerFromRange(8_000, 16_000));

    setInterval(() => {
      randomizeDirection();
    }, getRandomIntegerFromRange(8_000, 16_000));
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
    this.#moveX(this.defaultSpeed * (1 + this.randomX) + MIN_SPEED);

    this.#stayInBarrier();
  };

  #moveRandomXY = () => {
    this.isMoving = true;
    this.#moveX(this.defaultSpeed * (1 + this.randomX) + MIN_SPEED);
    this.#moveY(this.defaultSpeed * (1 + this.randomY) * 0.6 + MIN_SPEED);

    this.#stayInBarrier();
  };

  #moveGentleSlope = () => {
    this.isMoving = true;
    this.#moveX(this.defaultSpeed);
    this.#moveY(this.defaultSpeed * 0.2);

    this.#stayInBarrier();
  };

  #moveSteepSlope = () => {
    this.isMoving = true;
    this.#moveX(this.defaultSpeed);
    this.#moveY(this.defaultSpeed * 1.2);

    this.#stayInBarrier();
  };

  #moveSpeedDownGentleSlope = (progress?: number) => {
    this.isMoving = true;
    if (progress === 1) return (this.isMoving = false);
    this.#moveX(this.defaultSpeed * (1 - progress) + MIN_SPEED);
    this.#moveY(this.defaultSpeed * 0.2 * (1 - progress) + MIN_SPEED);

    this.#stayInBarrier();
  };

  #moveSpeedDownXY = (progress?: number) => {
    this.isMoving = true;
    if (progress === 1) return (this.isMoving = false);

    const naturalizedProgress = Math.max(0.8, progress);
    this.#moveX(this.defaultSpeed * (1 - naturalizedProgress) + MIN_SPEED);
    this.#moveY(this.defaultSpeed * (1 - naturalizedProgress) + MIN_SPEED);

    this.#stayInBarrier();
  };

  #moveSpeedUpGentleSlope = (progress?: number) => {
    this.isMoving = true;
    this.#moveX(this.defaultSpeed * (1 + progress));
    this.#moveY(this.defaultSpeed * (1 + progress) * 0.2);

    this.#stayInBarrier();
  };

  #moveSpeedUpXY = (progress?: number) => {
    this.isMoving = true;
    const naturalizedProgress = Math.max(Math.min(0.2, progress), 1);
    this.#moveX(this.defaultSpeed * (1 + naturalizedProgress));
    this.#moveY(this.defaultSpeed * (1 + naturalizedProgress) * 0.6);

    this.#stayInBarrier();
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
      const sizeRatio = 0.6 + 0.4 * (this.position.z / canvas.height);
      this.#setHitBoxPosition();
      this.#drawShadow(context, canvas, time, this.position, sizeRatio);

      if (this.correctAt) {
        this.#drawCorrect(context, canvas, time, this.position, sizeRatio);
        return;
      }

      if (this.deadAt) {
        this.#drawDead(context, canvas, time, this.position, sizeRatio);
        return;
      }

      if (this.isHit) {
        this.#drawDeadMark(context, canvas, time, this.position, sizeRatio);
      }

      if (this.isMoving) {
        this.drawMovement(context, canvas, time, this.position, sizeRatio);
      } else {
        this.drawIdle(context, canvas, time, this.position, sizeRatio);
      }
    });
    drawLayer2((context, canvas) => {
      this.barrier = barrierRectFactory(canvas)

      // debug
      // this.#drawBarrier(context)

      if (this.position.x <= this.barrier.left) {
        this.position.x = this.barrier.left + 1;
        this.move.direction.x = 1;
      }

      if (this.position.x >= this.barrier.right) {
        this.position.x = this.barrier.right - 1;
        this.move.direction.x = -1;
      }

      if (this.position.y <= this.barrier.top) {
        this.position.y = this.barrier.top + 1;
        this.move.direction.y = 1;
      }

      if (this.position.y >= this.barrier.bottom) {
        this.position.y = this.barrier.bottom - 1;
        this.move.direction.y = -1;
      }

      const sizeRatio = 0.3 + 0.2 * (this.position.z / canvas.height);

      this.#drawShadow(context, canvas, time, this.position, sizeRatio);

      if (this.correctAt) {
        this.#drawCorrect(context, canvas, time, this.position, sizeRatio);
        return;
      }

      if (this.deadAt) {
        this.#drawCorrect(context, canvas, time, this.position, sizeRatio);
        return;
      }

      this.#drawShadow(context, canvas, time, this.position, sizeRatio);

      if (this.isHit) {
        this.#drawDeadMark(context, canvas, time, this.position, sizeRatio);
      }

      if (this.isMoving) {
        this.drawMovement(context, canvas, time, this.position, sizeRatio);
      } else {
        this.drawIdle(context, canvas, time, this.position, sizeRatio);
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
      position.y + Math.sin(time / 128) * sizeRatio,
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
    if (this.variations.bald) {
      context.fillStyle = this.colors.skin;
      context.fillRect(-10, -56, 21, 6);
    } else {
      context.fillStyle = this.colors.hair;
      context.fillRect(-16, -62, 28, 12);
      context.fillRect(8, -58, 6, 20);
    }
    if (this.variations.glasses) {
      this.#drawGlasses(context);
    }
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

  #setHitBoxPosition = () => {
    const width = 27;
    const height = 70;

    this.hitBoxPosition = {
      left: this.position.x - width / 2,
      width,
      right: this.position.x + width / 2,
      top: this.position.y - height / 2 - 3,
      height,
      bottom: this.position.y + height / 2,
    };
  };

  #drawDeadMark = (
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    time: number,
    position: { x: number; y: number },
    sizeRatio: number,
  ) => {
    context.setTransform(
      sizeRatio,
      0,
      0,
      sizeRatio,
      position.x,
      position.y + (-74 + Math.sin(time / 128) * 2) * sizeRatio,
    );
    context.strokeStyle = '#b6d9e9';
    context.beginPath();
    context.ellipse(0, 0, 12, 5, Math.PI, 0, Math.PI * 2);
    context.lineWidth = 3;
    context.stroke();

    context.strokeStyle = '#fff';
    context.beginPath();
    context.ellipse(0, 0, 10, 5, Math.PI, 0, Math.PI * 2);
    context.lineWidth = 3;
    context.stroke();
  };

  #drawHitBox = (
    context: CanvasRenderingContext2D,
    { isRect }: { isRect: boolean },
  ) => {
    context.fillStyle = '#fff';

    if (isRect) {
      context.fillRect(
        this.hitBoxPosition.left,
        this.hitBoxPosition.top,
        this.hitBoxPosition.width,
        this.hitBoxPosition.height,
      );
      context.fill();
      return;
    }

    context.ellipse(
      this.position.x,
      this.position.y - 5,
      35,
      55,
      Math.PI,
      0,
      Math.PI * 2,
    );
    context.fill();
  };

  #moveY(delta: number) {
    this.position.y = this.position.y + delta * this.move.direction.y;
  }

  #moveX(delta: number) {
    this.position.x = this.position.x + delta * this.move.direction.x;
  }

  #stayInBarrier() {
    if (this.position.x < this.barrier.left || 
      this.position.x >= this.barrier.right
    ) {
      this.#changeDirectionX()
    }

    if (this.position.y < this.barrier.top ||
      this.position.y >= this.barrier.bottom - LOWER_BODY_SIZE
    ) {
      this.#changeDirectionY()
    }
  }

  #changeDirectionY() {
    this.move.direction.y = (-1 * this.move.direction.y) as -1 | 1;
  }

  #changeDirectionX() {
    this.move.direction.x = (-1 * this.move.direction.x) as -1 | 1;
  }

  #drawCorrect = (
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    time: number,
    position: { x: number; y: number },
    sizeRatio: number,
  ) => {
    const { isProgressing, progress } = getTimings({
      time,
      start: this.correctAt,
      duration: 500,
    });
    if (!isProgressing || progress < 0) return;
    const curvedProgress = Math.cos((1 - progress) * Math.PI * (2 / 3));
    context.setTransform(
      sizeRatio,
      0,
      0,
      sizeRatio,
      position.x,
      position.y + -74 * sizeRatio,
    );
    context.scale(2, 1);
    context.arc(
      0,
      120,
      24 * Math.sin(progress * Math.PI),
      0,
      degreeToRadian(360),
    );
    context.fillStyle = '#000';
    context.fill();
    context.filter = `opacity(${100 * (1 - curvedProgress)}%) hue-rotate(${
      180 * curvedProgress
    }deg)`;
    context.setTransform(
      -sizeRatio * this.move.direction.x,
      0,
      0,
      sizeRatio * (1 - curvedProgress),
      position.x + (-2 + 4 * Number(this.move.direction.x === 1)) * sizeRatio,
      position.y + (-28 + 80 * curvedProgress) * sizeRatio,
    );
    this.#drawArm(context);
    context.setTransform(
      -sizeRatio * this.move.direction.x,
      0,
      0,
      sizeRatio * (1 - curvedProgress),
      position.x,
      position.y + (24 + 28 * curvedProgress) * sizeRatio,
    );
    this.#drawUpperBody(context);
    context.setTransform(
      -sizeRatio * this.move.direction.x,
      0,
      0,
      sizeRatio * (1 - curvedProgress),
      position.x,
      position.y + (63 + -11 * curvedProgress) * sizeRatio,
    );
    this.#drawLowerBody(context);
    context.setTransform(
      -sizeRatio * this.move.direction.x,
      0,
      0,
      sizeRatio * (1 - curvedProgress),
      position.x,
      position.y + (16 + 36 * curvedProgress) * sizeRatio,
    );
    this.#drawLeg(context);
    context.setTransform(
      -sizeRatio * this.move.direction.x,
      0,
      0,
      sizeRatio * (1 - curvedProgress),
      position.x + (14 + -28 * Number(this.move.direction.x === 1)) * sizeRatio,
      position.y + (16 + 36 * curvedProgress) * sizeRatio,
    );
    this.#drawLeg(context);
    context.setTransform(
      -sizeRatio * this.move.direction.x,
      0,
      0,
      sizeRatio * (1 - curvedProgress),
      position.x,
      position.y + 52 * curvedProgress * sizeRatio,
    );
    this.#drawHead(context);
    context.setTransform(
      -sizeRatio * this.move.direction.x,
      0,
      0,
      sizeRatio * (1 - curvedProgress),
      position.x + (18 + -36 * Number(this.move.direction.x === 1)) * sizeRatio,
      position.y + (-28 + 80 * curvedProgress) * sizeRatio,
    );
    this.#drawArm(context);
  };

  #drawDead = (
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    time: number,
    position: { x: number; y: number },
    sizeRatio: number,
  ) => {
    const { isProgressing, progress } = getTimings({
      time,
      start: this.deadAt,
      duration: 200,
    });
    if (!isProgressing || progress < 0) return;
    context.setTransform(
      sizeRatio,
      0,
      0,
      sizeRatio,
      position.x,
      position.y + -74 * sizeRatio,
    );
    context.filter = `grayscale(${100 * progress}%) opacity(${
      100 * (1 - progress)
    }%)`;
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
      position.y + Math.sin(time / 128) * sizeRatio,
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
  };

  #drawShadow = (
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    time: number,
    position: { x: number; y: number },
    sizeRatio: number,
  ) => {
    const deadTiming = getTimings({
      time,
      start: this.deadAt,
      duration: 200,
    });
    if (deadTiming.isEnded && this.deadAt) return;
    if (this.correctAt) return;

    context.setTransform(
      -sizeRatio * this.move.direction.x,
      0,
      0,
      sizeRatio,
      position.x + (-2 + 4 * Number(this.move.direction.x === 1)) * sizeRatio,
      position.y + 44 * sizeRatio,
    );
    context.scale(2, 1);
    context.arc(0, 0, 18, 0, degreeToRadian(360));
    context.fillStyle = deadTiming.isProgressing
      ? `rgba(0, 0, 0, ${0.1 * (1 - deadTiming.progress)})`
      : 'rgba(0, 0, 0, 0.1)';
    context.fill();
  };

  #drawGlasses = (context: CanvasRenderingContext2D) => {
    context.fillStyle = '#000'
    context.strokeStyle = '#000';
    context.beginPath();
    context.arc(-8, -43, 6, 0, degreeToRadian(360));
    context.closePath();
    context.stroke();
    context.beginPath();
    context.arc(4, -43, 6, 0, degreeToRadian(360));
    context.stroke();
    context.fillRect(9, -45, 4, 2);
    context.closePath();
  }

  #drawBarrier = (context: CanvasRenderingContext2D) => {
    context.resetTransform()
    context.beginPath();
    context.strokeRect(this.barrier.left, this.barrier.top, this.barrier.width, this.barrier.height);
    context.closePath();
  }
}
