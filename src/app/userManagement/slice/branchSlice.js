import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';

import { fetch, store, update } from '../../../utils/httpUtil';
import { getLocalStorage } from '../../../utils/storageUtil';

// const base = 'v1/'

export const AddBranch = createAsyncThunk(
  'branch/Addbranch',
  (formData, { rejectWithValue, dispatch }) => {
    return store(`v1/branches`, formData)
      .then((response) => {
        if (response.status === 200) {
          // return response.data.data;
          message.success('Request added . Please wait for verification.');
        } else {
          // TODO
        }
        return response;
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const fetchBranchById = createAsyncThunk('branch/id', (id, { rejectWithValue }) => {
  return fetch(`v1/branches/${id}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data.data;
      } else {
        // TODO
      }
    })
    .catch((error) => rejectWithValue(error.response.data));
});

export const modifyBranchById = createAsyncThunk(
  'branch/modify',
  ({ formData, branchId }, { rejectWithValue }) => {
    return update(`v1/branches/${branchId}`, formData)
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

export const fetchBranchListByCriteria = createAsyncThunk(
  'branch/list',
  (formData, { rejectWithValue }) => {
    return store(`v1/branches/search `, formData)
      .then((response) => {
        console.log('🚀 ~ file: branchSlice.js ~ line 60 ~ .then ~ response', response);
        if (response.status === 200) {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const branchSlice = createSlice({
  name: 'branch',
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
    cleanBranch(state) {
      state.loading = false;
      state.detailLoading = false;
      state.payload = {};
      state.detailPayload = {};
      state.errors = {};
      state.detailErrors = {};
      state.pagination = {
        page: 0,
        perPage: 0,
        total: 0,
        totalPages: 0,
      };
    },
    cleanBranchDetail(state) {
      state.detailLoading = false;
      state.detailPayload = [];
      state.detailErrors = {};
    },
    cleanBranchErrors(state) {
      state.loading = false;
      state.errors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddBranch.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(AddBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.payload = {};
        state.errors = {};
      })
      .addCase(AddBranch.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(fetchBranchById.pending, (state, action) => {
        state.detailLoading = true;
      })
      .addCase(fetchBranchById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.detailPayload = action.payload;
      })
      .addCase(fetchBranchById.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailErrors = action.payload;
      })
      .addCase(modifyBranchById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(modifyBranchById.fulfilled, (state, action) => {
        state.loading = false;
        // state.payload = action.payload;
      })
      .addCase(modifyBranchById.rejected, (state, action) => {
        state.loading = false;
        // state.errors = action.payload
      })

      .addCase(fetchBranchListByCriteria.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchBranchListByCriteria.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchBranchListByCriteria.fulfilled, (state, action) => {
        console.log('🚀 ~ file: branchSlice.js ~ line 133 ~ .addCase ~ action', action.payload);
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

export const { cleanBranch, cleanBranchErrors, cleanBranchDetail } = branchSlice.actions;
