import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Form, Button, Checkbox, Descriptions, Spin, Card } from 'antd';
import { useTranslation } from 'react-i18next';

import { hasPermission, getStatusLabel } from '../../../utils/commonUtil';
import Message from '../../shared/Message';
import { isAllowed } from '../../../utils/permissionUtil';

const FormItem = Form.Item;

const Detail = (props) => {
  const { t } = useTranslation();

  const {
    hideDetailModal,
    setEditMode,
    permissions,

    permissionLoading,

    roleDetails,
    roleDetailsErrors,
    roleDetailsLoading,
  } = props;

  const formItemLayout = {
    labelCol: {
      xl: { span: 6 },
      lg: { span: 6 },
      md: { span: 8 },
      sm: { span: 6 },
      xs: { span: 24 },
    },
    wrapperCol: {
      xl: { span: 12 },
      lg: { span: 12 },
      md: { span: 16 },
      sm: { span: 18 },
      xs: { span: 24 },
    },
    labelAlign: 'left',
  };

  const submitFormLayout = {
    wrapperCol: {
      xl: { span: 24, offset: 0 },
      lg: { span: 24, offset: 0 },
      md: { span: 12, offset: 0 },
      sm: { span: 12, offset: 0 },
      xs: { span: 24, offset: 0 },
    },
  };

  return (
    <>
      <Message error={roleDetailsErrors} />

      <Card className="detail-view">
        <Spin spinning={roleDetailsLoading}>
          <Col span={24}>
            <Form className="role-form">
              <Row>
                <Col xl={16} lg={24} md={24} sm={24}>
                  <FormItem {...formItemLayout} label={t('roles.name.label')}>
                    {roleDetails.name}
                  </FormItem>
                </Col>

                <Col xl={16} lg={24} md={24} sm={24}>
                  <FormItem {...formItemLayout} label={t('roles.active.label')}>
                    {getStatusLabel(roleDetails.active)}
                  </FormItem>
                </Col>

                <Col xl={24} lg={24} md={24} sm={24}>
                  <Descriptions size="default">
                    <Descriptions.Item>
                      <div className="detail-table scroll-table">
                        <table className="table table-responsive ">
                          <thead>
                            <tr>
                              <th style={{ width: '30%' }}>{t('roles.modules.label')}</th>
                              <th>{t('roles.permission.label')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <Spin spinning={permissionLoading}>
                              {permissions &&
                                permissions.map((permission, index) => (
                                  <tr key={index}>
                                    <td style={{ width: '30%' }}>{permission.title}</td>
                                    <td>
                                      <Row>
                                        {permission.permissions &&
                                          permission.permissions.map((item, index) => (
                                            <Col xl={8} lg={10} md={12} sm={12} xs={24} key={index}>
                                              <Checkbox
                                                disabled
                                                checked={hasPermission(
                                                  item.code,
                                                  roleDetails.permissions
                                                )}
                                              />
                                              <span className="ml-1">{item.title}</span>
                                            </Col>
                                          ))}
                                      </Row>
                                    </td>
                                  </tr>
                                ))}
                            </Spin>
                          </tbody>
                        </table>
                      </div>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>

                <Col xl={16} lg={24} md={24} sm={24}>
                  <FormItem {...submitFormLayout}>
                    {isAllowed(['role:modify']) && (
                      <Button
                        className="no-underline"
                        style={{ width: '5rem' }}
                        // onClick={openEditRoleModal}
                        onClick={() => setEditMode(true)}
                      >
                        {t('edit.button.label')}
                      </Button>
                    )}

                    <Button
                      className="no-underline"
                      style={{ width: '5rem' }}
                      onClick={hideDetailModal}
                      customType="cancel"
                      htmlType="button"
                      danger
                    >
                      {t('cancel.button.label')}
                    </Button>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Col>
        </Spin>
      </Card>
    </>
  );
};

export default withRouter(Detail);
