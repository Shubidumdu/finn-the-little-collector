import { Scene, SceneType } from '.';
import canvas, { DrawFunc, drawLayer } from '../canvas';
import { STAGE_STATES } from '../constants';
import { postGlobalEvent } from '../event';
import playEffectSound from '../sounds/effects';
import Music from '../sounds/music';
import titleMusic from '../sounds/musics/title';
import store from '../store';
import { setIsSoundOn } from '../store/mutation';
import {
  degreeToRadian,
  getFont,
  isInsideRect,
  isMobileSize,
  isTabletSize,
} from '../utils';
import { Rect } from '../types/rect';

type MagnifierState = Position & {
  scale?: number;
};

type Position = {
  x: number;
  y: number;
};

export default class TitleScene implements Scene {
  activeMenuIndex = 0;
  menus = [
    {
      key: 'start',
      action: () =>
        postGlobalEvent({
          type: 'change-scene',
          payload: {
            type: 'play',
            state: STAGE_STATES[1],
          },
        }),
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

  magnifier: MagnifierState = {
    x: 0,
    y: 0,
    scale: 7,
  };

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
    this.#drawLayer0((context, canvas) => {
      this.#drawMagnifier(context, canvas);
    });
    
    this.#drawLayer1((context, canvas) => {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.fillStyle = '#000';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // this.#drawRuler(context, canvas);

      context.fillStyle = '#fff';
      this.#drawTitle(context, canvas);

