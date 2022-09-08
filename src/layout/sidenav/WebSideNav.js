import React, { useRef } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import AppMenu from './AppMenu';
import Logo from '../../app/shared/Logo';
import { toggleCollapsedNav, toggleOffCanvasNav } from '../../layout/duck/actions';

const { Sider } = Layout;

const WebSideNav = (props) => {
  const { collapsedNav, offCanvasNav, sidenavWidth, colorOption } = props;
  const collapsedWidth = offCanvasNav ? 0 : 80;
  const sidenavContentRef = useRef('sidenavContent');

  return (
    <Sider
      collapsible
      collapsed={collapsedNav || offCanvasNav}
      collapsedWidth={collapsedWidth}
      trigger={null}
      width={sidenavWidth}
      id="app-sidenav"
      className={classnames('app-sidenav d-none d-md-flex', {
        'sidenav-bg-light': ['31', '32', '33', '34', '35', '36'].indexOf(colorOption) >= 0,
        'sidenav-bg-dark': ['31', '32', '33', '34', '35', '36'].indexOf(colorOption) < 0,
      })}
    >
      <section
        className={classnames('sidenav-header', {
          'bg-dark': ['11', '31'].indexOf(colorOption) >= 0,
          'bg-white': colorOption === '21',
          // 'bg-primary': ['12', '22', '32'].indexOf(colorOption) >= 0,
          // 'bg-success': ['13', '23', '33'].indexOf(colorOption) >= 0,
          // 'bg-info': ['14', '24', '34'].indexOf(colorOption) >= 0,
          // 'bg-warning': ['15', '25', '35'].indexOf(colorOption) >= 0,
          // 'bg-danger': ['16', '26', '36'].indexOf(colorOption) >= 0,
        })}
      >
        <Logo {...props} />
      </section>

      <div className="sidenav-content" ref={sidenavContentRef}>
        <AppMenu />
      </div>
    </Sider>
  );
};

const mapStateToProps = (state) => ({
  collapsedNav: state.ui.collapsedNav,
  offCanvasNav: state.ui.offCanvasNav,
  sidenavWidth: state.ui.sidenavWidth,
  colorOption: state.ui.colorOption,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleToggleCollapsedNav: (isCollapsedNav) => {
      dispatch(toggleCollapsedNav(isCollapsedNav));
    },
    handleToggleOffCanvasNav: (isOffCanvasNav) => {
      dispatch(toggleOffCanvasNav(isOffCanvasNav));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WebSideNav);
