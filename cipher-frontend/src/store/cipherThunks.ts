import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import axiosApi from '../axiosApi';

export const fetchDecoded = createAsyncThunk<string, { password: string, message: string }, { state: RootState }>(
  'cipher/fetchDecoded', async ({password, message}) => {
    const response = await axiosApi.post('/decode', {password, message});
    return response.data;
  }
);

export const fetchEncoded = createAsyncThunk<string, { password: string, message: string }, { state: RootState }>(
  'cipher/fetchEncoded', async ({password, message}) => {
    const response = await axiosApi.post('/encode', {password, message});
    return response.data;
  }
);