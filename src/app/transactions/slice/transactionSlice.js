import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetch, store } from '../../../utils/httpUtil';

const base = 'transaction-manager/v1/admin/transactions';

export const performTransaction = createAsyncThunk(
  'transaction/perform',
  (formData, { rejectWithValue }) => {
    return store(`${base}`, formData)
      .then((response) => {
        if (response.data.success) {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const fetchTransactionById = createAsyncThunk(
  'transaction/id',
  (id, { rejectWithValue }) => {
    return fetch(`${base}/${id}`)
      .then((response) => {
        if (response.data.success) {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const fetchUnmaskedTransactionByRemitKey = createAsyncThunk(
  'transaction/unmasked',
  (id, { rejectWithValue }) => {
    return fetch(`${base}/detail/${id}`)
      .then((response) => {
        if (response.data.success) {
          return response.data.data;
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
    return store(`${base}/search`, formData)
      .then((response) => {
        if (response.data.success) {
          return response.data.data;
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

const transactionDetailPending = [
  'transaction/perform/pending',
  'transaction/id/pending',
  'transaction/unmasked/pending',
];
const transactionDetailFulfilled = ['transaction/id/fulfilled', 'transaction/unmasked/fulfilled'];
const transactionDetailRejected = [
  'transaction/perform/rejected',
  'transaction/id/fulfilled',
  'transaction/unmasked/rejected',
];

const transactionDefaultFulfilled = ['transaction/perform/fulfilled'];

export const transactionSlice = createSlice({
  name: 'transactions',
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
    cleanTransaction(state) {
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

    cleanTransactionDetails(state) {
      state.detailLoading = false;
      state.detailPayload = {};
      state.detailErrors = {};
    },
    cleanTransactionList(state) {
      state.loading = false;
      state.payload = [];
      state.errors = {};
    },

    cleanTransactionErrors(state) {
      state.loading = false;
      state.detailLoading = false;
      state.errors = {};
      state.detailErrors = {};
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
        (action) => transactionDetailPending.includes(action.type),
        (state, action) => {
          state.detailLoading = true;
        }
      )
      .addMatcher(
        (action) => transactionListRejected.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.errors = action.payload;
        }
      )
      .addMatcher(
        (action) => transactionDetailRejected.includes(action.type),
        (state, action) => {
          state.detailLoading = false;
          state.detailErrors = action.payload;
        }
      )
      .addMatcher(
        (action) => transactionDefaultFulfilled.includes(action.type),
        (state, action) => {
          state.detailLoading = false;
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => transactionListFulfilled.includes(action.type),
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
      )
      .addMatcher(
        (action) => transactionDetailFulfilled.includes(action.type),
        (state, action) => {
          state.detailLoading = false;
          state.detailPayload = action.payload?.[0];
          state.detailErrors = {};
        }
      );
  },
});

export const {
  cleanTransaction,
  cleanTransactionDetails,
  cleanTransactionErrors,
  cleanTransactionList,
} = transactionSlice.actions;
