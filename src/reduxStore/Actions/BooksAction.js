import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    getBooksListApi,
    addBookApi,
    updateBookApi,
    deleteBookApi
} from '../API/BooksApi';

export const getBooksListAction = createAsyncThunk('books/getBooksListAction', async () => {
    return await getBooksListApi();
});

export const addBookAction = createAsyncThunk('books/addBookAction', async (body) => {
    return await addBookApi(body);
});

export const updateBookAction = createAsyncThunk('books/updateBookAction', async ({ body, id }) => {
    return await updateBookApi({ body, id });
});

export const deleteBookAction = createAsyncThunk('books/deleteBookAction', async (id) => {
    return await deleteBookApi(id);
});