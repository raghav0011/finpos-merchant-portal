import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useHistory, useLocation } from 'react-router';

import { TitleBar } from '../../shared/TitleBar';
import AllTransaction from './AllTransactions';
import WatchList from './WatchList';
import TodayTransaction from './TodayTransaction';
import QueueAnim from 'rc-queue-anim';
import { PAGE_SIZE, PAGENUMBER } from '../../../constants/index';
import moment from 'moment';

const Tab = (props) => {
  const {
    // fetchAllTxnList,
    transactions,
    // transactionLoading,
    // transactionPagination,
    transactionFilterFields,
    fetchTransactionFilterField,
    cleanTransactionList,
    fetchTransactionListByCriteria,
    fetchTransactionWatchListWithCriteria,
    fetchTodayTransactionWithCriteria,
  } = props;

  const history = useHistory();
  const { pathname, search } = useLocation();
  const [currentTabKey, setCurrentTabKey] = useState('todayTransactions');
  const [newFilterFields, setNewFilterFields] = useState([]);
  const [newWatchFilterFields, setWatchNewFilterFields] = useState([]);
  const [pagination, setPagination] = useState({ pageSize: PAGE_SIZE, pageNumber: PAGENUMBER });

  useEffect(() => {
    fetchCurrentTabList(currentTabKey);

    return () => {
      cleanTransactionList();
      // cleanTransactionFilterField();
    };
  }, []);
  useEffect(() => {
    setNewFilterFields(
      transactionFilterFields?.filter((item) => item?.code?.toUpperCase() !== 'TRANSACTIONDATETIME')
    );
  }, [transactionFilterFields]);

  useEffect(() => {
    setWatchNewFilterFields(
      transactionFilterFields?.filter((item) => item?.code?.toUpperCase() !== 'STATUS')
    );
  }, [transactionFilterFields]);

  const onChange = (e) => {
    cleanTransactionList();
    // cleanTransactionFilterField();
    setCurrentTabKey(e);
    fetchCurrentTabList(e);

    return;
  };

  const todayInitialReportModel = [
    {
      value: moment().format('MM-DD-YYYY'),
      condition: 'dateEqual',
      field: 'transactionDateTime',
      customizable: false,
    },
  ];

  const fetchTodayTxnList = () => {
    cleanTransactionList();
    fetchTodayTransactionWithCriteria({
      pageNumber: PAGENUMBER,
      pageSize: PAGE_SIZE,
      reportModel: todayInitialReportModel,
    }).then((response) => {
      if (response.payload.message === 'SUCCESS') {
        setPagination({
          ...pagination,
          pageNumber: response.payload.data.currentPage,
          totalRecord: response.payload.data.totalRecord,
        });
      }
    });
  };

  const fetchAllTxnList = () => {
    cleanTransactionList();
    fetchTransactionListByCriteria({ pageSize: PAGE_SIZE, pageNumber: PAGENUMBER }).then(
      (response) => {
        if (response.payload.message === 'SUCCESS') {
          setPagination({
            ...pagination,
            pageNumber: response.payload.data.currentPage,
            totalRecord: response.payload.data.totalRecord,
          });
        }
      }
    );
  };

  const fetchWatchListTxnList = () => {
    cleanTransactionList();
    fetchTransactionWatchListWithCriteria({
      pageSize: PAGE_SIZE,
      pageNumber: PAGENUMBER,
    }).then((response) => {
      if (response.payload.message === 'SUCCESS') {
        setPagination({
          ...pagination,
          pageNumber: response.payload.data.currentPage,
          totalRecord: response.payload.data.totalRecord,
        });
      }
    });
  };

  const fetchCurrentTabList = (currentTab) => {
    cleanTransactionList();
    setPagination({ pageSize: PAGE_SIZE });
    switch (currentTab) {
      case 'todayTransactions':
        fetchTransactionFilterField();
        fetchTodayTxnList();
        break;
      case 'allTransaction':
        fetchAllTxnList();
        fetchTransactionFilterField();

        break;
      case 'watchList':
        fetchWatchListTxnList();
        fetchTransactionFilterField();
        break;

        break;
      default:
        break;
    }
  };

  return (
    <div className="container-fluid no-breadcrumb page-dashboard ">
      <QueueAnim type="right" className="ui-animate">
        <div className="article__section">
          <article className="article">
            <h4 className="article-title mb-2 ">Transaction List</h4>

            <Tabs
              destroyInactiveTabPane
              defaultActiveKey={currentTabKey}
              tabPosition="top"
              animated={true}
              onChange={onChange}
              tabBarStyle={{ background: '#ffffff', paddingLeft: '20px' }}
              tabBarGutter={70}
            >
              <Tabs.TabPane tab={"Today's Transaction"} key={'todayTransactions'}>
                <TodayTransaction
                  pagination={pagination}
                  setPagination={setPagination}
                  fetchTodayTxnList={fetchTodayTxnList}
                  initialReportModel={todayInitialReportModel}
                  newFilterFields={newFilterFields}
                  {...props}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab={'All Transactions'} key={'allTransaction'}>
                <AllTransaction
                  pagination={pagination}
                  setPagination={setPagination}
                  fetchAllTxnList={fetchAllTxnList}
                  {...props}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab={'Watch list'} key={'watchList'}>
                <WatchList
                  pagination={pagination}
                  setPagination={setPagination}
                  fetchWatchListTxnList={fetchWatchListTxnList}
                  newWatchFilterFields={newWatchFilterFields}
                  {...props}
                />
              </Tabs.TabPane>
            </Tabs>
          </article>
        </div>
      </QueueAnim>
    </div>
  );
};

export default Tab;
