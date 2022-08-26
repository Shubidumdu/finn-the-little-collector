import { Scene } from '.';
import canvasMap from '../canvas';
import PlayInfo from '../objects/playInfo';
import Person, { EYE_COLORS, SKIN_COLORS } from '../objects/person';
import gameMusic from '../sounds/musics/game';
import { getRandomColor, getRandomInt, pickRandomOption } from '../utils';

export default class PlayScene implements Scene {
  info: PlayInfo;
  layer1: HTMLCanvasElement;
  persons: Person[];
  stage: number = 0;
  timeout: number = 10000;

  constructor() {
    this.info = new PlayInfo();
    this.persons = [];
    this.layer1 = canvasMap.get('layer1');
  }

  start = () => {
    this.info.init({
      stage: this.stage,
      timeout: this.timeout,
    });

    this.persons = [...new Array(100)].map(() => new Person());
    this.persons.forEach((person) => {
      person.init({
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
  };

  update = (time: number) => {
    this.info.update(time);
    this.persons.forEach((person) => person.update(time));
  };

  end = () => {
    this.info.remove();
    this.persons.forEach((person) => person.remove());
  };
}
