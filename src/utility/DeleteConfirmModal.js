import React from 'react';
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const DeleteConfirmModal = ({ onConfirm, onCancel, visible, title = "Are you sure?", okText = "Delete", cancelText = "Cancel" }) => {

    return (
        <Modal
            title={title}
            open={visible}
            onOk={onConfirm}
            onCancel={onCancel}
            okText={okText}
            cancelText={cancelText}
            centered
        >
            <ExclamationCircleOutlined style={{ color: 'red', marginRight: 10 }} />
            Are you sure you want to delete this item?
        </Modal>
    );
};

export default DeleteConfirmModal;