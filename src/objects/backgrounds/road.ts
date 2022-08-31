import { GameObject } from '..';
import canvas, { drawLayer } from '../../canvas';
import { getLinearPosition } from '../../utils';

export default class Road implements GameObject {
  constructor() {}

  #draw = drawLayer(canvas.get('bg'));

  init = () => {};

  update = (time: DOMHighResTimeStamp) => {
    this.#draw((context, canvas) => {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.beginPath();
      const grad1 = context.createLinearGradient(0, 0, 0, innerHeight / 4);
      grad1.addColorStop(0, '#676563');
      grad1.addColorStop(.4, '#b6b2b0');
      grad1.addColorStop(.6, '#ccc');
      context.fillStyle = grad1;
      // context.fillStyle = '#d8d8d8';
      context.fillRect(0, 0, canvas.width, 220);
      context.closePath();

      // 인도
      context.setTransform(1, 0, 0, 1, 0, 220);
      context.beginPath();
      context.fillStyle = '#ccc';
      context.fillRect(0, 0, canvas.width, 10);
      context.transform(1, 0, 0, 1, 0, 10);
      context.fillStyle = '#d8d8d8';
      context.fillRect(0, 0, canvas.width, 620);
      context.transform(1, 0, 0, 1, 0, 630);
      context.fillStyle = '#939393';
      context.fillRect(0, 0, canvas.width, 10);
      context.transform(1, 0, 0, 1, 0, 10);

      // 차도
      context.fillStyle = '#6c6c6c';
      context.fillRect(0, 0, canvas.width, canvas.height / 2);
      context.closePath();

      // 횡단보도
      context.setTransform(1, 0, -0.5, 1, 0, 870);
      context.fillStyle = '#fff';
      context.fillRect(0, 0, 400, 40);
      context.transform(1, 0, 0, 1, 0, 70);
      context.fillRect(0, 0, 400, 45);
      context.transform(1, 0, 0, 1, 0, 80);
      context.fillRect(0, 0, 400, 50);
      context.transform(1, 0, 0, 1, 0, 90);
      context.fillRect(0, 0, 400, 55);
      context.transform(1, 0, 0, 1, 0, 100);
      context.fillRect(0, 0, 400, 60);
      context.transform(1, 0, 0, 1, 0, 110);
      context.fillRect(0, 0, 400, 65);
      context.closePath();

      // 차선
      context.setTransform(1, 0, -0.5, 1, 500, 870);
      context.fillRect(0, 0, 4, canvas.height / 2);
      context.transform(1, 0, 0, 1, 0, canvas.height / 4);
      context.fillRect(0, 0, canvas.width - 100, 4);

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.beginPath();
      context.fillStyle = '#eae5e2';
      context.fillRect(0, 0, canvas.width / 2 - 200, 220);
      context.transform(1, 0, 0, 1, canvas.width / 2 - 200 + 60, 0);
      context.fillRect(0, 0, 400, 220);
      context.transform(1, 0, 0, 1, 500, 0);
      context.fillRect(0, 0, canvas.width / 2, 220);

      // 차
      const carBody = new Path2D('M48.6406 7.63281C49.7344 3.15625 53.7422 0 58.3594 0H100.5H142.641C147.258 0 151.266 3.15625 152.359 7.63281L160 39H186.727C191.742 39 195.984 42.7266 196.641 47.7031L201 81H170.21C170.725 79.0872 171 77.0757 171 75C171 62.2975 160.703 52 148 52C135.297 52 125 62.2975 125 75C125 77.0757 125.275 79.0872 125.79 81H101.5H99.5H73.2095C73.725 79.0872 74 77.0757 74 75C74 62.2975 63.7025 52 51 52C38.2975 52 28 62.2975 28 75C28 77.0757 28.275 79.0872 28.7905 81H0L4.35938 47.7031C5.01562 42.7266 9.25781 39 14.2734 39H41L48.6406 7.63281Z');
      const carWheelLeft = new Path2D();
      carWheelLeft.arc(51, 75, 20.5, 0, Math.PI * 2);
      carWheelLeft.moveTo(61.5, 75);
      carWheelLeft.arc(51, 75, 10.5, 0, Math.PI * 2);
      const carWheelRight = new Path2D();
      carWheelRight.arc(148, 75, 20.5, 0, Math.PI * 2);
      carWheelRight.moveTo(158.5, 75);
      carWheelRight.arc(148, 75, 10.5, 0, Math.PI * 2);
      const carShadow = new Path2D();
      carShadow.ellipse(50, 80, 100, 20, 0, 0, Math.PI * 2);

      const delta1 = Math.sin(time / 120);
      context.setTransform(
        .6,
        0,
        0,
        .6,
        getLinearPosition({
          x: canvas.width / 2,
          maxWidth: canvas.width,
          time: time / 5,
          offset: 200,
        }),
        860,
      );
      context.fillStyle = '#5d5e5e';
      context.globalAlpha = .5;
      context.fill(carShadow);
      context.transform(1, 0, 0, 1, -50, -10);
      context.globalAlpha = 1;
      context.fillStyle = '#eaeaea';
      context.fill(carBody);
      context.transform(1, 0, 0, 1, 0, delta1);
      context.fillStyle = '#363636';
      context.fill(carWheelLeft);
      context.fill(carWheelRight);

      context.setTransform(
        .6,
        0,
        0,
        .6,
        getLinearPosition({
          x: canvas.width - 80,
          maxWidth: canvas.width,
          time: time / 6,
          offset: 800,
        }),
        980,
      );
      context.fillStyle = '#5d5e5e';
      context.globalAlpha = .5;
      context.fill(carShadow);
      context.transform(1, 0, 0, 1, -50, -10);
      context.globalAlpha = 1;
      context.fillStyle = '#102c74';
      context.fill(carBody);
      context.transform(1, 0, 0, 1, 0, delta1);
      context.fillStyle = '#2c2e33';
      context.fill(carWheelLeft);
      context.fill(carWheelRight);

      // person 이동 영역
      context.beginPath();
      context.setTransform(1, 0, -0.5, 1, canvas.width / 2 - 280, 240);
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
