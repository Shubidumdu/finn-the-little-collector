import { GameObject } from '.';
import canvas, { drawLayer } from '../canvas';

type MagnifierState = {
  position: {
    x: number;
    y: number;
  };
  range: number;
};

export default class Magnifier implements GameObject, MagnifierState {
  position: {
    x: number;
    y: number;
  };
  range: number;
  layer1: HTMLCanvasElement;
  layer2: HTMLCanvasElement;
  layer3: HTMLCanvasElement;

  constructor() {
    this.layer1 = canvas.get('layer1');
    this.layer2 = canvas.get('layer2');
    this.layer3 = canvas.get('layer3');
  }

  init = ({ position, range }: MagnifierState) => {
    this.position = position;
    this.range = range;
    canvas
      .get('layer0')
      .addEventListener('pointermove', this.#handlePointerMove);
  };

  update = (time: number) => {
    const drawLayer1 = drawLayer(this.layer1);
    const drawLayer2 = drawLayer(this.layer2);
    const drawLayer3 = drawLayer(this.layer3);

    drawLayer1((context, canvas) => {
      context.setTransform(1, 0, 0, 1, this.position.x, this.position.y);
      context.beginPath();
      context.globalCompositeOperation = 'destination-in';
      context.arc(0, 0, this.range - 1, 0, Math.PI * 2, true);
      context.fill();
      context.closePath();
    });

    drawLayer2((context, canvas) => {
      context.setTransform(1, 0, 0, 1, this.position.x, this.position.y);
      context.beginPath();
      context.globalCompositeOperation = 'destination-out';
      context.arc(0, 0, this.range + 5, 0, Math.PI * 2, true);
      context.fill();
    });

    drawLayer3((context, canvas) => {
      context.setTransform(1, 0, 0, 1, this.position.x, this.position.y);
      context.strokeStyle = '#242424';
      context.fillStyle = '#242424';
      context.beginPath();
      context.arc(0, 0, this.range, 0, Math.PI * 2, true);
      context.stroke();
      context.moveTo(this.range + 4, 0);
      context.arc(0, 0, this.range + 4, 0, Math.PI * 2, true);
      context.stroke();
    });
  };

  remove = () => {
    canvas
      .get('layer0')
      .removeEventListener('pointermove', this.#handlePointerMove);
  };

  #handlePointerMove = (e: MouseEvent) => {
    this.position = {
      x: e.offsetX,
      y: e.offsetY,
    };
  };
}
