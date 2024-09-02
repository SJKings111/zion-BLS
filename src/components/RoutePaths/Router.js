import { Routes, Route, Navigate } from 'react-router-dom';
import { keyRoutes } from './RouteConstants';
import HomePage from '../../pages/HomepageContainer/HomePage';
import BooksListPage from '../../pages/BooksPageContainer/BooksListPage';
import UsersListPage from '../../pages/UsersPageContainer/UsersListPage';
import BorrowedHistoryPage from '../../pages/BorrowedHistoryPageContainer/BorrowedHistoryPage';
import BookForm from '../../pages/BooksPageContainer/BookForm';
import UserForm from '../../pages/UsersPageContainer/UserForm';
import BorrowBookForm from '../../pages/BorrowedHistoryPageContainer/BorrowBookForm';

export const Router = () => {
    return (
        <div className="row mainContent">
            <Routes>
                <Route exact path={keyRoutes.HOME} element={<HomePage />} />

                <Route exact path={keyRoutes.BOOKS_LIST} element={<BooksListPage />} />
                <Route exact path={keyRoutes.ADD_BOOK} element={<BookForm />} />
                <Route exact path={keyRoutes.UPDATE_BOOK} element={<BookForm />} />

                <Route exact path={keyRoutes.USERS_LIST} element={<UsersListPage />} />
                <Route exact path={keyRoutes.ADD_USER} element={<UserForm />} />
                <Route exact path={keyRoutes.UPDATE_USER} element={<UserForm />} />

                <Route exact path={keyRoutes.HISTORY_LIST} element={<BorrowedHistoryPage />} />
                <Route exact path={keyRoutes.BORROW_BOOK} element={<BorrowBookForm />} />

                <Route path="*" element={<Navigate to={keyRoutes.HOME} />} />
            </Routes>
        </div>
    );
};