import { drawLayer1 } from '../canvas';
import { gameState } from '../scene/game';
import { EnemyState } from '../states/enemy';
import { MapState } from '../states/map';
import { degreeToRadian, getTimings } from '../utils';

interface DrawMapProps {
  map: MapState;
  enemy: EnemyState;
  time: number;
}

const stars: {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
}[] = [];

export const drawGameMap = ({
  time,
  enemy,
  map: { size, tileWidth, tileHeight },
}: DrawMapProps) => {
  const [isEnemyWaitingMove] = getTimings({
    time,
    start: enemy.move.start,
    duration: enemy.move.predelay,
  });
  const [isEnemyAttacking] = getTimings({
    time,
    start: enemy.attack.start,
    duration: enemy.attack.predelay,
  });
  if (gameState.stage === 1)
    drawLayer1((context, canvas) => {
      context.beginPath();
      const lingrad = context.createLinearGradient(0, 0, 0, innerHeight);
      lingrad.addColorStop(0.3, '#0D0D0D');
      lingrad.addColorStop(0.39, '#401410');
      lingrad.addColorStop(0.4, '#D97652');
      lingrad.addColorStop(0.8, '#8C3420');
      context.fillStyle = lingrad;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.closePath();
    });
  if (gameState.stage === 2)
    drawLayer1((context, canvas) => {
      context.beginPath();
      const lingrad = context.createLinearGradient(0, 0, 0, innerHeight);
      lingrad.addColorStop(0.35, '#252E3E');
      lingrad.addColorStop(0.4, '#44A748');
      lingrad.addColorStop(0.4, '#96DF50');
      lingrad.addColorStop(0.8, '#5FBF03');
      context.fillStyle = lingrad;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.closePath();
    });
  if (gameState.stage === 3)
    drawLayer1((context, canvas) => {
      context.beginPath();
      const lingrad = context.createLinearGradient(0, 0, 0, innerHeight);
      lingrad.addColorStop(0.34, '#1B1A1F');
      lingrad.addColorStop(0.38, '#FB3D31');
      lingrad.addColorStop(0.4, '#CC1017');
      lingrad.addColorStop(0.8, '#51191E');
      context.fillStyle = lingrad;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.closePath();
    });
  if (gameState.stage === 4)
    drawLayer1((context, canvas) => {
      context.beginPath();
      const lingrad = context.createLinearGradient(0, 0, 0, innerHeight);
      lingrad.addColorStop(0.36, '#182026');
      lingrad.addColorStop(0.38, '#B6DBF2');
      lingrad.addColorStop(0.6, '#8BBBD9');
      lingrad.addColorStop(0.8, '#759CBF');
      context.fillStyle = lingrad;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.closePath();
    });
  if (gameState.stage === 5)
    drawLayer1((context, canvas) => {
      context.beginPath();
      const lingrad = context.createLinearGradient(0, 0, 0, innerHeight);
      lingrad.addColorStop(0.38, '#0D0D0D');
      lingrad.addColorStop(0.39, '#F2F2F2');
      lingrad.addColorStop(0.6, '#D7D7D9');
      lingrad.addColorStop(0.8, '#979DA6');
      context.fillStyle = lingrad;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.closePath();
    });
  drawLayer1((context, canvas) => {
    context.fillStyle = '#fff';
    if (!stars.length) {
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * (canvas.height / 3);
        const dx = (Math.random() - 0.5) * 0.5;
        const dy = (Math.random() - 0.5) * 0;
        const radius = Math.random() * 2 + 1;
        stars.push({
          x,
          y,
          dx,
          dy,
          radius,
        });
      }
    }
    stars.forEach(({ x, y, dx, dy, radius }, idx) => {
      const positionX = x + dx * 2;
      const positionY = y + dy * 2;
      if (positionX < 0) stars[idx].dx = -dx;
      if (positionY < 0) stars[idx].dy = -dy;
      if (positionX > canvas.width) stars[idx].dx = -dx;
      if (positionY > canvas.height) stars[idx].dy = -dy;
      stars[idx].x = positionX;
      stars[idx].y = positionY;
      context.beginPath();
      context.arc(positionX, positionY, radius, 0, degreeToRadian(360));
      context.fill();
      context.closePath();
    });
  });
  drawLayer1((context, canvas) => {
    context.setTransform(
      1,
      0,
      -0.5,
      1,
      canvas.width / 2 - (tileWidth * size) / 2 + tileWidth / 4,
      canvas.height / 2 - 40,
    );
    context.lineWidth = 2;
    if (gameState.stage === 1) {
      context.strokeStyle = '#5A290C';
      context.shadowColor = '#240000';
    }
    if (gameState.stage === 2) {
      context.strokeStyle = '#252E3E';
      context.shadowColor = '#0B020E';
    }
    if (gameState.stage === 3) {
      context.strokeStyle = '#51191E';
      context.shadowColor = '#1B1A1F';
    }
    if (gameState.stage === 4) {
      context.strokeStyle = '#182026';
      context.shadowColor = '#182026';
    }
    if (gameState.stage === 5) {
      context.strokeStyle = '#0D0D0D';
      context.shadowColor = '#0D0D0D';
    }
    context.shadowOffsetX = 8;
    context.shadowOffsetY = 8;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        // if enemy will moving on the block
        if (
          isEnemyWaitingMove &&
          enemy.move.position.x === x &&
          enemy.move.position.y === y
        ) {
          context.shadowOffsetX = 8;
          context.shadowOffsetY = 8;
          context.fillStyle = '#fac800';
          context.fillRect(
            tileWidth * x,
            tileHeight * y,
            tileWidth,
            tileHeight,
          );
          context.shadowOffsetX = 0;
          context.shadowOffsetY = 0;
          context.strokeRect(
            tileWidth * x,
            tileHeight * y,
            tileWidth,
            tileHeight,
          );
        }
        // if enemy will attack the block
        else if (
          isEnemyAttacking &&
          enemy.attack.position.some(({ x: _x, y: _y }) => x === _x && y === _y)
        ) {
          context.shadowOffsetX = 8;
          context.shadowOffsetY = 8;
          context.fillStyle = '#fa2b00';
          context.fillRect(
            tileWidth * x,
            tileHeight * y,
            tileWidth,
            tileHeight,
          );
          context.shadowOffsetX = 0;
          context.shadowOffsetY = 0;
          context.strokeRect(
            tileWidth * x,
            tileHeight * y,
            tileWidth,
            tileHeight,
          );
        } else {
          context.shadowOffsetX = 8;
          context.shadowOffsetY = 8;
          context.fillStyle = '#fff';
          context.fillRect(
            tileWidth * x,
            tileHeight * y,
            tileWidth,
            tileHeight,
          );
          context.shadowOffsetX = 0;
          context.shadowOffsetY = 0;
          context.strokeRect(
            tileWidth * x,
            tileHeight * y,
            tileWidth,
            tileHeight,
          );
        }
      }
    }
  });
};
