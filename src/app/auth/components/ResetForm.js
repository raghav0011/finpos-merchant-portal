import React, { useContext } from 'react';
import { Form, Input, Button, Divider } from 'antd';
import { withRouter } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';

import { AuthContext } from '../../shared/Context/Auth';
import Message from '../../shared/Message';

const FormItem = Form.Item;

const ResetForm = () => {
  const { forgotPassword, loading, errorMessage } = useContext(AuthContext);

  const onFinish = (values) => {
    forgotPassword(values);
  };

  return (
    <div className="reset-box">
      <div className="box box-default">
        <div className="box-body p-5">
          <section className="form-v1-container">
            <Message error={errorMessage}/>
            <h4 className="company-title">Reset Password</h4>
            <Divider/>
            <Form onFinish={onFinish} className="reset-form">
              <FormItem
                name="login_id"
                rules={[
                  { type: 'email', message: 'The input is not valid E-mail' },
                  { required: true, message: 'Please input your email' },
                ]}
                className="mb-3"
              >
                <Input size="large" prefix={<MailOutlined/>} placeholder="Email"/>
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-cta btn-block"
                  loading={loading}
                >
                  Reset Password
                </Button>
              </FormItem>
            </Form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ResetForm);
