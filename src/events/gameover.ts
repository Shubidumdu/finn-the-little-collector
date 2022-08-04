// @ts-nocheck
import { gameState, startGameScene } from '../scene/game';
import { endGameOverScene, gameOverState } from '../scene/gameover';
import { startTitleScene } from '../scene/title';
import { soundCursor } from '../sounds/effects';

let gameOverEventHandler: (e: KeyboardEvent | MouseEvent) => void;

export const addGameOverEventListener = () => {
  gameOverEventHandler = (e: KeyboardEvent | MouseEvent) => {
    const target = e.target;
    if (e.key === 'ArrowLeft' || target.id === 'al') {
      if (gameOverState.index === 0) return;
      else {
        gameOverState.index -= 1;
        soundCursor();
      }
    }
    if (e.key === 'ArrowRight' || target.id === 'ar') {
      if (gameOverState.index === 1) return;
      else {
        gameOverState.index += 1;
        soundCursor();
      }
    }
    if (
      e.key === 'S' ||
      e.key === 's' ||
      e.key === 'd' ||
      e.key === 'D' ||
      target.id === 's' ||
      target.id === 'd'
    ) {
      if (gameOverState.index === 0) {
        startGameScene();
        endGameOverScene();
      }
      if (gameOverState.index === 1) {
        startTitleScene();
        endGameOverScene();
        gameState.stage = 0;
      }
    }
  };

  setTimeout(() => {
    window.addEventListener('keydown', gameOverEventHandler);
    document.addEventListener('touchstart', gameOverEventHandler);
  }, 600);
};

export const removeGameOverEventListener = () => {
  window.removeEventListener('keydown', gameOverEventHandler);
  document.removeEventListener('touchstart', gameOverEventHandler);
};
