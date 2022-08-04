// @ts-nocheck
import { globalState } from '..';
import { startGameScene } from '../scene/game';
import {
  endTitleScene,
  startTitleMusic,
  stopTitleMusic,
  titleState,
} from '../scene/title';
import { soundCursor } from '../sounds/effects';

let titleEventHandler: (e: KeyboardEvent | MouseEvent) => void;

export const addTitleEventListener = () => {
  titleEventHandler = (e: KeyboardEvent | MouseEvent) => {
    const target = e.target;
    if (titleState.openGuide) {
      if (
        e.key === 's' ||
        e.key === 'S' ||
        e.key === 'd' ||
        e.key === 'D' ||
        target.id === 'd' ||
        target.id === 's'
      ) {
        soundCursor();
        titleState.openGuide = false;
      }
      return;
    }
    if (e.key === 'ArrowLeft' || target.id === 'al') {
      if (titleState.index === 0) return;
      else {
        titleState.index -= 1;
        soundCursor();
      }
    }
    if (e.key === 'ArrowRight' || target.id === 'ar') {
      if (titleState.index === 2) return;
      else {
        titleState.index += 1;
        soundCursor();
      }
    }
    if (
      e.key === 's' ||
      e.key === 'S' ||
      e.key === 'd' ||
      e.key === 'D' ||
      target.id === 'd' ||
      target.id === 's'
    ) {
      soundCursor();
      if (titleState.index === 0) {
        startGameScene();
        endTitleScene();
      }
      if (titleState.index === 1) {
        globalState.music = !globalState.music;
        if (globalState.music) {
          startTitleMusic();
        } else {
          stopTitleMusic();
        }
      }
      if (titleState.index === 2) {
        titleState.openGuide = true;
      }
    }
  };

  window.addEventListener('keydown', titleEventHandler);
  document.addEventListener('touchstart', titleEventHandler);
};

export const removeTitleEventListener = () => {
  window.removeEventListener('keydown', titleEventHandler);
  document.removeEventListener('touchstart', titleEventHandler);
};
