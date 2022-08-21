import { Scene } from '.';
import { layer1Canvas } from '../canvas';
import Magnifier from '../objects/magnifier';
import Person, { EYE_COLORS, SKIN_COLORS } from '../objects/person';
import gameMusic from '../sounds/musics/game';
import { getRandomColor, getRandomInt, pickRandomOption } from '../utils';

export default class GameScene implements Scene {
  persons: Person[];
  magnifier: Magnifier;

  constructor() {
    this.persons = [];
    this.magnifier = new Magnifier();
  }

  start = () => {
    this.persons = [...new Array(100)].map(() => new Person());
    this.persons.forEach((person) => {
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
    this.magnifier.init({
      position: { x: 0, y: 0 },
      range: 50,
    });
  };

  update = (time: number) => {
    this.persons.forEach((person) => {
      const {
        range: magnifierRange,
        position: { x: magnifierX, y: magnifierY },
      } = this.magnifier;
      const { x: personX, y: personY } = person.position;
      if (
        personX >= magnifierX - magnifierRange &&
        personX <= magnifierX + magnifierRange &&
        personY >= magnifierY - magnifierRange &&
        personY <= magnifierY + magnifierRange
      ) {
        person.isEnlarged = true;
      } else {
        person.isEnlarged = false;
      }
      person.update(time);
    });
    this.magnifier.update(time);
  };

  end = () => {
    this.persons.forEach((person) => person.remove());
  };
}
