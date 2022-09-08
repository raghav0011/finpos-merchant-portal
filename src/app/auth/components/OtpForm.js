import React, { useState, useContext, useEffect } from 'react';
import { Form, Tooltip, Button, Input, Avatar } from 'antd';
import { withRouter, useLocation } from 'react-router-dom';
import ReactCodeInput from 'react-verification-code-input';

import { AuthContext } from '../../shared/Context/Auth';
import Message from '../../shared/Message';
import LeftArrow from '../../../assets/images/left-arrow.svg';

const FormItem = Form.Item;

const OtpForm = (props) => {
  const { otpToken, loading, errorMessage, otpVerify, resend, setErrorMessage } =
    useContext(AuthContext);

  const { state } = useLocation();

  const [enableResend, setEnableResend] = useState(true);
  const [timeTillResendEnabled, setTimeTillResendEnabled] = useState();
  const timeout = 10000;
  const [form] = Form.useForm();

  useEffect(() => {
    if (!otpToken) {
      props.history.push('/');
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setEnableResend(false);
    setTimeTillResendEnabled(timeout);

    let initTimer = setTimeout(() => {
      setEnableResend(true);
      setTimeTillResendEnabled();
    }, timeout);
    return () => {
      clearTimeout(initTimer);
    };
  }, []);

  useEffect(() => {
    let secTimer;
    if (!enableResend) {
      secTimer = setTimeout(() => {
        setTimeTillResendEnabled(timeTillResendEnabled - 1000);
      }, 1000);
    }
    return () => {
      clearTimeout(secTimer);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeTillResendEnabled]);

  const onFinish = (values) => {
    form.validateFields().then((res) => {
      otpVerify(res, otpToken);
    });
  };

  const resendHandler = () => {
    setEnableResend(false);
    resend()
      .then((_) => {
        setTimeTillResendEnabled(timeout);
        setTimeout(() => {
          setEnableResend(true);
          setTimeTillResendEnabled();
        }, timeout);
      })
      .catch((_) => {
        setEnableResend(true);
      });
  };

  return (
    <div className="login-box">
      <div className="box box-default">
        <div className="box-body p-5">
          <a
            href="!#"
            onClick={() => {
              setErrorMessage();
              props.history.push('/');
            }}
            className="left-arrow-container"
          >
            <Tooltip title="Go Back">
              <img src={LeftArrow} height="20px" alt="left arrow" />
            </Tooltip>
          </a>
          <section className="form-v1-container">
            <div className="logo" style={{ marginTop: '0px' }}>
              <Avatar
                src={
                  state?.profilePic ||
                  'data:image/png;base64,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'
                }
                size={100}
              />
            </div>
            <Message error={errorMessage} />

            <Form form={form} onFinish={onFinish} className="login-form">
              <div>
                <p className="otp-para-primary mt-5">Please enter the OTP</p>
                <p className="otp-para-secondary my-2">
                  A One-Time password has been sent to your Email
                </p>
              </div>
              <div>
                <FormItem name="otp_value" rules={[{ required: true, message: 'OTP required' }]}>
                  <ReactCodeInput
                    className="otp-input"
                    fieldWidth={40}
                    fieldHeight={40}
                    loading={loading}
                    autoFocus
                    onChange={(value) => form.setFieldsValue({ otp_value: value })}
                    type="number"
                  />{' '}
                </FormItem>
                <FormItem noStyle initialValue={null} name="ip_address">
                  <Input hidden />
                </FormItem>

                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    loading={loading}
                  >
                    Verify
                  </Button>
                </FormItem>
              </div>
              <div>
                <p className="otp-para-secondary mt-2 py-1">
                  Didn't get code?{' '}
                  {enableResend ? (
                    <span
                      className="px-1 resend-btn"
                      style={{ cursor: 'pointer' }}
                      onClick={resendHandler}
                    >
                      Resend Code
                    </span>
                  ) : (
                    <span style={{ cursor: 'pointer' }} className="px-1 resend-disabled">
                      Resend Code
                    </span>
                  )}
                </p>
                {!enableResend && !isNaN(timeTillResendEnabled) && (
                  <p className="otp-para-secondary">
                    Please try again after <strong>{timeTillResendEnabled / 1000} sec</strong>, If
                    you did not receive OTP
                  </p>
                )}
              </div>
            </Form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default withRouter(OtpForm);
