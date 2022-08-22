import { Scene } from '.';
import Person from '../objects/person';

export default class PlayScene implements Scene {
  person: Person;

  constructor() {
    this.person = new Person();
  }

  start = () => {
    this.person.init({
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    });
  };

  update = (time: number) => {
    this.person.update(time);
  };

  end = () => {
    this.person.remove();
  };
}
