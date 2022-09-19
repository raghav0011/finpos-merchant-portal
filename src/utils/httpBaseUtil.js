import axios from 'axios';
import { message } from 'antd';

import history from './history';
import {
  API_URL,
  JWT_TOKEN,
  USER_FULL_NAME,
  LOGGED_IN_USER,
  PERMISSION_KEY,
  LANGUAGE_KEY,
  LOGGED_IN_USER_ID,
  LOGGED_IN_USER_IMAGE,
} from '../constants';
import { getLocalStorage, setLocalStorage, clearLocalStorage } from './storageUtil';

const normalHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-XSRF-TOKEN': `${getLocalStorage(JWT_TOKEN)}`,
};
const downloadableHeaders = {
  Accept: '*/*',
  'Content-Type': 'application/json',
  'X-XSRF-TOKEN': `${getLocalStorage(JWT_TOKEN)}`,
};

export const httpBase = (isDownloadable = false) => {
  const api = axios.create({
    baseURL: `${API_URL}`,
    headers: isDownloadable ? downloadableHeaders : normalHeaders,
    responseType: isDownloadable ? 'blob' : 'json',
  });

  api.interceptors.response.use(
    (response) => {
      if (response.headers && response.headers['x-xsrf-token']) {
        setLocalStorage(JWT_TOKEN, response.headers['x-xsrf-token']);
      }
      return response;
    },
    (error) => {
      if (401 === error.response.status) {
        axios.post(
          API_URL + '/config/v1/auths/logout',
          {},
          {
            headers: {
              Authorization: `bearer ${getLocalStorage(JWT_TOKEN)}`,
            },
          }
        );
        clearLocalStorage(JWT_TOKEN);
        clearLocalStorage(PERMISSION_KEY);
        clearLocalStorage(USER_FULL_NAME);
        clearLocalStorage(LOGGED_IN_USER);
        clearLocalStorage(LOGGED_IN_USER_ID);
        clearLocalStorage(LOGGED_IN_USER_IMAGE);
        clearLocalStorage(LANGUAGE_KEY);
        message.error('You are Unauthorized to perform this operation.');
        history.push('/');
      }
      if (404 === error.response.status) {
        // message.error('Not Found.');
      }
      if (500 === error.response.status) {
        // message.error('Internal Server Error.');
      }
      // console.log('🚀 ~ file: httpBaseUtil.js ~ line 37 ~ httpBase ~ error', error);

      return Promise.reject(error);
    }
  );

  return api;
};
