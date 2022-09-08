import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import FilterField from '../../shared/FilterField';
import { getSortingOrder, getFilterFieldValue } from '../../../utils/commonUtil';
import { DATE_FORMAT, PAGE_SIZE } from '../../../constants';
import { isAllowed } from '../../../utils/permissionUtil';
import { WTable } from '../../shared/Widgets';

const AuditLogList = (props) => {
  const { t } = useTranslation();
  const {
    history,
    roles,
    roleLoading,
    rolePagination,
    roleAuditFilterFields,
    fetchRoleAuditLogWithCriteria,
  } = props;

  const [form] = Form.useForm();

  const [pagination, setPagination] = useState({ pageSize: PAGE_SIZE });

  const handleTableChange = (pagination, filters, sorter) => {
    const reportModel = form.getFieldValue('reportModel');

    fetchRoleAuditLogWithCriteria({
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
    formData.reportModel = getFilterFieldValue(values.reportModel);

    fetchRoleAuditLogWithCriteria(formData);
  };

  // useEffect(() => {
  //   fetchRoleAuditLogFilterField();
  //   fetchRoleAuditLogWithCriteria();
  //   return () => {
  //     cleanRole();
  //     cleanRoleFilterField();
  //   };
  // }, []);

  const columns = [
    {
      title: t('table.serial.num'),
      key: 'index',
      align: 'right',
      render: (text, record, index) => {
        return (rolePagination.current - 1) * rolePagination.pageSize + index + 1;
      },
    },
    {
      title: t('audit.log.table.column.name.label'),
      dataIndex: 'name',
      align: 'left',
      sorter: true,
      render: (text, record) => {
        return <div>{record.newData ? record.newData.name : ''}</div>;
      },
    },
    {
      title: t('audit.log.table.column.request.action.label'),
      dataIndex: 'action',
      align: 'left',
      sorter: true,
      render: (text, record) => {
        return <div>{record.action}</div>;
      },
    },
    {
      title: t('audit.log.table.column.requestedBy.label'),
      dataIndex: 'requestedBy',
      align: 'left',
      sorter: true,
      render: (text, record) => {
        return <div>{record.requestedBy}</div>;
      },
    },
    {
      title: t('audit.log.table.column.requested.date.label'),
      dataIndex: 'requestedOn',
      align: 'left',
      sorter: true,
      defaultSortOrder: 'descend',
      render: (text, record) => {
        return <div>{moment(record.requestedOn).format(DATE_FORMAT)}</div>;
      },
    },
    {
      title: t('audit.log.table.column.status.label'),
      dataIndex: 'status',
      align: 'left',
      render: (text, record) => {
        return <div>{record.status}</div>;
      },
    },
    {
      title: t('audit.log.table.column.verifiedBy.label'),
      dataIndex: 'verifiedBy',
      align: 'left',
      render: (text, record) => {
        return <div>{record.respondedBy ? record.respondedBy : '-'}</div>;
      },
    },
    {
      title: t('audit.log.table.column.verifiedOn.label'),
      dataIndex: 'verifiedOn',
      align: 'left',
      render: (text, record) => {
        return (
          <div>{record.respondedOn ? moment(record.respondedOn).format(DATE_FORMAT) : '-'}</div>
        );
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
            filterFields={roleAuditFilterFields}
            searchCriteria={fetchRoleAuditLogWithCriteria}
          />
        </Form>
      </Card>

      <div className="box box-default box-ant-table-v1">
        <div className="table-responsive clickable-table-row">
          <WTable
            className="clickable-table-row"
            columns={columns}
            rowKey={'id'}
            dataSource={roles}
            pagination={rolePagination}
            loading={roleLoading}
            onChange={handleTableChange}
            scroll={{ x: 'max-content' }}
            onRow={(record, rowIndex) => {
              return {
                onClick: (e) => {
                  if (isAllowed(['role:pending:detail'])) {
                    history.push(`/roles/audits/${record.id}/detail`);
                  }
                },
              };
            }}
          />{' '}
        </div>
      </div>
    </>
  );
};

export default withRouter(AuditLogList);
