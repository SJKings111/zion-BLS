import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getHistoryListAction, borrowBookAction, returnBookAction } from '../../reduxStore/Actions/HistoryAction';
import { getBooksListAction } from '../../reduxStore/Actions/BooksAction';
import { useParams } from 'react-router-dom';
import './BorrowedHistoryPage.scss';

const BorrowBookForm = () => {

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

    const dispatch = useDispatch();
    const { id } = useParams();
    const isUpdate = !!id;
    const { booksList } = useSelector((state) => state.books);
    const { historyList } = useSelector((state) => state.history);


    useEffect(() => {
        dispatch(getBooksListAction());
        dispatch(getHistoryListAction());
    }, [dispatch]);

    const bookOptions = booksList.map(book => ({
        value: book.id,
        name: book.bookTitle
    }));

    const onSubmit = (data) => {
        // let findBookById = booksList.find(book => book.id == data.bookId);
        let borrowedDate = new Date().toISOString();
        const newId = historyList.length ? Math.max(...historyList.map(history => history.id)) + 1 : 1;
        let body = {
            id: newId,
            userId: data.userId,
            bookId: data.bookId,
            borrowDate: borrowedDate,
        }
        dispatch(borrowBookAction(body));
        reset();
    };

    return (
        <>

            <div className="form-header-container">
                <h1 className="form-header add"> BORROW BOOK </h1>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="bookId"> Books </label>
                        <select
                            id="bookId"
                            {...register('bookId', { required: 'Book is required' })}
                        >
                            <option value="">Select book</option>
                            {bookOptions.map((history) => {
                                debugger
                                return (
                                    <option key={history.value} value={history.value}>
                                        {history.name}
                                    </option>
                                );
                            })}
                        </select>
                        {errors.bookId && <p className="error-message">{errors.bookId.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="userId">User ID (membership_id)</label>
                        <input
                            id="userId"
                            type="number"
                            {...register('userId', { required: 'User ID is required' })}
                        />
                        {errors.userId && <p className="error-message">{errors.userId.message}</p>}
                    </div>

                    <button type="submit"> Borrow Book </button>
                </form>
            </div>

        </>
    );

};

export default BorrowBookForm;;