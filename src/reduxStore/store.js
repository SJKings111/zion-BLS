import { configureStore } from '@reduxjs/toolkit';
import BooksReducer from '../reduxStore/Reducers/BooksSlice';
import UsersReducer from '../reduxStore/Reducers/UsersSlice';
import HistoryReducer from '../reduxStore/Reducers/HistorySlice';

export const store = configureStore({

    reducer: {
        books: BooksReducer,
        users: UsersReducer,
        history: HistoryReducer,
    }

});