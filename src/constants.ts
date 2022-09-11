import { PlaySceneState } from "./scenes/play";

export const STAGE_STATES: {
  [key: number] : PlaySceneState
 } = {
  1: {
    activeBackground: 'playground',
    stage: 1,
    timeout: 60_000,
    lifeCount: 5,
    personCount: 100,
    wantedPersonCount: 3,
  },
  2: {
    activeBackground: 'pool',
    stage: 2,
    timeout: 70_000,
    lifeCount: 4,
    personCount: 150,
    wantedPersonCount: 4,
  },
  3: {
    activeBackground: 'road',
    stage: 3,
    timeout: 80_000,
    lifeCount: 3,
    personCount: 200,
    wantedPersonCount: 5,
  },
};
