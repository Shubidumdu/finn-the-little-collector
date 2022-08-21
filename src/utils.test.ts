import { getStringifiedStyle } from './utils';

describe('getStringifiedStyle', () => {
  it('styleObject를 인자로 넘겼을 때 적절한 문자열을 반환한다.', () => {
    const styleObj = {
      width: '200px',
      height: 'auto',
      overflow: 'hidden',
    };

    expect(
      getStringifiedStyle(styleObj),
    ).toBe('width:200px;height:auto;overflow:hidden');
  });
});
