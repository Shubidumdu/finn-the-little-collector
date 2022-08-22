import { GameObject } from '.';
import { drawLayer } from '../canvas';
import store from '../store';
import { degreeToRadian } from '../utils';

type PersonState = {
  position: {
    x: number;
    y: number;
    z: number;
  };
};

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

  constructor() {}

  init = (state: PersonState) => {
    const { position } = state;
    this.position = position;
  };

  // 얘는 매 프레임 실행됨
  update = (time: number) => {
    this.draw(time);
  };

  remove = () => {
    return;
  };

  draw = (time: number) => {
    const layer1 = store.canvas.get('layer1');
    const drawLayer1 = drawLayer(layer1);

    drawLayer1((context, canvas) => {
      const isMoving = false;
      if (isMoving) {
        context.setTransform(1, 0, 0, 1, canvas.width / 2 + -2 , canvas.height / 2 + 26 + Math.sin(time / 64) * 2);
        context.rotate(degreeToRadian(Math.sin(time / 128) * -8));
        this.#drawArm(context);
        context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2 + 24 + Math.sin(time / 128) * 2);
        this.#drawUpperBody(context);
        context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2 + 63 + Math.sin(time / 128) * 2);
        this.#drawLowerBody(context);
        context.setTransform(1, 0, 0, 1.1, canvas.width / 2, canvas.height / 2 + 70);
        context.rotate(degreeToRadian(-2 + Math.sin(time / 128) * 14));
        this.#drawLeg(context);
        context.setTransform(1, 0, 0, 1.1, canvas.width / 2 + 14, canvas.height / 2 + 70);
        context.rotate(degreeToRadian(5 + Math.sin(time / 128) * -14));
        this.#drawLeg(context);
                context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2 + Math.sin(time / 128) * 2);
        this.#drawHead(context);
        context.setTransform(1, 0, 0, 1, canvas.width / 2 + 18 , canvas.height / 2 + 26 + Math.sin(time / 64) * 2);
        context.rotate(degreeToRadian(Math.sin(time / 128) * 8));
        this.#drawArm(context);
      } else {
        context.setTransform(1, 0, 0, 1, canvas.width / 2 - 4, canvas.height / 2 + 26 + Math.sin(time / 128) * 1);
        this.#drawArm(context);
        context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2 + 24 + Math.sin(time / 128) * 1);
        this.#drawUpperBody(context);
        context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2 + 62);
        this.#drawLowerBody(context);
        context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2 + 73);
        this.#drawLeg(context);
        context.setTransform(1, 0, 0, 1, canvas.width / 2 + 14, canvas.height / 2 + 73);
        this.#drawLeg(context);
        context.setTransform(1, 0, 0, 1, canvas.width / 2 + 20, canvas.height / 2 + 26 + Math.sin(time / 128) * 1);
        this.#drawArm(context);
        context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2 + Math.sin(time / 128) * 2);
        this.#drawHead(context);
      }
    });
  };

  #drawHead = (context: CanvasRenderingContext2D) => {
    const skinColor = '#ffefdb';
    const eyeColor = '#00aeff';
    const hairColor = '#ffcc00';
    context.fillStyle = skinColor;
    context.fillRect(0, 0, 24, 24);
    context.fillStyle = eyeColor;
    context.fillRect(4, 8, 4, 4);
    context.fillRect(12, 8, 4, 4);
    context.fillStyle = hairColor;
    context.fillRect(-4, -8, 28, 12);
    context.fillRect(20, -4, 6, 20);
  }

  #drawArm = (context: CanvasRenderingContext2D) => {
    const handColor = '#ffefdb';
    const armColor = '#de0034';
    context.fillStyle = armColor;
    context.fillRect(0, 0, 8, 38);
    context.fillStyle = handColor;
    context.fillRect(0, 38, 8, 8);
  }

  #drawUpperBody = (context: CanvasRenderingContext2D) => {
    const bodyColor = '#de0034';
    context.fillStyle = bodyColor;
    context.fillRect(0, 0, 24, 40);
  }

  #drawLowerBody = (context: CanvasRenderingContext2D) => {
    const lowerBodyColor = '#075aa3';
    context.fillStyle = lowerBodyColor;
    context.fillRect(0, 0, 24, 12);
  }

  #drawLeg = (context: CanvasRenderingContext2D) => {
    const legColor = '#075aa3';
    const shoesColor = '#000';
    context.fillStyle = legColor;
    context.fillRect(0, 0, 10, 24);
    context.fillStyle = shoesColor;
    context.fillRect(-2, 23, 12, 8);
  }
}
