import canvas, { DrawFunc, drawLayer } from '../../canvas';
import { GameObject } from '..';

export default class Mart implements GameObject {
  constructor() {};

  #draw = drawLayer(canvas.get('bg'));

  init = () => {};

  update = (time: DOMHighResTimeStamp) => {
    this.#draw((context, canvas) => {
      // 바닥
      context.beginPath();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.fillStyle = '#f1f5ed';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = '#000';

      context.globalAlpha = .5;
      const repeat1 = canvas.height / 40;
      for (let i = 0; i < repeat1; i++) {
        context.transform(1, 0, 0, 1, 0, 40 + i);
        context.fillRect(0, 0, canvas.width, 1);
      }

      context.setTransform(1, 0, -0.5, 1, 0, 0);
      
      const repeat2 = canvas.width * 3 / 2 / 60;
      for (let i = 0; i < repeat2; i++) {
        context.transform(1, 0, 0, 1, 60, 0);
        context.fillRect(0, 0, 1, canvas.height);
      }
      
      context.closePath();

      context.globalAlpha = 1;
      context.setTransform(.3, 0, 0, .3, canvas.width / 2 - 640, 60);
      context.beginPath();
      this.#drawCounter(context, canvas);
      context.transform(1, 0, 0, 1, -200, 400);
      this.#drawCounter(context, canvas);
      context.transform(1, 0, 0, 1, -220, 440);
      this.#drawCounter(context, canvas);
      context.transform(1, 0, 0, 1, -240, 480);
      this.#drawCounter(context, canvas);
      context.transform(1, 0, 0, 1, -260, 520);
      this.#drawCounter(context, canvas);
      context.closePath();

      context.setTransform(.7, 0, 0, .7, canvas.width / 2 + 600, 120);
      context.beginPath();
      this.#drawRack(context);
      context.transform(1, 0, 0, 1, -80, 480);
      this.#drawRack(context);
      context.transform(1, 0, 0, 1, -80, 480);
      this.#drawRack(context);
      context.closePath();

      // person 이동 영역
      context.setTransform(1, 0, -0.5, 1, canvas.width / 2 - 280, 240);
      context.beginPath();
      context.fillStyle = '#fff';
      context.fillRect(0, 0, 800, 600);
      context.closePath();

      // 배너
      context.setTransform(.4, 0, 0, .4, canvas.width / 2 - 360, 0);
      context.beginPath();
      const banner = new Path2D('M242 0H0V486.078L242 244.078V0Z');
      context.fillStyle = '#ffe400';
      context.fill(banner);
      context.transform(1, 0, 0, 1, canvas.width / 2 + 500, 0);
      context.fill(banner);
    });
  };

  remove = () => {
    this.#draw((context, canvas) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  };

  #drawCounter: DrawFunc = (context) => {
    context.fillStyle = '#a3a3a3';
    context.fill(
      new Path2D('M52 71H82V185H52V71Z'),
    );
    context.fill(
      new Path2D('M257 71H287V185H257V71Z'),
    );
    context.fillStyle = '#878787';
    context.fill(
      new Path2D('M96 14H126V128H96V14Z'),
    );
    context.fill(
      new Path2D('M301 14H331V128H301V14Z'),
    );
    context.fillStyle = '#cdcccc';
    context.fill(
      new Path2D('M0 82H305V109L0 109.02V82Z'),
    );
    context.fill(
      new Path2D('M305 82L377 10V35L305 109V82Z'),
    );
    context.fillStyle = '#d9d9d9';
    context.fill(
      new Path2D('M305 82H0L72 10H377L305 82Z'),
    );
    context.fill(
      new Path2D('M305 0H210L200 10H305V0Z'),
    );
  };

  #drawRack: DrawFunc = (context) => {
    context.fillStyle = '#c4c4c4';
    context.fill(
      new Path2D('M765 0H46L0 80H719L765 0Z'),
    );
    context.fillStyle = '#aaa';
    context.fill(
      new Path2D('M0 80H719V323H0V80Z'),
    );
    context.fillStyle = '#929292';
    context.fill(
      new Path2D('M719 80V323L765 243V0L719 80Z'),
    );
  };
}
