export interface GameObject {
  init: (...args: any) => void;
  remove: () => void;
  update: (time: number) => void;
}
