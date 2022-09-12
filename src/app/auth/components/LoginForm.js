import React, { useContext } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { AuthContext } from '../../shared/Context/Auth';
import Message from '../../shared/Message';
import LogoImage from '../../../assets/finpos_lg.png';

const FormItem = Form.Item;
const { Password } = Input;

const LoginForm = () => {
  const { login, loading, errorMessage, setErrorMessage } = useContext(AuthContext);

  const onFinish = (values) => {
    setErrorMessage();
    login(values);
  };

  return (
    <div className="login-box">
      <Spin spinning={loading} size="large" delay={300} tip="Loading...">
        <div className="box box-default" style={{ width: '25rem' }}>
          <div className="box-body p-5">
            <section className="form-v1-container">
              <div className="logo" style={{ marginTop: '0px' }}>
                <img src={LogoImage} style={{ width: '100%' }} alt="Finpulse Logo" />
              </div>

              <Message error={errorMessage} />

              <Form onFinish={onFinish} className="login-form">
                <FormItem
                  name="user_id"
                  rules={[
                    { required: true, message: 'Please input your username' },
                    { type: 'email', message: 'Please input valid username' },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined style={{ fontSize: 13 }} />}
                    placeholder="User ID"
                  />
                </FormItem>

                <FormItem
                  name="password"
                  rules={[{ required: true, message: 'Please input your Password' }]}
                >
                  <Password
                    size="large"
                    prefix={<LockOutlined style={{ fontSize: 13 }} />}
                    placeholder="Password"
                  />
                </FormItem>

                <FormItem>
                  {/* <Link to={'/reset'} className="login-form-forgot">
                Forgot password
              </Link> */}
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button btn-custom-field"
                    // loading={loading}
                  >
                    Login
                  </Button>
                </FormItem>
              </Form>
            </section>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default withRouter(LoginForm);
