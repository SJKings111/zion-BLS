import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHistoryListAction, returnBookAction } from '../../reduxStore/Actions/HistoryAction';

import { Table, Tag, Space, Button } from 'antd';
import '../TableModule.scss';
import { Link, useNavigate } from 'react-router-dom';
import { keyRoutes } from '../../components/RoutePaths/RouteConstants';

const BorrowedHistoryPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, historyList } = useSelector((state) => state.history);

    useEffect(() => {
        dispatch(getHistoryListAction());
    }, [dispatch]);

    const handleReturn = (id) => {
        let history = historyList.find(history => history.id == id);
        let currentDate = new Date().toISOString();
        let body = {
            id: history.id,
            userId: history.userId,
            bookId: history.bookId,
            borrowDate: history.borrowDate,
            returnDate: currentDate
        }
        dispatch(returnBookAction({ body, id }));
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'USER ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'BOOK ID',
            dataIndex: 'bookId',
            key: 'bookId',
        },
        {
            title: 'BORROW DATE',
            dataIndex: 'borrowDate',
            key: 'borrowDate',
        },
        {
            title: 'RETURN DATE',
            dataIndex: 'returnDate',
            key: 'returnDate',
        },
        {
            title: 'ACTION',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleReturn(record.id)}> {record.returnDate ? "" : "Return Book"} </a>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="table-header">
                <h2 className='tableName'>BORROWED HISTORY</h2>
                <Button type="primary" className="addButton"> <Link to={keyRoutes.BORROW_BOOK}> <span> Borrow Book </span> </Link> </Button>
            </div>
            <div className="table-container">
                <Table
                    columns={columns}
                    dataSource={historyList?.map((history) => ({ ...history, key: history.id }))}
                    pagination={{ position: ['bottomRight'] }}
                    scroll={{ x: 800 }}
                />
            </div>
        </>
    );

};

export default BorrowedHistoryPage;