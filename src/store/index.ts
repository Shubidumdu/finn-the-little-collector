import { default as canvas } from './modules/canvas';
import { default as state } from './state';

const namespaces = {
  canvas,
};

/**
 * @readonly
 * @description
 * state 변경 사항을 추적하기 위해 proxy를 사용합니다.
 * 읽기 전용으로만 사용합니다.
 * modules store를 변경하는 경우에 namespaces 내부만을 수정합니다.
 */
const store = new Proxy({
  ...state,
  ...namespaces,
}, {
  set: (target, key, value) => {
    if (key in namespaces) return true;

    Object.assign(
      target,
      { [key]: value },
    );

    return true;
  },
});

export default store;
