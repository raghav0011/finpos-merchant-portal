import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';

import { store, fetch, update } from '../../../utils/httpUtil';

export const fetchFields = createAsyncThunk('fields', (formData = {}, { rejectWithValue }) => {
  return store('config/v1/form-fields/search', formData)
    .then((response) => {
      if (response.data.success) {
        return response.data.data;
      } else {
        // TODO
      }
    })
    .catch((error) => rejectWithValue(error.response.data));
});

export const fetchFieldsByIdentifier = createAsyncThunk(
  'fields/detail',
  (id, { rejectWithValue }) => {
    return fetch(`config/v1/form-fields/${id}`)
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

export const addFields = createAsyncThunk(
  'fields/add',
  (formData, { dispatch, rejectWithValue }) => {
    return store(`config/v1/form-fields`, formData)
      .then((response) => {
        if (response.data.success) {
          message.success('Field Added Successfully.');
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

export const updateFields = createAsyncThunk(
  'fields/update',
  ({ id, formData }, { rejectWithValue }) => {
    return update(`config/v1/form-fields/${id}`, formData)
      .then((response) => {
        if (response.data.success) {
          message.success('Form Field Updated.');
          return response.data.data;
        } else {
        }
      })
      .catch((error) => {
        return rejectWithValue(error.response.data);
      });
  },
);

// Send field data update request and return data for user update (locked data)[prevent multiple updates at the same time]
export const fetchFieldUpdateRequestById = createAsyncThunk(
  'fields/update/detail',
  (identifier, { rejectWithValue }) => {
    return fetch(`config/v1/form-fields/${identifier}/update-request`)
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

// fetch field name by customer type and category
export const fetchFieldsName = createAsyncThunk(
  'fields/name',
  ({ customer_category, customer_type }, { rejectWithValue }) => {
    return fetch(`config/v1/form-fields/${customer_category}/${customer_type}`)
      .then((response) => {
        if (response.data.success) {
          return { data: response.data.data };
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  },
);

// fetch default fields  by customer type and category
export const fetchFieldsIfDefault = createAsyncThunk(
  'fields/default',
  ({ customer_category, customer_type }, { rejectWithValue }) => {
    return fetch(`config/v1/form-fields/default/${customer_category}/${customer_type}`)
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

const fieldsPendingList = ['fields/pending', 'fields/name/pending', 'fields/default/pending'];

const fieldsDetailPendingList = [
  'fields/detail/pending',
  'fields/add/pending',
  'fields/update/pending',
  'fields/update/detail/pending',
];

const fieldsRejectedList = ['fields/rejected', 'fields/name/rejected', 'fields/default/rejected'];

const fieldsDetailRejectedList = [
  'fields/detail/rejected',
  'fields/add/rejected',
  'fields/update/rejected',
  'fields/update/detail/rejected',
];

const genericFieldsResponseFulfilled = ['fields/add/fulfilled', 'fields/update/fulfilled'];

const arrayFieldsResponseFulfilled = [
  'fields/fulfilled',
  'fields/name/fulfilled',
  'fields/default/fulfilled',
];

const detailFieldsResponseFulfilledList = [
  'fields/detail/fulfilled',
  'fields/update/detail/fulfilled',
];

export const fieldsSlice = createSlice({
  name: 'fields',
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
    cleanFields(state) {
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

    cleanFieldsDetails(state) {
      state.detailLoading = false;
      state.detailPayload = [];
      state.detailErrors = {};
    },

    cleanFieldsErrors(state) {
      state.loading = false;
      state.detailLoading = false;
      state.errors = {};
      state.detailErrors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => fieldsPendingList.includes(action.type),
        (state, action) => {
          state.loading = true;
        },
      )
      .addMatcher(
        (action) => fieldsDetailPendingList.includes(action.type),
        (state, action) => {
          state.detailLoading = true;
        },
      )
      .addMatcher(
        (action) => fieldsRejectedList.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.errors = action.payload;
        },
      )
      .addMatcher(
        (action) => fieldsDetailRejectedList.includes(action.type),
        (state, action) => {
          state.detailLoading = false;
          state.detailErrors = action.payload;
        },
      )
      .addMatcher(
        (action) => genericFieldsResponseFulfilled.includes(action.type),
        (state, action) => {
          state.detailLoading = false;
        },
      )
      .addMatcher(
        (action) => arrayFieldsResponseFulfilled.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.payload = action.payload.data;
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
        (action) => detailFieldsResponseFulfilledList.includes(action.type),
        (state, action) => {
          state.detailLoading = false;
          state.detailPayload = action.payload?.[0];
          state.detailErrors = {};
        },
      );
  },
});

export const { cleanFields, cleanFieldsErrors, cleanFieldsDetails } = fieldsSlice.actions;

export default fieldsSlice;
