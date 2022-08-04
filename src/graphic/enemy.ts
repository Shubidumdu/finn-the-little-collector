import {
  drawLayer1,
  drawLayer2,
  drawLayer3,
  drawLayer4,
  layer1Canvas,
} from '../canvas';
import { enemyState, EnemyState } from '../states/enemy';
import { MapState } from '../states/map';
import { playerState, PlayerState } from '../states/player';
import { degreeToRadian, getPosition, getTimings } from '../utils';

interface DrawEnemyProps {
  map: MapState;
  enemy: EnemyState;
  time: number;
  player: PlayerState;
}

export const drawEnemy1 = ({ map, enemy, time }: DrawEnemyProps) => {
  const [isMoving, movingProgress] = getTimings({
    time,
    start: enemy.move.start + enemy.move.predelay,
    duration: enemy.move.speed,
  });
  const positionX = isMoving
    ? layer1Canvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        (enemy.position.x +
          (enemy.move.position.x - enemy.position.x) * movingProgress) *
          map.tileWidth -
        ((enemy.position.y +
          (enemy.move.position.y - enemy.position.y) * movingProgress) *
          map.tileWidth) /
          6)
    : layer1Canvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        enemy.position.x * map.tileWidth -
        (enemy.position.y * map.tileWidth) / 6);
  const positionY = isMoving
    ? layer1Canvas.height / 2 +
      (enemy.position.y +
        (enemy.move.position.y - enemy.position.y) * movingProgress -
        1 / 2) *
        map.tileHeight +
      2 * Math.sin(time / 240) -
      40
    : layer1Canvas.height / 2 +
      (enemy.position.y - 1 / 2) * map.tileHeight +
      2 * Math.sin(time / 240) -
      40;
  const [isTakingDamage] = getTimings({
    time,
    start: enemy.damage.start,
    duration: enemy.damage.duration,
  });
  if (isTakingDamage && Math.ceil(time) % 8 === 0) return;
  const draw = (
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
  ) => {
    // SHADOW
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    if (enemyState.position.x < playerState.position.x) context.scale(-1, 1);
    context.beginPath();
    context.ellipse(
      0,
      40 - 2 * Math.sin(time / 240),
      44 - 1 * Math.sin(time / 240),
      12 - 1 * Math.sin(time / 240),
      0,
      0,
      degreeToRadian(360),
    );
    context.fillStyle = '#000';
    context.globalAlpha = 0.2;
    context.fill();
    context.beginPath();
    context.globalAlpha = 1;
    context.ellipse(0, 12, 45, 28, 0, 0, degreeToRadian(360));
    if (isMoving) context.globalAlpha = 0.4;
    context.arc(0, 0, 40, 0, degreeToRadian(360));
    if (isTakingDamage) context.fillStyle = '#fa9';
    else context.fillStyle = '#fed1ff';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(-20, -10, 6, 0, degreeToRadian(360));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(10, -10, 7, 0, degreeToRadian(360));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
    context.beginPath();
    context.fillStyle = '#fff';
    context.fillRect(-10, 16, 10, 10);
    context.closePath();
    context.beginPath();
    context.lineWidth = 2;
    context.moveTo(-30, 14);
    context.quadraticCurveTo(-10, 20, 20, 14);
    context.stroke();
    context.closePath();
  };
  if (enemyState.position.y <= playerState.position.y)
    drawLayer2((context, canvas) => draw(context, canvas));
  else drawLayer3((context, canvas) => draw(context, canvas));
};

