import { GameResultSceneState } from './scenes/gameResult';
import { GameOverSceneState } from './scenes/gameover';
import { PlaySceneState } from './scenes/play';

export type EventType = ChangeSceneEvent | ClickCanvasEvent;

export type ChangeSceneEvent = {
  type: 'change-scene';
  payload:
    | {
        type: 'play';
        state: PlaySceneState;
      }
    | {
        type: 'gameover';
        state: GameOverSceneState;
      }
    | {
        type: 'title';
        state: null;
      }
    | {
        type: 'gameResult';
        state: GameResultSceneState;
      };
};

export type ClickCanvasEvent = {
  type: 'click-canvas';
  payload: {
    id: string;
    x: number;
    y: number;
  };
};

export const postGlobalEvent = ({ type, payload }: EventType) => {
  window.postMessage(
    {
      type,
      payload,
    },
    window.origin,
  );
};

export const listenGlobalEvent = (
  handleEventData: (data: EventType) => void,
) => {
  window.addEventListener('message', (event: MessageEvent<EventType>) => {
    if (!event.data) return;
    handleEventData(event.data);
  });
};
