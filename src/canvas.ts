/**
 * @key id로 설정한 string
 * @value 생성된 canvas 인스턴스
 */
const canvasMap = new Map<string, HTMLCanvasElement>();

export default canvasMap;

export type DrawFunc<T extends any[] = []> = (
  context: CanvasRenderingContext2D,
  ...args: T
) => void;

const handleResize = () => {
  [...canvasMap.values()].map((canvas) => {
    resizeCanvas(canvas);
  });
};

window.addEventListener('resize', handleResize);

export const createCanvas = (id: string) => {
  if (canvasMap.has(id)) return canvasMap.get(id);

  const canvas = Object.assign(document.createElement('canvas'), {
    id,
  }) as HTMLCanvasElement;

  canvasMap.set(id, canvas);

  document.body.appendChild(canvas);

  resizeCanvas(canvas);

  return canvas;
};

export const removeCanvas = (id: string) => {
  if (!canvasMap.has(id)) return;

  canvasMap.delete(id);
};

export const resizeCanvas = (canvas: HTMLCanvasElement) => {
  canvas.width = 920;
  canvas.height = 920;
  if (window.innerWidth > window.innerHeight) {
    Object.assign(canvas.style, {
      width: 'auto',
      height: '100%',
    });
  } else {
    Object.assign(canvas.style, {
      width: '100%',
      height: 'auto',
    });
  }
};

export const drawLayer = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d');

  return (
    callback: (
      context: CanvasRenderingContext2D,
      canvas?: HTMLCanvasElement,
    ) => void,
  ) => {
    context.save();
    context.beginPath();
    callback(context, canvas);
    context.closePath();
    context.restore();
  };
};

export const resetLayer = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d');

  return () => {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
};

export const resetAllLayers = () => {
  [...canvasMap.values()].map((canvas) => resetLayer(canvas)());
};
