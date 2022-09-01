import { Scene } from '.';
import canvasMap from '../canvas';
import PlayInfo from '../objects/playInfo';
import Magnifier from '../objects/magnifier';
import Person, { EYE_COLORS, SKIN_COLORS } from '../objects/person';
import { getRandomColor, getRandomInt, pickRandomOption } from '../utils';
import WantedPoster from '../objects/wantedPoster';

export default class PlayScene implements Scene {
  info: PlayInfo;
  magnifier: Magnifier;
  layer1: HTMLCanvasElement;
  persons: Person[];
  wantedPoster: WantedPoster;
  stage: number = 0;
  timeout: number = 10000;

  constructor() {
    this.info = new PlayInfo();
    this.persons = [];
    this.layer1 = canvasMap.get('layer1');
    this.magnifier = new Magnifier();
    this.wantedPoster = new WantedPoster();
  }

  start = () => {
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

    const wantedPersonCount = 3;
    const wantedPersons = this.persons.filter(
      (person) => person.id < wantedPersonCount,
    );

    this.wantedPoster.init({
      persons: [...wantedPersons],
    });

    window.addEventListener('click', (e: PointerEvent) => {
      wantedPersons.forEach((person) => {
        if (person.isHit) return;

        person.setIsHit({
          x: e.clientX,
          y: e.clientY,
        });

        if (person.isHit) {
          alert(`You hit PersonId:${person.id}!`);
          this.wantedPoster.removePerson(person.id);
        }
      });
    });
  };

  update = (time: number) => {
    this.info.update(time);
    this.persons.forEach((person) => {
      person.update(time);
    });
    this.magnifier.update(time);
    this.wantedPoster.update(time);
  };

  end = () => {
    this.info.remove();
    this.persons.forEach((person) => person.remove());
  };
}
