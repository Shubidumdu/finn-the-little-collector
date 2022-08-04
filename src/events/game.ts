// @ts-nocheck
import { playerAttack, playerMove } from '../actions/player';
import { gameState } from '../scene/game';
import { mapState } from '../states/map';
import { playerState } from '../states/player';

let gameEventHandler: (e: KeyboardEvent | MouseEvent) => void;

const moveRight = () => {
  if (playerState.position.x === mapState.size - 1) return;
  playerMove({
    start: performance.now(),
    position: {
      x: playerState.position.x + 1,
      y: playerState.position.y,
    },
  });
};

const moveLeft = () => {
  if (playerState.position.x === 0) return;
  playerMove({
    start: performance.now(),
    position: {
      x: playerState.position.x - 1,
      y: playerState.position.y,
    },
  });
};

const moveUp = () => {
  if (playerState.position.y === 0) return;
  playerMove({
    start: performance.now(),
    position: {
      x: playerState.position.x,
      y: playerState.position.y - 1,
    },
  });
};

const moveDown = () => {
  if (playerState.position.y === mapState.size - 1) return;
  playerMove({
    start: performance.now(),
    position: {
      x: playerState.position.x,
      y: playerState.position.y + 1,
    },
  });
};

export const addGameEventListener = () => {
  gameEventHandler = (e: KeyboardEvent | MouseEvent) => {
    const target = e.target;
    if (gameState.playTime < 3000) return;
    if (
      e.key === 'ArrowRight' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      target.id === 'al' ||
      target.id === 'au' ||
      target.id === 'ar' ||
      target.id === 'ad'
    ) {
      if (
        playerState.move.position.x !== playerState.position.x ||
        playerState.move.position.y !== playerState.position.y
      )
        return;
      if (e.key === 'ArrowRight' || target.id === 'ar') {
        moveRight();
      }
      if (e.key === 'ArrowLeft' || target.id === 'al') {
        moveLeft();
      }
      if (e.key === 'ArrowUp' || target.id === 'au') {
        moveUp();
      }
      if (e.key === 'ArrowDown' || target.id === 'ad') {
        moveDown();
      }
    }
    if (e.key === 'd' || e.key === 'D' || target.id === 'd') {
      playerAttack(1);
    }
    if (e.key === 's' || e.key === 'S' || target.id === 's') {
      playerAttack(-1);
    }
  };

  window.addEventListener('keydown', gameEventHandler);
  document.addEventListener('touchstart', gameEventHandler);
};

export const removeGameEventListener = () => {
  window.removeEventListener('keydown', gameEventHandler);
  document.removeEventListener('touchstart', gameEventHandler);
};
