import state from './state';

export const setIsSoundOn = (isSoundOn: boolean) => {
  Object.assign(
    state,
    { isSoundOn },
  );
};
