import React from 'react';
import { message, Modal } from 'antd';

const ImageModal = (props) => {
  const { modalVisible, hideModal, imageSrc } = props;

  const downloadReceipt = () => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.setAttribute('download', 'MerchantReceipt.png');
    document.body.appendChild(link);
    link.click();
    message.success('Downloaded');
  };

  return (
    <>
      <Modal
        centered
        // title={title}
        visible={modalVisible}
        onCancel={hideModal}
        cancelText="Close"
        onOk={downloadReceipt}
        okText="Download"
        // footer={null}
      >
        <div className="text-center">
          <img src={imageSrc} style={{ border: '1px solid' }} />
        </div>
      </Modal>
    </>
  );
};

export default ImageModal;
