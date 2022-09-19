import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useHistory, useLocation } from 'react-router';

import { TitleBar } from '../../shared/TitleBar';
import AllTransaction from './AllTransactions';
import ParkingList from './ParkingList';
import QueueAnim from 'rc-queue-anim';
import { PAGE_SIZE, PAGENUMBER } from '../../../constants/index';

const Tab = (props) => {
  const {
    // fetchAllTxnList,
    transactions,
    // transactionLoading,
    // transactionPagination,
    // transactionFilterFields,
    cleanTransactionList,
    fetchTransactionListByCriteria,
  } = props;

  const history = useHistory();
  const { pathname, search } = useLocation();
  const [currentTabKey, setCurrentTabKey] = useState('todayTransactions');
  const [pagination, setPagination] = useState({ pageSize: PAGE_SIZE, pageNumber: PAGENUMBER });

  useEffect(() => {
    fetchCurrentTabList(currentTabKey);

    return () => {
      cleanTransactionList();
      // cleanTransactionFilterField();
    };
  }, []);

  const onChange = (e) => {
    cleanTransactionList();
    // cleanTransactionFilterField();
    setCurrentTabKey(e);
    fetchCurrentTabList(e);

    return;
  };

  const fetchCurrentTabList = (currentTab) => {
    cleanTransactionList();
    // setPagination({ pageSize: PAGE_SIZE_LARGE });
    switch (currentTab) {
      case 'todayTransactions':
        // fetchAllTxnList();
        // fetchTransactionFilterField();
        break;
      case 'allTransaction':
        fetchAllTxnList();

        break;
      case 'watchList':
        // fetchWatchListTxnList();
        // fetchTransactionWatchListFilterField();
        break;

        break;
      default:
        break;
    }
  };

  const fetchAllTxnList = () => {
    cleanTransactionList();
    fetchTransactionListByCriteria({ pageSize: PAGE_SIZE, pageNumber: PAGENUMBER }).then(
      (response) => {
        console.log(
          '🚀 ~ file: Tabs.js ~ line 71 ~ fetchTransactionListByCriteria ~ response',
          response
        );
        if (response.payload.message === 'SUCESS') {
          setPagination({
            ...pagination,
            pageNumber: response.payload.data.currentPage,
            totalRecord: response.payload.data.totalRecord,
          });
        }
      }
    );
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
              <Tabs.TabPane tab={'Today Transaction'} key={'todayTransactions'}>
                {/* <AllTransaction {...props} /> */}
              </Tabs.TabPane>
              <Tabs.TabPane tab={'All Transaction'} key={'allTransaction'}>
                <AllTransaction
                  pagination={pagination}
                  setPagination={setPagination}
                  fetchAllTxnList={fetchAllTxnList}
                  {...props}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab={'Watch list'} key={'watchList'}>
                {/* <ParkingList {...props} /> */}
              </Tabs.TabPane>
            </Tabs>
          </article>
        </div>
      </QueueAnim>
    </div>
  );
};

export default Tab;
