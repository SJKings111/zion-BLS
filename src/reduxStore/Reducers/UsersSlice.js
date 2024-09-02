import { createSlice } from '@reduxjs/toolkit';
import {
    getUsersListAction,
    addUserAction,
    updateUserAction,
    deleteUserAction
} from '../Actions/UsersAction';
import { successAlert } from '../../utility/Alerts/ToasterTypes';
import { keyRoutes } from '../../components/RoutePaths/RouteConstants';

const UsersSlice = createSlice({
    name: 'users',
    initialState: {
        isLoading: false,
        error: null,
        usersList: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsersListAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsersListAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.usersList = action.payload;
            })
            .addCase(getUsersListAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteUserAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUserAction.fulfilled, (state, action) => {
                state.usersList = state.usersList.filter(User => User.id !== action.payload);
                successAlert("User deleted successfully!");
            })
            .addCase(deleteUserAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addUserAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addUserAction.fulfilled, (state, action) => {
                state.usersList.push(action.payload);
                successAlert("User added successfully!");
                window.location.href = keyRoutes.USERS_LIST;
            })
            .addCase(addUserAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(updateUserAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserAction.fulfilled, (state, action) => {
                const index = state.usersList.findIndex(User => User.id === action.payload.id);
                if (index !== -1) {
                    state.usersList[index] = action.payload;
                }
                successAlert("User updated successfully!");
                window.location.href = keyRoutes.USERS_LIST;
            })
            .addCase(updateUserAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    },
});

export default UsersSlice.reducer;