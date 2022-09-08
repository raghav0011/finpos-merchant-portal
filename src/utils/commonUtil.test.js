import {
  toUpper,
  urlToList,
  isEmpty,
  isDuplicate,
  hasPermission,
  exactMatchByKey,
  matchBySearchKey,
  matchByDynamicKey,
} from './commonUtil';

describe('commonUtil --- toUpper', () => {
  it('Empty', () => {
    expect(toUpper()).toEqual(undefined);
  });

  it('Lowercase character', () => {
    expect(toUpper('ram')).toEqual('Ram');
  });

  it('Uppercase character', () => {
    expect(toUpper('Ram')).toEqual('Ram');
  });
});

describe('commonUtil --- urlToList', () => {
  it('Empty path', () => {
    expect(urlToList()).toEqual(undefined);
  });

  it('A path', () => {
    expect(urlToList('/agents')).toEqual(['/agents']);
  });

  it('Secondary path', () => {
    expect(urlToList('/agents/nZogz')).toEqual(['/agents', '/agents/nZogz']);
  });

  it('Three paths', () => {
    expect(urlToList('/agents/nZogz/edit')).toEqual([
      '/agents',
      '/agents/nZogz',
      '/agents/nZogz/edit',
    ]);
  });
});

describe('CommonUtil --- isEmpty', () => {
  it('Empty object', () => {
    expect(isEmpty({})).toEqual(true);
  });

  it('Not empty object', () => {
    expect(isEmpty({ name: 'Ram' })).toEqual(false);
  });
});

describe('CommonUtil --- getDate', () => {
  it('getDate', () => {
    expect(getDate()).toBeDefined();
  });
});

describe('CommonUtil --- isDuplicate', () => {
  it('isDuplicate', () => {
    expect(isDuplicate(['a', 'b'], 'a')).toBeDefined();
    expect(isDuplicate(['a', 'b'], 'c')).toEqual(false);
  });
});

describe('CommonUtil --- hasPermission', () => {
  it('hasPermission', () => {
    expect(hasPermission('', '')).toBeDefined();
    expect(hasPermission(['user'], 'user')).toEqual(true);
  });
});

describe('CommonUtil --- exactMatchByKey', () => {
  it('exactMatchByKey', () => {
    expect(exactMatchByKey('name', [{ key: 'name' }, { key: 'id' }])).toEqual({ key: 'name' });
    expect(exactMatchByKey('', [])).toEqual(undefined);
  });
});

describe('CommonUtil --- matchBySearchKey', () => {
  it('matchBySearchKey', () => {
    expect(matchBySearchKey('', [])).toBeDefined();
    expect(matchBySearchKey('label', [{ searchKey: 'label' }, { searchKey: 'name' }])).toEqual([
      { searchKey: 'label' },
    ]);
    expect(matchBySearchKey()).toEqual(undefined);
  });
});

describe('CommonUtil --- matchByDynamicKey', () => {
  it('matchByDynamicKey', () => {
    expect(matchByDynamicKey('id', [{ name: 'hello world' }, { id: '007' }])).toEqual('007');
    expect(matchByDynamicKey('', [])).toEqual(undefined);
  });
});
