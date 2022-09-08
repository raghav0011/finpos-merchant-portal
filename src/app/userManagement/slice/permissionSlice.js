import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';

import { fetch, store, update } from '../../../utils/httpUtil';

export const fetchPermission = createAsyncThunk('permissions', (_, { rejectWithValue }) => {
  return fetch(`v1/roles/permissions`)
    .then((response) => {
      console.log('🚀 ~ file: roleSlice.js ~ line 62 ~ .then ~ response', response?.data?.data);
      return response.data.data;
    })
    .catch((error) => rejectWithValue(error?.response?.data || error));
});
export const permissionSlice = createSlice({
  name: 'permission',
  initialState: {
    payload: [],
    loading: false,
    errors: {},
  },
  reducers: {
    cleanPermission(state) {
      state.payload = [];
      state.loading = false;
      state.errors = {};
    },
  },
  extraReducers: {
    [fetchPermission.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchPermission.fulfilled]: (state, action) => {
      state.payload = action.payload;
      state.loading = false;
      state.errors = {};
    },
    [fetchPermission.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
  },
});
export const { cleanPermission } = permissionSlice.actions;
