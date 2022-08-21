export interface Layer {
  layer: HTMLCanvasElement;

  init: (...args: any[]) => void;
  remove: () => void;
  update: (time: number) => void;
}

export * from './play';
