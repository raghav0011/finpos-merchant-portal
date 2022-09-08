import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircleOutlined } from '@ant-design/icons';

import { WCustomSearchTable } from '../../../shared/Widgets';

const List = (props) => {
  const { t } = useTranslation();

  const { fields, fieldsLoading, fieldsPagination, fetchFieldsWithCriteria } = props;
  const [search, setSearch] = useState('');

  const handleTableChange = (pagination) => {
    fetchFieldsWithCriteria({
      search_key: search || undefined,
      page_size: pagination.pageSize,
      page_number: pagination.current,
    });
  };

  const onSearch = (value) => {
    fetchFieldsWithCriteria({ search_key: value });
    setSearch(value);
  };
  const columns = [
    {
      title: t('table.serial.num'),
      width: '6%',
      key: 'index',
      align: 'center',
      render: (text, record, index) => {
        return (fieldsPagination.current - 1) * fieldsPagination.pageSize + index + 1;
      },
    },
    {
      title: t('field.basic.label.customer'),
      dataIndex: 'customer_category',
      align: 'left',
    },
    {
      title: t('field.basic.label.type'),
      dataIndex: 'customer_type',
      align: 'left',
    },

    {
      title: t('field.basic.label.country'),
      dataIndex: 'country',
      align: 'left',
    },
    {
      title: t('field.basic.label.form_version'),
      dataIndex: 'form_version',
      align: 'left',
    },
    {
      title: t('field.basic.label.is_default'),
      dataIndex: 'is_default',
      align: 'left',
      render: (text, record) => {
        return (
          <span>
            {record?.is_default ? (
              <CheckCircleOutlined
                className="px-2"
                style={{
                  color: 'green',
                  fontSize: '1.4em',
                }}
              />
            ) : null}
          </span>
        );
      },
    },
  ];

  const tableProps = {
    columns: columns,
    dataSource: fields,
    rowKey: 'id',
    onSearch: onSearch,
    tableLoading: fieldsLoading,
    pagination: fieldsPagination,
    handleTableChange: handleTableChange,
    className: 'clickable-table-row',
    onRow: (record, rowIndex) => {
      return {
        onClick: () => {
          const id = record.id;
          props.history.push(`/setting/form-fields/${id}`);
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
