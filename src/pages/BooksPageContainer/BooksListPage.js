import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooksListAction, deleteBookAction } from '../../reduxStore/Actions/BooksAction';

import { Table, Tag, Space, Button } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import DeleteConfirmModal from '../../utility/DeleteConfirmModal';
import '../TableModule.scss';
import { Link, useNavigate } from 'react-router-dom';
import { keyRoutes } from '../../components/RoutePaths/RouteConstants';


const BooksListPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, booksList } = useSelector((state) => state.books);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    useEffect(() => {
        dispatch(getBooksListAction());
    }, [dispatch]);

    const showDeleteConfirm = (record) => {
        setSelectedRecord(record);
        setIsModalVisible(true);
    };

    const handleDelete = () => {
        dispatch(deleteBookAction(selectedRecord.id));
        console.log('Deleting:', selectedRecord);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleEdit = (id) => {
        navigate(`/update-book/${id}`);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'TITLE',
            dataIndex: 'bookTitle',
            key: 'bookTitle',
        },
        {
            title: 'AUTHOR',
            dataIndex: 'bookAuthor',
            key: 'bookAuthor',
        },
        {
            title: 'ISBN',
            dataIndex: 'isbn',
            key: 'isbn',
        },
        {
            title: 'QUANTITY',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (e) => <Tag color='purple'>{e}</Tag>,
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
                <h2 className='tableName'>BOOKS LIST</h2>
                <Button type="primary" className="addButton"> <Link to={keyRoutes.ADD_BOOK}> <span> Add Book </span> </Link> </Button>
            </div>
            <div className="table-container">
                <Table
                    columns={columns}
                    dataSource={booksList.map((book) => ({ ...book, key: book.id }))}
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

}

export default BooksListPage;