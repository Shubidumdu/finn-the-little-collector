import { GameObject } from '.';
import canvas, { drawLayer } from '../canvas';
import { getFont } from '../utils';

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
  };

  remove = () => {};

  update = (time: number) => {
    if (!this.startTime) {
      this.startTime = time;
    }

    this.#drawStage();
    this.#drawTimer(time);
    this.#drawLife();
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
      context.fillText(remainTime + '', -120, 56);
    });
  };

  #drawLife = () => {
    const draw = drawLayer(this.layer);
    const width = 50;
    const height = 50;
    const offset = 80;
    const d = Math.min(width, height);
    [...new Array(this.lifeCount)].forEach((_, index) => {
      draw((context, canvas) => {
        context.strokeStyle = '#000000';
        context.shadowOffsetX = 4.0;
        context.shadowOffsetY = 4.0;
        context.lineWidth = 6.0;
        context.fillStyle = '#FF0000';
        context.setTransform(1, 0, 0, 1, 40 + offset * index, canvas.height - 100);
        context.moveTo(0, d / 4);
        context.quadraticCurveTo(0, 0, d / 4, 0);
        context.quadraticCurveTo(d / 2, 0, d / 2, d / 4);
        context.quadraticCurveTo(d / 2, 0, (d * 3) / 4, 0);
        context.quadraticCurveTo(d, 0, d, d / 4);
        context.quadraticCurveTo(d, d / 2, (d * 3) / 4, (d * 3) / 4);
        context.lineTo(d / 2, d);
        context.lineTo(d / 4, (d * 3) / 4);
        context.quadraticCurveTo(0, d / 2, 0, d / 4);
        context.stroke();
        context.fill();
      });
    })
  };
}
