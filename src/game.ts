import { resetAllLayers } from "./canvas";
import { GameScene, Scene } from "./scenes";

export default class Game {
  activeScene = 'game';
  scenes: { [name: string]: Scene };

  constructor() {
    this.scenes = {
      game: new GameScene(),
    };
  }

  start = () => {
    this.scenes[this.activeScene].start();
    requestAnimationFrame(this.#update);
  };

  #update = (time: number) => {
    resetAllLayers();
    this.scenes[this.activeScene].update(time);
    requestAnimationFrame(this.#update);
  }
}
