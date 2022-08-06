import { GameObject } from '.';
import { drawLayer1 } from '../canvas';

type PlayerState = {
  speed: number;
  position: {
    x: number;
    y: number;
  };
};

export default class Player implements GameObject {
  speed: number;
  position: {
    x: number;
    y: number;
  };

  init = (state: PlayerState) => {
    const { position, speed } = state;
    this.speed = speed;
    this.position = position;
    this.#addEvents();
  };

  remove = () => {
    this.#removeEvents();
  };

  update = (time: number) => {
    this.#draw(time);
  };

  #draw(time: number) {
    drawLayer1((context) => {
      const { x, y } = this.position;
      context.setTransform(1, 0, 0, 1, x, y);
      context.fillRect(0, 0, 20, 20);
    });
  }

  #moveEvent = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') this.position.x -= this.speed;
    if (e.key === 'ArrowRight') this.position.x += this.speed;
    if (e.key === 'ArrowUp') this.position.y -= this.speed;
    if (e.key === 'ArrowDown') this.position.y += this.speed;
  };

  #addEvents = () => {
    window.addEventListener('keydown', this.#moveEvent);
  };

  #removeEvents = () => {
    window.removeEventListener('keydown', this.#moveEvent);
  };
}
