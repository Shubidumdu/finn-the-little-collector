import { resetAllLayers } from './canvas';
import { ChangeSceneEvent, EventType, listenEvent } from './event';
import { PlayScene, TitleScene, Scene, SceneType } from './scenes';
import GameOverScene from './scenes/gameover';
import { PlaySceneState } from './scenes/play';

export type ChangeSceneToPlay = (type: 'play', state: PlaySceneState) => void;

export type ChangeScene = ChangeSceneToPlay;

export default class Game {
  activeScene: SceneType;
  scenes: { [name in SceneType]: Scene };

  constructor() {
    this.activeScene = 'gameover';
    this.scenes = {
      play: new PlayScene(),
      title: new TitleScene(),
      gameover: new GameOverScene(),
    };
  }

  start = () => {
    this.scenes[this.activeScene].start();
    requestAnimationFrame(this.#update);
    this.#listenEvents();
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

  #listenEvents = () => {
    listenEvent(({ type, payload }) => {
      if (type === 'change-scene') {
        this.#changeScene(payload.type, payload.state);
      }
    });
  }
}
