import GameScene from './game';

export type SceneType = 'game' | 'title';

export interface Scene {
  start: () => void;
  update: (time: number) => void;
  end: () => void;
}

export { GameScene };
