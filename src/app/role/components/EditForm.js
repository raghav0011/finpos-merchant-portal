import React, { useState } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Checkbox, Skeleton, Spin, Card } from 'antd';
import { useTranslation } from 'react-i18next';

import { isEmpty } from '../../../utils/commonUtil';
import Message from '../../shared/Message';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;

const EditForm = (props) => {
  const { t } = useTranslation();
  const { id } = useParams();

  const [checkAll] = useState({});
  const [filteredList] = useState({});
  const [indeterminate] = useState({});
  const [checkedListChanged] = useState({});
  const [loading, setLoading] = useState(false);
  const [checkedList, setCheckedList] = useState({});

  const [form] = Form.useForm();

  const {
    setEditMode,
    roleDetails,

    roleDetailsLoading,
    history,
    permissions,
    permissionLoading,
    updateRole,

    roleErrors,
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
    let updatedPermissions = [];
    let formData = {};
    const postData = JSON.parse(JSON.stringify(values))?.permissions;
    postData &&
      Object.keys(filteredList).forEach(function (key) {
        filteredList[key].forEach((filteredItem) => {
          updatedPermissions.push(filteredItem);
        });
      });

    const name = values?.name;
    const active = values?.active;

    formData.id = id;
    formData.name = name;
    formData.active = active;
    formData.permissions = updatedPermissions;

    setLoading(true);
    updateRole(formData).then((response) => {
      if (response?.status === 200) {
        history.push('/roles');
      }
    });
  };

  const setInitialCheckedValue = (data) => {
    let defaultCheckAll = {};
    let defaultCheckedList = {};
    let defaultFilteredList = {};
    let defaultIndeterminate = {};
    if (isEmpty(checkedListChanged)) {
      roleDetails &&
        roleDetails.permissions &&
        roleDetails.permissions.forEach((v, k) => {
          if (data?.permissions?.filter((item) => item.code === v)?.length !== 0) {
            if (!defaultCheckedList[`${data.code}`]) {
              defaultCheckedList[`${data.code}`] = [];
              defaultFilteredList[`${data.code}`] = [];
            }
            if (
              !defaultCheckedList[`${data.code}`].includes(
                data.permissions.find((item) => item.code === v)?.title
              )
            ) {
              defaultCheckedList[`${data.code}`].push(
                data?.permissions?.find((item) => item.code === v)?.title
              );
              defaultFilteredList[`${data.code}`].push(
                data?.permissions?.find((item) => item.code === v)?.code
              );
            }
          }
        });
      defaultIndeterminate[`${data.code}`] =
        !!defaultCheckedList[`${data.code}`] &&
        defaultCheckedList[`${data.code}`]?.length <
          data.permissions.map((item) => item.title)?.length;
      defaultCheckAll[`${data.code}`] =
        defaultCheckedList[`${data.code}`]?.length ===
        data?.permissions?.map((item) => item.title)?.length;
    }
    Object.assign(checkAll, defaultCheckAll);
    Object.assign(checkedList, defaultCheckedList);
    Object.assign(filteredList, defaultFilteredList);
    Object.assign(indeterminate, defaultIndeterminate);
    return { checkedList, indeterminate, checkAll };
  };

  const handleCheckAllChange = (e, permission) => {
    checkedListChanged[`${permission.code}`] = true;
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

  const onCheckboxChange = (titles, permission) => {
    filteredList[`${permission.code}`] = [];
    checkedListChanged[`${permission.code}`] = true;
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

  const handleModulePermission = (rule, value) => {
    if (!isEmpty(checkedList)) {
      return Promise.resolve();
    } else {
      return Promise.reject('');
    }
  };

  return (
    <>
      <Message error={roleErrors} />

      <Card>
        <Spin
          spinning={!!(loading && roleDetailsLoading)}
          size="large"
          delay={300}
          tip={t('loading.spin.tip.message')}
        >
          <Skeleton loading={!!(!loading && roleDetailsLoading)} active>
            <Col span={24}>
              <Form form={form} className="role-form" onFinish={onFinish}>
                <Row>
                  <Col xl={16} lg={24} md={24} sm={24}>
                    <FormItem
                      {...formItemLayout}
                      label={t('roles.name.label')}
                      name="name"
                      initialValue={roleDetails?.name}
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
                      className=" not-required-label"
                      label={t('roles.active.label')}
                      name={'active'}
                      valuePropName="checked"
                      initialValue={roleDetails?.active}
                    >
                      <Checkbox />
                    </FormItem>
                  </Col>

                  {permissionLoading ? (
                    <Col xl={24} lg={24} md={24} sm={24}>
                      <Skeleton loading active />
                    </Col>
                  ) : (
                    <Col xl={24} lg={24} md={24} sm={24}>
                      <FormItem
                        colon={false}
                        style={{ marginBottom: 0 }}
                        className="permission not-required-label"
                      >
                        <div className="detail-table scroll-table">
                          <table className="table table-responsive ">
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
                                            initialValue={
                                              setInitialCheckedValue(permission).checkAll[
                                                `${permission.code}`
                                              ]
                                            }
                                            valuePropName="checked"
                                            noStyle
                                          >
                                            <Checkbox
                                              className="mr-2"
                                              indeterminate={
                                                setInitialCheckedValue(permission).indeterminate[
                                                  `${permission.code}`
                                                ]
                                              }
                                              onChange={(e) => {
                                                handleCheckAllChange(e, permission);
                                              }}
                                            />
                                          </FormItem>
                                          <FormItem noStyle>
                                            <span
                                              className="ml-1 mr-2"
                                              style={{ color: '#1D8EFB' }}
                                            >
                                              Select All
                                            </span>
                                          </FormItem>
                                        </Col>
                                      </Row>

                                      <Row span={24}>
                                        <Col xl={24} lg={24} md={24} sm={24}>
                                          <FormItem
                                            name={[
                                              'permissions',
                                              `${
                                                permission.permissions.find(
                                                  (permissionItem) => permissionItem
                                                ).code
                                              }`,
                                            ]}
                                            rules={[
                                              {
                                                validator: (rule, value) =>
                                                  handleModulePermission(rule, value),
                                              },
                                            ]}
                                            initialValue={
                                              setInitialCheckedValue(permission).checkedList[
                                                `${permission.code}`
                                              ]
                                            }
                                            valuePropName="checked"
                                            noStyle
                                          >
                                            <CheckboxGroup
                                              value={
                                                setInitialCheckedValue(permission).checkedList[
                                                  `${permission.code}`
                                                ]
                                              }
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
                        </div>
                        <Row type="flex" justify="center">
                          {isEmpty(checkedList) && (
                            <span style={{ color: 'red' }}>
                              {t('roles.add.permission.validationMessage')}
                            </span>
                          )}
                        </Row>
                      </FormItem>
                    </Col>
                  )}

                  <Col xl={16} lg={24} md={24} sm={24}>
                    <FormItem {...submitFormLayout} colon={false} shouldUpdate={true} noStyle>
                      {() => (
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={roleDetailsLoading}
                          className="mr-2"
                          disabled={!form.isFieldsTouched()}
                        >
                          {t('save.button.label')}
                        </Button>
                      )}
                    </FormItem>
                    <FormItem {...submitFormLayout} noStyle>
                      {/* <Link to="/roles" className="ant-btn no-underline">
                          {t('cancel.button.label')}
                        </Link> */}
                      <Button
                        className="no-underline"
                        style={{ width: '5rem' }}
                        onClick={() => setEditMode(false)}
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
          </Skeleton>
        </Spin>
      </Card>
    </>
  );
};

export default withRouter(EditForm);
