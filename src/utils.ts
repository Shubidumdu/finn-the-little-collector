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

/**
 * 
 * @param style 
 * @returns 직렬화된 스타일 문자열
 * @note key는 kebab-case로 작성해야 합니다. 일반적인 style object를 작성할 때처럼 camelCase로 작성할 경우 assign 시 무시됩니다.
 */
export const getStringifiedStyle = (style: Partial<CSSStyleDeclaration> = {}) =>
  Object.entries(style)
    .map((entry) => entry.join(':'))
    .join(';');
