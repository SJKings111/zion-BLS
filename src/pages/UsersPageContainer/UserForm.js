import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersListAction, addUserAction, updateUserAction } from '../../reduxStore/Actions/UsersAction';
import { useParams } from 'react-router-dom';
import './UserPage.scss';

const UserForm = () => {

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

    const dispatch = useDispatch();
    const { id } = useParams();
    const isUpdate = !!id;
    const { usersList } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getUsersListAction());
    }, [dispatch]);

    const currentUser = usersList.find((user) => {
        return user.id == Number(id);
    });

    useEffect(() => {
        setValue('name', currentUser?.name);
        setValue('email', currentUser?.email);
        setValue('membershipId', currentUser?.membershipId);
    }, [setValue, isUpdate]);

    useEffect(() => {
        if (isUpdate && currentUser) {
            reset({
                name: currentUser.name,
                email: currentUser.email,
                membershipId: currentUser.membershipId
            });
        }
    }, [isUpdate, currentUser, reset]);

    const onSubmit = (data) => {
        if (isUpdate && currentUser) {
            dispatch(updateUserAction({ body: data, id: currentUser.id }));
        } else {
            const newId = usersList.length ? Math.max(...usersList.map(book => book.id)) + 1 : 1;
            dispatch(addUserAction({ ...data, id: newId }));
        }
        reset();
    };

    return (
        <>
            <div className="form-header-container">
                <h1 className={isUpdate ? "form-header update" : "form-header add"}>
                    {isUpdate ? "UPDATE USER" : "ADD USER"}
                </h1>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="name">User Name</label>
                        <input
                            id="name"
                            {...register('name', { required: 'User name is required' })}
                        />
                        {errors.name && <p className="error-message">{errors.name.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">User Email</label>
                        <input
                            id="email"
                            type='email'
                            {...register('email', { required: 'User email is required' })}
                        />
                        {errors.email && <p className="error-message">{errors.email.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="membershipId">Membership ID</label>
                        <input
                            id="membershipId"
                            type="number"
                            {...register('membershipId', { required: 'Membership ID is required' })}
                        />
                        {errors.membershipId && <p className="error-message">{errors.membershipId.message}</p>}
                    </div>

                    <button type="submit">{isUpdate ? 'Update User' : 'Add User'}</button>
                </form>
            </div>
        </>
    );

};

export default UserForm;