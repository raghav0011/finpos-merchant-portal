import React from "react";

import {setLocalStorage, getLocalStorage} from './storageUtil';
import mockResponse from '../../__mocks__/auth';

const KEY = 'token';
const VALUE = mockResponse.auth.data.data.token;
const VALUE_INT = 100400300200;

describe('storageUtil --- setLocalStorage', () => {

  it('should store the token in localStorage', () => {
    setLocalStorage(KEY, VALUE);
    expect(localStorage.getItem(KEY)).toEqual(VALUE);
  });

  it('should stringify and store the token in localStorage', () => {
    setLocalStorage(KEY, VALUE_INT);
    expect(localStorage.getItem(KEY)).toEqual(JSON.stringify(VALUE_INT));
  });

});

describe('storageUtil --- getLocalStorage', () => {

  it('should return stored token from localStorage', () => {
    localStorage.setItem(KEY, VALUE);
    expect(getLocalStorage(KEY)).toEqual(VALUE);
  });

});
