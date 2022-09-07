import { resetAllLayers } from './canvas';
import { EventType } from './event';
import { PlayScene, TitleScene, Scene, SceneType } from './scenes';
import { PlaySceneState } from './scenes/play';


export type ChangeSceneToPlay = (type: 'play', state: PlaySceneState) => void;

export type ChangeScene = ChangeSceneToPlay;

export default class Game {
  activeScene: SceneType;
  scenes: { [name in SceneType]: Scene };

  constructor() {
    this.activeScene = 'title';
    this.scenes = {
      play: new PlayScene(),
      title: new TitleScene(),
    };
  }

  start = () => {
    this.scenes['title'].start();
    requestAnimationFrame(this.#update);
    this.#observeEvents();
  };

  #changeScene: ChangeScene = (type, state) => {
    this.scenes[this.activeScene].end();
    this.activeScene = type;
    this.scenes[this.activeScene].start(state);
  };

  #update = (time: number) => {
    resetAllLayers();
    this.scenes[this.activeScene].update(time);
    requestAnimationFrame(this.#update);
  };

  #observeEvents = () => {
    window.addEventListener(
      'message',
      (event: MessageEvent<EventType>) => {
        if (!event.data) return;
        const { type, payload } = event.data;

        switch (type) {
          case 'change-scene':
            this.#changeScene(payload.type, payload.state);
            break;
        }
      },
    );
  };
}
