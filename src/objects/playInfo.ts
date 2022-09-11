import { GameObject } from '.';
import canvas, { DrawFunc, drawLayer } from '../canvas';
import store from '../store';
import { Rect } from './../types/rect';
import { degreeToRadian, getFont } from '../utils';

type PlayInfoState = {
  stage: number;
  timeout: number;
  lifeCount: number;
};

export default class PlayInfo implements GameObject, PlayInfoState {
  layer: HTMLCanvasElement;
  speaker = new Rect({
    left: 200,
    top: 56 - 24,
    width: 40,
    height: 32,
  });
  stage: number;
  startTime: number; // ms
  timeout: number; // ms
  lifeCount: number;
  elapsedTime: string;

  constructor() {
    this.layer = canvas.get('layer3');
  }

  init = ({ stage, timeout, lifeCount }: PlayInfoState) => {
    this.stage = stage;
    this.timeout = timeout;
    this.lifeCount = lifeCount;
    this.startTime = performance.now();
  };

  remove = () => {};

  update = (time: number) => {
    const draw = drawLayer(this.layer);

    draw((context, canvas) => {
      context.setTransform(1, 0, 0, 1, 0, 0);
      this.#drawStage(context);

      const { left, top } = this.speaker;
      const { isSoundOn } = store;
      context.setTransform(1, 0, 0, 1, left, top);
      this.#drawSpeaker(context, isSoundOn);

      context.setTransform(1, 0, 0, 1, canvas.width - 40, 56);
      this.#drawTimer(context, time);

      context.setTransform(1, 0, 0, 1, 40, canvas.height - 40);
      this.#drawLife(context, canvas, 28);
    });
  };

  #drawStage: DrawFunc = (context) => {
    context.font = getFont(24);
    context.fillText(`Stage ${this.stage}`, 40, 56);
  };

  #drawSpeaker: DrawFunc<[boolean]> = (context, on) => {
    const speaker = new Path2D(
      'M2.25112 20.2562C1.20355 20.2562 0.981342 19.4292 1.00118 19.0157V10.9843C0.981342 10.5708 1.20355 9.74378 2.25112 9.74378H6.83399L16.7145 2.18239C18.143 1.11907 21 -0.19236 21 3.06849V15V26.9315C21 30.1924 18.143 28.881 16.7145 27.8176L6.83399 20.2562H2.25112Z',
    );
    context.lineWidth = 2;
    context.fillStyle = '#fff';
    context.beginPath();
    context.fill(speaker);
    context.stroke(speaker);
    context.closePath();

    context.beginPath();
    context.fillStyle = '#000';

    if (on) {
      context.transform(1, 0, 0, 1, 24, 15);
      context.arc(0, 0, 8, degreeToRadian(-60), degreeToRadian(60));
      context.stroke();
    } else {
      context.transform(1, 0, 0, 1, 32, 15);
      context.rotate(degreeToRadian(45));
      context.fillRect(-6, -1, 12, 2);
      context.fillRect(-1, -6, 2, 12);
    }

    context.closePath();
  };

  #drawTimer: DrawFunc<[number]> = (context, time) => {
    const remainTime =
      Math.max(this.timeout - (time - this.startTime), 0) / 1000;
    const offset = remainTime < 10 ? 72 : 92;

    context.transform(1, 0, 0, 1, -offset, 0);
    context.font = getFont(24);
    context.fillStyle = remainTime < 10 ? 'red' : '#000';
    context.fillText(remainTime.toFixed(2), 0, 0);

    this.elapsedTime = ((time - this.startTime) / 1000).toFixed(2);
  };

  #drawLife: DrawFunc<[HTMLCanvasElement, number]> = (context, canvas, r) => {
    const offset = r / 2;

    [...new Array(this.lifeCount)].forEach((_, index) => {
      context.transform(1, 0, 0, 1, index > 0 ? offset + r * 2 : 0, 0);
      context.beginPath();
      context.shadowOffsetX = 4;
      context.shadowOffsetY = 4;
      context.lineWidth = 6;
      context.arc(r, -r, r, 0, degreeToRadian(360));
      context.strokeStyle = '#000';
      context.stroke();
      context.fillStyle = 'rgba(255, 255, 255, 0.9)';
      context.fill();
      context.closePath();

      context.beginPath();
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.lineWidth = 2;
      context.globalAlpha = 1;
      context.arc(r, -r, r - 4, degreeToRadian(24), degreeToRadian(72));
      context.stroke();
      context.closePath();

      context.beginPath();
      context.lineCap = 'round';
      context.fillStyle = '#000';
      context.rotate(degreeToRadian(60));
      context.fillRect(-10, -10, 4, 20);
      context.rotate(degreeToRadian(-60));
    });
  };
}
