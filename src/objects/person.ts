import { GameObject } from '.';
import { drawLayer1 } from '../canvas';
import { getTimings } from '../utils';

type PersonState = {
  position: {
    x: number;
    y: number;
    z: number;
  };
};

export default class Person implements GameObject, PersonState {
  position: { x: number; y: number; z: number };
  move: {
    speed: number;
    position: {
      x: number;
      y: number;
      z: number;
    };
  };

  constructor() {}

  init = (state: PersonState) => {
    const { position } = state;
    this.position = position;
    this.move = {
      speed: 3000,
      position: {
        // 목적지 좌표
        x: 200,
        y: 0,
        z: 0,
      },
    };
  };

  // 얘는 매 프레임 실행됨
  update = (time: number) => {
    this.draw(time);
    const { isProgressing: isMoving, progress: movingProgress, isEnded: isMovingEnded, isReserved: isMovingReserved } = getTimings({
      time,
      start: 1000, // 1초에 시작
      duration: this.move.speed, // 3초 동안 지속
    });
    if (isMovingReserved) {
      this.move = {
        speed: 4000,
        position: {
          x: 400,
          y: 400,
          z: 0,
        }
      }
    }
    if (isMoving) {
      this.position = {
        x:
          this.position.x + // 최초 위치
          // 이동 해야 할 거리
          (this.move.position.x - this.position.x) * movingProgress, // 0 ~ 1,
        y:
          this.position.y +
          (this.move.position.y - this.position.y) * movingProgress,
        z: this.position.z,
      };
    }
    if (isMovingEnded) {
      this.position = {
        x: this.move.position.x,
        y: this.move.position.y,
        z: 0,
      }
    }
  };

  remove = () => {
    return;
  };

  draw = (time: number) => {
    drawLayer1((context) => {
      const { x, y, z } = this.position;
      context.setTransform(1, 0, 0, 1, x, y);
      context.fillRect(0, 0, 20, 20);
    });
  };
}
