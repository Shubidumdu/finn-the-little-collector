import { Scene } from '.';
import { STAGE_STATES } from '../constants';
import { postGlobalEvent } from '../event';
import Music from '../sounds/music';
import gameoverMusic from '../sounds/musics/gameover';

export type GameOverSceneState = {
  stage: number;
};

export default class GameOverScene implements Scene {
  stage: number;
  music: Music;
  elements: {
    container: HTMLDivElement;
    retryButton: HTMLButtonElement;
    titleButton: HTMLButtonElement;
  };

  constructor() {
    this.music = new Music(gameoverMusic);
  }

  start = ({ stage }: GameOverSceneState) => {
    this.stage = stage;
    this.music.play(false);
    this.#createContainer();
    this.#addEventListeners();
  };

  update = (time: number) => {};

  end = () => {
    this.music.stop();
    this.#removeEventListeners();
    this.elements.container.remove();
  };

  #createContainer = () => {
    const container = document.createElement('div');
    container.id = 'container';

    const h1 = document.createElement('h1');
    h1.textContent = 'Game Over';

    container.append(h1);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonContainer');

    const retryButton = document.createElement('button');
    retryButton.textContent = 'Retry';

    const titleButton = document.createElement('button');
    titleButton.textContent = 'Title';
    buttonContainer.append(retryButton);
    buttonContainer.append(titleButton);
    container.append(buttonContainer);
    document.body.append(container);

    this.elements = {
      container,
      retryButton,
      titleButton,
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
    this.elements.titleButton.addEventListener('click', this.#handleClickTitle);
  };

  #removeEventListeners = () => {
    this.elements.retryButton.removeEventListener(
      'click',
      this.#handleClickRetry,
    );
    this.elements.titleButton.removeEventListener(
      'click',
      this.#handleClickTitle,
    );
  };
}
