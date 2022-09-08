import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Tabs } from 'antd';
import { useHistory, useLocation } from 'react-router';

// import { TitleBar } from '../../shared/TitleBar';
import UserList from './UserList';
import RoleList from './RoleList';
import BranchList from './BranchList';
import { WButton } from '../../shared/Widgets';
import UserModal from './details/UserModal';
import BranchModal from './details/BranchModal';
import AddRoleModal from './details/RoleModal';
import RoleModal from './details/RoleModal';

const Index = (props) => {
  const { permissions, users, roles, branches } = props;

  const history = useHistory();
  const { pathname, search } = useLocation();
  const [currentTabKey, setCurrentTabKey] = useState('user');
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [addBranchModalVisible, setAddBranchModalVisible] = useState(false);
  const [addRoleModalVisible, setAddRoleModalVisible] = useState(false);
  useEffect(() => {
    if (search) {
      setCurrentTabKey(search.split('?')?.[1]);
    }
  }, []);

  const fetchCurrentTabList = (currentTabKey) => {
    switch (currentTabKey) {
      case 'user':
        users.fetchUserListByCriteria({});

        break;
      case 'role':
        roles.fetchRoleListByCriteria({});

        break;
      case 'branch':
        branches.fetchBranchListByCriteria({});

        break;
      default:
        break;
    }
  };

  const onChange = (key) => {
    setCurrentTabKey(key);
    history.replace({ pathname: pathname, search: key.toString() });
    fetchCurrentTabList(key);
  };

  const addUserModal = () => {
    setAddUserModalVisible(true);
  };

  const addBranchModal = () => {
    setAddBranchModalVisible(true);
  };

  const addRoleModal = () => {
    setAddRoleModalVisible(true);
    permissions.fetchPermission();
  };
  return (
    <>
      <div className="container-fluid no-breadcrumb page-dashboard article__section">
        {/* <TitleBar
        title={'User Management'}
        // breadCrumbObject={{
        //   userManagement: '',
        // }}
      /> */}
        <Row
          type="flex"
          justify="space-between"
          className="align-items-end"
          style={{ marginBottom: 12 }}
        >
          <Col>
            <h4 className="article-title">User Management</h4>
          </Col>
          <Col>
            {currentTabKey === 'user' ? (
              <WButton className="mx-2 " onClick={() => addUserModal()} customType="add">
                Add User
              </WButton>
            ) : currentTabKey === 'role' ? (
              <WButton className="mx-2 " onClick={() => addRoleModal()} customType="add">
                Add Role
              </WButton>
            ) : (
              <WButton className="mx-2 " onClick={() => addBranchModal()} customType="add">
                Add Branch
              </WButton>
            )}
          </Col>
        </Row>

        <div className="mt-1">
          <Tabs
            tabPosition="top"
            animated={false}
            tabBarStyle={{ background: '#ffffff' }}
            tabBarGutter={75}
            defaultActiveKey={currentTabKey}
            activeKey={currentTabKey}
            onChange={onChange}
            size="large"
          >
            {' '}
            <Tabs.TabPane tab={'User'} animated key={'user'}>
              <UserList {...props} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={'Role'} animated key={'role'}>
              <RoleList {...props} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={'Branch'} animated key={'branch'}>
              <BranchList {...props} />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
      {addUserModalVisible && (
        <UserModal
          addUserModalVisible={addUserModalVisible}
          setAddUserModalVisible={setAddUserModalVisible}
          {...props}
        />
      )}
      {addBranchModalVisible && (
        <BranchModal
          addBranchModalVisible={addBranchModalVisible}
          setAddBranchModalVisible={setAddBranchModalVisible}
          {...props}
        />
      )}
      {addRoleModalVisible && (
        <RoleModal
          addRoleModalVisible={addRoleModalVisible}
          setAddRoleModalVisible={setAddRoleModalVisible}
          {...props}
        />
      )}
    </>
  );
};

export default Index;
