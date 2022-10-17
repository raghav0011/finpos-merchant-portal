import React, { useEffect, useState } from 'react';

import FilterField from '../../shared/FilterField/index';

import InfiniteTable from '../../shared/InfinteTable/index';
import FormItem from 'antd/lib/form/FormItem';
import { DATE_FORMAT } from '../../../constants';
import moment from 'moment';
import { Card, Form, Button, Icon, Tooltip, Upload, Col } from 'antd';
import { getFilterFieldValue } from '../../../utils/commonUtil';

const List = (props) => {
  const {
    fetchTodayTxnList,
    initialReportModel,
    transactions,
    transactionLoading,
    transactionPagination,
    fetchTodayTransactionWithCriteria,
    pagination,
    setPagination,
    newFilterFields,
    totalApprovedAmounts,
    cleanTransactionList,
  } = props;

  const [fieldState, setFieldState] = useState({ reportModel: initialReportModel });
  const [form] = Form.useForm();

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
      dataIndex: 'CardScheme',
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
            {record.CardScheme}
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
    {
      title: 'Receipt',
      dataIndex: 'receipt',
      align: 'left',
      // sorter: true,
      // fixed: 'right',
      // width: 100,
      render: (text, record, index) => {
        return (
          <Button
            type="primary"
            key={index}
            // className="btn-custom-field m-1"
            size="small"
            onClick={() => {
              // handleModalChange(record.id);
            }}
            ghost
          >
            Generate
          </Button>
        );
      },
    },
  ];

  const fetchMoreData = () => {
    const formData = {
      ...fieldState,
      pageNumber: transactionPagination.current + 1 || 1,
      pageSize: pagination.pageSize,
    };

    if (
      pagination.pageNumber < Math.ceil(pagination.totalRecord / pagination.pageSize) &&
      transactionPagination?.current
    ) {
      fetchTodayTransactionWithCriteria(formData).then((response) => {
        if (response.payload.message === 'SUCCESS') {
          setPagination({
            ...pagination,
            pageNumber: response.payload.data.currentPage,
            totalRecord: response.payload.data.totalRecord,
          });
        }
      });
    }
  };

  const handleSearch = (values) => {
    cleanTransactionList();
    const formData = {};

    formData.pageNumber = 1;
    formData.pageSize = pagination.pageSize;
    // formData.sortField = pagination.sortField;
    // formData.sortOrder = pagination.sortOrder;
    formData.reportModel = getFilterFieldValue(values.searchKeys);

    setFieldState(formData);
    fetchTodayTransactionWithCriteria(formData).then((response) => {
      if (response.payload.message === 'SUCCESS') {
        setPagination({
          ...pagination,
          pageNumber: response.payload.data.currentPage,
          totalRecord: response.payload.data.totalRecord,
        });
      }
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <Card className="card " bordered={false}>
            <Form
              form={form}
              onFinish={handleSearch}
              initialValues={{ searchKeys: [''] }}
              className="search-form"
              hideRequiredMark
              layout="horizontal"
            >
              <FilterField
                moduleName="reportModel"
                form={form}
                {...props}
                filterFields={newFilterFields}
                searchCriteria={() => {
                  setFieldState({});
                  fetchTodayTxnList();
                }}
              />
            </Form>
          </Card>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <Button
          disabled={transactionLoading}
          loading={transactionLoading}
          onClick={() => {
            form.resetFields();
            setFieldState({});
            fetchTodayTxnList();
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
              {pagination ? pagination.totalRecord : '-'}
            </span>
          </div>
          <div className="px-2 bold">
            Total :{' '}
            {totalApprovedAmounts &&
              totalApprovedAmounts.map((amount) => {
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
                    {amount ? `${amount.currency_code} ${amount.sum} ` : '-'}
                  </span>
                );
              })}
          </div>
        </div>
        <div></div>
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
