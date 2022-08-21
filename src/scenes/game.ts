import { Scene } from '.';
import { layer1Canvas } from '../canvas';
import Person, { EYE_COLORS, SKIN_COLORS } from '../objects/person';
import gameMusic from '../sounds/musics/game';
import { getRandomColor, getRandomInt, pickRandomOption } from '../utils';

export default class GameScene implements Scene {
  persons: Person[];

  constructor() {
    this.persons = [];
  }

  start = () => {
    this.persons = [...new Array(100)].map(() => new Person());
    this.persons.forEach((person, index) => {
      person.init({
        position: {
          x: getRandomInt(layer1Canvas.width),
          y: getRandomInt(layer1Canvas.height),
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
    this.persons.forEach((person) => person.update(time));
  };

  end = () => {
    this.persons.forEach((person) => person.remove());
  };
}