      this.#drawMenus(context, canvas);

      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width / 2 - 43,
        canvas.height / 2 - 92 + this.activeMenuIndex * 58,
      );
      context.strokeStyle = '#fff';
      this.#drawUUave(context);

      const { x, y } = this.magnifier;
      context.setTransform(1, 0, 0, 1, x + 4, y - 12);
      context.beginPath();
      context.arc(0, 0, 320, 0, Math.PI * 2);
      context.globalCompositeOperation = 'xor';
      context.fill();
    });

    this.#drawLayer2((context, canvas) => {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = '#000';
      this.#drawTitle(context, canvas);

      this.#drawMenus(context, canvas);

      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width / 2 - 102,
        canvas.height / 2 + 80 + 2 * Math.sin(time / 60),
      );

      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width / 2 - 43,
        canvas.height / 2 - 92 + this.activeMenuIndex * 58,
      );
      context.strokeStyle = '#000';
      this.#drawUUave(context);
    });
  };

  end = () => {
    this.#removeEvents();
    this.music.stop();
  };

  #addEvents = () => {
    window.addEventListener('click', this.#handleClickEvent);
    canvas.get('layer0').addEventListener('pointermove', this.#pointerEvent);
  };

  #removeEvents = () => {
    window.removeEventListener('click', this.#handleClickEvent);
    canvas.get('layer0').removeEventListener('pointermove', this.#pointerEvent);
  };

  #handleClickEvent = (e: PointerEvent) => {
    const { offsetX, offsetY } = e;

    if (isInsideRect({ x: offsetX, y: offsetY }, this.hitBoxes.start)) {
      this.activeMenuIndex = 0;
      const currentMenu = this.menus[this.activeMenuIndex];
      currentMenu.action();
    }

    if (isInsideRect({ x: offsetX, y: offsetY }, this.hitBoxes.sound)) {
      this.activeMenuIndex = 1;
      const currentMenu = this.menus[this.activeMenuIndex];
      currentMenu.action();
    }

    playEffectSound('pick');
  };

  #pointerEvent = (e: PointerEvent) => {
    const { offsetX, offsetY } = e;
    const position = {
      x: offsetX,
      y: offsetY,
    };

    Object.assign(this.magnifier, position);

    if (isInsideRect(position, this.hitBoxes.start)) {
      this.activeMenuIndex = 0;
    }

    if (isInsideRect(position, this.hitBoxes.sound)) {
      this.activeMenuIndex = 1;
    }
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

  #drawLayer0 = drawLayer(canvas.get('layer0'));
  #drawLayer1 = drawLayer(canvas.get('layer1'));
  #drawLayer2 = drawLayer(canvas.get('layer2'));

  #drawTitle: DrawFunc<[HTMLCanvasElement]> = (context, canvas) => {
    if (isMobileSize(canvas.width)) {
      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width / 2 - 60,
        canvas.height / 2 - 200,
      );
      context.font = getFont(32);
      context.fillText('Finn:', 0, 0);

      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width / 2 - 24,
        canvas.height / 2 - 200 + 32,
      );
      context.font = getFont(20);
      context.fillText('the', 0, 0);
      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width / 2 - 152,
        canvas.height / 2 - 200 + 64,
      );
      context.font = getFont(24);
      context.fillText('Little Collector', 0, 0);
    } else if (isTabletSize(canvas.width)) {
      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width / 2 - 66,
        canvas.height / 2 - 200,
      );
      context.font = getFont(36);
      context.fillText('Finn:', 0, 0);
      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width / 2 - 190,
        canvas.height / 2 - 200,
      );
      context.font = getFont(24);
      context.fillText('the Little Collector', 0, 32);
    } else {
      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width / 2 - 350,
        canvas.height / 2 - 200,
      );
      context.font = getFont(40);
      context.fillText('Finn: ', 0, 0);
      context.transform(1, 0, 0, 1, 192, 0);
      context.font = getFont(32);
      context.fillText('the Little Collector', 0, 0);
    }
  };

  #drawMenus: DrawFunc<[HTMLCanvasElement]> = (context, canvas) => {
    const hitBoxpadding = 3;
    const fontSize = 12;
    const startTextWidth = 45 + hitBoxpadding * 2;
    const startTextHeight = fontSize + hitBoxpadding * 2;
    const soundTextWidth = 104 + hitBoxpadding * 2;
    const soundTextHeight = fontSize + hitBoxpadding * 2;

    const startTextPosition = {
      x: canvas.width / 2 - 24,
      y: canvas.height / 2 - 100,
    };

    const soundTextOffsetFromStartText = {
      x: -18,
      y: 58,
    };

    const soundTextPosition = {
      x: startTextPosition.x + soundTextOffsetFromStartText.x,
      y: startTextPosition.y + soundTextOffsetFromStartText.y,
    };

    this.hitBoxes.start = new Rect({
      left: startTextPosition.x - hitBoxpadding,
      width: startTextWidth,
      top: startTextPosition.y - startTextHeight + hitBoxpadding,
      height: startTextHeight,
    });

    this.hitBoxes.sound = new Rect({
      left: soundTextPosition.x - hitBoxpadding,
      width: soundTextWidth,
      top: soundTextPosition.y - soundTextHeight + hitBoxpadding,
      height: soundTextHeight,
    });

    // context.setTransform(1, 0, 0, 1, 0, 0);
    // this.#drawHitBoxes(context);

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
    const offsetX = 0 + (store.isSoundOn ? 2 : 0);

    context.transform(1, 0, 0, 1, offsetX, 0);
    context.fillText(`Sound ${isSoundOn}`, 0, 0);
    
  };

  #drawUUave: DrawFunc = (context) => {
    context.beginPath();
    context.save();
    context.ellipse(0, 0, 10, 5, 0, 0, Math.PI);
    context.transform(1, 0, 0, 1, 21, 0);
    context.moveTo(10, 0);
    context.ellipse(0, 0, 10, 5, 0, 0, Math.PI);
    context.transform(1, 0, 0, 1, 21, 0);
    context.moveTo(10, 0);
    context.ellipse(0, 0, 10, 5, 0, 0, Math.PI);
    context.transform(1, 0, 0, 1, 21, 0);
    context.moveTo(10, 0);
    context.ellipse(0, 0, 10, 5, 0, 0, Math.PI);
    context.transform(1, 0, 0, 1, 21, 0);
    context.moveTo(10, 0);
    context.ellipse(0, 0, 10, 5, 0, 0, Math.PI);
    context.lineWidth = 3;
    context.stroke();
    context.closePath();
  };

  #drawMagnifier: DrawFunc<[HTMLCanvasElement]> = (context, canvas) => {
    const { x, y, scale } = this.magnifier;
    context.setTransform(scale, 0, 0, scale, x + 24, y - 532);
    // context.setTransform(scale, 0, 0, scale, canvas.width / 2 + 32, -40);
    context.beginPath();
    context.rotate(degreeToRadian(48));
    context.shadowBlur = 4;
    context.shadowOffsetX = 12;
    context.shadowOffsetY = 12;
    context.shadowColor = '#bababa';
    context.stroke(
      new Path2D(
        'M60.615 126.92L59.4396 126.663C56.7755 126.537 51.2005 126.336 48.7304 126.462L48.7277 126.475L48.3374 126.486L47.696 126.506L48.2962 224.281C49.2651 224.646 50.7275 225.097 52.2875 225.379C54.0388 225.696 55.8421 225.788 57.2028 225.37L57.2789 225.347L57.3586 225.348C57.8111 225.356 58.6019 225.139 59.4734 224.816C60.1786 224.554 60.8799 224.246 61.3901 224.004L60.615 126.92ZM48.9514 125.451C51.4498 125.355 56.3138 125.521 59.0035 125.642L58.998 124.041L57.829 123.786C56.5759 123.749 54.6517 123.707 52.8923 123.698C52.0014 123.693 51.1557 123.697 50.462 123.713C49.9879 123.725 49.5998 123.742 49.3201 123.765L48.9514 125.451ZM57.6201 107.39C55.8815 107.679 52.7313 107.98 50.0681 107.512L49.801 108.734C52.8393 109.667 56.0319 109.455 57.5883 109.173L57.6201 107.39ZM57.8326 110.144C56.1665 110.456 52.7301 110.697 49.4412 109.669C48.9639 110.528 48.5017 111.761 48.4657 113.004C48.4259 114.379 48.9011 115.752 50.4842 116.706C51.6263 116.461 54.3005 116.195 56.8036 116.908C58.1554 115.723 58.5904 114.352 58.5934 113.099C58.5962 111.934 58.2237 110.861 57.8326 110.144ZM56.442 117.845C54.1325 117.212 51.6402 117.472 50.6474 117.694L50.5003 118.367C51.5184 118.204 52.6758 118.235 53.7439 118.344C54.771 118.449 55.7503 118.63 56.5025 118.803L56.442 117.845ZM52.8977 122.698C54.5025 122.706 56.2415 122.742 57.4902 122.776L57.6532 122.03C56.7109 121.772 55.3623 121.503 53.9592 121.418C52.394 121.324 50.8383 121.464 49.6984 122.035L49.5425 122.748C49.8064 122.732 50.1099 122.722 50.4379 122.714C51.1456 122.697 52.0022 122.693 52.8977 122.698ZM54.0195 120.42C55.7371 120.524 57.3708 120.888 58.3692 121.197L58.663 121.261L58.7632 120.803L56.8723 119.927C56.1424 119.728 54.931 119.47 53.6424 119.339C52.347 119.207 51.0318 119.208 50.0538 119.485L48.6574 120.38L48.5157 121.028L49.1842 121.175C50.573 120.454 52.3746 120.321 54.0195 120.42ZM57.8156 106.34L57.8521 106.279C57.5455 106.341 57.2201 106.392 56.884 106.433C55.9897 106.543 54.9756 106.59 53.9532 106.597C52.5455 106.607 51.1053 106.542 49.9121 106.455L49.925 106.467C52.677 107.032 56.1853 106.645 57.8156 106.34ZM49.0742 105.383C50.3689 105.501 52.1867 105.61 53.9462 105.597C54.9466 105.59 55.9194 105.544 56.7622 105.441C57.4722 105.354 58.0605 105.229 58.4895 105.069L58.3004 103.343C56.894 103.623 55.1328 103.75 53.4796 103.794C51.8591 103.837 50.3136 103.801 49.2569 103.743L49.0742 105.383ZM40.4698 101.595C43.1119 102.173 45.7509 102.533 48.3683 102.688L48.3692 102.68L48.84 102.714C52.1391 102.879 55.4018 102.718 58.5908 102.255C58.5993 102.253 58.6078 102.251 58.6163 102.249L59.1714 102.111L59.1775 102.166C79.2484 99.0125 96.2889 83.8976 100.89 62.8547C106.876 35.4724 89.5315 8.42158 62.1492 2.43497C34.7669 -3.55164 7.71606 13.793 1.72945 41.1753C-4.25716 68.5576 13.0875 95.6084 40.4698 101.595ZM40.9381 99.4531C67.1374 105.181 93.0196 88.5857 98.7476 62.3864C104.476 36.1871 87.8802 10.3049 61.6809 4.57694C35.4816 -1.15104 9.5994 15.4443 3.87142 41.6436C-1.85656 67.8429 14.7388 93.7251 40.9381 99.4531ZM99.7245 62.6C93.8785 89.3389 67.4634 106.276 40.7245 100.43C13.9856 94.5841 -2.95144 68.1689 2.8945 41.43C8.74043 14.6911 35.1556 -2.24592 61.8945 3.60002C88.6334 9.44595 105.57 35.8611 99.7245 62.6Z',
      ),
    );
    context.closePath();
    context.setTransform(1, 0, 0, 1, x, y);
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    context.fillStyle = '#000';
    context.fillRect(-10, -1, 20, 2);
    context.fillRect(-1, -10, 2, 20);
  };

  // debuging
  #drawRuler: DrawFunc<[HTMLCanvasElement]> = (context, canvas) => {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.strokeStyle = '#fff';
    context.strokeRect(canvas.width / 2 - 1, 0 - 1, 2, canvas.height);
    context.strokeRect(0, canvas.height / 2 - 1 - 1, canvas.width, 2);
    context.strokeStyle = '#000';
  };

  // debug
  #drawHitBoxes: DrawFunc = (context) => {
    context.fillStyle = 'white';
    context.fillRect(
      this.hitBoxes.start.left,
      this.hitBoxes.start.top,
      this.hitBoxes.start.width,
      this.hitBoxes.start.height,
    );
    context.fillRect(
      this.hitBoxes.sound.left,
      this.hitBoxes.sound.top,
      this.hitBoxes.sound.width,
      this.hitBoxes.sound.height,
    );
    context.fillStyle = '#000';
  };
}
