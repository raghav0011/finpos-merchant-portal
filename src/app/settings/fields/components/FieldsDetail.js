/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Card, Spin, Descriptions } from 'antd';
import { useParams } from 'react-router-dom';

import { TitleBar } from '../../../shared/TitleBar';
import { WButton } from '../../../shared/Widgets';
import { useTranslation } from 'react-i18next';
import { WTable } from '../../../shared/Widgets';

import './parameters/style.css';

const FormFieldsDetail = (props) => {
  const { cleanFieldsDetails, fetchFieldsByIdentifier, fieldsDetails, fieldsDetailsLoading } =
    props;

  const { t } = useTranslation();
  const params = useParams();

  useEffect(() => {
    fetchFieldsByIdentifier(params?.id);

    return () => {
      cleanFieldsDetails();
    };
  }, []);

  const columns = [
    {
      title: t('table.serial.num'),
      width: '6ch',
      key: 'index',
      align: 'center',
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: t('field.table.headers.field_name'),
      dataIndex: 'field_name',
      align: 'left',
    },
    {
      title: t('field.table.headers.field_type'),
      dataIndex: 'field_type',
      align: 'left',
    },

    {
      title: t('field.table.headers.label_name'),
      dataIndex: 'label_name',
      align: 'left',
    },
    {
      title: t('field.table.headers.placeholder'),
      dataIndex: 'placeholder',
      align: 'left',
    },
    {
      title: t('field.table.headers.is_required'),
      dataIndex: 'is_required',
      align: 'left',
      render: (text, record) => {
        return record.is_required ? 'YES' : '';
      },
    },
    {
      title: t('field.table.headers.is_active'),
      dataIndex: 'is_active',
      align: 'left',
      render: (text, record) => {
        return record.is_active ? 'YES' : '';
      },
    },
    {
      title: t('field.table.headers.is_read_only'),
      dataIndex: 'is_read_only',
      align: 'left',
      render: (text, record) => {
        return record.is_read_only ? 'YES' : '';
      },
    },
    {
      title: t('field.table.headers.label_align'),
      dataIndex: 'label_align',
      align: 'left',
    },
    {
      title: t('field.table.headers.min_length'),
      dataIndex: 'min_length',
      align: 'left',
    },
    {
      title: t('field.table.headers.max_length'),
      dataIndex: 'max_length',
      align: 'left',
    },
    {
      title: t('field.table.headers.regx'),
      dataIndex: 'reg_expression',
      align: 'left',
    },
    {
      title: t('field.table.headers.options'),
      dataIndex: 'options',
      align: 'left',
    },
    {
      title: 'Field Group',
      dataIndex: 'field_group',
      align: 'left',
    },
  ];

  const tableProps = {
    columns: columns,
    dataSource: fieldsDetails.fields,
    rowKey: 'id',
    pagination: false,
    // className: 'fullscreen-table',
    scroll: { x: '2000px', y: '500px' },

    // style: { height: '450px' },
  };

  return (
    <div className="container-fluid no-breadcrumb page-dashboard article__section">
      <Spin spinning={fieldsDetailsLoading}>
        <TitleBar
          breadCrumbObject={{
            Settings: '',
            'Form Fields': '/setting/form-fields/',
            Detail: '/setting/form-fields/view/',
          }}
        />

        <Card
          title={<h4>Form Field Detail</h4>}
          extra={
            <WButton
              customType={'edit'}
              onClick={() => {
                props.history.push(`/setting/form-fields/edit/${params?.id}`);
              }}
            >
              Edit Form Field
            </WButton>
          }
        >
          <Descriptions column={1} labelStyle={{ fontWeight: 'bold' }}>
            <Descriptions.Item label="Customer Category">
              {fieldsDetails.customer_category}
            </Descriptions.Item>
            <Descriptions.Item label="Customer Type" style={{ background: 'white' }}>
              {fieldsDetails.customer_type}
            </Descriptions.Item>
            <Descriptions.Item label="Country">{fieldsDetails.country}</Descriptions.Item>
            <Descriptions.Item label="Form Version" style={{ background: 'white' }}>
              {fieldsDetails.form_version}
            </Descriptions.Item>
            <Descriptions.Item label="Is Default" style={{ background: 'white' }}>
              {fieldsDetails.is_default ? 'YES' : 'NO'}
            </Descriptions.Item>
          </Descriptions>

          <h5 className="my-3">
            <strong>Fields</strong>
          </h5>
          <div className="fullscreen-table-container">
            <WTable {...tableProps} />
          </div>
        </Card>
      </Spin>
    </div>
  );
};

export default FormFieldsDetail;
