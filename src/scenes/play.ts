import { Scene } from '.';
import canvas from '../canvas';
import { GameObject } from '../objects';
import { BackgroundType, Playground, Pool, Road } from '../objects/backgrounds';
import PlayInfo from '../objects/playInfo';
import Magnifier from '../objects/magnifier';
import Person, { EYE_COLORS, SKIN_COLORS } from '../objects/person';
import { getRandomColor, getRandomInt, pickRandomOption } from '../utils';
import WantedPoster from '../objects/wantedPoster';
import Music from '../sounds/music';
import playMusic from '../sounds/musics/play';
import playEffectSound from '../sounds/effects';

export default class PlayScene implements Scene {
  activeBackground: BackgroundType;
  backgrounds: { [background in BackgroundType]: GameObject };
  info: PlayInfo;
  magnifier: Magnifier;
  layer1: HTMLCanvasElement;
  persons: Person[];
  wantedPoster: WantedPoster;
  music = new Music(playMusic);

  constructor() {
    this.activeBackground = 'road';
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
  }

  start = () => {
    this.backgrounds[this.activeBackground].init();
    this.music.play(true);
    this.info.init({
      stage: 1,
      timeout: 10000,
      lifeCount: 5,
    });

    this.persons = [...new Array(100)].map(() => new Person());
    this.persons.forEach((person, index) => {
      person.init({
        id: index,
        position: {
          x: getRandomInt(this.layer1.width),
          y: getRandomInt(this.layer1.height),
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
      });
    });
    this.magnifier.init({
      position: { x: 0, y: 0 },
      range: 100,
    });

    const wantedPersonCount = 3;
    const wantedPersons = this.persons.filter(
      (person) => person.id < wantedPersonCount,
    );

    this.wantedPoster.init({
      persons: [...wantedPersons],
    });

    window.addEventListener('click', (e: PointerEvent) => {
      let isPersonClicked = false;
      let isCorrect = false;

      this.persons.forEach((person) => {
        if (person.isHit) return;

        person.setIsHit({
          x: e.clientX,
          y: e.clientY,
        });

        if (person.isHit) {
          isPersonClicked = true;
          if (person.id < wantedPersonCount) {
            isCorrect = true;
            this.wantedPoster.removePerson(person.id);
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
    });
  };

  update = (time: number) => {
    this.backgrounds[this.activeBackground].update(time);
    this.info.update(time);
    this.persons.forEach((person) => {
      person.update(time);
    });
    this.magnifier.update(time);
    this.wantedPoster.update(time);
  };

  end = () => {
    this.backgrounds[this.activeBackground].remove();
    this.music.stop();
    this.info.remove();
    this.persons.forEach((person) => person.remove());
  };
}
