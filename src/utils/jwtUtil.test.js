import {isTokenExpired, decodeUsername, getToken, isAuthenticated} from "./jwtUtil";
import * as storageUtil from "./storageUtil";

import mockResponse from "../../__mocks__/auth";

const expiredToken = mockResponse.auth.data.data.token;
const invalidToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzd';
const noExpTimeToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsIkxBU1QtQUNDRVNTLVRJTUUiOjE1NDE1MzIxNzk0MzV9.hRuDyjtejz7aO-mgHHMq_0fmCyUuiPauagntgPvwzMY'

describe('jwtUtil --- isTokenExpired', () => {

  it('Empty', () => {
    expect(isTokenExpired()).toEqual(false);
  });

  it('Token is expired', () => {
    expect(isTokenExpired(expiredToken)).toEqual(true);
  });

  it('Valid token', () => {
    expect(isTokenExpired(noExpTimeToken)).toEqual(false);
  });

  it('Invalid token', () => {
    expect(isTokenExpired(invalidToken)).toEqual(false);
  });

});

describe('CommonUtil --- decodeUsername', () => {

  it('Empty', () => {
    expect(decodeUsername()).toEqual(null);
  });

  it('Valid token', () => {
    expect(decodeUsername(expiredToken)).toEqual('admin');
  });

  it('Invalid token', () => {
    expect(decodeUsername(invalidToken)).toEqual(null);
  });

});

describe('CommonUtil --- getToken', () => {

  it('Empty', () => {
    storageUtil.getLocalStorage = jest.fn().mockReturnValue(null);
    expect(getToken()).toEqual(null);
  });

  it('Valid token', () => {
    storageUtil.getLocalStorage = jest.fn().mockReturnValue(expiredToken);
    expect(getToken()).toEqual(expiredToken);
  });

});

describe('CommonUtil --- isAuthenticated', () => {

  it('Not authentication', () => {
    storageUtil.getLocalStorage = jest.fn().mockReturnValue(expiredToken);
    expect(isAuthenticated()).toEqual(false);
  });

});