export const drawEnemy2 = ({ map, enemy, time }: DrawEnemyProps) => {
  const [isMoving, movingProgress] = getTimings({
    time,
    start: enemy.move.start + enemy.move.predelay,
    duration: enemy.move.speed,
  });
  const [isAttackCharging, attackChargingProgress] = getTimings({
    time,
    start: enemy.attack.start,
    duration: enemy.attack.predelay,
  });
  const [isAttacking, attackProgress] = getTimings({
    time,
    start: enemy.attack.start + enemy.attack.predelay,
    duration: enemy.attack.duration + enemy.attack.delay,
  });
  const positionX = isMoving
    ? layer1Canvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        (enemy.position.x +
          (enemy.move.position.x - enemy.position.x) * movingProgress) *
          map.tileWidth -
        ((enemy.position.y +
          (enemy.move.position.y - enemy.position.y) * movingProgress) *
          map.tileWidth) /
          6)
    : layer1Canvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        enemy.position.x * map.tileWidth -
        (enemy.position.y * map.tileWidth) / 6);
  const positionY =
    (isMoving
      ? layer1Canvas.height / 2 +
        (enemy.position.y +
          (enemy.move.position.y - enemy.position.y) * movingProgress -
          1 / 2) *
          map.tileHeight +
        2 * Math.sin(time / 240)
      : layer1Canvas.height / 2 +
        (enemy.position.y - 1 / 2) * map.tileHeight +
        2 * Math.sin(time / 240)) - 40;
  const [isTakingDamage] = getTimings({
    time,
    start: enemy.damage.start,
    duration: enemy.damage.duration,
  });
  const drawBody = (context: CanvasRenderingContext2D) => {
    // SHADOW
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    context.beginPath();
    if (enemyState.position.x < playerState.position.x) context.scale(-1, 1);
    context.ellipse(
      0,
      40 - 2 * Math.sin(time / 240),
      40 - 1 * Math.sin(time / 240),
      10 - 1 * Math.sin(time / 240),
      0,
      0,
      degreeToRadian(360),
    );
    context.globalAlpha = 0.2;
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
    if (isTakingDamage && Math.ceil(time) % 8 === 0) return;
    context.beginPath();
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    if (enemyState.position.x < playerState.position.x) context.scale(-1, 1);
    if (isMoving) context.globalAlpha = 0.4;
    else context.globalAlpha = 1;
    if (isTakingDamage) context.fillStyle = '#f66';
    else context.fillStyle = '#5cab73';
    context.arc(0, 0, 40, 0, degreeToRadian(360));
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(-20, 0, 10, 0, degreeToRadian(360));
    context.fillStyle = '#fff';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(5, 0, 10, 0, degreeToRadian(360));
    context.fillStyle = '#fff';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(-8, 15, 10, degreeToRadian(20), degreeToRadian(140));
    context.fillStyle = '#fff';
    context.fill();
    context.closePath();
  };
  const drawBehindLazerChargeAndBeam = (context: CanvasRenderingContext2D) => {
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    context.beginPath();
    if (isAttackCharging) {
      context.arc(
        -80,
        0,
        20 * Math.sin((attackChargingProgress * Math.PI) / 2),
        0,
        degreeToRadian(360),
      );
      context.fillStyle = '#fffa6b';
      context.fill();
      context.arc(
        80,
        0,
        20 * Math.sin((attackChargingProgress * Math.PI) / 2),
        0,
        degreeToRadian(360),
      );
      context.fillStyle = '#fffa6b';
      context.fill();
      context.closePath();
      context.setTransform(-1, 0, 0, -1, positionX, positionY);
      context.beginPath();
      context.fillStyle = '#fffa6b';
      context.rotate(degreeToRadian(115));
      context.arc(
        60,
        0,
        20 * Math.sin((attackChargingProgress * Math.PI) / 2),
        0,
        degreeToRadian(360),
      );
      context.fill();
      context.closePath();
    }
    if (isAttacking) {
      context.setTransform(1, 0, 0, 1, positionX, positionY);
      context.arc(
        -80,
        0,
        20 * Math.cos((attackProgress * Math.PI) / 2),
        0,
        degreeToRadian(360),
      );
      context.fillStyle = '#fffa6b';
      context.fill();
      context.arc(
        80,
        0,
        20 * Math.cos((attackProgress * Math.PI) / 2),
        0,
        degreeToRadian(360),
      );
      context.fillStyle = '#fffa6b';
      context.fill();
      context.closePath();
      context.setTransform(-1, 0, 0, -1, positionX, positionY);
      context.beginPath();
      context.fillStyle = '#fffa6b';
      context.rotate(degreeToRadian(115));
      context.arc(
        60,
        0,
        20 * Math.cos((attackProgress * Math.PI) / 2),
        0,
        degreeToRadian(360),
      );
      context.fill();
      context.closePath();

      context.setTransform(-1, 0, 0, 1, positionX, positionY);
      context.beginPath();
      context.fillStyle = '#fffa6b';
      context.fillRect(
        80,
        -(20 * Math.sin(Math.PI * attackProgress)) / 2,
        10000,
        20 * Math.sin(Math.PI * attackProgress),
      );
      context.closePath();

      context.setTransform(1, 0, 0, 1, positionX, positionY);
      context.beginPath();
      context.fillStyle = '#fffa6b';
      context.fillRect(
        80,
        -(20 * Math.sin(Math.PI * attackProgress)) / 2,
        10000,
        20 * Math.sin(Math.PI * attackProgress),
      );
      context.closePath();

      context.setTransform(-1, 0, 0, -1, positionX, positionY);
      context.beginPath();
      context.fillStyle = '#fffa6b';
      context.rotate(degreeToRadian(115));
      context.fillRect(
        60,
        -(20 * Math.sin(Math.PI * attackProgress)) / 2,
        10000,
        20 * Math.sin(Math.PI * attackProgress),
      );
      context.closePath();
    }
  };
  const drawFrontLazerChargeAndBeam = (context: CanvasRenderingContext2D) => {
    if (isAttackCharging) {
      context.setTransform(1, 0, 0, 1, positionX, positionY);
      context.beginPath();
      context.fillStyle = '#fffa6b';
      context.rotate(degreeToRadian(115));
      context.arc(
        40,
        0,
        20 * Math.sin((attackChargingProgress * Math.PI) / 2),
        0,
        degreeToRadian(360),
      );
      context.fill();
      context.closePath();
    }
    if (isAttacking) {
      drawLayer4((context, canvas) => {
        context.setTransform(1, 0, 0, 1, positionX, positionY);
        context.beginPath();
        context.fillStyle = '#fffa6b';
        context.rotate(degreeToRadian(115));
        context.arc(
          40,
          0,
          20 * Math.cos((attackProgress * Math.PI) / 2),
          0,
          degreeToRadian(360),
        );
        context.fill();
        context.closePath();
        context.setTransform(1, 0, 0, 1, positionX, positionY);
        context.beginPath();
        context.fillStyle = '#fffa6b';
        context.rotate(degreeToRadian(115));
        context.fillRect(
          40,
          -(20 * Math.sin(Math.PI * attackProgress)) / 2,
          10000,
          20 * Math.sin(Math.PI * attackProgress),
        );
        context.closePath();
      });
    }
  };
  if (enemyState.position.y < playerState.position.y)
    drawLayer2((context) => drawBehindLazerChargeAndBeam(context));
  else drawLayer3((context) => drawBehindLazerChargeAndBeam(context));
  if (enemyState.position.y < playerState.position.y)
    drawLayer2((context) => drawBody(context));
  else drawLayer3((context) => drawBody(context));
  if (enemyState.position.y < playerState.position.y)
    drawLayer2((context) => drawFrontLazerChargeAndBeam(context));
  else drawLayer3((context) => drawFrontLazerChargeAndBeam(context));
};

