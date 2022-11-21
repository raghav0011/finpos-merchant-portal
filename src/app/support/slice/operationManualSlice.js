import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const url = 'http://localhost:3000/api/support/finpos-manual-pdf';
const url = '';

const initialState = {
  pdfItems: {},
  isLoading: true,
};

export const pdfView = createAsyncThunk('pdfView/get', async () => {
  try {
    const resp = await axios(url);
    // console.log(resp.data.data);

    return resp.data.data;
  } catch (error) {}
});

const operationManualSlice = createSlice({
  name: 'pdfView',
  initialState,
  extraReducers: {
    [pdfView.pending]: (state) => {
      state.isLoading = true;
    },
    [pdfView.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.pdfItems = action.payload;
    },
    [pdfView.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default operationManualSlice;
