import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { DashboardOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const WTitleBar = (props) => {
  const { t } = useTranslation();
  const {
    breadCrumbObject, // paths after dashboard {title:path}
    title,
  } = props;

  return (
    <Row type="flex" justify="space-between" className="mb-1">
      <Col span={8}>
        <h4 className="article-title">{title}</h4>
      </Col>
      <Col>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            {' '}
            <DashboardOutlined />
            <Link to={'/dashboard'}>{t('breadcrumb.dashboard')}</Link>
          </Breadcrumb.Item>
          {typeof breadCrumbObject === 'object' &&
            breadCrumbObject !== null &&
            !Array.isArray(breadCrumbObject) &&
            Object.keys(breadCrumbObject).length > 0 &&
            Object.keys(breadCrumbObject).map((item, index) => (
              <Breadcrumb.Item key={index}>
                <Link to={breadCrumbObject[item] || '#'}>{item}</Link>
              </Breadcrumb.Item>
            ))}
        </Breadcrumb>
      </Col>
    </Row>
  );
};

WTitleBar.propTypes = {
  breadCrumbObject: PropTypes.object,
  title: PropTypes.string,
};

export default WTitleBar;
