import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { withRouter } from 'react-router-dom';

import Message from '../../../shared/Message';
import { TitleBar } from '../../../shared/TitleBar';
import PolicyForm from './PolicyForm';

const TabPane = Tabs.TabPane;

const TabsPolicy = (props) => {
  const {
    fetchPendingPasswordPolicy,

    passwordErrors,

    fetchPasswordPolicy,
    cleanPasswordPolicy,
  } = props;

  const stateFromLink = props?.history?.location?.state;
  const tabKeyValue = stateFromLink?.tabState || 'approved';

  const [currentTabKey, setCurrentTabKey] = useState(tabKeyValue);

  const fetchCurrentTabList = (currentTab) => {
    switch (currentTab) {
      case 'approved':
        fetchPasswordPolicy();
        break;

      case 'draft':
        fetchPendingPasswordPolicy();
        break;

      default:
        break;
    }
  };

  const handleTabChange = (currentTab) => {
    cleanPasswordPolicy();
    setCurrentTabKey(currentTab);
    fetchCurrentTabList(currentTab);
  };

  useEffect(() => {
    fetchCurrentTabList(currentTabKey);
    return () => {
      cleanPasswordPolicy();
    };
  }, []);

  return (
    <div className="container-fluid no-breadcrumb page-dashboard">
      <article className="article">
        <TitleBar
          title="Password Policy"
          breadCrumbObject={{
            Settings: '',
            'Password Policy': '',
          }}
        />

        <Message error={passwordErrors}/>

        <Tabs
          defaultActiveKey={currentTabKey}
          tabPosition="top"
          animated={false}
          onChange={handleTabChange}
          tabBarStyle={{ background: '#ffffff' }}
        >
          <TabPane key="approved" tab="Approved">
            <PolicyForm {...props} />
          </TabPane>
          {/* <TabPane key="draft" tab="Draft">
            <PolicyDetail {...props} />
          </TabPane> */}
        </Tabs>
      </article>
    </div>
  );
};

export default withRouter(TabsPolicy);
