import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetch } from '../../../utils/httpUtil';

const base = 'transaction-manager/v1/admin/dashboard';

export const fetchDashboardSummary = createAsyncThunk(
  'summary/list',
  (formData, { rejectWithValue }) => {
    return fetch(`${base}/summary`, formData)
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
const summaryPending = ['summary/list/pending'];
const summaryFulfilled = ['summary/list/fulfilled'];
const summaryRejected = ['summary/list/rejected'];

export const dashboardSummarySlice = createSlice({
  name: 'summary',
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
    cleanSummary(state) {
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

    cleanDashboardSummary(state) {
      state.loading = false;
      state.payload = [];
      state.errors = {};
    },

    cleanDashboardSummaryErrors(state) {
      state.loading = false;
      state.detailLoading = false;
      state.errors = {};
      state.detailErrors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => summaryPending.includes(action.type),
        (state, action) => {
          state.loading = true;
        }
      )

      .addMatcher(
        (action) => summaryRejected.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.errors = action.payload;
        }
      )

      .addMatcher(
        (action) => summaryFulfilled.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.payload = action.payload.data;
          state.errors = {};
        }
      );
  },
});

export const { cleanSummary, cleanDashboardSummaryErrors, cleanDashboardSummary } =
  dashboardSummarySlice.actions;

export default dashboardSummarySlice;
