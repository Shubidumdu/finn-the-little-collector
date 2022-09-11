import { Scene } from ".";
import canvasMap, { drawLayer } from "../canvas";
import { STAGE_STATES } from "../constants";
import { postGlobalEvent } from "../event";
import Music from "../sounds/music";
import resultMusic from "../sounds/musics/result";
import { getFont } from "../utils";

const lastStage = Math.max(...Object.keys(STAGE_STATES).map(Number))

export type GameResultSceneState = {
  stage: number;
  clearTime: string;
};

export default class GameResultScene implements Scene {
  stage: number;
  music: Music;
  elements: {
    buttonContainer: HTMLDivElement;
    nextButton: HTMLButtonElement;
  };
  nextStage: number | undefined;
  clearTime: string;

  constructor() {
    this.music = new Music(resultMusic);
  }

  start = ({ stage, clearTime }: GameResultScene) => {
    this.stage = stage;
    this.clearTime = clearTime;
    this.nextStage = this.stage < lastStage ? this.stage + 1 : undefined;

    this.music.play(false);
    this.#appendButtons();
    this.#addEventListeners();
  }

  update = (time: number) => {
    const layer1 = canvasMap.get('layer1');
    const drawLayer1 = drawLayer(layer1);

    drawLayer1((context, canvas) => {
      context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2)
      this.#drawTitle(context);

      context.transform(1, 0, 0, 1, 0, 140)
      this.#drawResult(context);
    });
  }

  end = () => {
    this.music.stop();
    this.#removeEventListeners();
    this.elements.buttonContainer.remove();
  }

  #drawTitle = (context: CanvasRenderingContext2D) => {
    const title = this.nextStage ? 'Stage Clear' : 'Complete';
    context.font = getFont(64)
    context.fillStyle = 'white';
    context.fillText(title, context.measureText(title).width / 2 * -1, -120); 
  }

  #drawResult = (context: CanvasRenderingContext2D) => {
    const result = `Time: ${this.clearTime}`;
    context.font = getFont(28)
    context.fillStyle = 'white';
    context.fillText(result, context.measureText(result).width / 2 * -1, -120);
  }

  #appendButtons = () => {
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
      display: flex;  
      width: 480px;
      height: 80%;
      margin: 0 auto;
      justify-content: center;
      align-items: flex-end;
    `;
    const nextButton = document.createElement('button');
    nextButton.style.cssText = `
      background: none;
      border: none;
      font-size: 40px;
      color: #fff;
      z-index: 11;
      cursor: pointer;
    `;
    nextButton.textContent = this.nextStage ? 'Next' : 'Menu';
    buttonContainer.append(nextButton);
    document.body.append(buttonContainer);
    this.elements = {
      buttonContainer,
      nextButton: nextButton,
    };
  }

  #handleClickNext = () => {
    if (!this.nextStage) {
      postGlobalEvent({
        type: 'change-scene',
        payload: {
          type: 'title',
          state: null,
        }
      })  
      return;
    }

    postGlobalEvent({
      type: 'change-scene',
      payload: {
        type: 'play',
        state: STAGE_STATES[this.nextStage]
      }
    })
  }

  #addEventListeners = () => {
    this.elements.nextButton.addEventListener('click', this.#handleClickNext);
  }

  #removeEventListeners = () => {
    this.elements.nextButton.removeEventListener('click', this.#handleClickNext);
  }
}
