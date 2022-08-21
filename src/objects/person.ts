import { GameObject } from '.';
import { drawLayer1 } from '../canvas';
import { degreeToRadian } from '../utils';

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

export default class Person implements GameObject, PersonState {
  position: { x: number; y: number; z: number };
  move: {
    speed: number;
    position: {
      x: number;
      y: number;
      z: number;
    };
  };
  isEnlarged: boolean;
  colors: ColorState;

  constructor() {}

  get sizeRatio() {
    return this.isEnlarged ? 1: 0.5;
  }

  init = (state: PersonState) => {
    const { position, colors } = state;
    this.position = position;
    this.colors = colors;
    this.isEnlarged = false;
  };

  // 얘는 매 프레임 실행됨
  update = (time: number) => {
    this.draw(time);
  };

  remove = () => {
    return;
  };

  draw = (time: number) => {
    drawLayer1((context, canvas) => {
      const isMoving = true;
      if (isMoving) {
        context.setTransform(
          this.sizeRatio,
          0,
          0,
          this.sizeRatio,
          this.position.x + -2 * this.sizeRatio,
          this.position.y + (26 + Math.sin(time / 64) * 2) * this.sizeRatio,
        );
        context.rotate(degreeToRadian(Math.sin(time / 128) * -8));
        this.#drawArm(context);
        context.setTransform(
          this.sizeRatio,
          0,
          0,
          this.sizeRatio,
          this.position.x,
          this.position.y + (24 + Math.sin(time / 128) * 2) * this.sizeRatio,
        );
        this.#drawUpperBody(context);
        context.setTransform(
          this.sizeRatio,
          0,
          0,
          this.sizeRatio,
          this.position.x,
          this.position.y + (63 + Math.sin(time / 128) * 2) * this.sizeRatio,
        );
        this.#drawLowerBody(context);
        context.setTransform(
          this.sizeRatio,
          0,
          0,
          this.sizeRatio,
          this.position.x,
          this.position.y + 70 * this.sizeRatio,
        );
        context.rotate(degreeToRadian(-2 + Math.sin(time / 128) * 14));
        this.#drawLeg(context);
        context.setTransform(
          this.sizeRatio,
          0,
          0,
          this.sizeRatio,
          this.position.x + 14 * this.sizeRatio,
          this.position.y + 70 * this.sizeRatio,
        );
        context.rotate(degreeToRadian(5 + Math.sin(time / 128) * -14));
        this.#drawLeg(context);
        context.setTransform(
          this.sizeRatio,
          0,
          0,
          this.sizeRatio,
          this.position.x,
          this.position.y + (Math.sin(time / 128) * 2) * this.sizeRatio,
        );
        this.#drawHead(context);
        context.setTransform(
          this.sizeRatio,
          0,
          0,
          this.sizeRatio,
          this.position.x + 18 * this.sizeRatio,
          this.position.y + (26 + Math.sin(time / 64) * 2) * this.sizeRatio,
        );
        context.rotate(degreeToRadian(Math.sin(time / 128) * 8));
        this.#drawArm(context);
      } else {
        context.setTransform(
          this.sizeRatio,
          0,
          0,
          this.sizeRatio,
          this.position.x - 4 * this.sizeRatio,
          this.position.y + (26 + Math.sin(time / 128)) * this.sizeRatio,
        );
        this.#drawArm(context);
        context.setTransform(
          this.sizeRatio,
          0,
          0,
          this.sizeRatio,
          this.position.x,
          this.position.y + (24 + Math.sin(time / 128)) * this.sizeRatio,
        );
        this.#drawUpperBody(context);
        context.setTransform(
          this.sizeRatio,
          0,
          0,
          this.sizeRatio,
          this.position.x,
          this.position.y + 62 * this.sizeRatio,
        );
        this.#drawLowerBody(context);
        context.setTransform(
          this.sizeRatio,
          0,
          0,
          this.sizeRatio,
          this.position.x,
          this.position.y + 73 * this.sizeRatio,
        );
        this.#drawLeg(context);
        context.setTransform(
          this.sizeRatio,
          0,
          0,
          this.sizeRatio,
          this.position.x + 14 * this.sizeRatio,
          this.position.y + 73 * this.sizeRatio,
        );
        this.#drawLeg(context);
        context.setTransform(
          this.sizeRatio,
          0,
          0,
          this.sizeRatio,
          this.position.x + 20 * this.sizeRatio,
          this.position.y + (26 + Math.sin(time / 128)) * this.sizeRatio,
        );
        this.#drawArm(context);
        context.setTransform(
          this.sizeRatio,
          0,
          0,
          this.sizeRatio,
          this.position.x,
          this.position.y + Math.sin(time / 128) * this.sizeRatio,
        );
        this.#drawHead(context);
      }
    });
  };

  #drawHead = (context: CanvasRenderingContext2D) => {
    context.fillStyle = this.colors.skin;
    context.fillRect(0, 0, 24, 24);
    context.fillStyle = this.colors.eye;
    context.fillRect(4, 8, 4, 4);
    context.fillRect(12, 8, 4, 4);
    context.fillStyle = this.colors.hair;
    context.fillRect(-4, -8, 28, 12);
    context.fillRect(20, -4, 6, 20);
  };

  #drawArm = (context: CanvasRenderingContext2D) => {
    context.fillStyle = this.colors.top;
    context.fillRect(0, 0, 8, 38);
    context.fillStyle = this.colors.skin;
    context.fillRect(0, 38, 8, 8);
  };

  #drawUpperBody = (context: CanvasRenderingContext2D) => {
    context.fillStyle = this.colors.top;
    context.fillRect(0, 0, 24, 40);
  };

  #drawLowerBody = (context: CanvasRenderingContext2D) => {
    context.fillStyle = this.colors.bottom;
    context.fillRect(0, 0, 24, 12);
  };

  #drawLeg = (context: CanvasRenderingContext2D) => {
    context.fillStyle = this.colors.bottom;
    context.fillRect(0, 0, 10, 24);
    context.fillStyle = this.colors.shoe;
    context.fillRect(-2, 23, 12, 8);
  };
}
