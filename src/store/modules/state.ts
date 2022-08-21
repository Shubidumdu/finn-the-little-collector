type State = {
  soundActive: boolean,
};

const state = new Map<keyof State, State[keyof State]>();

export default state;
