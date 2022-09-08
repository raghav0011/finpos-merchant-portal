import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';

import { fetch, store, update } from '../../../utils/httpUtil';
import { getLocalStorage } from '../../../utils/storageUtil';

export const AddUser = createAsyncThunk(
  'user/Adduser',
  (formData, { rejectWithValue, dispatch }) => {
    return store(`v1/users`, formData)
      .then((response) => {
        if (response.status === 200) {
          // return response.data.data;
          message.success('Request added. Please wait for verification.');
        } else {
          // TODO
        }
        return response;
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const fetchUserById = createAsyncThunk('user/id', (id, { rejectWithValue }) => {
  return fetch(`v1/users/${id}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data.data;
      } else {
        // TODO
      }
    })
    .catch((error) => rejectWithValue(error.response.data));
});

export const modifyUserById = createAsyncThunk(
  'user/modify',
  ({ formData, userId }, { rejectWithValue }) => {
    return update(`v1/users/${userId}`, formData)
      .then((response) => {
        if (response.status === 200) {
          message.success('Request edited . Please wait for verification.');
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const fetchUserListByCriteria = createAsyncThunk(
  'user/list',
  (formData, { rejectWithValue }) => {
    return store(`v1/users/search`, formData)
      .then((response) => {
        if (response.status === 200) {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    payload: {},
    detailPayload: {},
    loading: false,
    detailLoading: false,
    errors: {},
    detailErrors: false,
    pagination: {},
  },
  reducers: {
    cleanUser(state) {
      state.loading = false;
      state.detailLoading = false;
      state.payload = {};
      state.detailPayload = {};
      state.errors = {};
      state.detailErrors = {};
      state.pageInfo = {
        page: 0,
        perPage: 0,
        total: 0,
        totalPages: 0,
      };
    },

    cleanUserDetail(state) {
      state.detailLoading = false;
      state.detailPayload = [];
      state.detailErrors = {};
    },
    cleanUserErrors(state) {
      state.loading = false;
      state.errors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(AddUser.fulfilled, (state, action) => {
        state.loading = false;
        state.payload = {};
        state.errors = {};
      })
      .addCase(AddUser.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(fetchUserById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.detailPayload = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailErrors = action.payload;
      })
      .addCase(modifyUserById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(modifyUserById.fulfilled, (state, action) => {
        state.loading = false;
        // state.payload = action.payload;
      })
      .addCase(modifyUserById.rejected, (state, action) => {
        state.loading = false;
        // state.errors = action.payload
      })

      .addCase(fetchUserListByCriteria.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUserListByCriteria.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUserListByCriteria.fulfilled, (state, action) => {
        state.loading = false;
        state.payload = action.payload;
        state.errors = {};
        state.pagination = {
          page: action.payload?.pageInfo?.page,
          perPage: action.payload?.pageInfo?.perPage,
          total: action.payload?.pageInfo?.total,
          totalPages: action.payload?.pageInfo?.totalPages,
          // showSizeChanger: true,
        };
      });
  },
});

export const { cleanUser, cleanUserErrors, cleanUserDetail } = userSlice.actions;
