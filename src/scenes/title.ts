import { Scene } from '.';
import { drawLayer } from './../canvas';
import store from '../store';
import { getFont } from '../utils';

export default class TitleScene implements Scene {
  constructor() {}

  start = () => {
    this.#addEvents();
  };

  update = (time: number) => {
    this.#drawTitle();
    this.#drawSubTitle(time);
  };

  end = () => {
    this.#removeEvents();
  };

  #addEvents = () => {
    window.addEventListener('keydown', this.#startEvent);
  };

  #removeEvents = () => {
    window.removeEventListener('keydown', this.#startEvent);
  };

  #startEvent = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      window.postMessage(
        {
          type: 'change-scene',
          payload: 'game',
        },
        window.origin,
      );
    }
  };

  #drawTitle = () => {
    const layer = store.get('layer1');
    const draw = drawLayer(layer);

    draw((context, canvas) => {
      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width / 2 - 120,
        canvas.height / 2 - 200,
      );
      context.font = getFont(24);
      context.fillText('Sample Game', 0, 0);
    });
  };

  #drawSubTitle = (time: number) => {
    const layer = store.get('layer1');
    const draw = drawLayer(layer);

    draw((context, canvas) => {
      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width / 2 - 100,
        canvas.height / 2 + 2 * Math.sin(time / 60),
      );
      context.font = getFont(12);
      context.fillText('Press spacebar to start', 0, 0);
    });
  };
}
