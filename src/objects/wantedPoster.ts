import { GameObject } from '.';
import canvas, { drawLayer } from '../canvas';
import playEffectSound from '../sounds/effects';
import { getFont } from '../utils';
import Person from './person';

type WantedPosterState = {
  persons: Person[];
};

export default class WantedPoster implements GameObject, WantedPosterState {
  persons: Person[];
  selectedIndex: number;

  constructor() {}

  init = (state: WantedPosterState) => {
    const { persons } = state;
    this.persons = persons;
    this.selectedIndex = 0;
    window.addEventListener('keydown', this.#keyHandler);
  };

  update = (time: number) => {
    this.draw(time);
  };

  remove = () => {
    window.removeEventListener('keydown', this.#keyHandler);
  };

  draw = (time: number) => {
    const paperLayer = canvas.get('layer3');
    const drawPaperLayer = drawLayer(paperLayer);
    drawPaperLayer((context, canvas) => {
      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width - 40 - 100,
        canvas.height - 170,
      );
      this.#drawPoster(context);

      if (!this.persons.length) return;

      const selectedPerson = this.persons[this.selectedIndex];
      if (selectedPerson.isMoving) {
        selectedPerson.drawMovement(
          context,
          canvas,
          time,
          { x: canvas.width - 20 - 70, y: canvas.height - 85 },
          1,
        );
      } else {
        selectedPerson.drawIdle(
          context,
          canvas,
          time,
          { x: canvas.width - 20 - 70, y: canvas.height - 85 },
          1,
        );
      }
      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width - 20 - 26,
        canvas.height - 110,
      );
      this.#drawRightArrow(context);
      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width - 20 - 113,
        canvas.height - 110,
      );
      this.#drawLeftArrow(context);
      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width - 20 - 74,
        canvas.height - 180,
      );
      this.#drawIndex(context);
    });
  };

  #drawPoster = (context: CanvasRenderingContext2D) => {
    context.strokeStyle = '#000';
    context.lineWidth = 2;
    context.fillStyle = 'rgba(255, 255, 255, 0.8)';
    context.strokeRect(0, 0, 100, 150);
    context.fillRect(0, 0, 100, 150);
  };

  #drawRightArrow = (context: CanvasRenderingContext2D) => {
    context.fillStyle = '#000';
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(15, 15);
    context.lineTo(0, 30);
    context.lineTo(0, 0);
    context.fill();
    context.font = getFont(8);
    context.fillStyle = '#fff';
    context.fillText('S', 1, 18);
  };

  #drawLeftArrow = (context: CanvasRenderingContext2D) => {
    context.fillStyle = 'rgb(0, 0, 0)';
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(-15, 15);
    context.lineTo(0, 30);
    context.lineTo(0, 0);
    context.fill();
    context.font = getFont(8);
    context.fillStyle = '#fff';
    context.fillText('A', -10, 18);
  };

  #drawIndex = (context: CanvasRenderingContext2D) => {
    context.font = getFont(16);
    context.textAlign = 'center';
    context.fillStyle = '#000';
    context.fillText(
      `${this.selectedIndex + 1} / ${this.persons.length}`,
      0,
      0,
      100,
    );
  };

  #keyHandler = (e: KeyboardEvent) => {
    if (e.code === 'KeyA') {
      playEffectSound('pick');
      this.#movePrevious();
    }
    if (e.code === 'KeyS') {
      playEffectSound('pick');
      this.#moveNext();
    }
  };

  #movePrevious = () => {
    if (this.selectedIndex === 0) this.selectedIndex = this.persons.length - 1;
    else this.selectedIndex -= 1;
  };

  #moveNext = () => {
    if (this.selectedIndex === this.persons.length - 1) this.selectedIndex = 0;
    else this.selectedIndex += 1;
  };

  removePerson = (id: number) => {
    this.persons = this.persons.filter((person) => person.id !== id);
    this.selectedIndex = 0;
  };
}
