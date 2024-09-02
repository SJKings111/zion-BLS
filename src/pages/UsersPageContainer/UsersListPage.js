import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersListAction, deleteUserAction } from '../../reduxStore/Actions/UsersAction';

import { Table, Tag, Space, Button } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import DeleteConfirmModal from '../../utility/DeleteConfirmModal';
import '../TableModule.scss';
import { Link, useNavigate } from 'react-router-dom';
import { keyRoutes } from '../../components/RoutePaths/RouteConstants';

const UsersListPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, usersList } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getUsersListAction());
    }, [dispatch]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const showDeleteConfirm = (record) => {
        setSelectedRecord(record);
        setIsModalVisible(true);
    };

    const handleDelete = () => {
        dispatch(deleteUserAction(selectedRecord.id));
        console.log('Deleting:', selectedRecord);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleEdit = (id) => {
        navigate(`/update-user/${id}`);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'EMAIL',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'MEMBERSHIP ID',
            dataIndex: 'membershipId',
            key: 'membershipId',
        },
        {
            title: 'ACTION',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record.id)}><EditFilled /></a>
                    <a onClick={() => showDeleteConfirm(record)}><DeleteFilled /></a>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="table-header">
                <h2 className='tableName'>USERS LIST</h2>
                <Button type="primary" className="addButton"> <Link to={keyRoutes.ADD_USER}> <span> Add User </span> </Link> </Button>
            </div>
            <div className="table-container">
                <Table
                    columns={columns}
                    dataSource={usersList?.map((book) => ({ ...book, key: book.id }))}
                    pagination={{ position: ['bottomRight'] }}
                    scroll={{ x: 800 }}
                />
                <DeleteConfirmModal
                    visible={isModalVisible}
                    onConfirm={handleDelete}
                    onCancel={handleCancel}
                />
            </div>
        </>
    );

};

export default UsersListPage;