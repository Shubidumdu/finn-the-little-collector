export const degreeToRadian = (degree: number) => (Math.PI / 180) * degree;

interface GetTimingProps {
  time: number;
  start: number;
  duration: number;
}

export const getTimings = ({ time, start, duration }: GetTimingProps) => {
  const isReserved = (time - start) / duration < 0;
  const isEnded = (time - start) / duration > 1;
  const progress =
    (time - start) / duration < 0 ? 0 : (time - start) / duration;
  const isProgressing = progress < 1 && progress > 0;
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

export const kebabize = (str: string): string =>
  !str ? '' : str.replace(/(^[a-z]*)([A-Z]{1})(\w*)/, (_, $1, $2, $3) => `${$1}-${$2.toLowerCase()}${kebabize($3)}`);

export const getStringifiedStyle = (style: Partial<CSSStyleDeclaration> = {}) =>
  Object.entries(style)
    .map(([key, value]) => [kebabize(key), value].join(':'))
    .join(';');