export const drawEnemy3 = ({ map, enemy, time }: DrawEnemyProps) => {
  const [isMoving, movingProgress] = getTimings({
    time,
    start: enemy.move.start + enemy.move.predelay,
    duration: enemy.move.speed,
  });
  const [isAttacking, attackProgress] = getTimings({
    time,
    start: enemy.attack.start + enemy.attack.predelay,
    duration: enemy.attack.duration + enemy.attack.delay,
  });
  const positionX = isMoving
    ? layer1Canvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        (enemy.position.x +
          (enemy.move.position.x - enemy.position.x) * movingProgress) *
          map.tileWidth -
        ((enemy.position.y +
          (enemy.move.position.y - enemy.position.y) * movingProgress) *
          map.tileWidth) /
          6)
    : layer1Canvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        enemy.position.x * map.tileWidth -
        (enemy.position.y * map.tileWidth) / 6);
  const positionY =
    (isMoving
      ? layer1Canvas.height / 2 +
        (enemy.position.y +
          (enemy.move.position.y - enemy.position.y) * movingProgress -
          1 / 2) *
          map.tileHeight +
        2 * Math.sin(time / 240)
      : layer1Canvas.height / 2 +
        (enemy.position.y - 1 / 2) * map.tileHeight +
        2 * Math.sin(time / 240)) - 40;
  const [isTakingDamage] = getTimings({
    time,
    start: enemy.damage.start,
    duration: enemy.damage.duration,
  });
  const drawBody = (
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
  ) => {
    // SHADOW
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    if (enemyState.position.x < playerState.position.x) context.scale(-1, 1);
    context.beginPath();
    context.ellipse(
      0,
      40 - 2 * Math.sin(time / 240),
      40 - 1 * Math.sin(time / 240),
      10 - 1 * Math.sin(time / 240),
      0,
      0,
      degreeToRadian(360),
    );
    context.fillStyle = '#000';
    context.globalAlpha = 0.2;
    context.fill();
    context.closePath();
    // BODY
    if (isTakingDamage && Math.ceil(time) % 8 === 0) return;
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    if (enemyState.position.x < playerState.position.x) context.scale(-1, 1);
    context.globalAlpha = 1;
    context.beginPath();
    if (isMoving) context.globalAlpha = 0.4;
    context.arc(0, 0, 40, 0, degreeToRadian(360));
    if (isTakingDamage) context.fillStyle = '#ffb5b5';
    else context.fillStyle = '#f33';
    context.arc(0, 0, 40, 0, degreeToRadian(360));
    context.moveTo(-25, -20);
    context.lineTo(-20, -50);
    context.lineTo(-5, -20);
    context.moveTo(5, -20);
    context.lineTo(20, -50);
    context.lineTo(25, -20);
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(-12, -10, 14, degreeToRadian(90), degreeToRadian(180));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(0, -10, 14, degreeToRadian(-10), degreeToRadian(110));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(-5, 22, 12, degreeToRadian(170), degreeToRadian(-10));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
  };
  const drawAttack = (
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
  ) => {
    if (isAttacking) {
      const { x: attackPositionX, y: attackPositionY } = getPosition(
        enemyState.attack.position[0].x,
        enemyState.attack.position[0].y,
      );
      context.beginPath();
      context.fillStyle = '#f00';
      context.filter = 'blur(8px)';
      context.setTransform(1, 0, 0, 1, attackPositionX, attackPositionY);
      context.fillRect(
        -52,
        -100 * Math.sin(attackProgress * Math.PI),
        100,
        100 * Math.sin(attackProgress * Math.PI),
      );
      context.closePath();
      context.beginPath();
      context.fillStyle = '#ff0';
      context.filter = 'blur(8px)';
      context.setTransform(1, 0, 0, 1, attackPositionX, attackPositionY);
      context.fillRect(
        -26,
        -100 * Math.sin(attackProgress * Math.PI),
        50,
        100 * Math.sin(attackProgress * Math.PI),
      );
      context.closePath();
    }
  };
  if (
    enemyState.attack.position[0]?.y < playerState.position.y &&
    enemyState.attack.position[0]?.y < enemyState.position.y
  ) {
    drawLayer1((context, canvas) => drawAttack(context, canvas));
    if (enemyState.position.y < playerState.position.y)
      drawLayer2((context, canvas) => drawBody(context, canvas));
    else drawLayer3((context, canvas) => drawBody(context, canvas));
  } else if (
    enemyState.attack.position[0]?.y < enemyState.position.y &&
    enemyState.attack.position[0]?.y >= playerState.position.y
  ) {
    drawLayer2((context, canvas) => drawAttack(context, canvas));
    if (enemyState.position.y < playerState.position.y)
      drawLayer2((context, canvas) => drawBody(context, canvas));
    else drawLayer3((context, canvas) => drawBody(context, canvas));
  } else if (
    enemyState.attack.position[0]?.y >= enemyState.position.y &&
    enemyState.attack.position[0]?.y < playerState.position.y
  ) {
    if (enemyState.position.y < playerState.position.y)
      drawLayer2((context, canvas) => drawBody(context, canvas));
    else drawLayer3((context, canvas) => drawBody(context, canvas));
    drawLayer2((context, canvas) => drawAttack(context, canvas));
  } else {
    if (enemyState.position.y < playerState.position.y)
      drawLayer2((context, canvas) => drawBody(context, canvas));
    else drawLayer3((context, canvas) => drawBody(context, canvas));
    drawLayer3((context, canvas) => drawAttack(context, canvas));
  }
};

