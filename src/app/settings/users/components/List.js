import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getSortingOrder, getStatusLabel } from '../../../../utils/commonUtil';
import { WCustomSearchTable } from '../../../shared/Widgets';

const List = (props) => {
  const { t } = useTranslation();

  const { history, users, userPagination, userLoading, fetchUserWithCriteria } = props;

  const [searchValue, setSearchValue] = useState('');

  const handleTableChange = (pagination, filters, sorter) => {
    fetchUserWithCriteria({
      search_key: searchValue ? searchValue : undefined,
      page_size: pagination.pageSize,
      page_number: pagination.current,
      sort_by: sorter?.field,
      sort_order: getSortingOrder(sorter.order),
    });
  };

  const onFinish = (value) => {
    fetchUserWithCriteria({ search_key: value });
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
      title: t('users.active.label'),
      dataIndex: 'current_status',
      align: 'left',
      sorter: true,
      render: (text, record) => {
        return getStatusLabel(!!text);
      },
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
          history.push(`/setting/users/${record.id}`);
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
