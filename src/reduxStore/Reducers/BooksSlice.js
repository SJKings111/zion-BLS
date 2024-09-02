import { createSlice } from '@reduxjs/toolkit';
import {
    getBooksListAction,
    addBookAction,
    updateBookAction,
    deleteBookAction
} from '../Actions/BooksAction';
import { successAlert } from '../../utility/Alerts/ToasterTypes';
import { keyRoutes } from '../../components/RoutePaths/RouteConstants';

const BooksSlice = createSlice({
    name: 'books',
    initialState: {
        isLoading: false,
        error: null,
        booksList: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBooksListAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBooksListAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.booksList = action.payload;
            })
            .addCase(getBooksListAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteBookAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBookAction.fulfilled, (state, action) => {
                state.booksList = state.booksList.filter(book => book.id !== action.payload);
                successAlert("Book deleted successfully!");
            })
            .addCase(deleteBookAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addBookAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addBookAction.fulfilled, (state, action) => {
                state.booksList.push(action.payload);
                successAlert("Book added successfully!");
                window.location.href = keyRoutes.BOOKS_LIST;
            })
            .addCase(addBookAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(updateBookAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBookAction.fulfilled, (state, action) => {
                const index = state.booksList.findIndex(book => book.id === action.payload.id);
                if (index !== -1) {
                    state.booksList[index] = action.payload;
                }
                successAlert("Book updated successfully!");
                window.location.href = keyRoutes.BOOKS_LIST;
            })
            .addCase(updateBookAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    },
});

export default BooksSlice.reducer;