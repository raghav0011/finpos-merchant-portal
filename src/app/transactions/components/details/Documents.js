import { Col, Row, Image, Card } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FilePdfOutlined } from '@ant-design/icons';
import { WButton, WTable } from '../../../shared/Widgets';

import { openInNewTab } from '../../../../utils/commonUtil';

const FileComponent = ({ text, record }) => {
  const [type, setType] = useState('image/*');

  useEffect(() => {
    axios.get(record?.document).then((res) => {
      if (res.status >= 200) {
        setType(res.headers?.['content-type'] || '*/*');
      }
    });
  }, [record?.document]);

  if (type === 'application/pdf') {
    return (
      <>
        <WButton
          customType="exportPdf"
          icon={<FilePdfOutlined />}
          onClick={() => {
            openInNewTab(record?.document);
          }}
        >
          {record.doc_type}
        </WButton>
      </>
    );
  }
  return (
    <>
      <Image src={record?.document} alt={record.doc_type} height="40px" />
    </>
  );
};
const Documents = ({ senderDocumentsDataSource, receiverDocumentsDataSource }) => {
  const additionalSenderDocuments = [
    {
      title: 'Document Type',
      dataIndex: 'doc_type',
      align: 'center',
      // width: 150,
    },
    {
      title: 'Image',
      dataIndex: 'sender_documents',
      align: 'center',
      render: (text, record) => {
        return <FileComponent text={text} record={record} />;
      },
    },
  ];
  const additionalReceiverDocuments = [
    {
      title: 'Document Type',
      dataIndex: 'doc_type',
      align: 'center',
      // width: 150,
    },
    {
      title: 'Image',
      dataIndex: 'sender_documents',
      align: 'center',
      render: (text, record) => {
        return <FileComponent text={text} record={record} />;
      },
    },
  ];
  return (
    <Card>
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <h6 className="my-2">
            <strong style={{ textDecoration: 'underline' }}>Sender Documents</strong>
          </h6>
          <WTable
            rowKey="id"
            style={{ minHeight: 150 }}
            columns={additionalSenderDocuments}
            dataSource={senderDocumentsDataSource}
          />
        </Col>
        <Col xs={24}>
          <h6 className="my-2">
            <strong style={{ textDecoration: 'underline' }}>Receiver Documents</strong>
          </h6>
          <WTable
            style={{ minHeight: 150 }}
            columns={additionalReceiverDocuments}
            dataSource={receiverDocumentsDataSource}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default Documents;
