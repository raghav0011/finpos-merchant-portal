import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { message } from 'antd';

import { fetch, store, update } from '../../../utils/httpUtil';

export const fetchPasswordPolicy = createAsyncThunk('passwordPolicy', (_, { rejectWithValue }) => {
  return fetch('config/v1/password-policy')
    .then((response) => {
      if (response.data.success) {
        return response.data.data[0];
      } else {
        // TODO
      }
    })
    .catch((error) => rejectWithValue(error?.response?.data || error));
});

export const fetchPendingPasswordPolicy = createAsyncThunk(
  'passwordPolicy/pending',
  (_, { rejectWithValue }) => {
    return fetch('auths/v1/configs/draft/details')
      .then((response) => {
        if (response.data.message === 'SUCCESS') {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error?.response?.data || error));
  }
);

export const updatePasswordPolicy = createAsyncThunk(
  'passwordPolicy/update',
  (formData, { dispatch, rejectWithValue }) => {
    return update('config/v1/password-policy', formData)
      .then((response) => {
        if (response.data.success) {
          message.success('password updated successfully.');
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error?.response?.data || error));
  }
);

export const approvePasswordPolicyChanges = createAsyncThunk(
  'passwordPolicy/approve',
  (formData, { dispatch, rejectWithValue }) => {
    return store('auths/v1/configs/approve', formData)
      .then((response) => {
        if (response.data.message === 'SUCCESS') {
          message.success('password policy approved.');
          dispatch(push('/dashboard'));
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error?.response?.data || error));
  }
);

export const rejectPasswordPolicyChanges = createAsyncThunk(
  'passwordPolicy/rejected',
  (formData, { dispatch, rejectWithValue }) => {
    return store('auths/v1/configs/reject', formData)
      .then((response) => {
        if (response.data.message === 'SUCCESS') {
          message.success('password policy rejected.');
          dispatch(push('/dashboard'));
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error?.response?.data || error));
  }
);

const passwordPolicySlice = createSlice({
  name: 'passwordPolicy',
  initialState: {
    payload: [],
    loading: false,
    errors: {},
  },

  reducers: {
    cleanPasswordPolicy(state) {
      state.payload = [];
      state.loading = false;
      state.errors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.startsWith('passwordPolicy') && action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('passwordPolicy') && action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.loading = false;
          state.payload = action.payload;
          state.errors = {};
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('passwordPolicy') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.errors = action.payload;
        }
      );
  },
});

export const { cleanPasswordPolicy } = passwordPolicySlice.actions;
export default passwordPolicySlice;
