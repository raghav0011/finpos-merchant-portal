import jwtDecode from 'jwt-decode';
import { getLocalStorage } from './storageUtil';
import { JWT_TOKEN } from '../constants';

export let isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (e) {
    return false;
  }
};

export let decodeUsername = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.sub;
  } catch (e) {
    return null;
  }
};

export let getToken = () => {
  return getLocalStorage(JWT_TOKEN);
};

export let isAuthenticated = () => {
  return !!getToken() && !isTokenExpired(getToken());
};
