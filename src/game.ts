import { resetAllLayers } from './canvas';
import { GameScene, Scene, SceneType } from './scenes';
import TitleScene from './scenes/title';

export type ObservableEventType = {
  type: 'change-scene';
  payload: SceneType;
};

export default class Game {
  activeScene: SceneType;
  scenes: { [name in SceneType]: Scene };

  constructor() {
    this.activeScene = 'game';
    this.scenes = {
      game: new GameScene(),
      title: new TitleScene(),
    };
  }

  start = () => {
    this.scenes[this.activeScene].start();
    requestAnimationFrame(this.#update);
    this.#observeEvents();
  };

  #changeScene = (type: SceneType) => {
    this.scenes[this.activeScene].end();
    this.activeScene = type;
    this.scenes[this.activeScene].start();
  };

  #update = (time: number) => {
    resetAllLayers();
    this.scenes[this.activeScene].update(time);
    requestAnimationFrame(this.#update);
  };

  #observeEvents = () => {
    window.addEventListener(
      'message',
      (event: MessageEvent<ObservableEventType>) => {
        if (!event.data) return;
        const { type, payload } = event.data;
        switch (type) {
          case 'change-scene': {
            this.#changeScene(payload);
          }
        }
      },
    );
  };
}
