import { VariationState } from './objects/person';
import { Rect, RectType } from './types/rect';

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

export const getRandomIntegerFromRange = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);

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
  rect: RectType,
) => {
  const { left, right, top, bottom } = rect;
  const { x, y } = position;

  return left <= x && x <= right && top <= y && y <= bottom;
};

export const barrierRectFactory = (canvas: HTMLCanvasElement) => {
  const skyHeight = 150;
  const posterHeight = 200;
  const width = canvas.width * 0.99;

  return new Rect({
    left: canvas.width / 2 - width / 2,
    top: skyHeight,
    width,
    height: canvas.height - skyHeight - posterHeight,
  })
}

export const pickPersonVariations = (): VariationState => {
  const pickEyeWear = () => {
    const randomInt = getRandomInt(10);
    return {
      glasses: randomInt < 2,
      sunglasses: randomInt > 7,
    };
  }
  const pickHead = () => {
    const randomInt = getRandomInt(10);
    return {
      bald: randomInt === 0,
      beanie: randomInt === 1 && getRandomColor(),
      cap: randomInt === 2 && getRandomColor(),
      hat: randomInt === 3 && getRandomColor(),
    };
  }
  const pickHair = () => {
    const randomInt = getRandomInt(3);
    return {
      longHair: randomInt === 0,
      shortHair: randomInt === 1,
    };
  }
  const pickTopWear = () => {
    const randomInt = getRandomInt(3);
    return {
      sleeveless: randomInt === 0,
      shortSleeve: randomInt === 1,
    };
  }
  const pickBottomWear = () => {
    const randomInt = getRandomInt(2);
    return {
      shortPants: randomInt === 0,
    };
  }
  
  return {
    ...pickEyeWear(),
    ...pickHead(),
    ...pickHair(),
    ...pickTopWear(),
    ...pickBottomWear(),
  };
};

export const getMousePosition = (canvas: HTMLCanvasElement, e: MouseEvent) => {
  const rect = canvas.getBoundingClientRect();
  return {
      x: (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
      y: (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
  };
}
