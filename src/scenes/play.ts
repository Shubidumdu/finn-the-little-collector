import { Scene } from '.';
import canvas from '../canvas';
import { GameObject } from '../objects';
import { BackgroundType, Pool } from '../objects/backgrounds';
import PlayInfo from '../objects/playInfo';
import Magnifier from '../objects/magnifier';
import Person, { EYE_COLORS, SKIN_COLORS } from '../objects/person';
import { getRandomColor, getRandomInt, pickRandomOption } from '../utils';

export default class PlayScene implements Scene {
  activeBackground: BackgroundType;
  backgrounds: { [background in BackgroundType]: GameObject };
  info: PlayInfo;
  magnifier: Magnifier;
  layer1: HTMLCanvasElement;
  persons: Person[];
  stage: number = 0;
  timeout: number = 10000;

  constructor() {
    this.activeBackground = 'pool';
    this.backgrounds = {
      pool: new Pool(),
    };
    this.info = new PlayInfo();
    this.magnifier = new Magnifier();
    this.persons = [];
    this.layer1 = canvas.get('layer1');
  }

  start = () => {
    this.backgrounds[this.activeBackground].init();
    this.info.init({
      stage: this.stage,
      timeout: this.timeout,
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
  };

  update = (time: number) => {
    this.backgrounds[this.activeBackground].update(time);
    this.info.update(time);
    this.persons.forEach((person) => {
      person.update(time);
    });
    this.magnifier.update(time);
  };

  end = () => {
    this.backgrounds[this.activeBackground].remove();
    this.info.remove();
    this.persons.forEach((person) => person.remove());
  };
}
