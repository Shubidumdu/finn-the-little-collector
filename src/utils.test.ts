import { getStringifiedStyle, camelToKebab } from './utils';

describe('camelToKebab', () => {
  it('kebab-case로 문자열을 변환한다.', () => {
    expect(
      camelToKebab('normal case'),
    ).toBe('normal case');

    expect(
      camelToKebab('camelCase'),
    ).toBe('camel-case');

    expect(
      camelToKebab('camelCaseCase'),
    ).toBe('camel-case-case');
  });

  it('인자를 넘기지 않으면 빈 문자를 반환한다.', () => {
    expect(
      camelToKebab(undefined),
    ).toBe('');
  });
});

describe('getStringifiedStyle', () => {
  it('styleObject를 인자로 넘겼을 때 적절한 문자열을 반환한다.', () => {
    const styleObj = {
      width: '200px',
      height: 'auto',
      overflow: 'hidden',
      zIndex: '1',
    };

    expect(
      getStringifiedStyle(styleObj),
    ).toBe('width:200px;height:auto;overflow:hidden;z-index:1');
  });

  it('인자를 넘기지 않으면 빈 문자를 반환한다.', () => {
    expect(
      getStringifiedStyle(),
    ).toBe('');
  });
});
