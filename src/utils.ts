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
  type: string = 'Arial Black, Arial, sans-serif',
) => `bold ${size}pt ${type}`;

export const getRandomInteger = (min: number, max:number) => Math.random() * (max - min) + min;

export const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16).padEnd(6, '0')}`;

export const pickRandomOption = <T>(options: T[]) => {
  const randomIndex = getRandomInt(options.length);
  return options[randomIndex];
};

export const camelToKebab = (str: string): string =>
  !str ? '' : str.replace(/(^[a-z]*)([A-Z]{1})(\w*)/, (_, $1, $2, $3) => `${$1}-${$2.toLowerCase()}${camelToKebab($3)}`);

export const getStringifiedStyle = (style: Partial<CSSStyleDeclaration> = {}) =>
  Object.entries(style)
    .map(([key, value]) => [camelToKebab(key), value].join(':'))
    .join(';');
