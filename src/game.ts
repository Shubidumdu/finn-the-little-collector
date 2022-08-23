import { createCanvas, resetAllLayers } from './canvas';
import { PlayScene, TitleScene, Scene, SceneType } from './scenes';

type ChangeScene = {
  type: 'change-scene',
  payload: SceneType,
};

type ClickEvent = {
  type: 'click-canvas',
  payload: {
    id: string,
    x: number,
    y: number,
  },
};

export type ObservableEventType = ChangeScene | ClickEvent;

export default class Game {
  activeScene: SceneType;
  scenes: { [name in SceneType]: Scene };

  constructor() {
    this.activeScene = 'title';
    this.scenes = {
      play: new PlayScene(),
      title: new TitleScene(),
    };

    createCanvas('layer1');
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

  #click = (payload: ClickEvent['payload']) => {
    console.log('canvas click');
    console.log(payload);
  };

  #update = (time: number) => {
    console.log(time);
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
          case 'change-scene': this.#changeScene(payload);
          break;
          case 'click-canvas': this.#click(payload);
          break;
        }
      },
    );
  };
}
