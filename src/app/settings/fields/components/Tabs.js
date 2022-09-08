import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs } from 'antd';

import ApprovedList from './List';
import { TitleBar } from '../../../shared/TitleBar';
import { WButton } from '../../../shared/Widgets';

const TabPane = Tabs.TabPane;

const FieldsTabs = (props) => {
  const { fetchFieldsWithCriteria } = props;

  const stateFromLink = props?.history?.location?.state;
  const tabKeyValue = stateFromLink?.tabState || 'approved';

  const [currentTabKey] = useState(tabKeyValue);

  const extraActions = (
    <WButton
      className="mx-4 my-2"
      onClick={() => {
        props.history.push('/setting/form-fields/add');
      }}
      customType="add"
    >
      Add Field
    </WButton>
  );

  useEffect(() => {
    fetchCurrentTabList(currentTabKey);
  }, []);

  const fetchCurrentTabList = (currentTab) => {
    switch (currentTab) {
      case 'approved':
        fetchFieldsWithCriteria();
        break;
      default:
        break;
    }
  };

  return (
    <div className="container-fluid no-breadcrumb page-dashboard">
      <div className="article__section">
        <article className="article">
          <TitleBar
            title="Form Field List"
            breadCrumbObject={{
              Settings: '',
              'Form Fields': '/setting/form-fields/',
            }}
          />

          <Tabs
            defaultActiveKey={currentTabKey}
            tabPosition="top"
            animated={false}
            tabBarStyle={{ background: '#ffffff' }}
            tabBarExtraContent={extraActions}
          >
            <TabPane key="approved" tab="Approved">
              <ApprovedList {...props} />
            </TabPane>
          </Tabs>
        </article>
      </div>
    </div>
  );
};

export default withRouter(FieldsTabs);
