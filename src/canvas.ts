import store from './store';
import { getStringifiedStyle } from './utils';

const setViewPort = () => {
  const viewportMeta = document.querySelector(
    "meta[name='viewport']",
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

type CanvasAttribues = {
  width: number,
  height: number,
};

type CreateCanvasOptions = CanvasAttribues & {
  style: Partial<CSSStyleDeclaration>,
};

export const createCanvas = (
  id: string,
  options: Partial<CreateCanvasOptions> = {},
) => {
  if (store.canvas.has(id)) return store.canvas.get(id);

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

  document.body.appendChild(canvas);

  store.canvas.set(id, canvas);

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

  window.addEventListener('resize', () => resizeCanvas(canvas, { width, height }));

  return canvas;
};

export const removeCanvas = (id: string) => {
  if (!store.canvas.has(id)) return;

  store.canvas.delete(id);
};

export const resizeCanvas = (
  canvas: HTMLCanvasElement,
  attributes: Partial<CanvasAttribues> = {},
) => {
  const { width, height } = attributes;

  canvas.width = width ?? window.innerWidth;
  canvas.height = height ?? window.innerHeight;

  setViewPort();
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
  [...store.canvas.values()].map((canvas) => resetLayer(canvas)());
};
