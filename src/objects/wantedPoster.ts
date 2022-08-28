import { GameObject } from '.';
import canvasMap, { drawLayer } from '../canvas';
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
  };

  update = (time: number) => {
    this.draw(time);
  };

  remove = () => {};

  draw = (time: number) => {
    const paperLayer = canvasMap.get('layer3');
    const drawPaperLayer = drawLayer(paperLayer);
    drawPaperLayer((context, canvas) => {
      context.setTransform(1, 0, 0, 1, canvas.width - 120, canvas.height - 170);
      this.#drawPoster(context);
      const person = this.persons[this.selectedIndex];
      if (person.isMoving) {
        this.persons[this.selectedIndex].drawMovement(
          context,
          canvas,
          time,
          { x: canvas.width - 70, y: canvas.height - 85 },
          1,
        );
      } else {
        this.persons[this.selectedIndex].drawIdle(
          context,
          canvas,
          time,
          { x: canvas.width - 70, y: canvas.height - 85 },
          1,
        );
      }
      context.setTransform(1, 0, 0, 1, canvas.width - 26, canvas.height - 110);
      this.#drawRightArrow(context);
      context.setTransform(1, 0, 0, 1, canvas.width - 113, canvas.height - 110);
      this.#drawLeftArrow(context);
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
    context.fillStyle = 'rgb(0, 0, 0)';
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
}
