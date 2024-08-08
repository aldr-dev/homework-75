import {createSlice} from '@reduxjs/toolkit';
import {fetchDecoded, fetchEncoded} from './cipherThunks';

export interface CipherSlice {
  decodedMessage: string;
  encodedMessage: string;
  isLoading: boolean;
}

const initialState: CipherSlice = {
  decodedMessage: '',
  encodedMessage: '',
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