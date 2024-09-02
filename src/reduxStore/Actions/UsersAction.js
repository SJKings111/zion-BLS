import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    getUsersListApi,
    addUserApi,
    updateUserApi,
    deleteUserApi
} from '../API/UsersApi';

export const getUsersListAction = createAsyncThunk('users/getUsersListAction', async () => {
    return await getUsersListApi();
});

export const addUserAction = createAsyncThunk('users/addUserAction', async (body) => {
    return await addUserApi(body);
});

export const updateUserAction = createAsyncThunk('users/updateUserAction', async ({ body, id }) => {
    return await updateUserApi({ body, id });
});

export const deleteUserAction = createAsyncThunk('users/deleteUserAction', async (id) => {
    return await deleteUserApi(id);
});