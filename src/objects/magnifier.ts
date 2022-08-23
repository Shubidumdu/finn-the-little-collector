import { GameObject } from '.';
import canvasMap, { drawLayer } from '../canvas';

type MagnifierState = {
  position: {
    x: number;
    y: number;
  };
  range: number;
}

export default class Magnifier implements GameObject, MagnifierState {
  position: {
    x: number;
    y: number;
  };
  range: number;
  layer1: HTMLCanvasElement;
  layer2: HTMLCanvasElement;
  
  constructor() {
    this.layer1 = canvasMap.get('layer1');
    this.layer2 = canvasMap.get('layer2');
  }

  init = ({
    position,
    range
  }: MagnifierState) => {
    this.position = position;
    this.range = range;
    window.addEventListener('mousemove', this.#handleMouseMove);
  };

  update = (time: number) => {
    const drawLayer1 = drawLayer(this.layer1);
    const drawLayer2 = drawLayer(this.layer2);
    drawLayer1((context, canvas) => {
      context.setTransform(1, 0, 0, 1, this.position.x, this.position.y);
      context.strokeStyle = '#000';
      context.beginPath();
      context.globalCompositeOperation = 'destination-in';
      context.arc(0, 0, this.range, 0, Math.PI * 2, true);
      context.fill();
    })
    drawLayer2((context, canvas) => {
      context.setTransform(1, 0, 0, 1, this.position.x, this.position.y);
      context.strokeStyle = '#000';
      context.beginPath();
      context.globalCompositeOperation = 'destination-out';
      context.arc(0, 0, this.range, 0, Math.PI * 2, true);
      context.fill();
    })
  };

  remove = () => {
    window.removeEventListener('mousemove', this.#handleMouseMove);
  };

  #handleMouseMove = (e: MouseEvent) => {
    this.position = {
      x: e.clientX,
      y: e.clientY,
    };
  };
}
