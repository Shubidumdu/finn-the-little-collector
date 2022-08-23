import { getStringifiedStyle, kebabize } from './utils';

describe('kebabize', () => {
  it('kebab-case로 문자열을 변환한다.', () => {
    expect(
      kebabize('normal case'),
    ).toBe('normal case');

    expect(
      kebabize('camelCase'),
    ).toBe('camel-case');

    expect(
      kebabize('camelCaseCase'),
    ).toBe('camel-case-case');
  });

  it('인자를 넘기지 않으면 빈 문자를 반환한다.', () => {
    expect(
      kebabize(undefined),
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
