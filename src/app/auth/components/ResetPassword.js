import React, { useContext } from 'react';
import { Form, DatePicker, Input } from 'antd';
import moment from 'moment';

import { AuthContext } from '../../shared/Context/Auth';
import Message from '../../shared/Message';
import { WButton } from '../../shared/Widgets';
import LogoImage from '../../../assets/finpos_lg.png';

const FormItem = Form.Item;
const { Password } = Input;

const ResetPassword = (props) => {
  const [form] = Form.useForm();
  const { errorMessage, loading, resetPassword } = useContext(AuthContext);

  const onFinish = (values) => {
    form.validateFields().then((res) => {
      resetPassword({ ...res, date_of_birth: moment(res.date_of_birth).format('YYYY-MM-DD') });
    });
  };

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  return (
    <div className="login-box">
      <div className="box box-default">
        <div className="box-body p-5">
          <section className="form-v1-container">
            <div className="logo" style={{ marginTop: '0px' }}>
              <img src={LogoImage} alt="Logo" style={{ width: 130 }} />
            </div>
            <Message error={errorMessage} />

            <Form form={form} onFinish={onFinish} className="login-form custom-form">
              <div>
                <p className="otp-para-primary mt-4 mb-2">Please enter a new password</p>
              </div>
              <div>
                <FormItem noStyle name="reset_key" initialValue={props.match.params.id}>
                  <Input hidden />
                </FormItem>
                <FormItem
                  {...layout}
                  className="mb-2"
                  label={'New Password'}
                  name="new_password"
                  rules={[{ required: true, message: 'New Password required' }]}
                >
                  <Password size="large" placeholder="Password" />
                </FormItem>
                <FormItem
                  {...layout}
                  label={'Confirm Password'}
                  name="confirm_password"
                  rules={[
                    { required: true, message: 'Confirm Password required' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('new_password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('The two passwords that you entered do not match!')
                        );
                      },
                    }),
                  ]}
                >
                  <Password size="large" placeholder="Confirm Password" />
                </FormItem>
                <FormItem
                  {...layout}
                  label={'Date Of Birth'}
                  name="date_of_birth"
                  rules={[{ required: true, message: 'Date Of Birth' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </FormItem>
                <FormItem noStyle name="ip_address" initialValue={null}>
                  <Input hidden />
                </FormItem>
                <FormItem className="text-center">
                  <WButton customType="submit" htmlType="submit" loading={loading}>
                    Submit
                  </WButton>
                </FormItem>
              </div>
            </Form>
          </section>
        </div>
      </div>
    </div>
  );
};
// export default withRouter(ResetPassword);
export default ResetPassword;
