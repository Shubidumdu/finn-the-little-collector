import { Scene } from ".";
import canvasMap, { drawLayer } from "../canvas";
import { STAGE_STATES } from "../constants";
import { postGlobalEvent } from "../event";
import Music from "../sounds/music";
import gameoverMusic from "../sounds/musics/gameover";
import { getFont } from "../utils";

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
  }

  update = (time: number) => {
    const layer1 = canvasMap.get('layer1');
    const drawLayer1 = drawLayer(layer1);

    drawLayer1((context, canvas) => {
      context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2)
      context.font = getFont(64)
      context.fillText('Game Over', -260, -120);
    });
  }

  end = () => {
    this.music.stop();
    this.#removeEventListeners();
    this.elements.buttonContainer.remove();
  }

  #appendButtons = () => {
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
      display: flex;  
      width: 480px;
      margin: 480px auto 0;
      justify-content: space-between;
    `;
    const retryButton = document.createElement('button');
    retryButton.style.cssText = `
      background: none;
      border: none;
      font-size: 40px;
      z-index: 1;
    `;
    retryButton.textContent = 'Retry';
    const menuButton = document.createElement('button');
    menuButton.style.cssText = `
      background: none;
      border: none;
      font-size: 40px;
      z-index: 1;
    `;
    menuButton.textContent = 'Main Menu';
    buttonContainer.append(retryButton);
    buttonContainer.append(menuButton);
    document.body.append(buttonContainer);
    this.elements = {
      buttonContainer,
      menuButton,
      retryButton,
    };
  }

  #handleClickRetry = () => {
    postGlobalEvent({
      type: 'change-scene',
      payload: {
        type: 'play',
        state: STAGE_STATES[this.stage]
      }
    })
  }

  #handleClickMenu = () => {
    postGlobalEvent({
      type: 'change-scene',
      payload: {
        type: 'title',
        state: null,
      }
    });
  }

  #addEventListeners = () => {
    this.elements.retryButton.addEventListener('click', this.#handleClickRetry);
    this.elements.menuButton.addEventListener('click', this.#handleClickMenu);
  }

  #removeEventListeners = () => {
    this.elements.retryButton.removeEventListener('click', this.#handleClickRetry);
    this.elements.menuButton.removeEventListener('click', this.#handleClickMenu);
  }
}