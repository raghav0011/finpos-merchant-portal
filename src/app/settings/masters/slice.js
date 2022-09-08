import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';

import { store, fetch, update } from '../../../utils/httpUtil';

export const fetchMasters = createAsyncThunk('masters', (formData = {}, { rejectWithValue }) => {
  return store('config/v1/admin/masters/search', formData)
    .then((response) => {
      if (response.data.success) {
        return response.data.data;
      } else {
        // TODO
      }
    })
    .catch((error) => rejectWithValue(error.response.data));
});

export const fetchMastersByObjectType = createAsyncThunk(
  'masters/object_type',
  (object_type, { rejectWithValue }) => {
    return fetch(`config/v1/admin/masters/${object_type}`)
      .then((response) => {
        if (response.data.success) {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  },
);

export const fetchMastersByIdentifier = createAsyncThunk(
  'masters/detail',
  (id, { rejectWithValue }) => {
    return fetch(`config/v1/admin/masters/detail/${id}`)
      .then((response) => {
        if (response.data.success) {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  },
);

export const addMasters = createAsyncThunk(
  'masters/add',
  (formData, { dispatch, rejectWithValue }) => {
    return store(`config/v1/admin/masters`, formData)
      .then((response) => {
        if (response.data.success) {
          message.success('Masters Added Successfully.');
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => {
        return rejectWithValue(error.response.data);
      });
  },
);

export const updateMasters = createAsyncThunk('masters/update', (formData, { rejectWithValue }) => {
  return update(`config/v1/admin/masters/${formData.id}`, formData.formData)
    .then((response) => {
      if (response.data.success) {
        message.success('Master data updated.');
        return response.data.data;
      } else {
        // TODO
      }
    })
    .catch((error) => {
      return rejectWithValue(error.response.data);
    });
});

// Send master data update request and return data for user update (locked data)[prevent multiple updates at the same time]
export const fetchMasterUpdateRequestById = createAsyncThunk(
  'masters/update/detail',
  (identifier, { rejectWithValue }) => {
    return fetch(`config/v1/admin/masters/${identifier}/update-request`)
      .then((response) => {
        if (response.data.success) {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  },
);

const mastersPendingList = ['masters/pending', 'masters/object_type/pending'];

const mastersDetailPendingList = [
  'masters/detail/pending',
  'masters/add/pending',
  'masters/update/pending',
  'masters/update/detail/pending',
];

const mastersRejectedList = ['masters/rejected', 'masters/object_type/rejected'];

const mastersDetailRejectedList = [
  'masters/detail/rejected',
  'masters/add/rejected',
  'masters/update/rejected',
  'masters/update/detail/rejected',
];

const genericMastersResponseFulfilled = ['masters/add/fulfilled', 'masters/update/fulfilled'];

const arrayMastersResponseFulfilled = ['masters/fulfilled', 'masters/object_type/fulfilled'];

const detailMastersResponseFulfilledList = [
  'masters/detail/fulfilled',
  'masters/update/detail/fulfilled',
];

export const masterSlice = createSlice({
  name: 'masters',
  initialState: {
    detailPayload: {},
    payload: [],
    loading: false,
    detailLoading: false,
    errors: {},
    detailErrors: {},
    pagination: {},
  },
  reducers: {
    cleanMasters(state) {
      state.loading = false;
      state.detailLoading = false;
      state.detailPayload = [];
      state.payload = [];
      state.errors = {};
      state.detailErrors = {};
      state.pagination = {
        current: 0,
        pageSize: 0,
        total: 0,
        totalPage: 0,
      };
    },

    cleanMastersDetails(state) {
      state.detailLoading = false;
      state.detailPayload = [];
      state.detailErrors = {};
    },

    cleanMastersErrors(state) {
      state.loading = false;
      state.detailLoading = false;
      state.errors = {};
      state.detailErrors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => mastersPendingList.includes(action.type),
        (state, action) => {
          state.loading = true;
        },
      )
      .addMatcher(
        (action) => mastersDetailPendingList.includes(action.type),
        (state, action) => {
          state.detailLoading = true;
        },
      )
      .addMatcher(
        (action) => mastersRejectedList.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.errors = action.payload;
        },
      )
      .addMatcher(
        (action) => mastersDetailRejectedList.includes(action.type),
        (state, action) => {
          state.detailLoading = false;
          state.detailErrors = action.payload;
        },
      )
      .addMatcher(
        (action) => genericMastersResponseFulfilled.includes(action.type),
        (state, action) => {
          state.detailLoading = false;
        },
      )
      .addMatcher(
        (action) => arrayMastersResponseFulfilled.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.payload = action.payload;
          state.errors = {};
          state.pagination = {
            current: action.payload?.pagination?.page_number,
            pageSize: action.payload?.pagination?.page_size,
            total: action.payload?.pagination?.total_records,
            totalPage: action.payload?.pagination?.total_pages,
            showSizeChanger: true,
          };
        },
      )
      .addMatcher(
        (action) => detailMastersResponseFulfilledList.includes(action.type),
        (state, action) => {
          state.detailLoading = false;
          state.detailPayload = action.payload?.[0];
          state.detailErrors = {};
        },
      );
  },
});

export const { cleanMasters, cleanMastersErrors, cleanMastersDetails } = masterSlice.actions;

export default masterSlice;
