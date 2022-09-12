import store from '.';
import Person from '../objects/person';

type State = {
  isSoundOn: boolean;
  wantedPersons: Person[];
};

/**
 * @description
 * 전역에서 사용할 상태입니다.
 * 상태를 직접 수정하지 않고 mutation 함수를 통해서만 변경합니다.
 */
const state: State = new Proxy(
  {
    isSoundOn: false,
    wantedPersons: [],
  },
  {
    set: (target, key, value) => {
      Object.assign(target, { [key]: value });

      Object.assign(store, {
        ...store,
        ...state,
      });

      return true;
    },
  },
);

export default state;
