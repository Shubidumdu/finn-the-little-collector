import { GameObject } from '.';
import { drawLayer1, drawLayer2 } from '../canvas';

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
  
  constructor() {
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
