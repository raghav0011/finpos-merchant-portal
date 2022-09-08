import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { fetch, store, update } from '../../../utils/httpUtil';

export const addRole = createAsyncThunk('role/addRole', (formData, { rejectWithValue }) => {
  return store(`v1/roles`, formData)
    .then((response) => {
      if (response.status === 200) {
        console.log(' I have reached here');
        message.success('Role added successfully');
      } else {
        //TO DO
      }
    })
    .catch((error) => rejectWithValue(error.response.data));
});

export const fetchRoleById = createAsyncThunk('role/id', (id, { rejectWithValue }) => {
  return fetch(`v1/roles/${id}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data.data;
      } else {
        // TODO
      }
    })
    .catch((error) => rejectWithValue(error.response.data));
});

export const modifyRoleById = createAsyncThunk(
  'role/modify',
  ({ formData, roleId }, { rejectWithValue }) => {
    return update(`v1/roles/${roleId}`, formData)
      .then((response) => {
        if (response.status === 200) {
          // return response.data.data;
          // message.success('')
          message.success('Role updated successfully');
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const fetchRoleWithCriteria = createAsyncThunk(
  'role/list',
  (formData, { rejectWithValue }) => {
    return store(`v1/roles/search`, formData)
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

export const roleSlice = createSlice({
  name: 'role',
  initialState: {
    payload: {},
    detailPayload: {},
    loading: false,
    errors: {},
    pagination: {},
  },
  reducers: {
    cleanRole(state) {
      state.loading = false;
      state.payload = [];
      state.errors = {};
      state.pageInfo = {
        page: 0,
        perPage: 0,
        total: 0,
        totalPages: 0,
      };
    },
    cleanRoleErrors(state) {
      state.loading = false;
      state.errors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRole.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.loading = false;
        state.payload = action.payload;
        state.errors = {};
      })
      .addCase(addRole.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchRoleById.pending, (state, action) => {
        state.detailLoading = true;
      })
      .addCase(fetchRoleById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.detailPayload = action.payload;
      })
      .addCase(fetchRoleById.rejected, (state, action) => {
        state.detailLoading = false;
      })
      .addCase(modifyRoleById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(modifyRoleById.fulfilled, (state, action) => {
        state.loading = false;
        state.payload = action.payload;
      })
      .addCase(modifyRoleById.rejected, (state, action) => {
        state.loading = false;
        // state.errors = action.payload
      })
      .addCase(fetchRoleWithCriteria.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchRoleWithCriteria.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchRoleWithCriteria.fulfilled, (state, action) => {
        state.loading = false;
        state.payload = action.payload;
        state.errors = {};
        state.pagination = {
          page: action.payload?.pageInfo?.page,
          perPage: action.payload?.pageInfo.perPage,
          total: action.payload?.pageInfo.total,
          totalPages: action.payload?.pageInfo.totalPages,
          // showSizeChanger: true,
        };
      });
  },
});

export const { cleanRole, cleanRoleErrors } = roleSlice.actions;
