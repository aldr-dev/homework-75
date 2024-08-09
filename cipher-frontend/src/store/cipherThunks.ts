import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import axiosApi from '../axiosApi';
import {DecodedData, EncodedData} from '../types';

export const fetchDecoded = createAsyncThunk<DecodedData, { password: string, message: string }, { state: RootState }>(
  'cipher/fetchDecoded', async ({password, message}) => {
    const response = await axiosApi.post<DecodedData>('/decode', {password, message});
    return response.data;
  }
);

export const fetchEncoded = createAsyncThunk<EncodedData, { password: string, message: string }, { state: RootState }>(
  'cipher/fetchEncoded', async ({password, message}) => {
    const response = await axiosApi.post<EncodedData>('/encode', {password, message});
    return response.data;
  }
);