import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetch, store } from '../../../utils/httpUtil';

export const fetchTransactionListByCriteria = createAsyncThunk(
  'transaction/list',
  (formData, { rejectWithValue }) => {
    return store('v1/transactions', formData)
      .then((response) => {
        if (response.data.message === 'SUCESS') {
          console.log('sadsadasdasdsdsd');
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

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    payload: [],
    loading: false,
    errors: {},
    pagination: {},
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
        }
      );
  },
});

export const { cleanTransaction, cleanTransactionList } = transactionSlice.actions;
