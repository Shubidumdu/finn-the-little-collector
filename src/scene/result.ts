import { globalState } from '..';
import { drawLayer1 } from '../canvas';
import {
  addResultEventListener,
  removeResultEventListener,
} from '../events/result';
import { getFont } from '../font';
import { resultMusicPlay } from '../sounds/music';
import { playerState } from '../states/player';
import { degreeToRadian } from '../utils';
import { gameState } from './game';

const SELECTED_TEXT_COLOR = '#E5FF3F';
const NORMAL_TEXT_COLOR = '#FFF';

export const resultState = {
  startTime: 0,
  index: 0,
};

export let resultMusic: AudioBufferSourceNode;

export const drawResult = (time: number) => {
  const wave = Math.sin(time / 60);
  const gameTime = Math.round(gameState.scoreTime);
  const second = gameTime / 1000;
  const minute = Math.floor(second / 60);
  drawLayer1((context, canvas) => {
    context.beginPath();
    let lingrad;
    if (gameState.stage === 1) {
      lingrad = context.createLinearGradient(0, 0, 0, innerHeight);
      lingrad.addColorStop(0.2, '#0D0D0D');
      lingrad.addColorStop(0.4, '#401410');
      lingrad.addColorStop(0.8, '#8C3420');
    }
    if (gameState.stage === 2) {
      lingrad = context.createLinearGradient(0, 0, 0, innerHeight);
      lingrad.addColorStop(0.3, '#252E3E');
      lingrad.addColorStop(0.6, '#44A748');
      lingrad.addColorStop(0.9, '#5FBF03');
    }
    if (gameState.stage === 3) {
      lingrad = context.createLinearGradient(0, 0, 0, innerHeight);
      lingrad.addColorStop(0.3, '#1B1A1F');
      lingrad.addColorStop(0.6, '#51191E');
      lingrad.addColorStop(0.9, '#CC1017');
    }
    if (gameState.stage === 4) {
      lingrad = context.createLinearGradient(0, 0, 0, innerHeight);
      lingrad.addColorStop(0.3, '#182026');
      lingrad.addColorStop(0.6, '#759CBF');
      lingrad.addColorStop(0.9, '#8BBBD9');
    }
    if (gameState.stage === 5) {
      lingrad = context.createLinearGradient(0, 0, 0, innerHeight);
      lingrad.addColorStop(0.3, '#0D0D0D');
      lingrad.addColorStop(0.6, '#979DA6');
      lingrad.addColorStop(0.9, '#D7D7D9');
    }
    context.fillStyle = lingrad;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.closePath();
  });
  drawLayer1((context, canvas) => {
    context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
    context.beginPath();
    context.globalAlpha = 0.8;
    context.filter = 'blur(8px)';
    if (gameState.stage === 1) context.fillStyle = '#D97652';
    if (gameState.stage === 2) context.fillStyle = '#96DF50';
    if (gameState.stage === 3) context.fillStyle = '#FB3D31';
    if (gameState.stage === 4) context.fillStyle = '#B6DBF2';
    if (gameState.stage === 5) context.fillStyle = '#F2F2F2';
    context.arc(0, 0, 320, 0, degreeToRadian(360));
    context.fill();
    context.closePath();
  });
  drawLayer1((context, canvas) => {
    // BODY
    context.setTransform(1, 0, 0, 1, canvas.width / 2 - 160, canvas.height / 2);
    context.ellipse(0, 1 * wave + 80, 60 - 2 * wave, 20, 0, 0, 2 * Math.PI);
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.globalAlpha = 0.3;
    context.fillStyle = '#000';
    context.fill();
  });
  drawLayer1((context, canvas) => {
    // BODY
    context.setTransform(1, 0, 0, 1, canvas.width / 2 - 160, canvas.height / 2);
    context.ellipse(0, 10 * wave, 30, 60, 0, 0, 2 * Math.PI);
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.fillStyle = '#6A3D3D';
    context.fill();
  });
  drawLayer1((context, canvas) => {
    // MOUTH
    context.setTransform(
      1,
      0,
      0,
      1,
      canvas.width / 2 - 150,
      canvas.height / 2 + 10 * wave,
    );
    context.arc(0, wave, 8, 0, degreeToRadian(180));
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.fillStyle = '#000';
    context.fill();
  });
  drawLayer1((context, canvas) => {
    // EYES
    context.setTransform(
      1,
      0,
      0,
      1,
      canvas.width / 2 - 160,
      canvas.height / 2 + 10 * wave,
    );
    context.arc(0, -20 + wave, 4, 0, degreeToRadian(360));
    context.arc(20, -20 + wave, 4, 0, degreeToRadian(360));
    context.fillStyle = '#000';
    context.fill();
  });
  drawLayer1((context, canvas) => {
    // ARMS
    context.setTransform(
      1,
      0,
      0,
      1,
      canvas.width / 2 - 160,
      canvas.height / 2 + 10 * wave,
    );
    context.moveTo(-15, -10 + wave);
    context.quadraticCurveTo(20, 20 + 10 * wave, 35, 10 + 30 * wave);
    context.moveTo(30, -10 + wave);
    context.quadraticCurveTo(50, 20 - 10 * wave, 65, 10 - 30 * wave);
    context.stroke();
  });
  drawLayer1((context, canvas) => {
    // LEGS
    context.setTransform(
      1,
      0,
      0,
      1,
      canvas.width / 2 - 160,
      canvas.height / 2 + 20,
    );
    context.moveTo(-10, 20 + 10 * wave);
    context.quadraticCurveTo(10 + 10 * wave, 40 - 10 * wave, -10, 68);
    context.moveTo(14, 20 + 10 * wave);
    context.quadraticCurveTo(48 + 10 * wave, 40 - 10 * wave, 20, 60);
    context.stroke();
  });
  drawLayer1((context, canvas) => {
    // FEELERS
    context.setTransform(
      1,
      0,
      0,
      1,
      canvas.width / 2 - 154,
      canvas.height / 2 - 20,
    );
    context.moveTo(-10, -28 + 10 * wave);
    context.quadraticCurveTo(
      10 + 5 * wave,
      -80 + 5 * wave,
      -24 + 10 * wave,
      -60 - 10 * wave,
    );
    context.moveTo(10, -28 + 10 * wave);
    context.quadraticCurveTo(
      40 + 5 * wave,
      -80 + 5 * wave,
      1 + 10 * wave,
      -60 - 10 * wave,
    );
    context.stroke();
  });
  drawLayer1((context, canvas) => {
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.font = getFont();
    context.fillStyle = '#fff';
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 3;
    context.shadowColor = '#000';
    context.fillText(
      `Stage ${gameState.stage} Clear`,
      canvas.width / 2,
      canvas.height / 2 - 160,
    );
    context.font = getFont(18);
    context.fillText(
      `Time : ${minute.toString().padStart(2, '0')}:${second
        .toFixed(2)
        .padStart(5, '0')}`,
      canvas.width / 2 + 100,
      canvas.height / 2 - 20,
    );
    context.fillText(
      `Life : ${playerState.life.toString().padStart(2, '0')}%`,
      canvas.width / 2 + 100,
      canvas.height / 2 + 40,
    );
    if (gameState.stage === 5) {
      context.fillText(
        `Thank you for playing!`,
        canvas.width / 2,
        canvas.height / 2 - 220,
      );
    }
    if (resultState.index === 0) context.fillStyle = SELECTED_TEXT_COLOR;
    else context.fillStyle = NORMAL_TEXT_COLOR;
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    if (gameState.stage === 5)
      context.fillText('TITLE', canvas.width / 2 - 80, canvas.height / 2 + 160);
    else
      context.fillText('NEXT', canvas.width / 2 - 80, canvas.height / 2 + 160);
    context.closePath();
    context.beginPath();
    if (resultState.index === 1) context.fillStyle = SELECTED_TEXT_COLOR;
    else context.fillStyle = NORMAL_TEXT_COLOR;
    context.fillText('RETRY', canvas.width / 2 + 80, canvas.height / 2 + 160);
    context.closePath();
    context.beginPath();
  });
};

export const startResultScene = () => {
  globalState.sceneType = 3;
  if (globalState.music) {
    resultMusic = resultMusicPlay();
    resultMusic.loop = true;
  }
  addResultEventListener();
};

export const endResultScene = () => {
  if (globalState.music) {
    resultMusic.stop();
  }
  removeResultEventListener();
};
