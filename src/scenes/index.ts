import PlayScene from './play';
import TitleScene from './title';

export type SceneType = 'play' | 'title' | 'gameover';

export interface Scene {
  start: (...args: any) => void;
  update: (time: number) => void;
  end: () => void;
}

export {
  PlayScene,
  TitleScene,
};
