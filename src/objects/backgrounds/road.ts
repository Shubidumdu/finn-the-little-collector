import { GameObject } from '..';
import canvas, { drawLayer } from '../../canvas';
import { calculateHex } from '../../utils';

export default class Road implements GameObject {
  constructor() {}

  #draw = drawLayer(canvas.get('bg'));

  init = () => {};

  update = (time: DOMHighResTimeStamp) => {
    this.#draw((context, canvas) => {
      // 하늘
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.beginPath();
      const grad1 = context.createLinearGradient(0, 0, 0, 300);
      grad1.addColorStop(0, '#afe8f8');
      grad1.addColorStop(.4, '#fff');
      grad1.addColorStop(.5, '#fff');
      grad1.addColorStop(1, '#cff7fd');
      context.fillStyle = grad1;
      context.fillRect(0, 0, canvas.width, 160);
      context.closePath();

      context.transform(1, 0, 0, 1, 0, 160);
      const base = Math.floor((canvas.height - 160) / 40 / 2) + 2;

      // 인도
      for (let i = 0; i < base; i++) {
        context.fillStyle = calculateHex('#cccccc', 197379 * i);
        context.fillRect(0, 0, canvas.width, 40);
        context.transform(1, 0, 0, 1, 0, 40);
      }

      context.fillStyle = '#d0d0d0';
      context.fillRect(0, 0, canvas.width, 10);
      context.transform(1, 0, 0, 1, 0, 10);
      context.fillStyle = '#bdbdbd';
      context.fillRect(0, 0, canvas.width, 10);
      context.transform(1, 0, 0, 1, 0, 10);
      context.fillStyle = '#7e7e7e';
      context.fillRect(0, 0, canvas.width, 10);
      context.transform(1, 0, 0, 1, 0, 10);
      context.fillStyle = '#6f6f6f';
      context.fillRect(0, 0, canvas.width, 10);
      context.transform(1, 0, 0, 1, 0, 10);

      // 차도
      for (let i = base; i < base * 2 + 2; i++) {
        context.fillStyle = calculateHex('#939393', 197379 * (base - i));
        context.fillRect(0, 0, canvas.width, 40);
        context.transform(1, 0, 0, 1, 0, 40);
      }

      // 점자 블럭
      context.setTransform(1, 0, 0, 1, 0, 160);
      context.fillStyle = '#edda92';
      context.fillRect(0, 40 * (base - 4), canvas.width, 38);
      context.transform(1, 0, 0, 1, 0, 40 * (base - 4) + 38);
      context.fillStyle = '#decc88';
      context.fillRect(0, 0, canvas.width, 2);

      // 차선
      context.setTransform(1, 0, 0, 1, 0, 160);
      context.fillStyle = '#fff';
      context.fillRect(0, 40 * (base + 2), canvas.width, 10);

      // // person 이동 영역
      context.setTransform(1, 0, -0.5, 1, canvas.width / 2 - 280, 240);
      context.beginPath();
      context.strokeRect(0, 0, 800, 600);
      context.closePath();
    });
  };

  remove = () => {
    this.#draw((context, canvas) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  };
}
