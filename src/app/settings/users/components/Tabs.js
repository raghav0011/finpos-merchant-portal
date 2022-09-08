import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs } from 'antd';

import Message from '../../../shared/Message';
import ApprovedList from './List';
import AuditLogList from './AuditLogList';
import { TitleBar } from '../../../shared/TitleBar';
import { WButton } from '../../../shared/Widgets';

const TabPane = Tabs.TabPane;

const UserTabs = (props) => {
  const { history, userErrors, fetchUserWithCriteria, cleanUser, fetchUserAuditLogWithCriteria } =
    props;

  const stateFromLink = props?.history?.location?.state;
  const tabKeyValue = stateFromLink?.tabState || 'approved';

  const [currentTabKey, setCurrentTabKey] = useState(tabKeyValue);

  const fetchCurrentTabList = (currentTab) => {
    switch (currentTab) {
      case 'approved':
        fetchUserWithCriteria();
        break;
      case 'auditLog':
        fetchUserAuditLogWithCriteria();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    fetchCurrentTabList(currentTabKey);
    return () => {
      cleanUser();
    };
  }, []);

  const handleTabChange = (currentTab) => {
    cleanUser();
    setCurrentTabKey(currentTab);
    fetchCurrentTabList(currentTab);
  };

  return (
    <div className="container-fluid no-breadcrumb page-dashboard">
      <div className="article__section">
        <article className="article">
          <TitleBar
            title="User List"
            breadCrumbObject={{
              Settings: '',
              Users: '',
            }}
          />
          {userErrors && <Message error={userErrors} />}

          <Tabs
            defaultActiveKey={currentTabKey}
            tabPosition="top"
            animated={false}
            onChange={handleTabChange}
            tabBarStyle={{ background: '#ffffff' }}
            tabBarExtraContent={
              <WButton
                className="mx-4 my-2"
                onClick={() => history.push('/setting/users/add')}
                customType="add"
              >
                Add User
              </WButton>
            }
          >
            <TabPane key="approved" tab="Approved">
              <ApprovedList {...props} currentTabKey={currentTabKey} />
            </TabPane>

            <TabPane key="auditLog" tab="Audit Log">
              <AuditLogList {...props} currentTabKey={currentTabKey} />
            </TabPane>
          </Tabs>
        </article>
      </div>
    </div>
  );
};

export default withRouter(UserTabs);
