/* eslint-disable @typescript-eslint/no-var-requires */
import '@formatjs/intl-getcanonicallocales/polyfill';
import '@formatjs/intl-locale/polyfill';
import {DisplayNames} from '..';

import * as en from './locale-data/en.json';
import * as zh from './locale-data/zh.json';
DisplayNames.__addLocaleData(en, zh);

describe('.of()', () => {
  it('accepts case-insensitive language code with region subtag', () => {
    expect(new DisplayNames('zh', {type: 'language'}).of('zh-hANs-sG')).toBe(
      '简体中文（新加坡）'
    );
  });

  it('accepts case-insensitive currency code', () => {
    expect(
      new DisplayNames('en-US', {type: 'currency', style: 'long'}).of('cNy')
    ).toBe('Chinese Yuan');
  });

  it('preserves unrecognized region subtag in language code when fallback option is code', () => {
    expect(
      new DisplayNames('zh', {type: 'language', fallback: 'code'}).of(
        'zh-Hans-Xy'
      )
    ).toBe('简体中文（XY）');
  });

  it('find script correctly', function () {
    expect(
      new DisplayNames('zh', {type: 'script', fallback: 'code'}).of('arab')
    ).toBe('阿拉伯文');
  });

  describe('with fallback set to "none"', () => {
    it('returns undefined when called with language code that has unrecognized region subtag', () => {
      expect(
        new DisplayNames('zh', {type: 'language', fallback: 'none'}).of(
          'zh-Hans-XY'
        )
      ).toBe(undefined);
    });

    it('returns undefined when called with language code that valid region subtag but invalid language subtag', () => {
      expect(
        new DisplayNames('zh', {type: 'language', fallback: 'none'}).of('xx-CN')
      ).toBe(undefined);
    });
  });
});

// TODO: add snapshot tests
