import React from 'react';
import { Row, Col, Form, Button, Input, Skeleton, Card } from 'antd';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FormItem = Form.Item;

const PolicyForm = (props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { passwordPolicies, passwordLoading, updatePasswordPolicy } = props;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 12 },
      lg: { span: 12 },
      xl: { span: 12 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 12 },
      lg: { span: 12 },
      xl: { span: 12 },
    },
    labelAlign: 'left',
  };
  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 12, offset: 0 },
      md: { span: 12, offset: 0 },
    },
  };

  const onFinish = (values) => {
    delete values.enabled;
    delete values.otp_enable;
    // updatePasswordPolicy({ ...values, otp_enable: values.otp_enable ? 1 : 0 });
    updatePasswordPolicy(values);
  };

  const sumOfLengthsValidator = ({ getFieldValue }) => ({
    validator(rule, value) {
      const minimumNumber = parseInt(getFieldValue('password_numeric_char')) || 0;
      const minimumUppercaseLetter = parseInt(getFieldValue('password_ucase_char')) || 0;
      const minimumSpecialCharacter = parseInt(getFieldValue('password_special_char')) || 0;
      const minimumLowerCharacter = parseInt(getFieldValue('password_lcase_char')) || 0;
      const minimumLength = parseInt(getFieldValue('password_length_min'));

      if (
        minimumLowerCharacter + minimumNumber + minimumUppercaseLetter + minimumSpecialCharacter <=
        minimumLength
      ) {
        return Promise.resolve();
      }

      return Promise.reject(t('settings.passwordPolicy.message.validateTotalSum'));
    },
  });

  const greaterThanMinLengthValidator = ({ getFieldValue }) => ({
    validator(rule, value) {
      if (!value || parseInt(getFieldValue('password_length_min')) <= value) {
        return Promise.resolve();
      }
      return Promise.reject('Value must be greater than minimum length');
    },
  });

  const lessThanMaxLengthValidator = ({ getFieldValue }) => ({
    validator(rule, value) {
      if (!value || getFieldValue('password_length_max') >= value) {
        return Promise.resolve();
      }
      return Promise.reject('Value must be less than max length');
    },
  });
  return (
    <>
      <Card className="box box-default">
        <Skeleton loading={passwordLoading} active>
          <Form form={form} onFinish={onFinish} className="policy-form password-label custom-form">
            <Row style={{ paddingLeft: '20px' }}>
              <FormItem name={'enabled'} valuePropName="checked" initialValue={true} noStyle>
                {/* <Checkbox>
                      <span className="ml-2">{t('settings.passwordPolicy.label.enabled')}</span>
                    </Checkbox> */}
                <Input hidden/>
              </FormItem>
            </Row>

            <FormItem
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues?.enabled !== currentValues?.enabled
              }
            >
              {({ getFieldValue }) => {
                return (
                  getFieldValue('enabled') !== false && (
                    <div>
                      <hr/>
                      <Row>
                        <Col xl={12} lg={24} md={24} sm={24}>
                          <FormItem
                            {...formItemLayout}
                            label={t('settings.passwordPolicy.label.minimumLength')}
                            name={'password_length_min'}
                            initialValue={passwordPolicies?.password_length_min}
                            rules={[
                              {
                                required: true,
                                message: 'Required',
                              },
                              {
                                min: 1,
                                type: 'number',
                                message: t('settings.passwordPolicy.minimumLength.message.min'),
                              },
                            ]}
                            getValueFromEvent={(e) => {
                              const convertedValue = Number(e.currentTarget.value);
                              if (isNaN(convertedValue)) {
                                return Number(passwordPolicies.password_length_min);
                              } else {
                                return convertedValue;
                              }
                            }}
                          >
                            <Input type="number" maxLength={2}/>
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={12} lg={24} md={24} sm={24}>
                          <FormItem
                            {...formItemLayout}
                            label={t('settings.passwordPolicy.label.maximumLength')}
                            name={'password_length_max'}
                            initialValue={passwordPolicies?.password_length_max}
                            rules={[
                              {
                                required: true,
                                message: 'Required',
                              },
                              {
                                min: 1,
                                type: 'number',
                                message: 'value must be greater than 0',
                              },
                              greaterThanMinLengthValidator,
                            ]}
                            getValueFromEvent={(e) => {
                              const convertedValue = Number(e.currentTarget.value);
                              if (isNaN(convertedValue)) {
                                return Number(passwordPolicies.password_length_max);
                              } else {
                                return convertedValue;
                              }
                            }}
                          >
                            <Input type="number" maxLength={2}/>
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={12} lg={24} md={24} sm={24}>
                          <FormItem
                            {...formItemLayout}
                            label={t('settings.passwordPolicy.label.minimumUpperCaseLetters')}
                            name={'password_ucase_char'}
                            initialValue={passwordPolicies?.password_ucase_char}
                            dependencies={['password_length_min', 'password_length_max']}
                            rules={[
                              {
                                required: true,
                                message: 'Required',
                              },
                              lessThanMaxLengthValidator,
                              sumOfLengthsValidator,
                            ]}
                            getValueFromEvent={(e) => {
                              const convertedValue = Number(e.currentTarget.value);
                              if (isNaN(convertedValue)) {
                                return Number(getFieldValue('password_ucase_char'));
                              } else {
                                return convertedValue;
                              }
                            }}
                          >
                            <Input type="number" maxLength={2}/>
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={12} lg={24} md={24} sm={24}>
                          <FormItem
                            {...formItemLayout}
                            label={t('settings.passwordPolicy.label.minimumLowerCaseLetters')}
                            name={'password_lcase_char'}
                            initialValue={passwordPolicies?.password_lcase_char}
                            dependencies={['password_length_min', 'password_length_max']}
                            rules={[
                              {
                                required: true,
                                message: 'Required',
                              },
                              sumOfLengthsValidator,
                              lessThanMaxLengthValidator,
                            ]}
                            getValueFromEvent={(e) => {
                              const convertedValue = Number(e.currentTarget.value);
                              if (isNaN(convertedValue)) {
                                return Number(getFieldValue('password_lcase_char'));
                              } else {
                                return convertedValue;
                              }
                            }}
                          >
                            <Input type="number" maxLength={2}/>
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={12} lg={24} md={24} sm={24}>
                          <FormItem
                            {...formItemLayout}
                            label={t('settings.passwordPolicy.label.minimumNumbers')}
                            name={'password_numeric_char'}
                            initialValue={passwordPolicies?.password_numeric_char}
                            dependencies={['password_length_min', 'password_length_max']}
                            rules={[
                              {
                                required: true,
                                message: 'Required',
                              },
                              lessThanMaxLengthValidator,
                              sumOfLengthsValidator,
                            ]}
                            getValueFromEvent={(e) => {
                              const convertedValue = Number(e.currentTarget.value);
                              if (isNaN(convertedValue)) {
                                return Number(getFieldValue('password_numeric_char'));
                              } else {
                                return convertedValue;
                              }
                            }}
                          >
                            <Input type="number" maxLength={2}/>
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={12} lg={24} md={24} sm={24}>
                          <FormItem
                            {...formItemLayout}
                            label={t('settings.passwordPolicy.label.minimumSpecialCharacters')}
                            name={'password_special_char'}
                            initialValue={passwordPolicies?.password_special_char}
                            dependencies={['password_length_min', 'password_length_max']}
                            rules={[
                              {
                                required: true,
                                message: 'Required',
                              },
                              sumOfLengthsValidator,
                              lessThanMaxLengthValidator,
                            ]}
                            getValueFromEvent={(e) => {
                              const convertedValue = Number(e.currentTarget.value);
                              if (isNaN(convertedValue)) {
                                return Number(getFieldValue('password_special_char'));
                              } else {
                                return convertedValue;
                              }
                            }}
                          >
                            <Input type="number" maxLength={2}/>
                          </FormItem>
                        </Col>
                      </Row>

                      <Row>
                        <Col xl={12} lg={24} md={24} sm={24}>
                          <FormItem
                            name={'password_valid'}
                            initialValue={passwordPolicies?.password_valid}
                            {...formItemLayout}
                            rules={[
                              {
                                required: true,
                                message: t('settings.passwordPolicy.message.required'),
                              },
                              {
                                type: 'number',
                                min: 1,
                                message: t('settings.passwordPolicy.passwordExpiryDay.message.min'),
                              },
                              {
                                type: 'number',
                                max: 365,
                                message: t('settings.passwordPolicy.passwordExpiryDay.message.max'),
                              },
                            ]}
                            getValueFromEvent={(e) => {
                              const convertedValue = Number(e.currentTarget.value);
                              if (isNaN(convertedValue)) {
                                return Number(getFieldValue('password_valid'));
                              } else {
                                return convertedValue;
                              }
                            }}
                            label="Password Valid Till"
                          >
                            <Input
                              type="number"
                              // style={{ width: '10rem' }}
                              maxLength={3}
                              addonAfter={
                                <span className="password-span-label ml-1">
                                  {t('settings.passwordPolicy.span.passwordExpiryDay')}
                                </span>
                              }
                            />
                          </FormItem>
                        </Col>
                      </Row>
                      {/* <Row>
                        <Col xl={12} lg={24} md={24} sm={24}>
                          <FormItem
                            name={'otp_enable'}
                            initialValue={!!passwordPolicies?.otp_enable}
                            {...formItemLayout}
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                            valuePropName="checked"
                            label="Enable OTP"
                          >
                            <Switch />
                          </FormItem>
                        </Col>
                      </Row> */}

                      <br/>

                      <div>
                        {/* <Row>
                              <Col xl={24} lg={24} md={24} sm={24}>
                                <FormItem
                                  {...formCheckboxItemLayout}
                                  name={'passwordNeverExpires'}
                                  valuePropName="checked"
                                  initialValue={passwordPolicies?.passwordNeverExpires}
                                >
                                  <Checkbox>
                                    <span className="ml-2">
                                      {t('settings.passwordPolicy.label.passwordNeverExpires')}
                                    </span>
                                  </Checkbox>
                                </FormItem>
                              </Col>
                            </Row> */}
                      </div>
                    </div>
                  )
                );
              }}
            </FormItem>
            <FormItem
              {...submitFormLayout}
              style={{ marginTop: 12 }}
              colon={false}
              shouldUpdate={true}
            >
              {() => (
                <Button
                  type="primary"
                  className="mr-2"
                  htmlType="submit"
                  disabled={!form.isFieldsTouched()}
                >
                  {t('save.button.label')}
                </Button>
              )}
            </FormItem>
          </Form>
        </Skeleton>
      </Card>
    </>
  );
};

export default withRouter(PolicyForm);
