/**
 * @key id로 설정한 string
 * @value 생성된 canvas 인스턴스
 */
const canvasMap = new Map<string, HTMLCanvasElement>();

export default canvasMap;
import { getStringifiedStyle } from './utils';

const setViewPort = () => {
  const viewportMeta = document.querySelector(
    'meta[name="viewport"]',
  ) as HTMLMetaElement;
  const width = Math.round(visualViewport.scale * visualViewport.width);
  const height = Math.round(visualViewport.scale * visualViewport.height);

  if (width <= 460 || height <= 460) {
    viewportMeta.setAttribute(
      'content',
      'width=device-width, initial-scale=0.5, user-scalable=0',
    );
  } else if (width <= 768 || height <= 768) {
    viewportMeta.setAttribute(
      'content',
      'width=device-width, initial-scale=0.725, user-scalable=0',
    );
  } else {
    viewportMeta.setAttribute(
      'content',
      'width=device-width, initial-scale=1.0, user-scalable=0',
    );
  }
};

const handleResize = () => {
  [...canvasMap.values()].map((canvas) => {
    const { fixedWidth, fixedHeight } = canvas.dataset;
    resizeCanvas(canvas, { width: +fixedWidth || undefined, height: +fixedHeight || undefined });
  });

  setViewPort();
};

window.addEventListener('resize', handleResize);


type CanvasAttributes = {
  width: number,
  height: number,
};

type CreateCanvasOptions = CanvasAttributes & {
  style: Partial<CSSStyleDeclaration>,
};

export const createCanvas = (
  id: string,
  options: Partial<CreateCanvasOptions> = {},
) => {
  if (canvasMap.has(id)) return canvasMap.get(id);

  const { width, height, style } = options;
  const stringifiedStyle = getStringifiedStyle(style);

  const canvas = Object.assign(
    document.createElement('canvas'),
    {
      id,
      ...options,
      style: stringifiedStyle,
    },
  ) as HTMLCanvasElement;

  // 별도 크기 지정이 없을 경우 viewport의 크기를 바인딩 하므로, 크기 지정을 한 경우 data attribute에 저장
  width && canvas.setAttribute('data-fixed-width', width + '');
  height && canvas.setAttribute('data-fixed-height', height + '');

  canvasMap.set(id, canvas);

  document.body.appendChild(canvas);

  resizeCanvas(canvas, { width, height });

  canvas.addEventListener('click', (event: PointerEvent) => {
    window.postMessage(
      {
        type: 'click-canvas',
        payload: {
          id,
          x: event.clientX,
          y: event.clientY,
        },
      },
      window.origin,
    );
  });

  return canvas;
};

export const removeCanvas = (id: string) => {
  if (!canvasMap.has(id)) return;

  canvasMap.delete(id);
};

export const resizeCanvas = (
  canvas: HTMLCanvasElement,
  attributes: Partial<CanvasAttributes> = {},
) => {
  const { width, height } = attributes;

  canvas.width = width ?? window.innerWidth;
  canvas.height = height ?? window.innerHeight;
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
