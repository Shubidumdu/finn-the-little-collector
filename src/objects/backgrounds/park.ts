import { GameObject } from '..';
import canvas, { drawLayer } from '../../canvas';

export default class Park implements GameObject {
  constructor() {};

  #draw = drawLayer(canvas.get('bg'));

  init = () => {};

  update = (time: DOMHighResTimeStamp) => {
    this.#draw((context, canvas) => {
      // 하늘
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.beginPath();
      const grad1 = context.createLinearGradient(0, 0, 0, innerHeight / 3);
      grad1.addColorStop(0, '#acb9ba');
      grad1.addColorStop(.3, '#ecebe1')
      grad1.addColorStop(.7, '#fffffb')
      context.fillStyle = grad1;
      context.fillRect(0, 0, canvas.width, 200);
      context.closePath();

      // 잔디
      context.setTransform(1, 0, 0, 1, 0, 120);
      context.beginPath();
      context.fillStyle = '#b5c81e';
      context.fillRect(0, 0, canvas.width, canvas.height - 120);
      context.closePath();

      // 도로
      const per1 = Math.max(canvas.width / (canvas.width - 1200), 1);
      console.log(per1);
      context.setTransform(1 * per1, 0, 0, 1 * per1, canvas.width / 2, 120);
      context.beginPath();
      const track = new Path2D();
      track.moveTo(730, 46);
      track.bezierCurveTo(726.548, 17.5571, 670.559, 5.95668, 625.777, 1);
      track.bezierCurveTo(655.119, 2.23035, 706.578, 4.71675, 754.858, 11.5);
      track.bezierCurveTo(804.68, 18.5, 853.705, 34.8899, 870.5, 42);
      track.bezierCurveTo(911.229, 59.2422, 949.723, 88.5, 988.127, 164.5);
      const maxWidth = Math.max(1050, canvas.width / 2);
      const maxHeight = Math.max(358, canvas.height / 2);
      track.bezierCurveTo(1018.85, 225.3, 1042.18, 318.833, maxWidth, maxHeight);
      track.lineTo(-maxWidth, maxHeight);
      track.bezierCurveTo(95.6101, 353.86, 369.143, 269.213, 527.5, 203.5);
      track.bezierCurveTo(574.425, 184.028, 738.193, 113.5, 730, 46);
      context.fillStyle = '#91a01d';
      context.fill(track);
      // context.transform(.95, 0, 0, 1, 60, 0);
      // context.fillStyle = '#fff';
      // context.fill(track);
      // context.transform(.95, 0, 0, 1, 60, 0);
      // context.fillStyle = '#e1dee0';
      // context.fill(track);
      // context.setTransform(1, 0, 0, 1, 0, 120 + 528);
      // context.fillRect(0, 0, 1784, canvas.height - 120 - 528);
      // context.closePath();

      // person 이동 영역
      // context.setTransform(1, 0, -0.5, 1, canvas.width / 2 - 280, 240);
      // context.beginPath();
      // context.fillStyle = '#fff';
      // context.fillRect(0, 0, 800, 600);
      // context.closePath();
    });
  };

  remove = () => {
    this.#draw((context, canvas) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  };
}
