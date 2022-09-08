import { PlaySceneState } from "./scenes/play";

export const STAGE_STATES: {
  [key: number] : PlaySceneState
 } = {
  1: {
    activeBackground: 'road',
    stage: 1,
    timeout: 60_000,
    lifeCount: 5,
    personCount: 100,
    wantedPersonCount: 3,
  }
};
