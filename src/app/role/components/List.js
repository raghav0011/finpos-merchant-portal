import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Form } from 'antd';
import { useTranslation } from 'react-i18next';

import FilterField from '../../shared/FilterField';
import { getFilterFieldValue, getStatusLabel } from '../../../utils/commonUtil';
import { isAllowed } from '../../../utils/permissionUtil';
import { getSortingOrder } from '../../../utils/commonUtil';
import { PAGE_SIZE } from '../../../constants';
import { WTable } from '../../shared/Widgets';

const List = (props) => {
  const { t } = useTranslation();
  const {
    roles,

    rolePagination,
    roleLoading,
    roleFilterFields,
    fetchRoleWithCriteria,

    fetchRoleByIdentifier,
    showDetailModal,
  } = props;

  const [form] = Form.useForm();

  const [pagination, setPagination] = useState({ pageSize: PAGE_SIZE });

  const handleTableChange = (pagination, filters, sorter) => {
    const reportModel = form.getFieldValue('reportModel');

    fetchRoleWithCriteria({
      pageSize: pagination.pageSize,
      pageNumber: pagination.current,
      sortField: sorter.field,
      sortOrder: getSortingOrder(sorter.order),
      reportModel: getFilterFieldValue(reportModel),
      ...filters,
    });
    setPagination({
      pageSize: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: getSortingOrder(sorter.order),
    });
  };

  const onFinish = (values) => {
    const formData = {};
    formData.pageNumber = 1;
    formData.pageSize = pagination.pageSize;
    formData.sortField = pagination.sortField;
    formData.sortOrder = pagination.sortOrder;
    formData.reportModel = getFilterFieldValue(values.searchKeys);
    fetchRoleWithCriteria(formData);
  };

  const columns = [
    {
      title: t('table.serial.num'),
      key: 'index',
      width: '6%',
      align: 'center',
      render: (text, record, index) => {
        return (rolePagination.current - 1) * rolePagination.pageSize + index + 1;
      },
    },
    {
      title: t('roles.name.label'),
      dataIndex: 'name',
      align: 'left',
      sorter: true,
      render: (text, record) => {
        return <div>{record.name}</div>;
      },
    },
    {
      title: t('roles.active.label'),
      dataIndex: 'active',
      align: 'left',
      render: (text, record) => {
        return <span>{getStatusLabel(record.active)}</span>;
      },
    },
  ];

  return (
    <>
      <Card className="card" bordered={false}>
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{ searchKeys: [''] }}
          className="search-form"
          layout="horizontal"
        >
          <FilterField
            moduleName="reportModel"
            {...props}
            form={form}
            filterFields={roleFilterFields}
            searchCriteria={fetchRoleWithCriteria}
          />
        </Form>
      </Card>

      <div className="box box-default box-ant-table-v1">
        <div className="table-responsive clickable-table-row">
          <WTable
            columns={columns}
            rowKey={'id'}
            dataSource={roles}
            pagination={rolePagination}
            className="clickable-table-row"
            loading={roleLoading}
            onChange={handleTableChange}
            onRow={(record, rowIndex) => {
              return {
                onClick: (e) => {
                  if (isAllowed(['role:detail'])) {
                    fetchRoleByIdentifier(record.id);
                    showDetailModal();
                  }
                },
              };
            }}
          />
        </div>
      </div>
    </>
  );
};

export default withRouter(List);
