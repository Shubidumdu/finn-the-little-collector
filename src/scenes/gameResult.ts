import { Scene } from '.';
import canvasMap, { DrawFunc, drawLayer } from '../canvas';
import { STAGE_STATES } from '../constants';
import { postGlobalEvent } from '../event';
import Person from '../objects/person';
import Music from '../sounds/music';
import resultMusic from '../sounds/musics/result';
import store from '../store';

const lastStage = Math.max(...Object.keys(STAGE_STATES).map(Number));

export type GameResultSceneState = {
  clearTime: string;
  stage: number;
};

type Position = {
  x: number;
  y: number;
};

export default class GameResultScene implements Scene {
  clearTime: string;
  stage: number;
  music: Music;
  elements: {
    container: HTMLDivElement,
    nextButton: HTMLButtonElement;
  };
  nextStage: number | undefined;

  constructor() {
    this.music = new Music(resultMusic);
  }

  start = ({ stage, clearTime }: GameResultSceneState) => {
    this.clearTime = clearTime;
    this.stage = stage;
    this.nextStage = this.stage < lastStage ? this.stage + 1 : undefined;

    this.music.play(false);
    this.#createContainer();
    this.#addEventListeners();
  };

  update = (time: number) => {
    const layer1 = canvasMap.get('layer1');
    const drawLayer1 = drawLayer(layer1);

    drawLayer1((context, canvas) => {
      store.wantedPersons.forEach((person, index, persons) => {
        this.#drawPerson(
          context,
          person,
          time,
          { x: canvas.width / 2 + 208 - (persons.length * 20) + index * 20, y: canvas.height / 2 - 140 },
          .5,
        );
      })
    });
  };

  end = () => {
    this.music.stop();
    this.#removeEventListeners();
    this.elements.container.remove();
  };

  #createContainer = () => {
    const container = document.createElement('div');
    container.id = 'container';
    container.classList.add('reverse');

    const h1 = document.createElement('h1');
    h1.textContent = this.nextStage ? 'Stage Clear' : 'Complete';

    const result = document.createElement('h2');
    const minute = Math.floor(Number(this.clearTime) / 60);
    const second = Math.floor(Number(this.clearTime) % 60);
    result.textContent = `Clear Time: ${minute}:${second < 10 ? '0' : ''}${second}`;

    container.append(h1);
    container.append(result);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonContainer');

    const nextButton = document.createElement('button');
    nextButton.textContent = this.nextStage ? 'Next' : 'Title';
    buttonContainer.append(nextButton);
    container.append(buttonContainer);
    document.body.append(container);

    this.elements = {
      container,
      nextButton,
    };
  };

  #handleClickNext = () => {
    if (!this.nextStage) {
      postGlobalEvent({
        type: 'change-scene',
        payload: {
          type: 'title',
          state: null,
        },
      });
      return;
    }

    postGlobalEvent({
      type: 'change-scene',
      payload: {
        type: 'play',
        state: STAGE_STATES[this.nextStage],
      },
    });
  };

  #addEventListeners = () => {
    this.elements.nextButton.addEventListener('click', this.#handleClickNext);
  };

  #removeEventListeners = () => {
    this.elements.nextButton.removeEventListener(
      'click',
      this.#handleClickNext,
    );
  };

  #drawPerson: DrawFunc<[Person, number, Position, number]> = (
    context,
    person,
    time,
    position,
    sizeRatio,
  ) => {
    context.setTransform(
      -sizeRatio * 1,
      0,
      0,
      sizeRatio,
      position.x + (-2 * 4) * sizeRatio,
      position.y + (-28 + Math.sin(time / 128)) * sizeRatio,
    );
    person.drawArm(context);
    context.setTransform(
      -sizeRatio * -1,
      0,
      0,
      sizeRatio,
      position.x,
      position.y + (24 + Math.sin(time / 128)) * sizeRatio,
    );
    person.drawUpperBody(context);
    context.setTransform(
      -sizeRatio * -1,
      0,
      0,
      sizeRatio,
      position.x,
      position.y + (63 + Math.sin(time / 128)) * sizeRatio,
    );
    person.drawLowerBody(context);
    context.setTransform(
      -sizeRatio * -1,
      0,
      0,
      sizeRatio,
      position.x,
      position.y + 16 * sizeRatio,
    );
    person.drawLeg(context);
    context.setTransform(
      -sizeRatio * -1,
      0,
      0,
      sizeRatio,
      position.x + (14) * sizeRatio,
      position.y + 16 * sizeRatio,
    );
    person.drawLeg(context);
    context.setTransform(
      -sizeRatio * -1,
      0,
      0,
      sizeRatio,
      position.x,
      position.y + Math.sin(time / 128) * sizeRatio,
    );
    person.drawHead(context);
    context.setTransform(
      -sizeRatio * -1,
      0,
      0,
      sizeRatio,
      position.x + (18) * sizeRatio,
      position.y + (-28 + Math.sin(time / 128)) * sizeRatio,
    );
    person.drawArm(context);
  };
}
