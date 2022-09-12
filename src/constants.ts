import { PlaySceneState } from './scenes/play';

export const STAGE_STATES: {
  [key: number]: PlaySceneState;
} = {
  1: {
    stage: 1,
    timeout: 40_000,
    lifeCount: 5,
    personCount: 30,
    wantedPersonCount: 3,
  },
  2: {
    stage: 2,
    timeout: 50_000,
    lifeCount: 5,
    personCount: 60,
    wantedPersonCount: 3,
  },
  3: {
    stage: 3,
    timeout: 60_000,
    lifeCount: 5,
    personCount: 90,
    wantedPersonCount: 4,
  },
  4: {
    stage: 4,
    timeout: 70_000,
    lifeCount: 5,
    personCount: 120,
    wantedPersonCount: 4,
  },
  5: {
    stage: 5,
    timeout: 90_000,
    lifeCount: 5,
    personCount: 140,
    wantedPersonCount: 6,
  },
  6: {
    stage: 6,
    timeout: 120_000,
    lifeCount: 5,
    personCount: 200,
    wantedPersonCount: 8,
  },
};
