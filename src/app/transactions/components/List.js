import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { message, Tag } from 'antd';
import classNames from 'classnames';

import { WCustomizableColumnTable, WButton } from '../../shared/Widgets';
import Message from '../../shared/Message';
import { isEmpty } from 'lodash';
import useModalHook from '../../shared/Hooks/modalHook';
import { getSortingOrder } from '../../../utils/commonUtil';
import Details from './details';
import { transactionCancel } from '../slice/transactionAPI';

const List = (props) => {
  const { t } = useTranslation();
  const { transactions } = props;
  const [searchValue, setSearchValue] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedId, setSelectedId] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [modalVisible, showModal, hideModal] = useModalHook();
  const [modalRejectVisible, showRejectModal, hideRejectModal] = useModalHook();

  useEffect(() => {
    transactions.fetchTransactionListByCriteria({}).then((res) => setDataLoaded(true));
    return () => {
      transactions.cleanTransaction();
    };
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    transactions.fetchTransactionListByCriteria({
      search_key: searchValue ? searchValue : undefined,
      page_size: pagination.pageSize,
      page_number: pagination.current,
      sort_by: sorter?.field,
      sort_order: getSortingOrder(sorter.order),
    });
  };

  const onSearch = (value) => {
    transactions.fetchTransactionListByCriteria({ search_key: value });
    setSearchValue(value);
  };

  const onCancel = () => {
    hideRejectModal();
  };

  const onReject = (values) => {
    setLoading(true);
    transactionCancel(selectedId, values)
      .then((res) => {
        message.success(res?.return_msg || 'Transaction Rejected');
        hideRejectModal();
        hideModal();
        transactions.fetchTransactionListByCriteria({});
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        message.error(err?.message);
      });
  };

  // memoize columns so that it doesnt cause rerender every time
  // new data comes since columns are constant
  const columns = useMemo(() => {
    let cols =
      !isEmpty(transactions.transactions) && transactions.transactions.length > 0
        ? Object.keys(transactions.transactions?.[0])
            .filter((item) => item !== 'id')
            .map((item) => {
              if (item === 'Current Status') {
                return {
                  title: item,
                  dataIndex: item,
                  align: 'center',
                  render: (text) => {
                    const upperCaseText = text?.toUpperCase();
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
                sorter: true,
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
          return (
            (transactions.transactionPagination.current - 1) *
              transactions.transactionPagination.pageSize +
            index +
            1
          );
        },
      },
      ...cols,
    ];
  }, [dataLoaded]);

  let tableProps = {
    handleTableChange: handleTableChange,
    onSearch: onSearch,
    className: 'clickable-table-row',
    rowKey: 'id',
    searchLoading: transactions.transactionLoading,
    pagination: transactions.transactionPagination,
    tableLoading: transactions.transactionLoading,
    dataSource: transactions.transactions,
    onRow: (record, rowIndex) => {
      return {
        onClick: (e) => {
          transactions.fetchTransactionById(record?.id);
          setSelectedId(record?.id);
          showModal();
        },
      };
    },
  };

  return (
    <div>
      <div className="mb-2">
        {transactions.transactionErrors && <Message error={transactions.transactionErrors} />}{' '}
        <WCustomizableColumnTable {...tableProps} columns={columns} />
      </div>

      <Details
        additionalComponents={
          <div className="text-right pb-4">
            {props?.transactions?.transactionDetail?.['Transaction Details']?.[0]?.[
              'Current Status'
            ] === 'Authorized' ? (
              <WButton
                danger
                onClick={() => {
                  showRejectModal();
                }}
              >
                Reject
              </WButton>
            ) : (
              ''
            )}
          </div>
        }
        hideModal={hideModal}
        modalVisible={modalVisible}
        transactions={props.transactions}
        afterClose={() => {
          transactions.cleanTransactionDetails();
          transactions.cleanTransactionErrors();
          setSelectedId(undefined);
          onCancel();
        }}
      />
    </div>
  );
};

export default List;
