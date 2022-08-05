import GameScene from './game';

export interface Scene {
  start: () => void;
  update: (time: number) => void;
  end: () => void;
}

export {
  GameScene,
};