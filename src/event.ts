import { PlaySceneState } from './scenes/play';

export type EventType = ChangeSceneEvent | ClickCanvasEvent;

export type ChangeSceneEvent = {
  type: 'change-scene';
  payload: {
    type: 'play';
    state: PlaySceneState;
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

export const postEvent = ({ type, payload }: EventType) => {
  window.postMessage(
    {
      type,
      payload,
    },
    window.origin,
  );
};

export const listenEvent = (handleEventData: (data: EventType) => void) => {
  window.addEventListener('message', (event: MessageEvent<EventType>) => {
    if (!event.data) return;
    handleEventData(event.data);
  });
};
