import { GameObject } from '.';
import canvas, { drawLayer } from '../canvas';
import { getFont } from '../utils';

type PlayInfoState = {
  stage: number,
  timeout: number,
};

export default class PlayInfo implements GameObject, PlayInfoState {
  layer: HTMLCanvasElement;
  stage: number;
  startTime: number; // ms
  timeout: number; // ms

  init = ({
    stage,
    timeout,
  }: PlayInfoState) => {
    this.stage = stage;
    this.timeout = timeout;
  };

  remove = () => {};

  update = (time: number) => {
    if (!this.startTime) {
      this.startTime = time;
    }

    this.#drawStage();
    this.#drawTimer(time);
  };

  #drawStage = () => {
    const playInfoLayer = canvas.get('playInfo');
    const draw = drawLayer(playInfoLayer);

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
    const playInfoLayer = canvas.get('playInfo');
    const draw = drawLayer(playInfoLayer);

    draw((context, canvas) => {
      const remainTime = (Math.max(this.timeout - (time - this.startTime), 0) / 1000).toFixed(2);

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
