import { GameObject } from '.';
import canvasMap, { drawLayer } from '../canvas';
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
      context.setTransform(1, 0, 0, 1, canvas.width - 300, canvas.height / 2 - 200); 
      this.#drawPoster(context);
    });
  };

  #drawPoster = (context: CanvasRenderingContext2D) => {
    context.fillRect(0, 0, 200, 400);
  };
}
