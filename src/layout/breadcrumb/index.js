import React from 'react';
import { withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const AppBreadcrumb = (props) => {
  const { location } = props;

  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const pathSnippetsFormatted = pathSnippets.map((snippet, i) => {
    return snippet.replace(/-/g, ' ');
  });

  const extraBreadcrumbItems = pathSnippetsFormatted.map((snippet, index) => {
    return <Breadcrumb.Item key={{ snippet }}>{snippet}</Breadcrumb.Item>;
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <HomeOutlined/>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return (
    <div className="app-breadcrumb">
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
};

export default withRouter(AppBreadcrumb);
