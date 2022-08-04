import { resetAllCanvas } from './canvas';
import './index.scss';
import { drawGame, startGameScene } from './scene/game';
import { drawGameOver, startGameOverScene } from './scene/gameover';
import { drawResult, startResultScene } from './scene/result';
import { drawTitle, startTitleScene } from './scene/title';

export const globalState = {
  sceneType: 0,
  music: false,
};

const loop = (time: number) => {
  resetAllCanvas();
  if (globalState.sceneType === 0) {
    drawTitle(time);
  }
  if (globalState.sceneType === 1) {
    drawGame(time);
  }
  if (globalState.sceneType === 2) {
    drawGameOver(time);
  }
  if (globalState.sceneType === 3) {
    drawResult(time);
  }
  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);

startTitleScene();