export const drawEnemy4 = ({ map, enemy, time }: DrawEnemyProps) => {
  const [isMoving, movingProgress] = getTimings({
    time,
    start: enemy.move.start + enemy.move.predelay,
    duration: enemy.move.speed,
  });
  const [isAttacking, attackProgress] = getTimings({
    time,
    start: enemy.attack.start + enemy.attack.predelay,
    duration: enemy.attack.duration,
  });
  const [isAttackCharging, attackChargingProgress] = getTimings({
    time,
    start: enemy.attack.start,
    duration: enemy.attack.predelay,
  });
  const positionX = isMoving
    ? layer1Canvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        (enemy.position.x +
          (enemy.move.position.x - enemy.position.x) * movingProgress) *
          map.tileWidth -
        ((enemy.position.y +
          (enemy.move.position.y - enemy.position.y) * movingProgress) *
          map.tileWidth) /
          6)
    : layer1Canvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        enemy.position.x * map.tileWidth -
        (enemy.position.y * map.tileWidth) / 6);
  const positionY =
    (isMoving
      ? layer1Canvas.height / 2 +
        (enemy.position.y +
          (enemy.move.position.y - enemy.position.y) * movingProgress -
          1 / 2) *
          map.tileHeight +
        2 * Math.sin(time / 240)
      : layer1Canvas.height / 2 +
        (enemy.position.y - 1 / 2) * map.tileHeight +
        2 * Math.sin(time / 240)) - 40;
  const [isTakingDamage] = getTimings({
    time,
    start: enemy.damage.start,
    duration: enemy.damage.duration,
  });

  const drawBody = (context: CanvasRenderingContext2D) => {
    // SHADOW
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    if (enemyState.position.x < playerState.position.x) context.scale(-1, 1);
    context.beginPath();
    context.ellipse(
      0,
      40 - 2 * Math.sin(time / 240),
      40 - 1 * Math.sin(time / 240),
      10 - 1 * Math.sin(time / 240),
      0,
      0,
      degreeToRadian(360),
    );
    context.fillStyle = '#000';
    context.globalAlpha = 0.2;
    context.fill();
    context.closePath();
    // BODY
    if (isTakingDamage && Math.ceil(time) % 8 === 0) return;
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    if (enemyState.position.x < playerState.position.x) context.scale(-1, 1);
    context.globalAlpha = 1;
    context.beginPath();
    if (isMoving) context.globalAlpha = 0.4;
    context.arc(0, 0, 40, 0, degreeToRadian(360));
    if (isTakingDamage) context.fillStyle = '#ff9c9c';
    else context.fillStyle = '#0ff';
    context.arc(0, 0, 30, 0, degreeToRadian(360));
    context.fill();
    context.beginPath();
    context.arc(-25, -10, 10, degreeToRadian(-40), degreeToRadian(120));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(5, -10, 12, degreeToRadian(20), degreeToRadian(-120));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
    context.beginPath();
    context.lineWidth = 2;
    context.moveTo(-20, 20);
    context.quadraticCurveTo(-20, 0, 5, 20);
    context.stroke();
    context.closePath();
  };

  const drawIceSpikeCharging = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) => {
    const { x: positionX, y: positionY } = getPosition(x, y);
    context.setTransform(1, 0, -0.5, 1, positionX, positionY);
    context.beginPath();
    context.fillStyle = '#ccfffb';
    context.globalAlpha = 0.5;
    context.fillRect(
      -60 * attackChargingProgress,
      -20 * attackChargingProgress,
      120 * attackChargingProgress,
      40 * attackChargingProgress,
    );
    context.fill();
    context.closePath();
  };

  const drawIceSpikeAttack = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) => {
    const { x: positionX, y: positionY } = getPosition(x, y);
    context.setTransform(
      1,
      0,
      -0.5,
      1,
      positionX - 60 * (1 - attackProgress),
      positionY - 20 * (1 - attackProgress),
    );
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.beginPath();
    const flow = Math.sin(Math.PI * attackProgress);
    context.fillStyle = '#ccfffb';
    context.globalAlpha = 1 - attackProgress;
    context.moveTo(positionX - 20 * flow, positionY + 10);
    context.lineTo(positionX - 30 * flow, positionY - 120 * flow);
    context.lineTo(positionX + flow, positionY + 5);
    context.fill();
    context.closePath();
  };

  const drawIceDropping = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) => {
    const { x: positionX, y: positionY } = getPosition(x, y);
    context.setTransform(
      1,
      0,
      0,
      1,
      positionX,
      positionY - 125 + 130 * attackProgress,
    );
    context.beginPath();
    context.fillStyle = '#ccfffb';
    context.arc(
      0,
      -75,
      10 * (1 - attackProgress),
      degreeToRadian(180),
      degreeToRadian(-20 * attackProgress),
    );
    context.moveTo(0, 0);
    context.lineTo(-10, -75 * (1 - attackProgress));
    context.lineTo(10, -75);
    context.fill();
    context.closePath();
  };

  if (enemyState.position.y < playerState.position.y)
    drawLayer2((context, canvas) => drawBody(context));
  else drawLayer4((context, canvas) => drawBody(context));
  if (isAttacking || isAttackCharging) {
    if (enemyState.attack.type === 0) {
      enemyState.attack.position.forEach(({ x, y }) => {
        if (y < playerState.position.y && y < enemyState.position.y) {
          if (isAttacking)
            drawLayer1((context, canvas) => drawIceSpikeAttack(context, x, y));
          if (isAttackCharging)
            drawLayer1((context, canvas) =>
              drawIceSpikeCharging(context, x, y),
            );
        } else if (y < enemyState.position.y && y >= playerState.position.y) {
          if (isAttacking)
            drawLayer3((context, canvas) => drawIceSpikeAttack(context, x, y));
          if (isAttackCharging)
            drawLayer1((context, canvas) =>
              drawIceSpikeCharging(context, x, y),
            );
        } else if (y >= enemyState.position.y && y < playerState.position.y) {
          if (isAttacking)
            drawLayer2((context, canvas) => drawIceSpikeAttack(context, x, y));
          if (isAttackCharging)
            drawLayer1((context, canvas) =>
              drawIceSpikeCharging(context, x, y),
            );
        } else {
          if (isAttacking)
            drawLayer4((context, canvas) => drawIceSpikeAttack(context, x, y));
          if (isAttackCharging)
            drawLayer1((context, canvas) =>
              drawIceSpikeCharging(context, x, y),
            );
        }
      });
    }
    if (enemyState.attack.type === 1) {
      enemyState.attack.position.forEach(({ x, y }) => {
        if (y < playerState.position.y && y < enemyState.position.y) {
          drawLayer1((context, canvas) => drawIceDropping(context, x, y));
        } else if (y < enemyState.position.y && y >= playerState.position.y) {
          drawLayer3((context, canvas) => drawIceDropping(context, x, y));
        } else if (y >= enemyState.position.y && y < playerState.position.y) {
          drawLayer2((context, canvas) => drawIceDropping(context, x, y));
        } else {
          drawLayer4((context, canvas) => drawIceDropping(context, x, y));
        }
      });
    }
  }
};

