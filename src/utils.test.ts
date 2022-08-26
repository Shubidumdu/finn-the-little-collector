import { camelToKebab } from './utils';

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
