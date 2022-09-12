import { GameObject } from '..';
import canvas, { DrawFunc, drawLayer } from '../../canvas';
import { drawSky } from './unit';

export default class Playground implements GameObject {
  hueRotate: number;

  constructor(hueRotate: number = 0) {
    this.hueRotate = hueRotate;
  }

  #draw = drawLayer(canvas.get('bg'));

  init = () => {};

  update = (time: DOMHighResTimeStamp) => {
    this.#draw((context, canvas) => {
      // 하늘
      context.setTransform(1, 0, 0, 1, 0, 0);
      drawSky(context, canvas, this.hueRotate);

      // 풀
      context.transform(1, 0, 0, 1, 0, 160);
      this.#drawGrass(context, canvas);

      // 트랙
      context.setTransform(1, 0, 0, 1, 0, 240);
      this.#drawTrack(context, canvas);

      // 운동장
      context.transform(1, 0, 0, 1, 0, 10);
      const verticalMiddle = (canvas.height - 480) / 2;
      context.fillStyle = '#0abb7d';
      context.fillRect(0, 0, canvas.width, verticalMiddle);
      context.transform(1, 0, 0, 1, 0, verticalMiddle);
      context.fillStyle = '#0cae75';
      context.fillRect(0, 0, canvas.width, verticalMiddle);
    });
  };

  remove = () => {
    this.#draw((context, canvas) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  };

  #drawGrass: DrawFunc<[HTMLCanvasElement]> = (context, canvas) => {
    context.fillStyle = '#f6fae6';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.fillStyle = '#e5fab3';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.fillStyle = '#d8fbb3';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.fillStyle = '#c0fb8e';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.fillStyle = '#c0fb8e';
    context.fillRect(0, 0, canvas.width, 20);
  };

  #drawTrack: DrawFunc<[HTMLCanvasElement]> = (context, canvas) => {
    context.beginPath();
    context.fillStyle = '#c04942';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.fillStyle = '#dc5349';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, 8);
    context.transform(1, 0, 0, 1, 0, 8);
    context.fillStyle = '#c04942';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.fillStyle = '#dc5349';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, 8);
    context.transform(1, 0, 0, 1, 0, 8);
    context.fillStyle = '#c04942';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.fillStyle = '#dc5349';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, 8);
    context.transform(1, 0, 0, 1, 0, 8);
    context.fillStyle = '#c04942';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.fillStyle = '#dc5349';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, 8);
    context.transform(1, 0, 0, 1, 0, 8);
    context.fillStyle = '#c04942';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.fillStyle = '#dc5349';
    context.fillRect(0, 0, canvas.width, 20);
    context.transform(1, 0, 0, 1, 0, 20);
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, 8);
  };
}
