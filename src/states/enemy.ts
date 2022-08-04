export interface EnemyState {
  life: number;
  position: {
    x: number;
    y: number;
  };
  damage: {
    start: number;
    duration: number;
  };
  attack: {
    type?: number;
    sound?: boolean[];
    start: number;
    position: {
      x: number;
      y: number;
    }[];
    predelay: number;
    duration: number;
    delay: number;
    power: number;
  };
  move: {
    start: number;
    predelay: number;
    speed: number;
    position: {
      x: number;
      y: number;
    };
  };
}

export let enemyState: EnemyState = {
  life: 100,
  position: {
    x: 3,
    y: 0,
  },
  damage: {
    start: -Infinity,
    duration: 600,
  },
  attack: {
    type: 0,
    sound: [],
    start: -Infinity,
    duration: 1000,
    predelay: 0,
    delay: 0,
    power: 10,
    position: [],
  },
  move: {
    start: -Infinity,
    predelay: 1000,
    speed: 100,
    position: {
      x: 3,
      y: 3,
    },
  },
};

export const resetEnemyState = () => {
  enemyState = {
    life: 100,
    position: {
      x: 3,
      y: 0,
    },
    damage: {
      start: -Infinity,
      duration: 600,
    },
    attack: {
      type: 0,
      sound: [],
      start: -Infinity,
      duration: 1000,
      predelay: 0,
      delay: 0,
      power: 10,
      position: [],
    },
    move: {
      start: -Infinity,
      predelay: 1000,
      speed: 100,
      position: {
        x: 3,
        y: 3,
      },
    },
  };
};
