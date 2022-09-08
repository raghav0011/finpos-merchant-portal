import React, { useEffect, useState, useMemo } from 'react';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Tag } from 'antd';
import classNames from 'classnames';

import { WTable } from '../../shared/Widgets';

const TransactionList = (props) => {
  const { dashboard, cleanDashboard, dashboardLoading, fetchTransactionListByCriteria } = props;
  const { t } = useTranslation();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetchTransactionListByCriteria({}).then((res) => setDataLoaded(true));

    return () => {
      cleanDashboard();
    };
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    fetchTransactionListByCriteria({});
  };

  const columns = useMemo(() => {
    let cols =
      !isEmpty(dashboard) && dashboard.length > 0
        ? Object.keys(dashboard?.[0])
            .filter((item) => item !== 'id')
            .map((item) => {
              if (item === 'Current Status') {
                return {
                  title: item,
                  dataIndex: item,
                  align: 'center',
                  render: (text) => {
                    const upperCaseText = text.toUpperCase();
                    return (
                      <Tag
                        className={classNames({
                          'error-bg-1': upperCaseText === 'REJECTED',
                          'warning-bg-1': upperCaseText === 'HOLD',
                          'initiated-bg-1': upperCaseText === 'INITIATED',
                          'authorized-bg-1': upperCaseText === 'AUTHORIZED',
                          'review-bg-1': upperCaseText === 'COMPLIANCE REVIEWING',
                          'parking-bg-1 ': upperCaseText === 'PARKING',
                          'processing-bg-1 ': upperCaseText === 'PROCESSING',
                          'passed-bg-1 ': upperCaseText === 'PASSED',
                          'authorizing-bg-1 ': upperCaseText === 'AUTHORIZING',
                          'complete-bg-1 ': upperCaseText === 'COMPLETED',
                          'parked-bg-1 ': upperCaseText === 'PARKED',
                        })}
                        style={{ width: '21ch' }}
                      >
                        {upperCaseText}
                      </Tag>
                    );
                  },
                };
              }
              return {
                title: item,
                dataIndex: item,
                // sorter: true,
                render: (text) => text || '-',
              };
            })
        : [];
    return [
      {
        title: t('table.serial.num'),
        key: 'index',
        align: 'center',
        render: (text, record, index) => {
          return index + 1;
        },
      },
      ...cols,
    ];
  }, [dataLoaded]);

  let tableProps = {
    handleTableChange: handleTableChange,
    pagination: false,
    tableLoading: dashboardLoading,
    dataSource: dashboard,
  };

  return <WTable {...tableProps} columns={columns} />;
};

export default TransactionList;