import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../../../utils/httpUtil';
const base = 'transaction-manager/v1/admin/dashboard';

export const fetchTransactionListByCriteria = createAsyncThunk(
  'dashboard/list',
  (formData, { rejectWithValue }) => {
    return store(`${base}/search`, formData)
      .then((response) => {
        if (response.data.success) {
          return response.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);
export const fetchDashboardSummary = createAsyncThunk(
  'summary/list',
  (formData, { rejectWithValue }) => {
    return store(`${base}/summary`, formData)
      .then((response) => {
        if (response.data.success) {
          return response.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);
const listPending = ['dashboard/list/pending'];
const listFulfilled = ['dashboard/list/fulfilled'];
const listRejected = ['dashboard/list/rejected'];

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    detailPayload: {},
    payload: [],
    detailLoading: false,
    loading: false,
    detailErrors: {},
    errors: {},
    pagination: {},
  },
  reducers: {
    cleanDashboard(state) {
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

    cleanDashboardList(state) {
      state.loading = false;
      state.payload = [];
      state.errors = {};
    },

    cleanDashboardErrors(state) {
      state.loading = false;
      state.detailLoading = false;
      state.errors = {};
      state.detailErrors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => listPending.includes(action.type),
        (state, action) => {
          state.loading = true;
        }
      )

      .addMatcher(
        (action) => listRejected.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.errors = action.payload;
        }
      )

      .addMatcher(
        (action) => listFulfilled.includes(action.type),
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
        }
      );
  },
});

export const { cleanDashboard, cleanDashboardErrors, cleanDashboardList } = dashboardSlice.actions;

export default dashboardSlice;
