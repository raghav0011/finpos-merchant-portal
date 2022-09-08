import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs } from 'antd';

import Message from '../../shared/Message';

import ApprovedList from './List';
import DraftList from './DraftList';
import AuditLogList from './AuditLogList';
import AddModal from './AddModal';
import DetailModal from './DetailModal';
import { TitleBar } from '../../shared/TitleBar';
import useModalHook from '../../shared/Hooks/modalHook';
import { WButton } from '../../shared/Widgets';

const TabPane = Tabs.TabPane;

const RoleTabs = (props) => {
  const {
    roleErrors,

    fetchRoleWithCriteria,
    fetchRoleFilterField,
    cleanRole,
    cleanRoleFilterField,

    fetchDraftRoleWithCriteria,
    fetchRoleAuditLogFilterField,
    fetchRoleAuditLogWithCriteria,
  } = props;

  const stateFromLink = props?.history?.location?.state;
  const tabKeyValue = stateFromLink?.tabState || 'approved';

  const [currentTabKey, setCurrentTabKey] = useState(tabKeyValue);

  const [addModalVisible, showAddModal, hideAddModal] = useModalHook();
  const [detailModalVisible, showDetailModal, hideDetailModal] = useModalHook();

  const fetchRoleWithFilterFields = () => {
    fetchRoleWithCriteria();
    fetchRoleFilterField();
  };

  const fetchRoleAuditLogWithFilterFields = () => {
    fetchRoleAuditLogFilterField();
    fetchRoleAuditLogWithCriteria();
  };

  const fetchCurrentTabList = (currentTab) => {
    switch (currentTab) {
      case 'approved':
        fetchRoleWithFilterFields();
        break;

      case 'draft':
        fetchDraftRoleWithCriteria();
        break;

      case 'auditLog':
        fetchRoleAuditLogWithFilterFields();
        break;

      default:
        break;
    }
  };

  const extraActions = (
    // <Button
    //   className="btn-add-new mx-4 my-2"
    //   onClick={() => {
    //     showAddModal();
    //     // return openAddRoleModal();
    //   }}
    // >
    //   Add Role
    // </Button>
    <WButton className="mx-4 my-2" onClick={() => showAddModal()} customType="add">
      Add Role
    </WButton>
  );

  useEffect(() => {
    fetchCurrentTabList(currentTabKey);
    return () => {
      cleanRole();
      cleanRoleFilterField();
    };
  }, []);

  const handleTabChange = (currentTab) => {
    cleanRole();
    cleanRoleFilterField();
    // cleanUserType();
    setCurrentTabKey(currentTab);
    fetchCurrentTabList(currentTab);
  };

  return (
    <div className="container-fluid no-breadcrumb page-dashboard">
      <div className="article__section">
        <article className="article">
          <TitleBar
            title="Roles"
            breadCrumbObject={{
              Roles: '',
            }}
          />

          <Message error={roleErrors} />

          <Tabs
            defaultActiveKey={currentTabKey}
            tabPosition="top"
            animated={false}
            onChange={handleTabChange}
            tabBarStyle={{ background: '#ffffff' }}
            tabBarExtraContent={extraActions}
          >
            <TabPane key="approved" tab="Approved">
              <ApprovedList
                {...props}
                currentTabKey={currentTabKey}
                showDetailModal={showDetailModal}
              />
            </TabPane>
            <TabPane key="draft" tab="Draft">
              <DraftList {...props} currentTabKey={currentTabKey} />
            </TabPane>
            <TabPane key="auditLog" tab="Audit Log">
              <AuditLogList {...props} currentTabKey={currentTabKey} />
            </TabPane>
          </Tabs>
        </article>
      </div>

      {addModalVisible && (
        <AddModal {...props} hideAddModal={hideAddModal} addModalVisible={addModalVisible} />
      )}

      {detailModalVisible && (
        <DetailModal
          {...props}
          detailModalVisible={detailModalVisible}
          hideDetailModal={hideDetailModal}
        />
      )}
    </div>
  );
};

export default withRouter(RoleTabs);
