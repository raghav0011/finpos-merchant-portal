import React, { useContext } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Layout, Menu, Dropdown, Divider, Avatar, Button } from 'antd';
import {
  ProfileOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

import Logo from '../../app/shared/Logo';
import { toggleCollapsedNav, toggleOffCanvasMobileNav } from '../../layout/duck/actions';
import { AuthContext } from '../../app/shared/Context/Auth';
import { USER_FULL_NAME } from '../../constants';
import { getLocalStorage } from '../../utils/storageUtil';

const { Header } = Layout;

const AppHeader = (props) => {
  const { logout } = useContext(AuthContext);
  const { collapsedNav, offCanvasMobileNav, colorOption, showLogo, uiHeaderData } = props;
  const onToggleCollapsedNav = () => {
    const { handleToggleCollapsedNav, collapsedNav } = props;
    handleToggleCollapsedNav(!collapsedNav);
  };

  const onToggleOffCanvasMobileNav = () => {
    const { handleToggleOffCanvasMobileNav, offCanvasMobileNav } = props;
    handleToggleOffCanvasMobileNav(!offCanvasMobileNav);
  };

  const avatarDropdown = (
    <Menu className="app-header-dropdown">
      {/* <Menu.Item key="4" className="d-block d-md-none">
        {' '}
        Signed in as <strong>{USER_FULL_NAME}</strong>{' '}
      </Menu.Item> */}
      <Menu.Divider className="d-block d-md-none" />
      <Menu.Item key="1">
        <Link to={`/profile`}>
          {' '}
          <ProfileOutlined className="mr-2" />
          Profile
        </Link>{' '}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        {' '}
        <Button
          type="link"
          style={{ margin: '-5px -16px' }}
          className="btn-a-link"
          onClick={() => {
            logout();
          }}
        >
          <LogoutOutlined className="mr-2" />
          Log Out
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className="app-header">
      <div
        className={classnames('app-header-inner', {
          'bg-white': ['11', '12', '13', '14', '15', '16', '21'].indexOf(colorOption) >= 0,
          'bg-dark': colorOption === '31',
          'bg-primary': ['22', '32'].indexOf(colorOption) >= 0,
          'bg-success': ['23', '33'].indexOf(colorOption) >= 0,
          'bg-info': ['24', '34'].indexOf(colorOption) >= 0,
          'bg-warning': ['25', '35'].indexOf(colorOption) >= 0,
          'bg-danger': ['26', '36'].indexOf(colorOption) >= 0,
        })}
      >
        <div className="header-left">
          <div className="list-unstyled list-inline">
            {showLogo && [<Logo key="logo" />, <Divider type="vertical" key="line" />]}
            <Button
              // href="#"
              type="link"
              className="list-inline-item d-none d-md-inline-block cursor--pointer"
              onClick={onToggleCollapsedNav}
            >
              {collapsedNav ? (
                <MenuUnfoldOutlined className="list-icon" style={{ color: '#fff' }} />
              ) : (
                <MenuFoldOutlined className="list-icon" style={{ color: '#fff' }} />
              )}
            </Button>
            <Button
              // href="#"
              type="link"
              className="list-inline-item d-md-none cursor--pointer"
              onClick={onToggleOffCanvasMobileNav}
            >
              {offCanvasMobileNav ? (
                <MenuUnfoldOutlined className="list-icon" style={{ color: '#fff' }} />
              ) : (
                <MenuFoldOutlined className="list-icon" style={{ color: '#fff' }} />
              )}
            </Button>
          </div>
        </div>
        <div className="header-right">
          <div className="list-unstyled list-inline">
            <Dropdown
              className="list-inline-item"
              overlay={avatarDropdown}
              trigger={['click']}
              placement="bottomRight"
            >
              <span style={{ cursor: 'pointer' }}>
                <Avatar
                  src={uiHeaderData?.profilePicture || '/assets/avatars/6.png'}
                  size="small"
                />
                <span className="avatar-text d-none d-md-inline">{uiHeaderData?.fullName}</span>
              </span>
            </Dropdown>
          </div>
        </div>
      </div>
    </Header>
  );
};

const mapStateToProps = (state) => ({
  offCanvasMobileNav: state.ui.offCanvasMobileNav,
  collapsedNav: state.ui.collapsedNav,
  colorOption: state.ui.colorOption,
  uiHeaderData: state.uiHeaderData,
});

const mapDispatchToProps = (dispatch) => ({
  handleToggleCollapsedNav: (isCollapsedNav) => {
    dispatch(toggleCollapsedNav(isCollapsedNav));
  },
  handleToggleOffCanvasMobileNav: (isOffCanvasMobileNav) => {
    dispatch(toggleOffCanvasMobileNav(isOffCanvasMobileNav));
  },
  actions: bindActionCreators(Object.assign({}), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
