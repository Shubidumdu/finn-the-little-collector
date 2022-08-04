import { soundLightSaber, soundPlayerHitted } from '../sounds/effects';
import { enemyState } from '../states/enemy';
import { playerState } from '../states/player';
import { getTimings } from '../utils';
import { enemyGetDamage } from './enemy';

interface PlayerMoveProps {
  start: number;
  position: {
    x: number;
    y: number;
  };
}

export const playerMove = ({ start, position }: PlayerMoveProps) => {
  playerState.move = {
    ...playerState.move,
    start,
    position,
  };
};

export const playerAttack = (direction: 1 | -1) => {
  const time = performance.now();
  const [isAttacking] = getTimings({
    time,
    start: playerState.attack.start,
    duration:
      playerState.attack.duration +
      playerState.attack.predelay +
      playerState.attack.delay,
  });
  if (isAttacking) return;
  playerState.attack.start = time;
  playerState.direction = direction;
  soundLightSaber();
};

export const playerGetDamage = (damage: number) => {
  const [isTakingDamage] = getTimings({
    time: performance.now(),
    start: playerState.damage.start,
    duration: playerState.damage.duration,
  });
  if (isTakingDamage) return;
  playerState.damage = {
    ...playerState.damage,
    start: performance.now(),
  };
  playerState.life =
    playerState.life - damage < 0 ? 0 : playerState.life - damage;
  soundPlayerHitted();
};

export const updatePlayerAttack = (time: number) => {
  const [isAttacking, attackProgress] = getTimings({
    time: time,
    start: playerState.attack.start + playerState.attack.predelay,
    duration: playerState.attack.duration,
  });
  if (!isAttacking) return;
  const [isEnemyGetDamaged] = getTimings({
    time,
    start: enemyState.damage.start,
    duration: enemyState.damage.duration,
  });
  if (
    !isEnemyGetDamaged &&
    ((playerState.direction === -1 &&
      enemyState.position.x === playerState.position.x - 1 &&
      enemyState.position.y === playerState.position.y) ||
      (playerState.direction === 1 &&
        enemyState.position.x === playerState.position.x + 1 &&
        enemyState.position.y === playerState.position.y))
  )
    enemyGetDamage(playerState.attack.power);
};
