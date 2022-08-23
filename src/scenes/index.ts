import PlayScene from './play';
import TitleScene from './title';

export type SceneType = 'play' | 'title';

export interface Scene {
  start: () => void;
  update: (time: number) => void;
  end: () => void;
}

export {
  PlayScene,
  TitleScene,
};
