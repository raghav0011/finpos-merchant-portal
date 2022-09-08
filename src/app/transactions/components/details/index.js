import { Modal, Spin, Tabs } from 'antd';
import React from 'react';
import Message from '../../../shared/Message';
import PropTypes from 'prop-types';

import Documents from './Documents';
// import StatusHistory from './StatusHistory';
import StatusTimeline from '../../../shared/StatusTimeline';
import Transaction from './Transaction';
import ApiLog from './ApiLog';

const Details = ({ hideModal, modalVisible, afterClose, transactions, additionalComponents }) => {
  const { transactionDetail, transactionDetailError, transactionDetailLoading } = transactions;

  return (
    <Modal
      destroyOnClose
      visible={modalVisible}
      onOk={hideModal}
      onCancel={hideModal}
      width={'70%'}
      okButtonProps={{
        style: {
          display: 'none',
        },
      }}
      cancelText="Back"
      centered
      title={
        <h4 className="mb-0" style={{ color: '333' }}>
          Transaction Detail
        </h4>
      }
      maskClosable={true}
      afterClose={afterClose}
    >
      <Message error={transactionDetailError} />
      <Spin spinning={transactionDetailLoading}>
        {additionalComponents}

        <Tabs defaultActiveKey="1" tabBarStyle={{ margin: 0 }} type="card" animated={true}>
          <Tabs.TabPane tab="Transaction Details" key="1">
            <Transaction dataSource={transactionDetail} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Documents" key="2">
            <Documents
              senderDocumentsDataSource={transactionDetail['sender_documents']}
              receiverDocumentsDataSource={transactionDetail['receiver_documents']}
            />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Status History" key="3">
            <StatusTimeline dataSource={transactionDetail['status_history']} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="API Log" key="4">
            <ApiLog dataSource={transactionDetail?.['api_log']} />
          </Tabs.TabPane>
        </Tabs>
      </Spin>
    </Modal>
  );
};

Details.propTypes = {
  hideModal: PropTypes.func,
  modalVisible: PropTypes.bool,
  transactions: PropTypes.object,
  additionalComponents: PropTypes.any,
  afterClose: PropTypes.func,
};
export default Details;
