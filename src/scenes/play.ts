import { Scene } from '.';
import canvasMap from '../canvas';
import Magnifier from '../objects/magnifier';
import Person, { EYE_COLORS, SKIN_COLORS } from '../objects/person';
import gameMusic from '../sounds/musics/game';
import { getRandomColor, getRandomInt, pickRandomOption } from '../utils';

export default class GameScene implements Scene {
  persons: Person[];
  magnifier: Magnifier;
  layer1: HTMLCanvasElement;

  constructor() {
    this.persons = [];
    this.layer1 = canvasMap.get('layer1');
    this.magnifier = new Magnifier();
  }

  start = () => {
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
    this.magnifier.init({
      position: { x: 0, y: 0 },
      range: 50,
    });
  };

  update = (time: number) => {
    this.persons.forEach((person) => {
      person.update(time);
    });
    this.magnifier.update(time);
  };

  end = () => {
    this.persons.forEach((person) => person.remove());
  };
}