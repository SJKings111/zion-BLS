import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getBooksListAction, addBookAction, updateBookAction } from '../../reduxStore/Actions/BooksAction';
import { useParams } from 'react-router-dom';
import './BooksPage.scss';

const BookForm = () => {
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

    const dispatch = useDispatch();
    const { id } = useParams();
    const isUpdate = !!id;
    const { booksList } = useSelector((state) => state.books);

    useEffect(() => {
        dispatch(getBooksListAction());
    }, [dispatch]);

    const currentBook = booksList.find((book) => {
        return book.id == Number(id);
    });

    useEffect(() => {
        setValue('bookTitle', currentBook?.bookTitle);
        setValue('bookAuthor', currentBook?.bookAuthor);
        setValue('isbn', currentBook?.isbn);
        setValue('quantity', currentBook?.quantity);
    }, [setValue, isUpdate]);

    useEffect(() => {
        if (isUpdate && currentBook) {
            reset({
                bookTitle: currentBook.bookTitle,
                bookAuthor: currentBook.bookAuthor,
                isbn: currentBook.isbn,
                quantity: currentBook.quantity,
            });
        }
    }, [isUpdate, currentBook, reset]);

    const onSubmit = (data) => {
        if (isUpdate && currentBook) {
            dispatch(updateBookAction({ body: data, id: currentBook.id }));
        } else {
            const newId = booksList.length ? Math.max(...booksList.map(book => book.id)) + 1 : 1;
            dispatch(addBookAction({ ...data, id: newId }));
        }
        reset();
    };

    return (
        <>
            <div className="form-header-container">
                <h1 className={isUpdate ? "form-header update" : "form-header add"}>
                    {isUpdate ? "UPDATE BOOK" : "ADD BOOK"}
                </h1>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="bookTitle">Book Title</label>
                        <input
                            id="bookTitle"
                            {...register('bookTitle', { required: 'Book title is required' })}
                        />
                        {errors.bookTitle && <p className="error-message">{errors.bookTitle.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="bookAuthor">Book Author</label>
                        <input
                            id="bookAuthor"
                            {...register('bookAuthor', { required: 'Book author is required' })}
                        />
                        {errors.bookAuthor && <p className="error-message">{errors.bookAuthor.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="isbn">ISBN</label>
                        <input
                            id="isbn"
                            type="number"
                            {...register('isbn', { required: 'ISBN is required' })}
                        />
                        {errors.isbn && <p className="error-message">{errors.isbn.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            id="quantity"
                            type="number"
                            {...register('quantity', { required: 'Quantity is required' })}
                        />
                        {errors.quantity && <p className="error-message">{errors.quantity.message}</p>}
                    </div>

                    <button type="submit">{isUpdate ? 'Update Book' : 'Add Book'}</button>
                </form>
            </div>
        </>
    );
};

export default BookForm;