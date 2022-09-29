import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetch, store } from '../../../utils/httpUtil';

export const fetchTodayTransactionWithCriteria = createAsyncThunk(
  'transaction/todaylist',
  (formData, { rejectWithValue }) => {
    return store('v1/filter-transactions', formData)
      .then((response) => {
        if (response.data.message === 'SUCCESS') {
          return response.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const fetchTransactionListByCriteria = createAsyncThunk(
  'transaction/list',
  (formData, { rejectWithValue }) => {
    return store('v1/filter-transactions', formData)
      .then((response) => {
        if (response.data.message === 'SUCCESS') {
          return response.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);
export const fetchTransactionWatchListWithCriteria = createAsyncThunk(
  'transaction/Watchlist',
  (formData, { rejectWithValue }) => {
    return store('v1/watchlist', formData)
      .then((response) => {
        if (response.data.message === 'SUCCESS') {
          return response.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

const transactionListPending = ['transaction/list/pending'];
const transactionListFulfilled = ['transaction/list/fulfilled'];
const transactionListRejected = ['transaction/list/rejected'];

const transactionTodayListPending = ['transaction/todaylist/pending'];
const transactionTodayListFulfilled = ['transaction/todaylist/fulfilled'];
const transactionTodayListRejected = ['transaction/todaylist/rejected'];

const transactionWatchListPending = ['transaction/Watchlist/pending'];
const transactionWatchListFulfilled = ['transaction/Watchlist/fulfilled'];
const transactionWatchListRejected = ['transaction/Watchlist/rejected'];

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    payload: [],
    loading: false,
    errors: {},
    pagination: {},
    totalApprovedAmounts: [],
  },
  reducers: {
    cleanTransactionList(state) {
      state.loading = false;
      state.payload = [];
      state.errors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => transactionListPending.includes(action.type),
        (state, action) => {
          state.loading = true;
        }
      )

      .addMatcher(
        (action) => transactionListRejected.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.errors = action.data;
        }
      )

      .addMatcher(
        (action) => transactionListFulfilled.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.payload = [...state.payload, ...action.payload.data.data];
          state.errors = {};
          state.pagination = {
            current: action.payload.data.currentPage,
            pageSize: action.payload.data.pageSize,
            total: action.payload.data.totalRecord,
            totalPage: action.payload.data.totalPage,
            showSizeChanger: true,
          };
          state.totalApprovedAmounts = action.payload.data.totalApprovedAmounts;
        }
      )
      .addMatcher(
        (action) => transactionWatchListPending.includes(action.type),
        (state, action) => {
          state.loading = true;
        }
      )

      .addMatcher(
        (action) => transactionWatchListRejected.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.errors = action.data;
        }
      )

      .addMatcher(
        (action) => transactionWatchListFulfilled.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.payload = [...state.payload, ...action.payload.data.data];
          state.errors = {};
          state.pagination = {
            current: action.payload.data.currentPage,
            pageSize: action.payload.data.pageSize,
            total: action.payload.data.totalRecord,
            totalPage: action.payload.data.totalPage,
            showSizeChanger: true,
          };
        }
      )
      .addMatcher(
        (action) => transactionTodayListPending.includes(action.type),
        (state, action) => {
          state.loading = true;
        }
      )

      .addMatcher(
        (action) => transactionTodayListRejected.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.errors = action.data;
        }
      )

      .addMatcher(
        (action) => transactionTodayListFulfilled.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.payload = [...state.payload, ...action.payload.data.data];
          state.errors = {};
          state.pagination = {
            current: action.payload.data.currentPage,
            pageSize: action.payload.data.pageSize,
            total: action.payload.data.totalRecord,
            totalPage: action.payload.data.totalPage,
            showSizeChanger: true,
          };
          state.totalApprovedAmounts = action.payload.data.totalApprovedAmounts;
        }
      );
  },
});

//TRANSACTIONFILTERFIELD
// 12
export const fetchTransactionFilterField = createAsyncThunk(
  'transaction/filterfield',
  (_, { rejectWithValue }) => {
    return fetch('v1/filter-fields/transactions')
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

export const transactionFilterFieldSlice = createSlice({
  name: 'transactionFilterField',
  initialState: {
    payload: [],
    loading: false,
    errors: {},
    pagination: {},
  },
  extraReducers: {
    // 12
    [fetchTransactionFilterField.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchTransactionFilterField.fulfilled]: (state, action) => {
      state.loading = false;
      state.payload = action.payload;
      state.errors = {};
    },
    [fetchTransactionFilterField.rejected]: (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    },
  },
  reducers: {
    cleanTransactionFilterField(state) {
      state.payload = [];
      state.loading = false;
      state.errors = {};
    },
  },
});
export const { cleanTransaction, cleanTransactionList } = transactionSlice.actions;
export const { cleanTransactionFilterField } = transactionFilterFieldSlice.actions;
export default transactionSlice;
