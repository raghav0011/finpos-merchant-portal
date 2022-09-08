import React, { createContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import axios from 'axios';

import {
  API_URL,
  JWT_TOKEN,
  USER_FULL_NAME,
  PERMISSION_KEY,
  LOGGED_IN_USER,
  LOGGED_IN_USER_ID,
  LOGGED_IN_USER_IMAGE,
} from '../../../../constants';
import { clearLocalStorage, getLocalStorage, setLocalStorage } from '../../../../utils/storageUtil';
import history from '../../../../utils/history';
import { isAuthenticated } from '../../../../utils/jwtUtil';
import { updateUiHeader } from '../../../../layout/duck/actions';

const AuthContext = createContext({
  user: {},
  isAuthenticated: false,
});

// const setPermissions = (response) => {
//   if (`${response.data.data[0]?.generation}`) {
//     if (Array.isArray(response.data.data[0]?.generation)) {
//       setLocalStorage(PERMISSION_KEY, response.data.data[0]?.generation);
//     } else {
//       setLocalStorage(PERMISSION_KEY, [`${response.data.data[0]?.generation}`]);
//     }
//   }
// };

const AuthProvider = (props) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(getLocalStorage('user') || {});
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(isAuthenticated() || false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [otpToken, setOtpToken] = useState(undefined);
  const [tokenKey, setTokenKey] = useState(undefined);

  const state = { errorMessage, user, loading, authenticated, userId, setErrorMessage, otpToken };

  const login = ({ userId, password }) => {
    setLoading(true);
    return axios
      .post(API_URL + '/auths/v1/auths', { userId, password })
      .then((response) => {
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        setErrorMessage(err.response.data);
      });
  };

  // const otpVerify = (formData, jwt) => {
  //   setLoading(true);
  //   setErrorMessage();
  //   return axios
  //     .post(API_URL + '/config/v1/users/verify-otp', formData, {
  //       headers: {
  //         Authorization: `bearer ${jwt}`,
  //       },
  //     })
  //     .then((response) => {
  //       if (response.data.success) {
  //         setAuthenticated(true);
  //         // setLocalStorage(PERMISSION_KEY, response.data.data[0].permissions);

  //         setLocalStorage(JWT_TOKEN, response.data.data[0].jwt_token);
  //         setLocalStorage(USER_FULL_NAME, response.data.data[0].full_name);
  //         setLocalStorage(LOGGED_IN_USER, response.data.data[0].login_id);
  //         setLocalStorage(LOGGED_IN_USER_ID, response.data.data[0].id);
  //         setLocalStorage(LOGGED_IN_USER_IMAGE, response.data.data[0]?.profile_picture);
  //         setPermissions(response);
  //         dispatch(
  //           updateUiHeader(response.data.data[0].full_name, response.data.data[0]?.profile_picture)
  //         );
  //         setErrorMessage(undefined);
  //         setLoading(false);
  //         history.push('/dashboard');
  //       }
  //     })
  //     .catch((error) => {
  //       setErrorMessage(error.response.data);
  //       setLoading(false);
  //     });
  // };

  // const resend = () => {
  //   setErrorMessage();
  //   return axios
  //     .post(
  //       API_URL + '/config/v1/users/resend-otp',
  //       {
  //         sys_user_id: userId,
  //         token_key: tokenKey,
  //         ip_address: null,
  //       },
  //       {
  //         headers: {
  //           Authorization: `bearer ${otpToken}`,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       if (response.data.success) {
  //         message.success('OTP resend successful');
  //         return response;
  //       } else {
  //         message.warn('Something went wrong.');
  //       }
  //     })
  //     .catch((error) => {
  //       message.error('OTP resend unsuccessful');
  //       throw error.response.data;
  //     });
  // };

  // const resetPassword = (formData) => {
  //   setErrorMessage();
  //   setLoading(true);
  //   return axios
  //     .post(API_URL + '/config/v1/users/reset-password', formData)
  //     .then((response) => {
  //       setLoading(false);
  //       if (response.data.success) {
  //         message.success('Password reset successful');
  //         history.push('/otp');
  //       } else {
  //         message.warn('Something went wrong.');
  //       }
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       message.error('Password reset unsuccessful');
  //       setErrorMessage(error.response.data);
  //     });
  // };

  // const forgotPassword = (formData) => {
  //   setErrorMessage();
  //   setLoading(true);
  //   return axios
  //     .post(API_URL + '/config/v1/users/forgot-password', formData)
  //     .then((response) => {
  //       setLoading(false);
  //       if (response.data.success) {
  //         message.success('Reset password link has been sent to your email.');
  //         history.push('/');
  //       } else {
  //         message.warn('Something went wrong.');
  //       }
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       message.error('Error sending email');
  //       setErrorMessage(error.response.data);
  //     });
  // };

  // const logout = () => {
  //   axios.post(
  //     API_URL + '/config/v1/auths/logout',
  //     {},
  //     {
  //       headers: {
  //         Authorization: `bearer ${getLocalStorage(JWT_TOKEN)}`,
  //       },
  //     }
  //   );
  //   clearLocalStorage(JWT_TOKEN);
  //   clearLocalStorage(PERMISSION_KEY);
  //   clearLocalStorage(USER_FULL_NAME);
  //   clearLocalStorage(LOGGED_IN_USER);
  //   clearLocalStorage(LOGGED_IN_USER_ID);
  //   clearLocalStorage(LOGGED_IN_USER_IMAGE);

  //   setUser({});
  //   setAuthenticated(false);
  //   history.push('/');
  // };

  return (
    <AuthContext.Provider
      {...props}
      value={{
        ...state,
        login: login,
        // logout: logout,
        // otpVerify,
        // resend,
        // resetPassword,
        // forgotPassword,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
