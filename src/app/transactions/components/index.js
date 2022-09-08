import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useHistory, useLocation } from 'react-router';

import { TitleBar } from '../../shared/TitleBar';
import TransactionList from './List';
import ParkingList from './ParkingList';

const Index = (props) => {
  const history = useHistory();
  const { pathname, search } = useLocation();
  const [currentTabKey, setCurrentTabKey] = useState('transactions');

  useEffect(() => {
    if (search) {
      setCurrentTabKey(search.split('?')?.[1]);
    }
  }, []);

  const onChange = (key) => {
    setCurrentTabKey(key);
    history.replace({ pathname: pathname, search: key.toString() });
  };

  return (
    <div className="container-fluid no-breadcrumb page-dashboard article__section">
      <TitleBar
        title={'Transaction List'}
        breadCrumbObject={{
          TransactionList: '',
        }}
      />

      <div className="mt-3">
        <Tabs
          destroyInactiveTabPane
          tabBarStyle={{
            backgroundColor: 'rgba(255,255,255,.75)',
          }}
          tabBarGutter={32}
          defaultActiveKey={currentTabKey}
          activeKey={currentTabKey}
          onChange={onChange}
        >
          {' '}
          <Tabs.TabPane tab={'Transactions'} animated key={'transactions'}>
            <TransactionList {...props} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={'Parking'} animated key={'parking'}>
            <ParkingList {...props} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
