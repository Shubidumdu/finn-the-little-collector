import { Scene, SceneType } from '.';
import canvas, { drawLayer } from '../canvas';
import playEffectSound from '../sounds/effects';
import Music from '../sounds/music';
import titleMusic from '../sounds/musics/title';
import store from '../store';
import { setIsSoundOn } from '../store/mutation';
import { Rect } from '../types/rect';
import { getFont, isInsideRect } from '../utils';

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
        if (store.isSoundOn) {
          this.music.play(true);
        } else {
          this.music.stop();
        }
      },
    },
  ];
  music = new Music(titleMusic);

  hitBoxes: {
    start: Rect;
    sound: Rect;
  } = {
    start: {} as Rect,
    sound: {} as Rect,
  };

  start = () => {
    this.activeMenuIndex = 0;
    this.#addEvents();
    this.music.play(true);
  };

  update = (time: number) => {
    this.#drawTitle();
    this.#drawMenus();
    this.#drawSubTitle(time);
  };

  end = () => {
    this.#removeEvents();
    this.music.stop();
  };

  #addEvents = () => {
    window.addEventListener('keydown', this.#changeMenuIndexEvent);
    window.addEventListener('keydown', this.#actionEvent);

    window.addEventListener('click', (e: PointerEvent) => {
      const { clientX, clientY } = e;

      if (isInsideRect({ x: clientX, y: clientY }, this.hitBoxes.start)) {
        this.activeMenuIndex = 0;
        const currentMenu = this.menus[this.activeMenuIndex];
        currentMenu.action();
      }

      if (isInsideRect({ x: clientX, y: clientY }, this.hitBoxes.sound)) {
        this.activeMenuIndex = 1;
        const currentMenu = this.menus[this.activeMenuIndex];
        currentMenu.action();
      }
    });
  };

  #removeEvents = () => {
    window.removeEventListener('keydown', this.#changeMenuIndexEvent);
    window.removeEventListener('keydown', this.#actionEvent);
  };

  #changeMenuIndexEvent = (e: KeyboardEvent) => {
    playEffectSound('pick');

    if (e.code === 'ArrowDown') {
      this.activeMenuIndex = Math.min(
        this.activeMenuIndex + 1,
        this.menus.length - 1,
      );
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
    const layer1 = canvas.get('layer1');
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
    const layer1 = canvas.get('layer1');
    const drawLayer1 = drawLayer(layer1);

    drawLayer1((context, canvas) => {
      const hitBoxpadding = 3;
      const fontSize = 12;
      const startTextWidth = 45 + hitBoxpadding * 2;
      const startTextHeight = fontSize + hitBoxpadding * 2;
      const soundTextWidth = 104 + hitBoxpadding * 2;
      const soundTextHeight = fontSize + hitBoxpadding * 2;

      const startTextPosition = {
        x: canvas.width / 2 - 20,
        y: canvas.height / 2 - 100,
      };

      const soundTextOffsetFromStartText = {
        x: -20,
        y: 40,
      };

      const soundTextPosition = {
        x: startTextPosition.x + soundTextOffsetFromStartText.x,
        y: startTextPosition.y + soundTextOffsetFromStartText.y,
      };

      this.hitBoxes.start = {
        left: startTextPosition.x - hitBoxpadding,
        width: startTextWidth,
        right: startTextPosition.x - hitBoxpadding + startTextWidth,
        top: startTextPosition.y - startTextHeight + hitBoxpadding,
        height: startTextHeight,
        bottom:
          startTextPosition.y - startTextHeight + hitBoxpadding + startTextHeight,
      };

      this.hitBoxes.sound = {
        left: soundTextPosition.x - hitBoxpadding,
        width: soundTextWidth,
        right: soundTextPosition.x - hitBoxpadding + soundTextWidth,
        top: soundTextPosition.y - soundTextHeight + hitBoxpadding,
        height: soundTextHeight,
        bottom:
          soundTextPosition.y - soundTextHeight + hitBoxpadding + soundTextHeight,
      };

      context.setTransform(
        1,
        0,
        0,
        1,
        startTextPosition.x,
        startTextPosition.y,
      );
      context.font = getFont(fontSize);
      context.fillText('Start', 0, 0);

      context.transform(
        1,
        0,
        0,
        1,
        soundTextOffsetFromStartText.x,
        soundTextOffsetFromStartText.y,
      );
      context.font = getFont(fontSize);

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
    const layer1 = canvas.get('layer1');
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

  // debug
  #drawHitBoxes = (context: CanvasRenderingContext2D) => {
    context.fillStyle = 'white';
    context.fillRect(
    this.hitBoxes.start.left,
    this.hitBoxes.start.top,
    this.hitBoxes.start.width,
    this.hitBoxes.start.height
    );
    context.fillRect(
    this.hitBoxes.sound.left,
    this.hitBoxes.sound.top,
    this.hitBoxes.sound.width,
    this.hitBoxes.sound.height
    );
    context.fillStyle = '#000';
  };
}
