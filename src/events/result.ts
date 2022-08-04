// @ts-nocheck
import { globalState } from '..';
import { gameState, startGameScene } from '../scene/game';
import { endResultScene, resultState } from '../scene/result';
import { startTitleScene } from '../scene/title';
import { soundCursor } from '../sounds/effects';

let resultEventHandler: (e: KeyboardEvent | MouseEvent) => void;

export const addResultEventListener = () => {
  resultEventHandler = (e: KeyboardEvent | MouseEvent) => {
    const target = e.target;
    if (e.key === 'ArrowLeft' || target.id === 'al') {
      if (resultState.index === 0) return;
      else {
        resultState.index -= 1;
        soundCursor();
      }
    }
    if (e.key === 'ArrowRight' || target.id === 'ar') {
      if (resultState.index === 1) return;
      else {
        resultState.index += 1;
        soundCursor();
      }
    }
    if (
      e.key === 's' ||
      e.key === 'S' ||
      e.key === 'd' ||
      e.key === 'D' ||
      target.id === 's' ||
      target.id === 'd'
    ) {
      soundCursor();
      if (gameState.stage < 5) {
        if (resultState.index === 0) {
          startGameScene();
          endResultScene();
        }
      } else {
        if (resultState.index === 0) {
          gameState.stage = 0;
          startTitleScene();
          endResultScene();
        }
      }
      if (resultState.index === 1) {
        gameState.stage -= 1;
        startGameScene();
        endResultScene();
      }
    }
  };

  setTimeout(() => {
    window.addEventListener('keydown', resultEventHandler);
    document.addEventListener('touchstart', resultEventHandler);
  }, 600);
};

export const removeResultEventListener = () => {
  window.removeEventListener('keydown', resultEventHandler);
  document.removeEventListener('touchstart', resultEventHandler);
};
