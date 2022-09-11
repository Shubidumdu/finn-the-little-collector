import { GameObject } from '.';
import canvas, { drawLayer } from '../canvas';
import { degreeToRadian, getFont } from '../utils';

type PlayInfoState = {
  stage: number;
  timeout: number;
  lifeCount: number;
};

export default class PlayInfo implements GameObject, PlayInfoState {
  layer: HTMLCanvasElement;
  stage: number;
  startTime: number; // ms
  timeout: number; // ms
  lifeCount: number;

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
    this.#drawStage();
    this.#drawTimer(time);
    this.#drawLife(28);
  };

  #drawStage = () => {
    const draw = drawLayer(this.layer);

    draw((context) => {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.font = getFont(24);
      context.fillText(`Stage ${this.stage}`, 40, 56);
    });
  };

  #drawTimer = (time: number) => {
    const draw = drawLayer(this.layer);

    draw((context, canvas) => {
      const remainTime = (
        Math.max(this.timeout - (time - this.startTime), 0) / 1000
      ).toFixed(2);

      context.setTransform(1, 0, 0, 1, canvas.width, 0);
      context.font = getFont(24);
      context.fillText(remainTime + '', -(40 + 92), 56);
    });
  };

  #drawLife = (r: number) => {
    const draw = drawLayer(this.layer);
    const offset = r / 2;

    [...new Array(this.lifeCount)].forEach((_, index) => {
      draw((context, canvas) => {
        context.setTransform(1, 0, 0, 1, 40 + (offset + r * 2) * index, canvas.height - 40);
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
        context.arc(r, -r, (r - 4), degreeToRadian(-24), degreeToRadian(48));
        context.stroke();
        context.closePath();

        context.beginPath();
        context.lineCap = 'round';;
        context.fillStyle = '#000';
        context.fillRect(r - 2, 0, 4, 20);
      });
    })
  };
}
