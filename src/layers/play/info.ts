import { Layer } from '..';
import { createCanvas, drawLayer, removeCanvas } from '../../canvas';
import { getFont } from '../../utils';

type PlayInfoState = {
  stage: number,
  timeout: number,
};

export default class PlayInfo implements Layer {
  layer: HTMLCanvasElement;
  stage: number;
  startTime: number; // ms
  timeout: number; // sec

  init = ({
    stage,
    timeout,
  }: PlayInfoState) => {
    this.stage = stage;
    this.timeout = timeout;
    this.layer = createCanvas('playInfo', { height: 100, style: { height: 'auto', zIndex: '10' } });
  };

  remove = () => {
    this.layer = null;
    removeCanvas('playInfo');
  };

  update = (time: number) => {
    if (!this.startTime) {
      this.startTime = time;
    }

    this.#drawStage();
    this.#drawTimer(time);
  };

  #drawStage = () => {
    const draw = drawLayer(this.layer);

    draw((context) => {
      context.setTransform(
        1,
        0,
        0,
        1,
        0,
        0,
      );
      context.font = getFont(24);
      context.fillText(`Stage ${this.stage}`, 40, 56);
    });
  };

  #drawTimer = (time: number) => {
    const draw = drawLayer(this.layer);

    draw((context, canvas) => {
      const remainTime = Math.max(this.timeout - (time - this.startTime) / 1000, 0).toFixed(2);

      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width,
        0,
      );
      context.font = getFont(24);
      context.fillText(remainTime + '', -120, 56);
    });
  };
}
