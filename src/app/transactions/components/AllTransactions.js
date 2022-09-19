import React, { useEffect, useState } from 'react';

// import FilterField from '../Common/FilterField';

import InfiniteTable from '../../shared/InfinteTable/index';
import FormItem from 'antd/lib/form/FormItem';
import { DATE_FORMAT } from '../../../constants';
import moment from 'moment';
import { Card, Form, Button, Icon, Tooltip, Upload, Col } from 'antd';

const List = (props) => {
  const {
    // fetchAllTxnList,
    transactions,
    transactionLoading,
    transactionPagination,
    fetchTransactionListByCriteria,
    pagination,
    setPagination,
    fetchAllTxnList,
    // transactionFilterFields,
  } = props;
  console.log(
    '🚀 ~ file: AllTransactions.js ~ line 23 ~ List ~ transactionPagination',
    transactionPagination
  );
  console.log('🚀 ~ file: AllTransactions.js ~ line 23 ~ List ~ pagination', pagination);
  const [fieldState, setFieldState] = useState({});

  const columnsWithOutReceipt = [
    {
      title: 'S.N',
      key: 'index',
      width: '6%',
      align: 'center',
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: 'Transaction Type',
      dataIndex: 'transactionType',
      align: 'left',
      // sorter: true,
      render: (text, record) => {
        return <div>{record.transactionType}</div>;
      },
    },
    {
      title: 'Approval Code',
      dataIndex: 'approvalCode',
      align: 'left',
      // sorter: true,
      render: (text, record) => {
        return <div>{record.approvalCode}</div>;
      },
    },
    {
      title: 'Currency Code',
      dataIndex: 'currencyCode',
      align: 'left',
      // sorter: true,
      render: (text, record) => {
        return <div>{record.currencyCode}</div>;
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      align: 'left',
      render: (text, record) => {
        return <div>{record.amount}</div>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'left',
      render: (text, record) => {
        return <div>{record.status}</div>;
      },
    },
    {
      title: 'Remarks',
      dataIndex: 'remark',
      align: 'left',
      // sorter: true,
      render: (text, record) => {
        return <div>{record.remark}</div>;
      },
    },

    {
      title: 'Date and Time',
      dataIndex: 'transactionDateTime',
      align: 'left',
      // sorter: true,
      render: (text, record) => {
        return (
          <div>
            {record.transactionDateTime
              ? moment(record.transactionDateTime).format(DATE_FORMAT)
              : '-'}
          </div>
        );
      },
    },
    {
      title: 'TID',
      dataIndex: 'terminalId',
      align: 'left',
      // sorter: true,
      render: (text, record) => {
        return <div>{record.terminalId}</div>;
      },
    },

    {
      title: 'Merchant Name',
      dataIndex: 'merchantName',
      align: 'left',
      render: (text, record) => {
        return <div>{record.merchantName}</div>;
      },
    },
    {
      title: 'Merchant Address',
      dataIndex: 'merchantAddress',
      align: 'left',
      render: (text, record) => {
        return <div>{record.merchantAddress}</div>;
      },
    },

    {
      title: 'Invoice',
      dataIndex: 'invoice',
      align: 'left',
      // sorter: true,
      render: (text, record) => {
        return <div>{record.invoice}</div>;
      },
    },
    {
      title: 'RRN',
      dataIndex: 'rrn',
      align: 'left',
      // sorter: true,
      render: (text, record) => {
        return <div>{record.rrn}</div>;
      },
    },
    {
      title: 'STAN',
      dataIndex: 'stan',
      align: 'left',
      // sorter: true,
      render: (text, record) => {
        return <div>{record.stan}</div>;
      },
    },
    {
      title: 'Payment Type',
      dataIndex: 'paymentType',
      align: 'left',
      // sorter: true,
      render: (text, record) => {
        return <div>{record.paymentType}</div>;
      },
    },
    {
      title: 'Card Scheme',
      dataIndex: 'scheme',
      align: 'left',
      render: (text, record) => {
        return (
          <div>
            {/* {record.paymentSchemeType === null || record.cards === null || record.cards === [] ? (
                <>-</>
              ) : (
                <>
                  {record?.cards?.[0]?.icon ? (
                    <img
                      src={`data:image/png;base64,${record?.cards?.[0]?.icon}`}
                      width="40px"
                      alt={record.paymentSchemeType}
                    />
                  ) : (
                    <>{record.paymentSchemeType}</>
                  )}
                </>
              )} */}
            {''}
          </div>
        );
      },
    },

    {
      title: 'Payment Network',
      dataIndex: 'paymentNetwork',
      align: 'left',
      // sorter: true,
      render: (text, record) => {
        return <div>{record.paymentNetwork}</div>;
      },
    },
    {
      title: 'Bin',
      dataIndex: 'bin',
      align: 'left',
      // sorter: true,
      render: (text, record) => {
        return <div>{record.bin}</div>;
      },
    },
    {
      title: ' Settlement Status',
      dataIndex: 'settlementStatus',
      align: 'left',
      render: (text, record) => {
        return <div>{record.settlementStatus}</div>;
      },
    },
  ];

  const fetchMoreData = () => {
    const formData = {
      // ...fieldState,
      pageNumber: transactionPagination.current + 1,
      pageSize: pagination.pageSize,
    };

    if (
      pagination.pageNumber < Math.ceil(pagination.totalRecord / pagination.pageSize) &&
      transactionPagination?.current
    ) {
      fetchTransactionListByCriteria(formData).then((response) => {
        if (response.payload.message === 'SUCESS') {
          setPagination({
            ...pagination,
            pageNumber: response.payload.data.currentPage,
            totalRecord: response.payload.data.totalRecord,
          });
        }
      });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          {/* <Card className="card" bordered={false}>
            <Form
              onSubmit={handleSearch}
              className="search-form"
              hideRequiredMark
              layout="horizontal"
            >
              <FilterField
                moduleName="reportModel"
                {...props}
                filterFields={transactionFilterFields}
                searchCriteria={() => {
                  setFieldState({});
                  fetchAllTxnList();
                }}
              />
            </Form>
          </Card> */}
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <Button
          disabled={transactionLoading}
          loading={transactionLoading}
          onClick={() => {
            // resetFields();
            // setFieldState({});
            // fetchTransactionWithCriteria()
            // fetchAllTxnList();
          }}
          className="btn-custom-field mb-2 mt-n4"
          // icon="reload"
        >
          Refresh
        </Button>

        <div className="d-flex justify-content-center">
          <div className="px-2 bold">
            Count :{' '}
            <span style={{ fontWeight: 'normal' }}>
              {/* {transactionsCount ? internationalFormattedNumber(transactionsCount) : '-'} */}
            </span>
          </div>
          <div className="px-2 bold">
            Total :{' '}
            {/* {transactionsAmount &&
              transactionsAmount.map(amount => {
                return (
                  <span
                    style={{
                      fontWeight: 'normal',
                      border: '1px solid #CCC',
                      padding: '5px',
                      marginRight: '2px',
                      borderRadius: '10px',
                    }}
                  >
                    {amount
                      ? `${amount.currencyCode} ${internationalFormattedAmount(amount.amount)} `
                      : '-'}
                  </span>
                );
              })} */}
          </div>
        </div>

        <div>
          {/* {fieldState?.reportModel?.length > 0 && ( */}
          <Tooltip title="Export Excel" placement="left" mouseLeaveDelay={0} mouseEnterDelay={0}>
            {/* <Icon
              // onClick={() => exportTransactionExcel(fieldState)}
              type="file-excel"
              style={{ fontSize: '1.5rem', cursor: 'pointer', color: '#1D6F42' }}
            /> */}
          </Tooltip>
          {/* )} */}
        </div>
      </div>

      <div className="box box-default box-ant-table-v1">
        <div className="table-responsive">
          <InfiniteTable
            fetchMoreData={fetchMoreData}
            columns={columnsWithOutReceipt.filter((d) => d.isVisible !== false)}
            rowKey={(record) => record.id}
            dataSource={transactions instanceof Array ? transactions : []}
            total={transactionPagination.total}
          />
        </div>
      </div>
    </>
  );
};

export default List;
