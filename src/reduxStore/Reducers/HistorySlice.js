import { createSlice } from '@reduxjs/toolkit';
import {
    getHistoryListAction,
    borrowBookAction,
    returnBookAction,
} from '../Actions/HistoryAction';
import { successAlert } from '../../utility/Alerts/ToasterTypes';
import { keyRoutes } from '../../components/RoutePaths/RouteConstants';

const HistorySlice = createSlice({
    name: 'history',
    initialState: {
        isLoading: false,
        error: null,
        historyList: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHistoryListAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getHistoryListAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.historyList = action.payload;
            })
            .addCase(getHistoryListAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(borrowBookAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(borrowBookAction.fulfilled, (state, action) => {
                state.historyList.push(action.payload);
                successAlert("User borrowed successfully!");
                window.location.href = keyRoutes.HISTORY_LIST;
            })
            .addCase(borrowBookAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(returnBookAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(returnBookAction.fulfilled, (state, action) => {
                const index = state.historyList.findIndex(history => history.id === action.payload.id);
                if (index !== -1) {
                    state.historyList[index] = action.payload;
                }
                successAlert("User returned successfully!");
                window.location.href = keyRoutes.HISTORY_LIST;
            })
            .addCase(returnBookAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    },
});

export default HistorySlice.reducer;