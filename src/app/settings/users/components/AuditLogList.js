import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getSortingOrder } from '../../../../utils/commonUtil';
import { WCustomSearchTable } from '../../../shared/Widgets';

const List = (props) => {
  const { t } = useTranslation();

  const { history, users, userPagination, userLoading, fetchUserAuditLogWithCriteria } = props;

  const [searchValue, setSearchValue] = useState('');

  const handleTableChange = (pagination, filters, sorter) => {
    fetchUserAuditLogWithCriteria({
      search_key: searchValue ? searchValue : undefined,
      page_size: pagination.pageSize,
      page_number: pagination.current,
      sort_by: sorter?.field,
      sort_order: getSortingOrder(sorter.order),
    });
  };

  const onFinish = (value) => {
    fetchUserAuditLogWithCriteria({ search_key: value });
    setSearchValue(value);
  };

  const columns = [
    {
      title: t('table.serial.num'),
      width: '6%',
      key: 'index',
      align: 'center',
      render: (text, record, index) => {
        return (userPagination.current - 1) * userPagination.pageSize + index + 1;
      },
    },
    {
      title: t('users.email.label'),
      dataIndex: 'login_id',
      align: 'left',
      sorter: true,
    },

    {
      title: t('users.name.label'),
      dataIndex: 'full_name',
      align: 'left',
      sorter: true,
    },
    {
      title: t('audit.log.table.column.request.action.label'),
      dataIndex: 'user_action',
      align: 'left',
    },

    {
      title: t('audit.log.table.column.updatedBy.label'),
      dataIndex: 'update_by',
      align: 'left',
    },
    {
      title: t('audit.log.table.column.updatedOn.label'),
      dataIndex: 'update_date',
      align: 'left',
      // render: (text) => moment(text).format('YYYY-MM-DD hh:mm:ss'),
    },
  ];

  const tableProps = {
    columns: columns,
    dataSource: users,
    rowKey: 'id',
    onSearch: onFinish,
    searchLoading: userLoading,
    tableLoading: userLoading,
    pagination: userPagination,
    handleTableChange: handleTableChange,
    className: 'clickable-table-row',
    onRow: (record, rowIndex) => {
      return {
        onClick: (e) => {
          history.push(`/setting/users/audits/${record.id}/detail`);
        },
      };
    },
  };

  return (
    <>
      <WCustomSearchTable {...tableProps} />
    </>
  );
};

export default withRouter(List);
