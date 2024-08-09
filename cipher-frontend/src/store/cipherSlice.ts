import {createSlice} from '@reduxjs/toolkit';
import {fetchDecoded, fetchEncoded} from './cipherThunks';
import {DecodedData, EncodedData} from '../types';

export interface CipherSlice {
  decodedMessage: DecodedData | null;
  encodedMessage: EncodedData | null;
  isLoading: boolean;
}

const initialState: CipherSlice = {
  decodedMessage: null,
  encodedMessage: null,
  isLoading: false,
};

export const cipherSlice = createSlice({
  name: 'cipher',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDecoded.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDecoded.fulfilled, (state,{payload: message}) => {
      state.isLoading = false;
      state.decodedMessage = message;
    });
    builder.addCase(fetchDecoded.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(fetchEncoded.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchEncoded.fulfilled, (state,{payload: message}) => {
      state.isLoading = false;
      state.encodedMessage = message;
    });
    builder.addCase(fetchEncoded.rejected, (state) => {
      state.isLoading = false;
    });
  },
  selectors: {
    selectDecodedMessage: (state) => state.decodedMessage,
    selectEncodedMessage: (state) => state.encodedMessage,
    selectIsLoading: (state) => state.isLoading,
  },
});

export const cipherReducer = cipherSlice.reducer;
export const {
  selectDecodedMessage,
  selectEncodedMessage,
  selectIsLoading,
} = cipherSlice.selectors;