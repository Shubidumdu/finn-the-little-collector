import { drawLayer1 } from "../canvas";

const INITIAL_PLAYER_STATE = Object.freeze({
  speed: 10,
  position: {
    x: 50,
    y: 50,
  },
});

export default class Player {
  speed: number;
  position: {
    x: number;
    y: number;
  };

  constructor(state = INITIAL_PLAYER_STATE) {
    this.init();
    this.#addEvents();
  }

  init = (state = INITIAL_PLAYER_STATE) => {
    const { position, speed } = state;
    this.speed = speed;
    this.position = position;
  }

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
    })
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