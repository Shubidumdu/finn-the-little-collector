import { Scene } from '.';
import canvasMap, { drawLayer } from '../canvas';
import { STAGE_STATES } from '../constants';
import { postGlobalEvent } from '../event';
import Person from '../objects/person';
import Music from '../sounds/music';
import resultMusic from '../sounds/musics/result';
import { getFont } from '../utils';

const lastStage = Math.max(...Object.keys(STAGE_STATES).map(Number));

export type GameResultSceneState = {
  clearTime: string;
  stage: number;
  wantedPersons: Person[];
};

const person = new Person();
person.move = {
  direction: {
    x: -1,
    y: 1,
    z: 1,
  },
};
person.colors = {
  hair: 'red',
  eye: '#634e34',
  skin: '#8d5524',
  top: 'red',
  bottom: 'red',
  shoe: 'red',
};

export default class GameResultScene implements Scene {
  clearTime: string;
  stage: number;
  music: Music;
  wantedPersons: Person[];
  elements: {
    container: HTMLDivElement,
    nextButton: HTMLButtonElement;
  };
  nextStage: number | undefined;

  constructor() {
    this.music = new Music(resultMusic);
  }

  start = (
    { stage, clearTime, wantedPersons }: GameResultScene = {
      stage: 0,
      clearTime: '10:00',
      wantedPersons: [person, person, person],
    },
  ) => {
    this.clearTime = clearTime;
    this.stage = stage;
    this.wantedPersons = wantedPersons;
    this.nextStage = this.stage < lastStage ? this.stage + 1 : undefined;

    this.music.play(false);
    this.#createContainer();
    this.#addEventListeners();
  };

  update = (time: number) => {
    const layer1 = canvasMap.get('layer1');
    const drawLayer1 = drawLayer(layer1);

    drawLayer1((context, canvas) => {
      // context.fillStyle = '#fff';
      // context.setTransform(1, 0, 0, 1, canvas.width / 2, 0);
      // context.fillRect(-1, 0, 2, canvas.height);
      // context.setTransform(1, 0, 0, 1, 0, canvas.height / 2);
      // context.fillRect(0, -1, canvas.width, 2);

      this.wantedPersons.forEach((person, index) => {
        person.drawIdle(
          context,
          canvas,
          time,
          { x: canvas.width / 2 + 152 + index * 20, y: canvas.height / 2 - 140 },
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
}
