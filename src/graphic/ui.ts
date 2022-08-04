import { drawLayer4 } from '../canvas';
import { getFont } from '../font';
import { gameState } from '../scene/game';

const PLAYER_LIFE_COLOR = '#FFA';
const ENEMY_LIFE_COLOR = '#F99';

export const drawLifeBar = ({
  player,
  enemy,
}: {
  player: number;
  enemy: number;
}) => {
  drawLayer4((context, canvas) => {
    context.setTransform(
      1,
      0,
      0,
      1,
      canvas.width / 2 - 140,
      canvas.height / 2 + 240,
    );
    context.font = getFont(18);
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 3;
    context.shadowColor = '#000';
    context.fillStyle = '#fff';
    context.fillText('ROACH', -100, 28);
    context.fillStyle = PLAYER_LIFE_COLOR;
    context.fillRect(10, 10, 2 * player, 20);
  });
  drawLayer4((context, canvas) => {
    context.setTransform(
      1,
      0,
      0,
      1,
      canvas.width / 2 - 140,
      canvas.height / 2 + 240,
    );
    context.font = getFont(18);
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 3;
    context.shadowColor = '#000';
    context.fillStyle = '#fff';
    context.fillText('ENEMY', -100, 0);
    context.fillStyle = ENEMY_LIFE_COLOR;
    context.fillRect(10, -20, 2 * enemy, 20);
  });
};

export const drawMessage = ({ game }: { game: typeof gameState }) => {
  if (game.playTime < 3000) {
    const count = Math.ceil((3000 - game.playTime) / 1000);
    drawLayer4((context, canvas) => {
      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width / 2 - 24,
        canvas.height / 2 - 80,
      );
      context.shadowColor = '#000';
      context.shadowOffsetX = 4;
      context.shadowOffsetY = 4;
      context.font = getFont(48);
      context.fillStyle = '#fff';
      context.fillText(count.toString(), 0, 0);
    });
  }
};

export const drawScoreTime = ({ game }: { game: typeof gameState }) => {
  if (gameState.scoreTime > 0) {
    const time = Math.round(gameState.scoreTime);
    const second = time / 1000;
    const minute = Math.floor(second / 60);
    drawLayer4((context, canvas) => {
      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width / 2 + 140,
        canvas.height / 2 + 240,
      );
      context.font = getFont(18);
      context.shadowColor = '#000';
      context.shadowOffsetX = 3;
      context.shadowOffsetY = 3;
      context.fillStyle = '#fff';
      context.fillText(
        `${minute.toString().padStart(2, '0')}:${second
          .toFixed(2)
          .padStart(5, '0')}`,
        0,
        0,
      );
    });
  } else {
    const time = Math.round(gameState.scoreTime);
    const second = time / 1000;
    const minute = Math.floor(second / 60);
    drawLayer4((context, canvas) => {
      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width / 2 + 140,
        canvas.height / 2 + 240,
      );
      context.font = getFont(18);
      context.shadowColor = '#000';
      context.shadowOffsetX = 3;
      context.shadowOffsetY = 3;
      context.fillStyle = '#fff';
      context.fillText(`00:00.00`, 0, 0);
    });
  }
};
