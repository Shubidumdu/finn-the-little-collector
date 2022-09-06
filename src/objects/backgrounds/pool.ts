import { GameObject } from '..';
import canvas, { DrawFunc, drawLayer } from '../../canvas';

export default class Pool implements GameObject {
  constructor() {}

  #draw = drawLayer(canvas.get('bg'));

  init = () => {};

  update = (time: DOMHighResTimeStamp) => {
    this.#draw((
      context,
      canvas,
    ) => {
      // 하늘
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.beginPath();
      const grad2 = context.createLinearGradient(0, 0, 0, 240);
      grad2.addColorStop(0, '#c4f0f7');
      grad2.addColorStop(.4, '#fff');
      grad2.addColorStop(.5, '#fff');
      grad2.addColorStop(1, '#cff7fd');
      context.fillStyle = grad2;
      context.fillRect(0, 0, canvas.width, 160);
      context.closePath();

      // 파도
      context.transform(1, 0, 0, 1, 0, 160);
      this.#drawWave(context, canvas);

      // 바닥
      const verticalQuater = (canvas.height - 340) / 4;
      this.#drawSand(context, canvas, verticalQuater);
      
      // person 이동 영역
      context.setTransform(1, 0, -0.5, 1, canvas.width / 2 - 280, 240);
      context.beginPath();
      context.fillStyle = '#fff';
      context.strokeRect(0, 0, 800, 600);
      context.closePath();
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
    context.globalAlpha = .8;
    context.fillStyle = '#b4f9ff';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.fillStyle = '#d5f9f9';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.globalAlpha = .6;
    context.fillStyle = '#dbfdfb';
    context.fillRect(0, 0, canvas.width, 20);
  };

  #drawSand: DrawFunc<[HTMLCanvasElement, number]> = (context, canvas, height) => {
    context.fillStyle = '#fffbf0';
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
    context.fillStyle = '#fcfff9';
    context.fillRect(0, 0, canvas.width, height);
  };
}
