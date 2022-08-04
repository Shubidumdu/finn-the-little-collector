import { layer1Canvas } from './canvas';
import { enemyState } from './states/enemy';
import { mapState } from './states/map';

export const degreeToRadian = (degree: number) => (Math.PI / 180) * degree;

interface GetTimingProps {
  time: number;
  start: number;
  duration: number;
}

export const getTimings = ({
  time,
  start,
  duration,
}: GetTimingProps): [
  isProgressing: boolean,
  progress: number,
  isReserved: boolean,
  isEnded: boolean,
] => {
  const isReserved = (time - start) / duration < 0;
  const isEnded = (time - start) / duration > 1;
  const progress =
    (time - start) / duration < 0 ? 0 : (time - start) / duration;
  const isProgressing = progress < 1 && progress > 0;
  return [isProgressing, progress, isReserved, isEnded];
};

export const getRandomInt = (size: number) => Math.floor(Math.random() * size);

export const getPosition = (x: number, y: number) => {
  const PositionX =
    layer1Canvas.width / 2 +
    (-(mapState.tileWidth + mapState.tileHeight) +
      x * mapState.tileWidth -
      (y * mapState.tileWidth) / 6);
  const PositionY =
    layer1Canvas.height / 2 +
    (y - 1 / 2) +
    mapState.tileHeight * (y + 0.5) -
    40;
  return { x: PositionX, y: PositionY };
};
