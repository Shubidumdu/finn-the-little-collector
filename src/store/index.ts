import { default as state } from './state';

/**
 * @readonly
 * @description
 * state 변경 사항을 추적하기 위해 proxy를 사용합니다.
 * 읽기 전용으로만 사용합니다.
 * modules store를 변경하는 경우에 namespaces 내부만을 수정합니다.
 */
const store = new Proxy(
  {
    ...state,
  },
  {
    set: (target, key, value) => {
      Object.assign(target, { [key]: value });

      return true;
    },
  },
);

export default store;
