import state from './state';
import Person from '../objects/person';

export const setIsSoundOn = (isSoundOn: boolean) => {
  Object.assign(
    state,
    { isSoundOn },
  );
};

export const setWantedPersons = (wantedPersons: Person[]) => {
  Object.assign(
    state,
    { wantedPersons },
  );
};
