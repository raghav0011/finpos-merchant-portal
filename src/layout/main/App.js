import React from 'react';
import classnames from 'classnames';
import { Layout } from 'antd';

import AppHeader from '../../layout/header';
import AppFooter from '../../layout/footer';
import AppSidenav from '../../layout/sidenav';

const AppLayout = (props) => {
  const { boxedLayout, fixedSidenav, fixedHeader } = props;

  return (
    <Layout
      id="app-layout"
      className={classnames('app-layout', {
        'boxed-layout': boxedLayout,
        'fixed-sidenav': fixedSidenav,
        'fixed-header': fixedHeader,
      })}
    >
      <AppSidenav/>
      {fixedHeader ? (
        <Layout>
          <AppHeader/>
          <Layout>
            {props.children}
            <AppFooter/>
          </Layout>
        </Layout>
      ) : (
        <Layout>
          <AppHeader/>
          {props.children}
          <AppFooter/>
        </Layout>
      )}
    </Layout>
  );
};

export default AppLayout;
