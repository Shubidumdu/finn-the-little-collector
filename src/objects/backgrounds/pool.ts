import { GameObject } from '..';
import canvas, { DrawFunc, drawLayer } from '../../canvas';
import { drawSky } from './unit';

export default class Pool implements GameObject {
  constructor() {}

  #draw = drawLayer(canvas.get('bg'));

  init = () => {};

  update = (time: DOMHighResTimeStamp) => {
    this.#draw((context, canvas) => {
      // 하늘
      context.setTransform(1, 0, 0, 1, 0, 0);
      drawSky(context, canvas);

      // 파도
      context.transform(1, 0, 0, 1, 0, 160);
      this.#drawWave(context, canvas);

      // 바닥
      const verticalQuater = (canvas.height - 340) / 4;
      this.#drawSand(context, canvas, verticalQuater);
    });
  };

  remove = () => {
    this.#draw((context, canvas) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  };

  #drawWave: DrawFunc<[HTMLCanvasElement]> = (context, canvas) => {
    context.fillStyle = '#cff7fd';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.fillStyle = '#86f2f9';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.fillStyle = '#50effa';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.fillStyle = '#78ebfa';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.fillStyle = '#8ceffa';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.fillStyle = '#9ef8ff';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.globalAlpha = 0.9;
    context.fillStyle = '#b4f9ff';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.fillStyle = '#d5f9f9';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.globalAlpha = 0.8;
    context.fillStyle = '#dbfdfb';
    context.fillRect(0, 0, canvas.width, 20);
  };

  #drawSand: DrawFunc<[HTMLCanvasElement, number]> = (
    context,
    canvas,
    height,
  ) => {
    context.fillStyle = '#fffbf0';
    context.globalAlpha = 1;
    context.fillRect(0, 0, canvas.width, height);
    context.transform(1, 0, 0, 1, 0, height);
    context.fillStyle = '#f2efe7';
    context.fillRect(0, 0, canvas.width, 10);
    context.transform(1, 0, 0, 1, 0, 10);
    context.fillStyle = '#f7f4ec';
    context.fillRect(0, 0, canvas.width, 10);
    context.transform(1, 0, 0, 1, 0, 10);
    context.fillStyle = '#f2eee4';
    context.fillRect(0, 0, canvas.width, height);
    context.transform(1, 0, 0, 1, 0, height);
    context.fillStyle = '#eae8e3';
    context.fillRect(0, 0, canvas.width, 10);
    context.transform(1, 0, 0, 1, 0, 10);
    context.fillStyle = '#ece8de';
    context.fillRect(0, 0, canvas.width, 10);
    context.transform(1, 0, 0, 1, 0, 10);
    context.fillStyle = '#e1ded2';
    context.fillRect(0, 0, canvas.width, height);
    context.transform(1, 0, 0, 1, 0, height);
    context.fillStyle = '#d2cec5';
    context.fillRect(0, 0, canvas.width, 10);
    context.transform(1, 0, 0, 1, 0, 10);
    context.fillStyle = '#eaede8';
    context.fillRect(0, 0, canvas.width, 10);
    context.transform(1, 0, 0, 1, 0, 10);

    const grad = context.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#fcfff9');
    grad.addColorStop(1, '#ece8de');
    context.fillStyle = grad;
    context.fillRect(0, 0, canvas.width, height);
  };
}
