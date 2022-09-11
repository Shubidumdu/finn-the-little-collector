import { Scene } from '.';
import canvasMap, { drawLayer } from '../canvas';
import { STAGE_STATES } from '../constants';
import { postGlobalEvent } from '../event';
import Music from '../sounds/music';
import gameoverMusic from '../sounds/musics/gameover';
import { getFont, isMobileSize, isTabletSize } from '../utils';

export type GameOverSceneState = {
  stage: number;
};

export default class GameOverScene implements Scene {
  stage: number;
  music: Music;
  elements: {
    buttonContainer: HTMLDivElement;
    retryButton: HTMLButtonElement;
    menuButton: HTMLButtonElement;
  };

  constructor() {
    this.music = new Music(gameoverMusic);
  }

  start = () => {
    this.stage = 1;
    this.music.play(false);
    this.#appendButtons();
    this.#addEventListeners();
  };

  update = (time: number) => {
    const layer1 = canvasMap.get('layer1');
    const drawLayer1 = drawLayer(layer1);

    drawLayer1((context, canvas) => {
      context.fillStyle = '#fff';
      context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);

      if (isTabletSize(canvas.width)) {
        context.font = getFont(48);
        context.fillText('Game Over', -172, -44);
      } else {
        context.font = getFont(64);
        context.fillText('Game Over', -236, -32);
      }
    });
  };

  end = () => {
    this.music.stop();
    this.#removeEventListeners();
    this.elements.buttonContainer.remove();
  };

  #appendButtons = () => {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonContainer');
    const retryButton = document.createElement('button');
    retryButton.textContent = 'Retry';
    const menuButton = document.createElement('button');
    menuButton.textContent = 'Title';
    buttonContainer.append(retryButton);
    buttonContainer.append(menuButton);
    document.body.append(buttonContainer);
    this.elements = {
      buttonContainer,
      menuButton,
      retryButton,
    };
  };

  #handleClickRetry = () => {
    postGlobalEvent({
      type: 'change-scene',
      payload: {
        type: 'play',
        state: STAGE_STATES[this.stage],
      },
    });
  };

  #handleClickTitle = () => {
    postGlobalEvent({
      type: 'change-scene',
      payload: {
        type: 'title',
        state: null,
      },
    });
  };

  #addEventListeners = () => {
    this.elements.retryButton.addEventListener('click', this.#handleClickRetry);
    this.elements.menuButton.addEventListener('click', this.#handleClickTitle);
  };

  #removeEventListeners = () => {
    this.elements.retryButton.removeEventListener(
      'click',
      this.#handleClickRetry,
    );
    this.elements.menuButton.removeEventListener(
      'click',
      this.#handleClickTitle,
    );
  };
}
