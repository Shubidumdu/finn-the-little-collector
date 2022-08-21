import { Scene, SceneType } from '.';
import { drawLayer } from '../canvas';
import store from '../store';
import { setIsSoundOn } from '../store/mutation';
import { getFont } from '../utils';

export default class TitleScene implements Scene {
  activeMenuIndex = 0;
  menus = [
    {
      key: 'start',
      action: () => this.#changeScene('play'),
    },
    {
      key: 'sound',
      action: () => {
        const { isSoundOn } = store;
        setIsSoundOn(!isSoundOn);
      },
    },
  ];

  start = () => {
    this.activeMenuIndex = 0;
    this.#addEvents();
  };

  update = (time: number) => {
    this.#drawTitle();
    this.#drawMenus();
    this.#drawSubTitle(time);
  };

  end = () => {
    this.#removeEvents();
  };

  #addEvents = () => {
    window.addEventListener('keydown', (event) => {
      this.#changeMenuIndexEvent(event);
      this.#actionEvent(event);
    });
  };

  #removeEvents = () => {
    window.removeEventListener('keydown', this.#changeMenuIndexEvent);
    window.removeEventListener('keydown', this.#actionEvent);
  };

  #changeMenuIndexEvent = (e: KeyboardEvent) => {
    if (e.code === 'ArrowDown') {
      this.activeMenuIndex = Math.min(this.activeMenuIndex + 1, this.menus.length - 1);
    }

    if (e.code === 'ArrowUp') {
      this.activeMenuIndex = Math.max(this.activeMenuIndex - 1, 0);
    }
  };

  #actionEvent = (e: KeyboardEvent) => {
    if (e.code !== 'Space') return;

    const currentMenu = this.menus[this.activeMenuIndex];
    currentMenu.action();
  };
  
  #changeScene = (sceneType: SceneType) => {
    window.postMessage(
      {
        type: 'change-scene',
        payload: sceneType,
      },
      window.origin,
    );
  };

  #drawTitle = () => {
    const layer1 = store.canvas.get('layer1');
    const drawLayer1 = drawLayer(layer1);

    drawLayer1((context, canvas) => {
      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width / 2 - 172,
        canvas.height / 2 - 200,
      );
      context.font = getFont(40);
      context.lineWidth = 2;
      context.strokeText('The Reaper', 0, 0);
    });
  };

  #drawMenus = () => {
    const layer1 = store.canvas.get('layer1');
    const drawLayer1 = drawLayer(layer1);

    drawLayer1((context, canvas) => {
      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width / 2 - 20,
        canvas.height / 2 - 100,
      );
      context.font = getFont(12);
      context.fillText('Start', 0, 0);

      context.transform(
        1,
        0,
        0,
        1,
        -20,
        40,
      );
      context.font = getFont(12);

      const isSoundOn = store.isSoundOn ? 'on' : 'off';

      if (this.activeMenuIndex === 1) {
        context.fillText(`Sound [ ${isSoundOn} ]`, 0, 0);
      } else {
        context.fillText(`Sound ${isSoundOn}`, 0, 0);
      }

      // triangle
      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width / 2 - 100,
        canvas.height / 2 - 116 + this.activeMenuIndex * 40,
      );
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(16, 10);
      context.lineTo(0, 20);
      context.lineWidth = 1;
      context.closePath();
      context.stroke();
    });
  };

  #drawSubTitle = (time: number) => {
    const layer1 = store.canvas.get('layer1');
    const drawLayer1 = drawLayer(layer1);

    drawLayer1((context, canvas) => {
      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width / 2 - 100,
        canvas.height / 2 + 40 + 2 * Math.sin(time / 60),
      );
      context.font = getFont(12);
      context.fillText('Press spacebar to act', 0, 0);
    });
  };
}