export const drawEnemy5 = ({ map, enemy, time }: DrawEnemyProps) => {
  const [isMoving, movingProgress] = getTimings({
    time,
    start: enemy.move.start + enemy.move.predelay,
    duration: enemy.move.speed,
  });
  const [isAttacking, attackProgress] = getTimings({
    time,
    start: enemy.attack.start + enemy.attack.predelay,
    duration: enemy.attack.duration + enemy.attack.delay,
  });
  const [isAttackCharging, attackChargingProgress] = getTimings({
    time,
    start: enemy.attack.start,
    duration: enemy.attack.predelay,
  });
  const positionX = isMoving
    ? layer1Canvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        (enemy.position.x +
          (enemy.move.position.x - enemy.position.x) * movingProgress) *
          map.tileWidth -
        ((enemy.position.y +
          (enemy.move.position.y - enemy.position.y) * movingProgress) *
          map.tileWidth) /
          6)
    : layer1Canvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        enemy.position.x * map.tileWidth -
        (enemy.position.y * map.tileWidth) / 6);
  const positionY =
    (isMoving
      ? layer1Canvas.height / 2 +
        (enemy.position.y +
          (enemy.move.position.y - enemy.position.y) * movingProgress -
          1 / 2) *
          map.tileHeight +
        2 * Math.sin(time / 240)
      : layer1Canvas.height / 2 +
        (enemy.position.y - 1 / 2) * map.tileHeight +
        2 * Math.sin(time / 240)) - 40;
  const [isTakingDamage] = getTimings({
    time,
    start: enemy.damage.start,
    duration: enemy.damage.duration,
  });
  const drawBody = (context: CanvasRenderingContext2D) => {
    // SHADOW
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    if (enemyState.position.x < playerState.position.x) context.scale(-1, 1);
    context.beginPath();
    context.ellipse(
      0,
      40 - 2 * Math.sin(time / 240),
      40 - 1 * Math.sin(time / 240),
      10 - 1 * Math.sin(time / 240),
      0,
      0,
      degreeToRadian(360),
    );
    context.fillStyle = '#000';
    context.globalAlpha = 0.2;
    context.fill();
    context.closePath();
    // BODY
    if (isTakingDamage && Math.ceil(time) % 8 === 0) return;
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    if (enemyState.position.x < playerState.position.x) context.scale(-1, 1);
    context.globalAlpha = 1;
    context.beginPath();
    context.filter = 'blur(4px)';
    if (isMoving) context.globalAlpha = 0.4;
    context.arc(0, 0, 40, 0, degreeToRadian(360));
    if (isTakingDamage) context.fillStyle = '#ff6161';
    else context.fillStyle = '#000';
    context.fill();
    context.closePath();
    context.beginPath();
    context.filter = `blur(2px)`;
    context.arc(-20, -10, 5, 0, degreeToRadian(360));
    context.fillStyle = '#fff';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(10, -10, 5, 0, degreeToRadian(360));
    context.fillStyle = '#fff';
    context.fill();
    context.closePath();
  };

  const drawSpikeAttack = (context: CanvasRenderingContext2D) => {
    if (isAttacking) {
      const { x: positionX, y: positionY } = getPosition(
        enemyState.position.x,
        enemyState.position.y,
      );
      context.setTransform(1, 0, 0, 1, positionX, positionY - 40);
      context.beginPath();
      if (enemyState.attack.position[0].x > enemyState.position.x)
        context.scale(-1, 1);
      context.moveTo(0, 0);
      context.filter = 'blur(2px)';
      context.lineTo(0, -20);
      context.lineTo(-140 * Math.sin(attackProgress * Math.PI), 0);
      context.lineTo(0, 20);
      if (isTakingDamage) context.fillStyle = '#ff6161';
      else context.fillStyle = '#000';
      context.fill();
      context.closePath();
    }
  };

  const drawChargingBeam = (context: CanvasRenderingContext2D) => {
    if (isAttackCharging) {
      const { x: positionX, y: positionY } = getPosition(
        enemyState.position.x,
        enemyState.position.y,
      );
      if (enemyState.position.x === 0)
        context.setTransform(
          1,
          0,
          0,
          1,
          positionX + 80,
          positionY - 40 + 2 * Math.sin(time / 240),
        );
      else
        context.setTransform(
          1,
          0,
          0,
          1,
          positionX - 80,
          positionY - 40 + 2 * Math.sin(time / 240),
        );
      context.filter = 'blur(4px)';
      context.scale(1, 2);
      context.rotate(time);
      context.beginPath();
      context.fillStyle = '#fff';
      context.fillRect(
        -60 * attackChargingProgress,
        -60 * attackChargingProgress,
        120 * attackChargingProgress,
        120 * attackChargingProgress,
      );
      context.closePath();
      context.beginPath();
      context.fillStyle = '#000';
      context.fillRect(
        -50 * attackChargingProgress,
        -50 * attackChargingProgress,
        100 * attackChargingProgress,
        100 * attackChargingProgress,
      );
      context.closePath();
    }
  };

  const drawAttackBeam = (context: CanvasRenderingContext2D) => {
    if (isAttacking) {
      const { x: positionX, y: positionY } = getPosition(
        enemyState.position.x,
        enemyState.position.y,
      );
      if (enemyState.position.x === 0)
        context.setTransform(
          1,
          0,
          0,
          1,
          positionX + 80,
          positionY - 40 + 2 * Math.sin(time / 240),
        );
      else
        context.setTransform(
          1,
          0,
          0,
          1,
          positionX - 80,
          positionY - 40 + 2 * Math.sin(time / 240),
        );
      context.filter = 'blur(4px)';
      context.scale(1, 2);
      context.rotate(time);
      context.beginPath();
      context.fillStyle = '#fff';
      context.fillRect(
        -60 * Math.cos((attackProgress * Math.PI) / 2),
        -60 * Math.cos((attackProgress * Math.PI) / 2),
        120 * Math.cos((attackProgress * Math.PI) / 2),
        120 * Math.cos((attackProgress * Math.PI) / 2),
      );
      context.closePath();
      context.beginPath();
      context.fillStyle = '#000';
      context.fillRect(
        -50 * Math.cos((attackProgress * Math.PI) / 2),
        -50 * Math.cos((attackProgress * Math.PI) / 2),
        100 * Math.cos((attackProgress * Math.PI) / 2),
        100 * Math.cos((attackProgress * Math.PI) / 2),
      );
      context.closePath();
      context.setTransform(
        1,
        0,
        0,
        1,
        positionX - 20,
        positionY - 40 + 2 * Math.sin(time / 240),
      );
      context.filter = 'blur(4px)';
      context.rotate(degreeToRadian(180));
      if (enemyState.position.x === 0) context.scale(-1, 2);
      else context.scale(1, 2);
      context.beginPath();
      context.fillStyle = '#000';
      if (enemyState.position.x === 0)
        context.fillRect(
          100,
          -(80 * Math.sin(Math.PI * attackProgress)) / 2,
          10000,
          80 * Math.sin(Math.PI * attackProgress),
        );
      else
        context.fillRect(
          60,
          -(80 * Math.sin(Math.PI * attackProgress)) / 2,
          10000,
          80 * Math.sin(Math.PI * attackProgress),
        );
      context.closePath();
    }
  };

  const drawCharginUpstream = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) => {
    if (!isAttackCharging) return;
    const { x: positionX, y: positionY } = getPosition(x, y);
    context.beginPath();
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    context.scale(2, 1);
    context.arc(
      0,
      0,
      12 * Math.sin((attackChargingProgress * Math.PI) / 2),
      0,
      degreeToRadian(360),
    );
    context.fill();
    context.closePath();
  };

  const drawAttackUpstream = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) => {
    if (!isAttacking) return;
    const { x: positionX, y: positionY } = getPosition(x, y);
    context.beginPath();
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    context.scale(2, 1);
    context.arc(
      0,
      0,
      12 * Math.cos((attackProgress * Math.PI) / 2),
      0,
      degreeToRadian(360),
    );
    context.fill();
    context.closePath();
  };

  const drawAttackingUpstreamHole = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) => {
    if (!isAttacking) return;
    const { x: positionX, y: positionY } = getPosition(x, y);
    context.beginPath();
    context.setTransform(1, 0, 0, 1, positionX, positionY - 20);
    context.scale(1, 6 * (1 / 2 + (1 / 2) * attackProgress));
    // context.filter = 'blur(2px)';
    context.arc(0, -200 * attackProgress, 12, 0, degreeToRadian(360));
    context.fill();
    context.closePath();
  };

  if (enemyState.position.y < playerState.position.y)
    drawLayer2((context, canvas) => drawBody(context));
  else drawLayer4((context, canvas) => drawBody(context));

  if (isAttacking || isAttackCharging) {
    if (enemyState.attack.type === 0) {
      if (playerState.position.y <= enemyState.position.y + 1) {
        drawLayer3((context) => drawChargingBeam(context));
        drawLayer3((context) => drawAttackBeam(context));
      } else {
        drawLayer2((context) => drawChargingBeam(context));
        drawLayer2((context) => drawAttackBeam(context));
      }
    }
    if (enemyState.attack.type === 1) {
      if (playerState.position.y <= enemyState.position.y) {
        drawLayer3((context) => drawSpikeAttack(context));
      } else {
        drawLayer1((context) => drawSpikeAttack(context));
      }
    }
    if (enemyState.attack.type === 2) {
      enemyState.attack.position.forEach(({ x, y }) => {
        if (y < playerState.position.y && y < enemyState.position.y) {
          drawLayer1((context, canvas) => drawAttackUpstream(context, x, y));
          drawLayer1((context, canvas) => drawCharginUpstream(context, x, y));
          drawLayer1((context, canvas) =>
            drawAttackingUpstreamHole(context, x, y),
          );
        } else if (y < enemyState.position.y && y >= playerState.position.y) {
          drawLayer3((context, canvas) => drawAttackUpstream(context, x, y));
          drawLayer1((context, canvas) => drawCharginUpstream(context, x, y));
          drawLayer1((context, canvas) =>
            drawAttackingUpstreamHole(context, x, y),
          );
        } else if (y >= enemyState.position.y && y < playerState.position.y) {
          drawLayer2((context, canvas) => drawAttackUpstream(context, x, y));
          drawLayer1((context, canvas) => drawCharginUpstream(context, x, y));
          drawLayer1((context, canvas) =>
            drawAttackingUpstreamHole(context, x, y),
          );
        } else {
          drawLayer4((context, canvas) => drawAttackUpstream(context, x, y));
          drawLayer1((context, canvas) => drawCharginUpstream(context, x, y));
          drawLayer1((context, canvas) =>
            drawAttackingUpstreamHole(context, x, y),
          );
        }
      });
    }
  }
};
