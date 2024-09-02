import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    getHistoryListApi,
    borrowBookApi,
    returnBookApi
} from '../API/HistoryApi';

export const getHistoryListAction = createAsyncThunk('history/getHistoryListAction', async () => {
    return await getHistoryListApi();
});

export const borrowBookAction = createAsyncThunk('history/borrowBookAction', async (body) => {
    return await borrowBookApi(body);
});

export const returnBookAction = createAsyncThunk('history/returnBookAction', async ({ body, id }) => {
    return await returnBookApi({ body, id });
});