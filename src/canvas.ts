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

export const createCanvas = (id: string, style?: CSSStyleDeclaration) => {
  if (store.canvas.has(id)) return store.canvas.get(id);

  const stringifiedStyle = getStringifiedStyle(style);
  const canvas = Object.assign(
    document.createElement('canvas'),
    {
      id,
      style: stringifiedStyle,
    },
  ) as HTMLCanvasElement;

  store.canvas.set(id, canvas);

  document.body.appendChild(canvas);

  resizeCanvas(canvas);

  canvas.addEventListener('click', (event: PointerEvent) => {
    event.stopPropagation();

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
  window.addEventListener('resize', () => resizeCanvas(canvas));

  return canvas;
};

export const removeCanvas = (id: string) => {
  if (!store.canvas.has(id)) return;

  store.canvas.delete(id);
};

export const resizeCanvas = (canvas: HTMLCanvasElement) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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
