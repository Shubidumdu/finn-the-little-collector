import { Layer } from '..';
import { createCanvas, drawLayer, removeCanvas } from '../../canvas';

type PlayPointerState = {
  sight: number,
};

export default class PlayPointer implements Layer {
  layer: HTMLCanvasElement;
  position: {
    x: number,
    y: number,
  } = {
    x: 0,
    y: 0,
  };
  sight: number;

  init = ({
    sight,
  }: PlayPointerState) => {
    this.sight = sight;
    this.layer = createCanvas('playPointer', { style: { 'z-index': 1 } });
    this.#addEvents();
  };

  remove = () => {
    this.layer = null;
    this.#removeEvents();
    removeCanvas('playPointer');
  };

  update = (time: number) => {
    this.#drawPointer();
  };

  #addEvents = () => {
    this.layer.addEventListener('pointermove', this.#pointerEvent);
  };

  #removeEvents = () => {
    this.layer.removeEventListener('pointermove', this.#pointerEvent);
  };

  #pointerEvent = (event: PointerEvent) => {
    const { clientX, clientY } = event;

    this.position = {
      x: clientX,
      y: clientY,
    };
  };

  #drawPointer = () => {
    const draw = drawLayer(this.layer);

    draw((context, canvas) => {
      const { x, y } = this.position;

      context.filter = 'blur(20px)';
      context.globalCompositeOperation = 'source-out';

      context.setTransform(1, 0, 0, 1, x, y);
      context.arc(0, 0, this.sight, 0, Math.PI * 2);
      context.fillStyle = '#fff';
      context.fill();

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.fillStyle = '#fff';
      context.globalAlpha = 0.95;
      context.fillRect(0, 0, this.layer.width, this.layer.height);
      context.closePath();
    });
  };
}
