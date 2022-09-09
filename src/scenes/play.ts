import { Scene } from '.';
import canvas from '../canvas';
import { GameObject } from '../objects';
import { BackgroundType, Playground, Pool, Road } from '../objects/backgrounds';
import PlayInfo from '../objects/playInfo';
import Magnifier from '../objects/magnifier';
import Person, { EYE_COLORS, LOWER_BODY_SIZE, SKIN_COLORS } from '../objects/person';
import { barrierRectFactory, getRandomColor, getRandomIntegerFromRange, pickRandomOption } from '../utils';
import WantedPoster from '../objects/wantedPoster';
import Music from '../sounds/music';
import playMusic from '../sounds/musics/play';
import playEffectSound from '../sounds/effects';
import { Rect } from '../types/rect';
import { postGlobalEvent } from '../event';

export type PlaySceneState = {
  activeBackground: BackgroundType;
  stage: number;
  timeout: number;
  lifeCount: number;
  personCount: number;
  wantedPersonCount: number;
};

export default class PlayScene implements Scene {
  activeBackground: BackgroundType;
  backgrounds: { [background in BackgroundType]: GameObject };
  info: PlayInfo;
  magnifier: Magnifier;
  layer1: HTMLCanvasElement;
  persons: Person[];
  wantedPoster: WantedPoster;
  wantedPersonCount: number;
  music: Music;
  barrier: Rect;

  constructor() {
    this.activeBackground = 'playground';
    this.backgrounds = {
      playground: new Playground(),
      pool: new Pool(),
      road: new Road(),
    };
    this.info = new PlayInfo();
    this.magnifier = new Magnifier();
    this.persons = [];
    this.layer1 = canvas.get('layer1');
    this.wantedPoster = new WantedPoster();
    this.music = new Music(playMusic);
    this.barrier = barrierRectFactory(this.layer1)
  }

  start = ({
    activeBackground,
    stage,
    timeout,
    lifeCount,
    personCount,
    wantedPersonCount
  }: PlaySceneState) => {
    this.activeBackground = activeBackground;
    this.backgrounds[this.activeBackground].init();
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
          y: getRandomIntegerFromRange(this.barrier.top, this.barrier.bottom - LOWER_BODY_SIZE),
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
      });
    });
    this.magnifier.init({
      position: { x: 0, y: 0 },
      range: 120,
    });

    const wantedPersons = this.persons.filter(
      (person) => person.id < wantedPersonCount,
    );

    this.wantedPoster.init({
      persons: [...wantedPersons],
    });

    window.addEventListener('click', this.#handleClickPerson);
  };

  update = (time: number) => {
    this.backgrounds[this.activeBackground].update(time);
    this.info.update(time);
    this.persons.forEach((person) => {
      person.update(time);
    });
    this.magnifier.update(time);
    this.wantedPoster.update(time);
    this.#checkGameOver();
  };

  end = () => {
    this.backgrounds[this.activeBackground].remove();
    this.music.stop();
    this.info.remove();
    this.persons.forEach((person) => person.remove());
    window.removeEventListener('click', this.#handleClickPerson);
  };

  #checkGameOver = () => {
    if(!this.info.lifeCount || this.info.timeout < 0) {
      this.music.stop();
      postGlobalEvent({
        type: 'change-scene',
        payload: {
          type: 'gameover',
          state: {
            stage: this.info.stage,
          }
        }
      })
    }
  }

  // debug
  #drawPersonBarrier = (context: CanvasRenderingContext2D) => {
    context.resetTransform()
    context.beginPath();
    context.strokeRect(this.barrier.left, this.barrier.top, this.barrier.width, this.barrier.height);
    context.closePath();
  }

  #handleClickPerson = (e: PointerEvent) => {
    let isPersonClicked = false;
    let isCorrect = false;

    this.persons.forEach((person) => {
      if (person.isHit) return;

      person.setIsHit({
        x: e.offsetX,
        y: e.offsetY,
      });

      if (person.isHit) {
        isPersonClicked = true;
        if (person.id < this.wantedPersonCount) {
          isCorrect = true;
          this.wantedPoster.removePerson(person.id);
          person.correctAt = performance.now();
        } else {
          person.deadAt = performance.now();
        }
      }
    });

    if (isPersonClicked) {
      if (!isCorrect) {
        playEffectSound('wrong');
        this.info.lifeCount = Math.max(0, this.info.lifeCount - 1);
      } else {
        playEffectSound('correct');
      }
    }
  }
}
