import { Rect } from './types/rect';

export const degreeToRadian = (degree: number) => (Math.PI / 180) * degree;

interface GetTimingProps {
  time: number;
  start: number;
  duration: number;
}

export const getTimings = ({ time, start, duration }: GetTimingProps) => {
  const isReserved = (time - start) / duration < 0; // 실행될 예정 - bool
  const isEnded = (time - start) / duration > 1; // 실행되었음 - bool
  const progress =
    (time - start) / duration < 0 ? 0 : (time - start) / duration; // 진행 중인 애니메이션의 진척도 - 0 ~ 1
  const isProgressing = progress < 1 && progress > 0; // 진행 여부 - bool
  return {
    isProgressing,
    progress,
    isReserved,
    isEnded,
  };
};

export const getRandomInt = (size: number) => Math.floor(Math.random() * size);

export const getFont = (
  size: number = 32,
  type: string = 'Courier New, sans-serif',
) => `bold ${size}pt ${type}`;

export const getRandomInteger = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);

export const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16).padEnd(6, '0')}`;

export const pickRandomOption = <T>(options: T[]) => {
  const randomIndex = getRandomInt(options.length);
  return options[randomIndex];
};

export const camelToKebab = (str: string): string =>
  !str ? '' : str.replace(/(^[a-z]*)([A-Z]{1})(\w*)/, (_, $1, $2, $3) => `${$1}-${$2.toLowerCase()}${camelToKebab($3)}`);

type LinearPosition = {
  x: number,
  maxWidth: number,
  time: DOMHighResTimeStamp,
  offset: number,
};
export const getLinearPosition = ({
  x,
  maxWidth,
  time,
  offset,
}: LinearPosition) =>
  (x + time) % (maxWidth + offset) - offset;

export const isMobileSize = (width: number) => width < 480;
export const isTabletSize = (width: number) => width < 850;

/**
 * 
 * @param start color like #aaaaaa 
 * @param delta distance from start
 * @returns 
 */
export const calculateHex = (start: string, delta: number) =>
  `#${(parseInt(start.replace('#', '0x')) + delta).toString(16)}`;

export const isInsideRect = (
  position: { x: number; y: number },
  rect: Rect,
) => {
  const { left, right, top, bottom } = rect;
  const { x, y } = position;

  return left <= x && x <= right && top <= y && y <= bottom;
};
