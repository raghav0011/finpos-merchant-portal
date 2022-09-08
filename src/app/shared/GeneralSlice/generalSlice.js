import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetch } from '../../../utils/httpUtil';

export const fetchUploaderUrl = createAsyncThunk(
  'uploaderURL/fetch',
  (type, { rejectWithValue }) => {
    return fetch(`config/v1/uploader/${type}`)
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

const pendingArray = ['uploaderURL/fetch/pending'];
const fulfilledArray = ['uploaderURL/fetch/fulfilled'];
const rejectedArray = ['uploaderURL/fetch/rejected'];

export const uploaderSlice = createSlice({
  name: 'Uploader',
  initialState: {
    payload: {},
    loading: false,
    errors: {},
  },
  reducers: {
    cleanUploaderData(state) {
      state.loading = false;
      state.payload = {};
      state.errors = {};
    },
  },

  extraReducers: (builder) => {
    builder

      .addMatcher(
        (action) => pendingArray.includes(action.type),
        function (state, action) {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => fulfilledArray.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.payload = action.payload;
          state.errors = {};
        }
      )

      .addMatcher(
        (action) => rejectedArray.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.errors = action.payload;
        }
      );
  },
});
export const { cleanUploaderData } = uploaderSlice.actions;
