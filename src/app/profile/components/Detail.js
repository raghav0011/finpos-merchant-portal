import React, { useEffect } from 'react';
import { Row, Col, Form, Breadcrumb, Card, Skeleton, Avatar } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';

import { getLocalStorage } from '../../../utils/storageUtil';
import { LOGGED_IN_USER_ID } from '../../../constants';
import Message from '../../shared/Message';

const FormItem = Form.Item;

const Detail = (props) => {
  const { t } = useTranslation();

  const {
    users,
    userLoading,
    userErrors,
    fetchUserProfile,
    cleanUserDetails,

    fetchUserProfileEditFormFields,
    cleanUserFormFields,
    userFormFields,
    userFormFieldsLoading,
    userFormFieldsErrors,
  } = props;

  const formItemLayout = {
    labelCol: {
      xl: { span: 10 },
      lg: { span: 12 },
      md: { span: 12 },
      sm: { span: 24 },
      xs: { span: 24 },
    },
    wrapperCol: {
      xl: { span: 14 },
      lg: { span: 12 },
      md: { span: 12 },
      sm: { span: 24 },
      xs: { span: 24 },
    },
    labelAlign: 'left',
  };

  useEffect(() => {
    const callApis = async () => {
      await fetchUserProfile(getLocalStorage(LOGGED_IN_USER_ID));
      await fetchUserProfileEditFormFields();
    };
    callApis();
    return () => {
      cleanUserDetails();
      cleanUserFormFields();
    };
  }, []);


  const getDescriptions = (label, value, key = null) => {
    return (
      <Col key={key || value || label} xl={12} lg={12} md={24} sm={24} xs={24}>
        <FormItem
          colon={false}
          className="mb-1"
          {...formItemLayout}
          label={<span style={{ fontWeight: '600' }}>{label}</span>}
        >
          {value}
        </FormItem>
      </Col>
    );
  };
  return (
    <div className="container-fluid no-breadcrumb page-dashboard">
      <article className="article" id="components-form-demo-advanced-search">
        <Row type="flex" justify="space-between">
          <Col span={16}>
            <h4 className="article-title">{t('users.profile.title')}</h4>
          </Col>
          <Col>
            <Breadcrumb separator="/">
              <Breadcrumb.Item>
                <DashboardOutlined/> <Link to={'/dashboard'}>{t('breadcrumb.dashboard')}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{t('breadcrumb.profile')}</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        {userErrors && <Message error={userErrors}/>}
        {userFormFieldsErrors && <Message error={userFormFieldsErrors}/>}
        <Card className="mb-1 py-3">
          <Skeleton loading={userLoading || userFormFieldsLoading} active>
            <div className="d-flex justify-content-center mb-4">
              <Avatar
                size={180}
                src={users && users.profile_picture}
                icon={!users.profile_picture && <UserOutlined/>}
              />
            </div>
            <Row>
              {userFormFields instanceof Array &&
              userFormFields.length > 0 &&
              userFormFields
                .filter((item) => item.widget !== 'upload')
                .map((item, index) => {
                  return getDescriptions(item.label, users?.[item.key] || 'n/a', index);
                })}

              {getDescriptions(
                'Change Password',
                <Link to="/profile/change-password" className="link-password">
                  {t('change.password.button.label')}
                </Link>,
                'Change password',
              )}
              {getDescriptions(
                'Edit Profile',
                <Link to="/profile/edit-profile" className="link-password">
                  Edit Profile
                </Link>,
                'Change password',
              )}
            </Row>
          </Skeleton>
        </Card>
      </article>
    </div>
  );
};

export default Detail;
