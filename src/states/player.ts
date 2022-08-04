export interface PlayerState {
  life: number;
  position: {
    x: number;
    y: number;
  };
  direction: 1 | -1; // 1 = RIGHT, -1 = LEFT
  damage: {
    start: number;
    duration: number;
  };
  collisionDamage: number;
  attack: {
    start: number;
    predelay: number;
    duration: number;
    delay: number;
    power: number;
  };
  move: {
    start: number;
    speed: number;
    position: {
      x: number;
      y: number;
    };
  };
}

export let playerState: PlayerState = {
  life: 100,
  position: {
    x: 0,
    y: 0,
  },
  collisionDamage: 20,
  direction: 1,
  attack: {
    start: -Infinity,
    predelay: 80,
    delay: 80,
    duration: 32,
    power: 10,
  },
  damage: {
    start: -Infinity,
    duration: 400,
  },
  move: {
    start: -Infinity,
    speed: 50,
    position: {
      x: 0,
      y: 0,
    },
  },
};

export const resetPlayerState = () => {
  playerState = {
    life: 100,
    position: {
      x: 0,
      y: 0,
    },
    collisionDamage: 20,
    direction: 1,
    attack: {
      start: -Infinity,
      predelay: 80,
      delay: 80,
      duration: 32,
      power: 10,
    },
    damage: {
      start: -Infinity,
      duration: 400,
    },
    move: {
      start: -Infinity,
      speed: 50,
      position: {
        x: 0,
        y: 0,
      },
    },
  };
};
