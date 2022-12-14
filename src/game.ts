import { resetAllLayers } from './canvas';
import { ChangeSceneEvent, listenGlobalEvent } from './event';
import { PlayScene, TitleScene, Scene, SceneType } from './scenes';
import GameResultScene from './scenes/gameResult';
import GameOverScene from './scenes/gameOver';

export default class Game {
  activeScene: SceneType;
  scenes: { [name in SceneType]: Scene };

  constructor() {
    this.activeScene = 'title';
    this.scenes = {
      play: new PlayScene(),
      title: new TitleScene(),
      gameOver: new GameOverScene(),
      gameResult: new GameResultScene(),
    };
  }

  start = () => {
    this.scenes[this.activeScene].start();
    requestAnimationFrame(this.#update);
    this.#listenGlobalEvents();
  };

  #changeScene = (
    type: ChangeSceneEvent['payload']['type'],
    state: ChangeSceneEvent['payload']['state'],
  ) => {
    this.scenes[this.activeScene].end();
    this.activeScene = type;
    this.scenes[this.activeScene].start(state);
  };

  #update = (time: number) => {
    resetAllLayers();
    this.scenes[this.activeScene].update(time);
    requestAnimationFrame(this.#update);
  };

  #listenGlobalEvents = () => {
    listenGlobalEvent(({ type, payload }) => {
      if (type === 'change-scene') {
        this.#changeScene(payload.type, payload.state);
      }
    });
  };
}
