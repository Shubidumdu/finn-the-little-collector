import { Scene } from '.';
import canvas from '../canvas';
import { GameObject } from '../objects';
import { Playground, Pool, Road } from '../objects/backgrounds';
import PlayInfo from '../objects/playInfo';
import Magnifier from '../objects/magnifier';
import Person, {
  EYE_COLORS,
  LOWER_BODY_SIZE,
  SKIN_COLORS,
} from '../objects/person';
import {
  barrierRectFactory,
  getRandomColor,
  getRandomIntegerFromRange,
  pickRandomOption,
  isInsideRect,
  pickPersonVariations,
  getMousePosition,
} from '../utils';
import WantedPoster from '../objects/wantedPoster';
import Music from '../sounds/music';
import playMusic from '../sounds/musics/play';
import playEffectSound from '../sounds/effects';
import { Rect } from '../types/rect';
import { postGlobalEvent } from '../event';
import { STAGE_STATES } from '../constants';
import { setIsSoundOn, setWantedPersons } from '../store/mutation';
import store from '../store';

export type PlaySceneState = {
  stage: number;
  timeout: number;
  lifeCount: number;
  personCount: number;
  wantedPersonCount: number;
};

export default class PlayScene implements Scene {
  backgrounds: GameObject[];
  info: PlayInfo;
  magnifier: Magnifier;
  layer1: HTMLCanvasElement;
  persons: Person[];
  wantedPersonCount: number;
  wantedPoster: WantedPoster;
  music: Music;
  barrier: Rect;

  constructor() {
    (this.backgrounds = [
      new Playground(),
      new Pool(),
      new Road(),
      new Playground(175),
      new Pool(175),
      new Road(175),
    ]),
      (this.info = new PlayInfo());
    this.magnifier = new Magnifier();
    this.persons = [];
    this.layer1 = canvas.get('layer1');
    this.wantedPoster = new WantedPoster();
    this.music = new Music(playMusic);
    this.barrier = barrierRectFactory(this.layer1);
  }

  start = (
    {
      stage,
      timeout,
      lifeCount,
      personCount,
      wantedPersonCount,
    }: PlaySceneState = STAGE_STATES[1],
  ) => {
    this.backgrounds[stage - 1].init();
    this.music.play(true);
    this.info.init({
      stage,
      timeout,
      lifeCount,
    });
    this.wantedPersonCount = wantedPersonCount;

    this.persons = [...new Array(personCount)].map(() => new Person());
    this.persons.forEach((person, index) => {
      person.init({
        id: index,
        position: {
          x: getRandomIntegerFromRange(this.barrier.left, this.barrier.right),
          y: getRandomIntegerFromRange(
            this.barrier.top,
            this.barrier.bottom - LOWER_BODY_SIZE,
          ),
          z: 0,
        },
        colors: {
          hair: getRandomColor(),
          eye: pickRandomOption(EYE_COLORS),
          skin: pickRandomOption(SKIN_COLORS),
          top: getRandomColor(),
          bottom: getRandomColor(),
          shoe: getRandomColor(),
        },
        barrier: this.barrier,
        variations: pickPersonVariations(),
      });
    });

    this.magnifier.init({
      position: { x: 0, y: 0 },
      range: 100,
    });

    const wantedPersons = this.persons.filter(
      (person) => person.id < wantedPersonCount,
    );

    setWantedPersons(wantedPersons);
    this.wantedPoster.init({
      persons: [...wantedPersons],
    });

    this.#addEvents();
    canvas.get('layer0').addEventListener('click', this.#handleClickPerson);
  };

  update = (time: number) => {
    this.backgrounds[this.info.stage - 1].update(time);
    this.info.update(time);
    this.persons.sort(
      (person1, person2) => person1.position.y - person2.position.y,
    );
    this.persons.forEach((person) => {
      person.update(time);
    });
    this.magnifier.update(time);
    this.wantedPoster.update(time);
    this.#checkGameOver(time);
    this.#checkGameResult();
  };

  end = () => {
    this.backgrounds[this.info.stage - 1].remove();
    this.music.stop();
    this.info.remove();
    this.persons.forEach((person) => person.remove());
    this.#removeEvents();

    canvas.get('layer0').removeEventListener('click', this.#handleClickPerson);
  };

  #checkGameOver = (time: number) => {
    if (
      !this.info.lifeCount ||
      Math.max(this.info.timeout - (time - this.info.startTime)) < 0
    ) {
      this.music.stop();
      postGlobalEvent({
        type: 'change-scene',
        payload: {
          type: 'gameOver',
          state: {
            stage: this.info.stage,
          },
        },
      });
    }
  };

  #checkGameResult = () => {
    if (this.wantedPoster.persons.length === 0) {
      this.music.stop();
      postGlobalEvent({
        type: 'change-scene',
        payload: {
          type: 'gameResult',
          state: {
            stage: this.info.stage,
            clearTime: this.info.elapsedTime,
          },
        },
      });
    }
  };

  #addEvents = () => {
    const layer0 = canvas.get('layer0');
    layer0.addEventListener('click', this.#handleClickPerson);
    layer0.addEventListener('click', this.#handleClickSpeaker);
  };

  #removeEvents = () => {
    const layer0 = canvas.get('layer0');
    layer0.removeEventListener('click', this.#handleClickPerson);
    layer0.removeEventListener('click', this.#handleClickSpeaker);
  };

  #handleClickSpeaker = (e: PointerEvent) => {
    const layer0 = canvas.get('layer0');
    const position = getMousePosition(layer0, e);
    const isHit = this.info.speaker.isInside(position);

    if (!isHit) return;

    const { isSoundOn } = store;
    setIsSoundOn(!isSoundOn);
    if (store.isSoundOn) {
      this.music.play(true);
    } else {
      this.music.stop();
    }
  };

  #handleClickPerson = (e: PointerEvent) => {
    let isPersonClicked = false;
    let isCorrect = false;
    let clickedPersons: Person[] = [];

    this.persons.forEach((person) => {
      if (person.isHit) return;

      const position = getMousePosition(this.layer1, e);

      isInsideRect(position, person.hitBoxPosition) &&
        clickedPersons.push(person);
    });

    const [frontPerson] = clickedPersons.sort(
      (a, b) => b.position.y - a.position.y,
    );
    if (!frontPerson) return;
    frontPerson.isHit = true;

    if (frontPerson.isHit) {
      isPersonClicked = true;
      if (frontPerson.id < this.wantedPersonCount) {
        isCorrect = true;
        this.wantedPoster.removePerson(frontPerson.id);
        frontPerson.correctAt = performance.now();
      } else {
        frontPerson.deadAt = performance.now();
      }
    }

    if (isPersonClicked) {
      if (!isCorrect) {
        playEffectSound('wrong');
        this.info.lifeCount = Math.max(0, this.info.lifeCount - 1);
      } else {
        playEffectSound('correct');
      }
    }
  };
}
