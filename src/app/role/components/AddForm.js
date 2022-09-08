import React, { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Breadcrumb, Checkbox, Spin, Skeleton, Card } from 'antd';
import { DashboardOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import Message from '../../shared/Message';
import { isEmpty } from '../../../utils/commonUtil';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

const AddForm = (props) => {
  const { t } = useTranslation();

  let [filteredList] = useState({});
  let [indeterminate] = useState({ initialValue: false });
  let [checkAll] = useState({});

  const [permissionChecked, setPermissionChecked] = useState([]);
  const [checkedList, setCheckedList] = useState({});
  const [errorStatus, setErrorStatus] = useState(false);

  const [form] = Form.useForm();

  const {
    history,
    permissions,
    permissionLoading,
    roleErrors,
    roleLoading,
    fetchPermissionRequest,
    addRole,
    cleanRole,
    cleanPermission,
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

  const onFinish = (values) => {
    let formData = {};
    setPermissionChecked([]);
    Object.keys(filteredList).forEach(function (key) {
      filteredList[key].forEach((filteredItem) => {
        permissionChecked.push(filteredItem);
      });
    });

    const postData = JSON.parse(JSON.stringify(values));
    const name = postData?.name;
    const active = postData?.active;

    if (name) {
      formData.name = name;
    }
    if (active) {
      formData.active = active;
    }
    if (permissionChecked) {
      formData.permissions = permissionChecked;
    }

    addRole(formData).then((response) => {
      if (response?.status === 200) {
        history.push('/roles');
      }
    });
  };

  const onCheckboxChange = (titles, permission) => {
    filteredList[`${permission.code}`] = [];
    titles.forEach((title, index) => {
      filteredList[`${permission.code}`][index] = permission.permissions.find(
        (permissionItem) => permissionItem.title === title
      ).code;
    });

    let temp = { ...checkedList };
    temp[`${permission.code}`] = titles;
    setCheckedList(temp);

    indeterminate[`${permission.code}`] =
      !!temp[`${permission.code}`]?.length &&
      temp[`${permission.code}`]?.length <
        permission.permissions.map((permissionItem) => permissionItem.title)?.length;
    checkAll[`${permission.code}`] =
      temp[`${permission.code}`]?.length ===
      permission.permissions.map((permissionItem) => permissionItem.title)?.length;
    form.setFieldsValue({
      [`permissions[${permission.code}][selectAll]`]: checkAll[`${permission.code}`],
    });

    if (temp[`${permission.code}`]?.length === 0) {
      let temp = { ...checkedList };
      delete temp[`${permission.code}`];
      setCheckedList(temp);
    }
  };

  const handleCheckAllChange = (e, permission) => {
    if (e.target.checked) {
      let temp = { ...checkedList };
      temp[`${permission.code}`] = permission.permissions.map(
        (permissionItem) => permissionItem.title
      );
      setCheckedList(temp);
    } else {
      let temp = { ...checkedList };

      delete temp[`${permission.code}`];
      setCheckedList(temp);
    }
    filteredList[`${permission.code}`] = e.target.checked
      ? permission.permissions.map((permissionItem) => permissionItem.code)
      : [];
    indeterminate[`${permission.code}`] = false;
    checkAll[`${permission.code}`] = e.target.checked;
  };

  const handleModulePermission = (rule, value) => {
    if (!isEmpty(checkedList)) {
      setErrorStatus(false);
      return Promise.resolve();
    } else {
      setErrorStatus(true);
      return Promise.reject('');
    }
  };

  useEffect(() => {
    fetchPermissionRequest();
    return () => {
      cleanRole();
      cleanPermission();
    };
  }, []);

  return (
    <div className="container-fluid no-breadcrumb page-dashboard">
      <Row type="flex" justify="space-between">
        <Col xl={16} lg={16} md={24} xs={24} sm={24}>
          <h4 className="article-title">{t('roles.add.title')}</h4>
        </Col>
        <Col>
          <Breadcrumb separator="/">
            <Breadcrumb.Item>
              {' '}
              <DashboardOutlined /> <Link to={'/dashboard'}>{t('breadcrumb.dashboard')}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {' '}
              <Link to={'/roles'}>{t('breadcrumb.roles')}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{t('breadcrumb.add')}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      <Message error={roleErrors} />

      <Card>
        <Spin spinning={roleLoading} size="large" delay={300} tip={t('loading.spin.tip.message')}>
          <Col span={24}>
            <Form
              form={form}
              className="role-form"
              onFinish={onFinish}
              initialValues={{
                active: true,
              }}
            >
              <Row>
                <Col xl={16} lg={24} md={24} sm={24}>
                  <FormItem
                    {...formItemLayout}
                    label={t('roles.name.label')}
                    name="name"
                    rules={[
                      { required: true, message: t('roles.name.message') },
                      {
                        max: 25,
                        message: t('roles.name.max.validation.message'),
                      },
                      {
                        pattern: new RegExp('^[a-zA-Z ]+$'),
                        message: t('pattern.invalidCharacter.validation.message'),
                      },
                    ]}
                  >
                    <Input type="text" placeholder={t('roles.name.placeholder')} />
                  </FormItem>
                </Col>

                <Col xl={16} lg={24} md={24} sm={24}>
                  <FormItem
                    {...formItemLayout}
                    className="not-required-label"
                    label={t('roles.active.label')}
                    name={'active'}
                    valuePropName="checked"
                  >
                    <Checkbox />
                  </FormItem>
                </Col>

                <Col xl={24} lg={24} md={24} sm={24}>
                  <FormItem
                    colon={false}
                    style={{ marginBottom: 0 }}
                    className="permission not-required-label"
                  >
                    <div className="detail-table scroll-table">
                      <Skeleton loading={permissionLoading} active>
                        <table className="table table-responsive">
                          <thead>
                            <tr>
                              <th style={{ width: '30%' }}>{t('roles.modules.label')}</th>
                              <th>{t('roles.permission.label')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {permissions &&
                              permissions.map((permission, index) => (
                                <tr key={index}>
                                  <td style={{ width: '30%' }}>
                                    <strong>{permission.title}</strong>
                                  </td>
                                  <td>
                                    <Row span={24}>
                                      <Col xl={24} lg={24} md={24} sm={24}>
                                        <FormItem
                                          name={`permissions[${permission.code}][selectAll]`}
                                          rules={[{ validator: handleModulePermission }]}
                                          valuePropName="checked"
                                          noStyle
                                        >
                                          <Checkbox
                                            className="mr-1"
                                            indeterminate={indeterminate[`${permission.code}`]}
                                            onChange={(e) => {
                                              handleCheckAllChange(e, permission);
                                            }}
                                          />
                                        </FormItem>
                                        <FormItem noStyle>
                                          <span className="ml-1 mr-2" style={{ color: '#1D8EFB' }}>
                                            Select All
                                          </span>
                                        </FormItem>
                                      </Col>
                                    </Row>
                                    <Row span={24}>
                                      <Col xl={24} lg={24} md={24} sm={24}>
                                        <FormItem
                                          name={`permissions[${
                                            permission.permissions.find(
                                              (permissionItem) => permissionItem
                                            ).code
                                          }]`}
                                          rules={[
                                            {
                                              validator: (rule, value) =>
                                                handleModulePermission(rule, value),
                                            },
                                          ]}
                                          valuePropName="checked"
                                          noStyle
                                        >
                                          <CheckboxGroup
                                            value={checkedList[`${permission.code}`]}
                                            onChange={(titles) => {
                                              onCheckboxChange(titles, permission);
                                            }}
                                            style={{ width: '100%' }}
                                          >
                                            <Row>
                                              {permission &&
                                                !isEmpty(permission.permissions) &&
                                                permission.permissions.map(
                                                  (permissionItem, itemIndex) => (
                                                    <Col
                                                      xl={8}
                                                      lg={10}
                                                      md={12}
                                                      sm={12}
                                                      xs={24}
                                                      key={itemIndex}
                                                    >
                                                      <Checkbox value={permissionItem.title}>
                                                        {permissionItem.title}
                                                      </Checkbox>
                                                    </Col>
                                                  )
                                                )}
                                            </Row>
                                          </CheckboxGroup>
                                        </FormItem>
                                      </Col>
                                    </Row>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </Skeleton>
                    </div>
                    <Row type="flex" justify="center">
                      {errorStatus && isEmpty(checkedList) && (
                        <span style={{ color: 'red' }}>
                          {t('roles.add.permission.validationMessage')}
                        </span>
                      )}
                    </Row>
                  </FormItem>
                </Col>

                <Col xl={16} lg={24} md={24} sm={24}>
                  <FormItem {...submitFormLayout}>
                    <Button type="primary" htmlType="submit" loading={roleLoading} className="mr-2">
                      {t('save.button.label')}
                    </Button>
                    <Button customType="cancel" htmlType="button" danger>
                      {' '}
                      <Link to="/roles" className="ant-btn no-underline">
                        {t('cancel.button.label')}
                      </Link>
                    </Button>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Col>
        </Spin>
      </Card>
    </div>
  );
};

export default withRouter(AddForm);
