import React from 'react';
import Modal from 'antd/lib/modal';

const customModalStyle = {
    width: '100%',
    background: 'white',
    padding: '0px',
};

const customModalBodyStyle = {
    padding: '0px',
};

const CustomModal = ({
    visible,
    onCancel,
    style,
    children,
}) => {
    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            footer={null}
            closable={false}
            bodyStyle={customModalBodyStyle}
            style={{
                ...customModalStyle,
                ...style,
            }}
        >
            {children}
        </Modal>
    )
};

export default CustomModal;
