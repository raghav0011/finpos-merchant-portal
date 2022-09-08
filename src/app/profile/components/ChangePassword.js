import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, Breadcrumb, Card, Skeleton } from 'antd';
import { DashboardOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import PasswordPolicy from '../../shared/PasswordPolicy';
import Loader from '../../shared/Loading';
import Message from '../../shared/Message';
import { isEmpty } from '../../../utils/commonUtil';
import { decodeUsername } from '../../../utils/jwtUtil';
import { getLocalStorage } from '../../../utils/storageUtil';
import { JWT_TOKEN, ENFORCE_PASSWORD_CHANGE, LOGGED_IN_USER_ID } from '../../../constants';

const FormItem = Form.Item;
const { Password } = Input;

const ChangePassword = (props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const {
    history,
    users,
    userErrors,
    updatePassword,
    fetchUserProfile,
    passwordLoading,
    passwordErrors,
    passwordPolicies,
    fetchPasswordPolicy,
  } = props;

  const token = getLocalStorage(JWT_TOKEN);
  const userID = decodeUsername(token);
  const [password, setPassword] = useState('');

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      md: { span: 8 },
      sm: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
      md: { span: 12 },
      sm: { span: 24 },
    },
  };

  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 12, offset: 8 },
    },
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const onFinish = (values) => {
    updatePassword(values).then((response) => {
      if (response.type.endsWith('fulfilled')) {
        history.push('/');
      }
    });
  };

  // not in use

  useEffect(() => {
    fetchUserProfile(getLocalStorage(LOGGED_IN_USER_ID));
    fetchPasswordPolicy();
  }, []);

  if (isEmpty(users)) {
    return <Loader center={true} />;
  }

  const compareWithCurrentValidator = ({ getFieldValue }) => ({
    validator(rule, value) {
      if (getFieldValue('current_password') === value) {
        return Promise.reject('Current password cannot be same as new password');
      }
      return Promise.resolve();
    },
  });

  return (
    <div className="container-fluid no-breadcrumb page-dashboard">
      <article className="article" id="components-form-demo-advanced-search">
        <Row type="flex" justify="space-between">
          <Col span={16}>
            <h4 className="article-title">{t('users.change.password.title')}</h4>
          </Col>
          <Col>
            <Breadcrumb separator="/">
              <Breadcrumb.Item>
                {' '}
                <DashboardOutlined />
                <Link to={'/dashboard'}>{t('breadcrumb.dashboard')}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{t('breadcrumb.change.password')}</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={14} md={24} sm={24}>
            <Message error={userErrors} />
            <Card bordered={false}>
              <Form
                onFinish={onFinish}
                className="password-form password-label-align"
                layout="horizontal"
                style={{ marginTop: 8 }}
                form={form}
              >
                <FormItem
                  {...formItemLayout}
                  name="current_password"
                  label={t('users.change.password.current.label')}
                  rules={[{ required: true, message: 'Please input your password!' }]}
                  hasFeedback
                >
                  <Password placeholder={t('users.change.password.current.label')} />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={t('users.change.password.new.label')}
                  name="new_password"
                  rules={[
                    { required: true, message: 'Please input new password' },
                    {
                      min: passwordPolicies.password_length_min,
                      message: `Password must be at least ${passwordPolicies.password_length_min} characters!`,
                    },
                    {
                      max: passwordPolicies.password_length_max,
                      message: `Password must be at most ${passwordPolicies.password_length_max} characters!`,
                    },
                    {
                      pattern: new RegExp(
                        `^(?=(.*[A-Z]){${parseInt(
                          passwordPolicies?.password_ucase_char
                        )},})(?=(.*[a-z]){${parseInt(
                          passwordPolicies?.password_lcase_char
                        )},})(?=(.*[0-9]){${parseInt(
                          passwordPolicies?.password_numeric_char
                        )},})(?=(.*[!@#$%^&*]){${parseInt(
                          passwordPolicies?.password_special_char
                        )},})[a-zA-Z0-9!@#$%^&*]{${passwordPolicies?.password_length_min},${
                          passwordPolicies?.password_length_max
                        }}$`
                      ),
                      message: t('users.change.password.new.regex.validation.message'),
                    },
                    compareWithCurrentValidator,
                    // { validator: validateToUsername },
                  ]}
                  hasFeedback
                >
                  <Password
                    placeholder={t('users.change.password.new.label')}
                    onChange={handlePassword}
                  />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={t('users.change.password.confirm.label')}
                  name="confirm_password"
                  dependencies={['new_password']}
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue('new_password') === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject('Passwords do not match.');
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Password placeholder={t('users.change.password.confirm.label')} />
                </FormItem>
                <FormItem {...submitFormLayout} style={{ marginTop: 12 }}>
                  <FormItem
                    style={{
                      display: 'inline-block',
                    }}
                    colon={false}
                    shouldUpdate={true}
                  >
                    {() => (
                      <Button type="primary" htmlType="submit" disabled={!form.isFieldsTouched()}>
                        Change Password
                      </Button>
                    )}
                  </FormItem>
                  <FormItem
                    style={{
                      display: 'inline-block',
                    }}
                    colon={false}
                  >
                    {!getLocalStorage(ENFORCE_PASSWORD_CHANGE) && (
                      <Button
                        customType="cancel"
                        htmlType="button"
                        style={{ marginLeft: 5 }}
                        className=""
                        danger
                      >
                        <Link to="/profile">{t('cancel.button.label')}</Link>
                      </Button>
                    )}
                  </FormItem>
                </FormItem>
              </Form>
            </Card>
          </Col>

          <Col lg={10} md={24} sm={24}>
            <Message error={passwordErrors} />
            <Card
              bordered
              title={t('users.change.password.password.guidelines.title')}
              className="password-guideline"
            >
              <Skeleton loading={passwordLoading} active>
                <PasswordPolicy
                  passwordPolicies={{
                    minimumLength: passwordPolicies.password_length_min,
                    maximumLength: passwordPolicies.password_length_max,
                    minimumUpperCaseLetters: passwordPolicies.password_ucase_char,
                    minimumLowerCaseLetters: passwordPolicies.password_lcase_char,
                    minimumNumbers: passwordPolicies.password_numeric_char,
                    minimumSpecialCharacters: passwordPolicies.password_special_char,
                  }}
                  password={password}
                  userID={userID}
                />
              </Skeleton>
            </Card>
          </Col>
        </Row>
      </article>
    </div>
  );
};

export default ChangePassword;
