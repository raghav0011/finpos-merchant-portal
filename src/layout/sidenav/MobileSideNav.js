import React from 'react';
import { connect } from 'react-redux';
import { Drawer } from 'antd';

import MobileSider from './MobileSider';
import { toggleOffCanvasMobileNav } from '../../layout/duck/actions';

const MobileSideNav = (props) => {
  const { offCanvasMobileNav, handleToggleOffCanvasMobileNav, sidenavWidth } = props;

  return (
    <Drawer
      closable={false}
      visible={!offCanvasMobileNav}
      placement="left"
      className="d-md-none app-drawer"
      width={sidenavWidth}
      onClose={() => {
        handleToggleOffCanvasMobileNav(true);
      }}
    >
      <MobileSider />
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
  offCanvasMobileNav: state.ui.offCanvasMobileNav,
  sidenavWidth: state.ui.sidenavWidth,
});

const mapDispatchToProps = (dispatch) => ({
  handleToggleOffCanvasMobileNav: (isOffCanvasMobileNav) => {
    dispatch(toggleOffCanvasMobileNav(isOffCanvasMobileNav));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileSideNav);
