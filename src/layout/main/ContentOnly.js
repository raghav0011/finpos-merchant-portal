import React from 'react';
import classnames from 'classnames';
import { Layout } from 'antd';

const AppLayout = (props) => {
  const { boxedLayout } = props;

  return (
    <Layout
      id="app-layout"
      className={classnames('app-layout', {
        'boxed-layout': boxedLayout,
      })}
    >
      {props.children}
    </Layout>
  );
};

export default AppLayout;
