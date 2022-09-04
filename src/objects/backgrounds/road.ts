import { GameObject } from '..';
import canvas, { DrawFunc, drawLayer } from '../../canvas';
import { getLinearPosition } from '../../utils';

export default class Road implements GameObject {
  constructor() {}

  #draw = drawLayer(canvas.get('bg'));

  init = () => {};

  update = (time: DOMHighResTimeStamp) => {
    this.#draw((context, canvas) => {
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

      // 건물
      context.setTransform(1, 0, 0, 1, 0, 0);

      if (canvas.width > 1000) {
        context.fillStyle = '#e7e7e7';
        context.fillRect(0, 0, 120, 220);
        context.transform(1, 0, 0, 1, 120, 0);
        context.fillStyle = '#c7c7c7';
        context.fillRect(0, 0, 10, 220);
        context.transform(1, 0, 0, 1, 10, 0);
        context.fillStyle = '#b4cdce';
        context.fillRect(0, 0, canvas.width - 260, 220);
        context.transform(1, 0, 0, 1, canvas.width - 260, 0);
        context.fillStyle = '#d8d8d8';
        context.fillRect(0, 0, 10, 220);
        context.transform(1, 0, 0, 1, 10, 0);
        context.fillStyle = '#e7e7e7';
        context.fillRect(0, 0, 120, 220);
  
        context.setTransform(1, 0, 0, 1, 170, -60);
        context.fillStyle = '#54707d';
        const repeat1 = Math.max(0, canvas.width / 2 - 60 - 10 - 170 - 30) / 80;
        for (let i = 0; i < repeat1; i++) {
          context.fillRect((60 + 12) * i, 0, 60, 80);
          context.fillRect((60 + 12) * i, 92, 60, 80);
          context.fillRect((60 + 12) * i, 184, 60, 80);
  
          context.fillRect(canvas.width / 2 - 80 + 20 + (60 + 12) * i, 0, 60, 80);
          context.fillRect(canvas.width / 2 - 80 + 20 + (60 + 12) * i, 92, 60, 80);
          context.fillRect(canvas.width / 2 - 80 + 20 + (60 + 12) * i, 184, 60, 80);
        }
      } else {
        context.fillStyle = '#b4cdce';
        context.fillRect(0, 0, canvas.width, 220);

        const repeat1 = Math.ceil((canvas.width - 30 * 2) / 80) + 1;
        context.transform(1, 0, 0, 1, -30, -60);
        context.fillStyle = '#54707d';
        for (let i = 0; i < repeat1; i++) {
          context.fillRect(30 + (60 + 12) * i, 0, 60, 80);
          context.fillRect(30 + (60 + 12) * i, 92, 60, 80);
          context.fillRect(30 + (60 + 12) * i, 184, 60, 80);
        }
      }

      // 신호등
      context.setTransform(.7, 0, 0, .7, canvas.width / 2 - 680, 708);
      context.beginPath();
      this.#drawLight(context);
      context.closePath();

      // 차
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
      this.#drawCar(context, time, '#eaeaea', '#363636');

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
      this.#drawCar(context, time, '#102c74', '#2c2e33');

      // person 이동 영역
      context.setTransform(1, 0, -0.5, 1, canvas.width / 2 - 280, 240);
      context.beginPath();
      context.strokeRect(0, 0, 800, 600);
      context.closePath();

      // 택시 승강장
      context.setTransform(1, 0, 0, 1, canvas.width / 2 + 360, 680);
      context.beginPath();
      this.#drawTaxiStation(context);

    });
  };

  remove = () => {
    this.#draw((context, canvas) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  };

  #drawCar: DrawFunc<[number, string, string]> = (context, time, bodyColor, wheeColor) => {
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
    const wheeDelta = Math.sin(time / 120);

    context.fillStyle = '#5d5e5e';
    context.globalAlpha = .5;
    context.fill(carShadow);
    context.transform(1, 0, 0, 1, -50, -10);
    context.globalAlpha = 1;
    context.fillStyle = bodyColor;
    context.fill(carBody);
    context.transform(1, 0, 0, 1, 0, wheeDelta);
    context.fillStyle = wheeColor;
    context.fill(carWheelLeft);
    context.fill(carWheelRight);
  };

  #drawLight: DrawFunc = (context) => {
    context.fillStyle = '#1F272B';
    context.fill(
      new Path2D('M0 0H8.30508V219H0V0Z'),
    );
    context.fillStyle = '#232D32';
    context.fill(
      new Path2D('M4.15254 0H30.2542V85.1005H4.15254V0Z'),
    );
    context.fillStyle = '#36474F';
    context.fill(
      new Path2D('M5.9322 5.95109C5.9322 2.66439 8.58814 0 11.8644 0H29.0678C32.3441 0 35 2.66439 35 5.95109V79.1495C35 82.4361 32.3441 85.1005 29.0678 85.1005H11.8644C8.58814 85.1005 5.9322 82.4361 5.9322 79.1495V5.95109Z'),
    );
    context.fillStyle = '#288C63';
    context.fill(
      new Path2D('M32.0339 68.4375C32.0339 75.0109 26.722 80.3397 20.1695 80.3397C13.617 80.3397 8.30508 75.0109 8.30508 68.4375C8.30508 61.8641 13.617 56.5353 20.1695 56.5353C26.722 56.5353 32.0339 61.8641 32.0339 68.4375Z'),
    );
    context.fillStyle = '#E07F3B';
    context.fill(
      new Path2D('M32.0339 42.2527C32.0339 48.8261 26.722 54.1549 20.1695 54.1549C13.617 54.1549 8.30508 48.8261 8.30508 42.2527C8.30508 35.6793 13.617 30.3505 20.1695 30.3505C26.722 30.3505 32.0339 35.6793 32.0339 42.2527Z'),
    );
    context.fillStyle = '#E63D42';
    context.fill(
      new Path2D('M32.0339 16.0679C32.0339 22.6413 26.722 27.9701 20.1695 27.9701C13.617 27.9701 8.30508 22.6413 8.30508 16.0679C8.30508 9.49455 13.617 4.16576 20.1695 4.16576C26.722 4.16576 32.0339 9.49455 32.0339 16.0679Z'),
    );
  };

  #drawTaxiStation: DrawFunc = (context) => {
    context.fillStyle = '#3E3E3E';
    context.fill(
      new Path2D('M266.083 13.9316H269.566V163H266.083V13.9316Z'),
    );
    context.fill(
      new Path2D('M30.6483 13.9316H34.131V163H30.6483V13.9316Z'),
    );
    context.fillStyle = '#595959';
    context.fill(
      new Path2D('M267.476 13.9316H270.959V163H267.476V13.9316Z'),
    );
    context.fill(
      new Path2D('M0 0H303V13.9316H0V0Z'),
    );
    context.fill(
      new Path2D('M29.2552 13.9316H32.7379V163H29.2552V13.9316Z'),
    );
    context.fillStyle = '#9A9A9A';
    context.fill(
      new Path2D('M247.972 13.9316H251.455V158.124H247.972V13.9316Z'),
    );
    context.fill(
      new Path2D('M48.0621 13.9316H51.5448V158.124H48.0621V13.9316Z'),
    );
    context.fillStyle = '#B3B3B3';
    context.fill(
      new Path2D('M46.669 13.9316H50.1517V158.124H46.669V13.9316Z'),
    );
    context.fill(
      new Path2D('M249.366 13.9316H252.848V158.124H249.366V150.462V142.103V13.9316Z'),
    );
    context.fill(
      new Path2D('M178.317 37.6154H181.8V127.474V133.744V142.103V150.462V156.731H178.317V150.462V142.103V133.744V127.474V37.6154Z'),
    );
    context.fill(
      new Path2D('M117.717 37.6154H121.2V127.474V133.744V142.103V150.462V156.731H117.717V150.462V142.103V133.744V127.474V37.6154Z'),
    );
    context.fill(
      new Path2D('M50.1517 29.2564H249.366V37.6154H50.1517V29.2564Z'),
    );
    context.fill(
      new Path2D('M181.8 142.103V150.462H247.972V142.103H181.8Z'),
    );
    context.fill(
      new Path2D('M178.317 150.462V142.103H121.2V150.462H178.317Z'),
    );
    context.fill(
      new Path2D('M50.1517 142.103V150.462H96.1241V142.103H50.1517Z'),
    );
    context.fill(
      new Path2D('M117.717 150.462V142.103H117.021V150.462H117.717Z'),
    );
    context.fillStyle = '#FDFDFD';
    context.globalAlpha = .4;
    context.fill(
      new Path2D('M181.8 37.6154H249.366V142.103H181.8V37.6154Z'),
    );
    context.fill(
      new Path2D('M121.2 37.6154H178.317V142.103H121.2V37.6154Z'),
    );
    context.fill(
      new Path2D('M50.1517 37.6154H117.717V142.103H50.1517V37.6154Z'),
    );
    context.globalAlpha = 1;
    context.fillStyle = '#BABABA';
    context.fill(
      new Path2D('M219.878 130.261H238.917V160.214H219.878V130.261Z'),
    );
    context.fillStyle = '#322F2C';
    context.fill(
      new Path2D('M219.878 130.261H238.917V160.214H219.878V130.261Z'),
    );
    context.fillStyle = '#BABABA';
    context.fill(
      new Path2D('M96.1241 130.261H115.163V160.214H96.1241V130.261Z'),
    );
    context.fillStyle = '#322F2C';
    context.fill(
      new Path2D('M96.1241 130.261H115.163V160.214H96.1241V130.261Z'),
    );
    context.fillStyle = '#5F503F';
    context.fill(
      new Path2D('M105.644 127.474H229.398V133.744H105.644V127.474Z'),
    );
  };
}
