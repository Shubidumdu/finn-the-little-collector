/**
 * @deprecated 
 * Use `Rect` instead. This will be removed when it is no longer used.
 */
export type RectType = {
  left: number;
  width: number;
  right: number;
  top: number;
  height: number;
  bottom: number;
};

type RectProps = {
  left: number;
  top: number;
  width: number;
  height: number;
}
export class Rect {
  left: number;
  top: number;
  width: number;
  height: number;
  right: number;
  bottom: number;

  constructor({ left, top, width, height }: RectProps) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.right = left + width;
    this.bottom = top + height;
  }

  isInside(position: { x: number; y: number }) {
    const { left, right, top, bottom } = this;
    const { x, y } = position;

    return left <= x && x <= right && top <= y && y <= bottom;
  }
}
