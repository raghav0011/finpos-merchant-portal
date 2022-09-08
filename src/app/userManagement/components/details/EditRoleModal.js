import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Checkbox, Skeleton, Modal, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { DownOutlined, UpOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { isEmpty } from '../../../../utils/commonUtil';

const { TextArea } = Input;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

const EditRoleModal = (props) => {
  const { t } = useTranslation();

  let [filteredList] = useState({});
  let [indeterminate] = useState({ initialValue: false });
  let [checkAll] = useState({});
  const [permissionChecked, setPermissionChecked] = useState([]);
  const [checkedListChanged] = useState({});
  const [checkedList, setCheckedList] = useState({});
  const [errorStatus, setErrorStatus] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [toggleIndex, setToggleIndex] = useState([]);
  const [confirm, setConfirm] = useState(false);

  const [form] = Form.useForm();

  const {
    editRoleModalVisible,
    roles,
    roleId,
    permissionLoading,
    permissions,
    setEditRoleModalVisible,
    roleDetail,
    pageSize,
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
  useEffect(() => {
    form.setFieldsValue({
      ['type']: roleDetail?.roleInfo?.type,
      ['description']: roleDetail?.roleInfo?.description,
    });
  }, [roleDetail]);

  const handleToggleOpen = (e, i) => {
    setToggleIndex((prev) => [...prev, i]);
  };

  const handleToggleClose = (e, i) => {
    let result = toggleIndex.filter(function (value, index, arr) {
      return value !== i;
    });
    setToggleIndex(result);
  };
  const onFinish = (values) => {
    setLoading(true);
    let formData = {};
    setPermissionChecked([]);
    Object.keys(filteredList).forEach(function (key) {
      permissionChecked.push(filteredList[key]);
    });

    const postData = JSON.parse(JSON.stringify(values));
    const active = postData?.active;
    const type = postData?.type;
    const description = postData?.description;

    if (active) {
      formData.active = active;
    }
    if (type) {
      formData.type = type;
    }
    if (description) {
      formData.description = description;
    }
    if (permissionChecked) {
      formData.permissions = permissionChecked?.flat();
    }

    roles.modifyRoleById(formData, roleId).then((response) => {
      if (response?.meta?.requestStatus === 'fulfilled') {
        setEditRoleModalVisible(false);
        setLoading(false);
        roles.fetchRoleListByCriteria({
          pageInfo: {
            page: pageSize?.current,
            perPage: pageSize?.pageSize,
            total: pageSize?.total,
            totalPages: pageSize?.totalPages,
          },
        });
      } else if (response?.meta?.requestStatus === 'rejected') {
        let error = response?.payload?.errors.map((error) => error.detail);
        message.error(error);
        setLoading(false);
      }
    });
  };

  const setInitialCheckedValue = (data) => {
    let defaultCheckAll = {},
      defaultCheckedList = {},
      defaultFilteredList = {},
      defaultIndeterminate = {};
    if (isEmpty(checkedListChanged)) {
      const permissionList = [];
      data.subGroup?.forEach((subgroup, index) => {
        permissionList[index] = subgroup.permissions.map((permissionItem) => permissionItem);
      });

      const permissionCodes = [];
      data.subGroup?.forEach((subgroup, index) => {
        permissionCodes[index] = subgroup.permissions.map((permissionItem) => permissionItem?.code);
      });

      roleDetail?.roleInfo?.permissions?.forEach((v, _) => {
        defaultCheckedList[`${data.title}`] = [];
        defaultFilteredList[`${data.title}`] = [];

        const duplicateArrayValue = permissionCodes
          .flat()
          .filter((val) => roleDetail?.roleInfo?.permissions.includes(val));
        if (duplicateArrayValue?.length > 0) {
          duplicateArrayValue?.map((duplicate) => {
            data.subGroup.forEach((group, index) => {
              const title = group.permissions.filter((item) => item.code === duplicate)[0]?.title;
              const code = group.permissions.filter((item) => item.code === duplicate)[0]?.code;
              if (title) {
                defaultCheckedList[`${data.title}`].push(`${group.title}.${title}`);
                defaultFilteredList[`${data.title}`].push(code);
              }
            });
          });
        }
      });
      defaultIndeterminate[`${data.title}`] =
        defaultCheckedList[`${data.title}`]?.length !== 0 &&
        defaultCheckedList[`${data.title}`]?.length < permissionCodes.flat().length;
      defaultCheckAll[`${data.title}`] =
        defaultCheckedList[`${data.title}`]?.length === permissionCodes.flat().length;
    }
    Object.assign(checkAll, defaultCheckAll);
    Object.assign(checkedList, defaultCheckedList);
    Object.assign(filteredList, defaultFilteredList);
    Object.assign(indeterminate, defaultIndeterminate);
    return { checkedList, indeterminate, checkAll };
  };

  const onCheckboxChange = (titles, permission) => {
    filteredList[`${permission.title}`] = [];
    checkedListChanged[`${permission.title}`] = true;
    titles?.forEach((title, index) => {
      filteredList[`${permission.title}`][index] = permission.subGroup
        .filter((subGroup) => subGroup.title === title.split('.')[0])[0]
        .permissions?.find(
          (permissionItem) => permissionItem?.title === title?.split('.')[1]
        )?.code;
    });

    let temp = { ...checkedList };
    temp[`${permission.title}`] = titles;
    setCheckedList(temp);

    const codes = [];
    permission.subGroup?.forEach((subgroup, index) => {
      codes[index] = subgroup.permissions.map((permissionItem) => permissionItem?.code);
    });

    indeterminate[`${permission.title}`] =
      !!temp[`${permission.title}`]?.length &&
      temp[`${permission.title}`]?.length < codes.flat().length;
    checkAll[`${permission.title}`] = temp[`${permission.title}`]?.length === codes.flat().length;
    form.setFieldsValue({
      [`permissions[${permission.title}][selectAll]`]: checkAll[`${permission.title}`],
    });

    if (temp[`${permission.title}`]?.length === 0) {
      let temp = { ...checkedList };
      delete temp[`${permission.title}`];
      setCheckedList(temp);
    }
  };

  const handleCheckAllChange = (e, permission) => {
    const arr = [];
    checkedListChanged[`${permission.code}`] = true;
    if (e.target.checked) {
      let temp = { ...checkedList };
      permission.subGroup.forEach((subgroup, index) => {
        arr[index] = subgroup.permissions.map(
          (permissionItem) => `${subgroup.title}.${permissionItem.title}`
        );
      });
      temp[`${permission.title}`] = arr.flat();
      setCheckedList(temp);
    } else {
      let temp = { ...checkedList };

      delete temp[`${permission.title}`];
      setCheckedList(temp);
    }
    const codes = [];
    permission.subGroup?.forEach((subgroup, index) => {
      codes[index] = subgroup.permissions.map((permissionItem) => permissionItem?.code);
    });
    filteredList[`${permission.title}`] = e.target.checked ? codes.flat() : [];
    indeterminate[`${permission.title}`] = false;
    checkAll[`${permission.title}`] = e.target.checked;
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
  const handleDisabling = () => {
    setButtonDisabled(false);
    setConfirm(true);
  };
  const showConfirm = () => {
    confirm
      ? Modal.confirm({
          icon: (
            <div style={{ textAlign: 'center' }}>
              <ExclamationCircleOutlined style={{ color: 'red', fontSize: '40px' }} />
            </div>
          ),
          title: <h4 style={{ color: 'red', textAlign: 'center' }}>Are you sure ?</h4>,
          content: (
            <>
              <p style={{ textAlign: 'center' }}>
                If you proceed, you will lose all the data you have filled. Are you sure you want to
                proceed ?
              </p>
            </>
          ),

          onCancel() {},
          okText: 'Confirm',
          okType: 'danger',
          okButtonProps: {
            type: 'primary',
            style: { float: 'right' },
          },
          cancelButtonProps: {
            style: { float: 'left' },
          },
          onOk() {
            form.resetFields();
            setEditRoleModalVisible(false);
          },
        })
      : setEditRoleModalVisible(false);
  };
  return (
    <>
      <Modal
        visible={editRoleModalVisible}
        title="Edit Role Permission"
        okText="Update"
        cancelText="Cancel"
        destroyOnClose
        onCancel={() => {
          showConfirm();
        }}
        width="800px"
        centered
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onFinish(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
        okButtonProps={{
          disabled: buttonDisabled,
          loading: loading,
        }}
      >
        <Col span={24}>
          <Form
            form={form}
            className="role-form"
            preserve={false}
            initialValues={{
              active: true,
            }}
            onValuesChange={() => handleDisabling()}
          >
            <Row>
              <Col xl={18} lg={24} md={24} sm={24}>
                <FormItem
                  {...formItemLayout}
                  label={'Role Type:'}
                  initialValue={roleDetail?.roleInfo?.type}
                  name="type"
                  rules={[
                    { required: true, message: t('Please enter Role Type') },
                    {
                      max: 25,
                      message: t('Please enter within 25 characters'),
                    },
                    {
                      pattern: new RegExp('^[a-zA-Z ]+$'),
                      message: t('Please enter valid Role Type'),
                    },
                  ]}
                >
                  <Input type="text" placeholder="Enter Role Type Name" />
                </FormItem>
              </Col>
              <Col xl={18} lg={24} md={24} sm={24}>
                <FormItem
                  {...formItemLayout}
                  label={'Role Description:'}
                  initialValue={roleDetail?.roleInfo?.description}
                  name="description"
                  rules={[
                    { required: true, message: t('Please enter Role Description') },
                    {
                      max: 300,
                      message: t('Please enter within 300 characters'),
                    },
                    {
                      pattern: new RegExp('^[a-zA-Z ]+$'),
                      message: t('Please enter valid Role Description'),
                    },
                  ]}
                >
                  <TextArea placeholder="Enter Role Description" rows={4} />
                </FormItem>
              </Col>
              <Col xl={18} lg={24} md={24} sm={24}>
                <FormItem
                  {...formItemLayout}
                  className="not-required-label"
                  label={t('roles.active.label')}
                  name={'active'}
                  valuePropName="checked"
                  initialValue={roleDetail?.roleInfo?.active}
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
                            <th style={{ width: '30%' }}>{t('Modules')}</th>
                            <th>{t('Permissions')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {permissions &&
                            !isEmpty(permissions.permissions) &&
                            permissions.permissions?.map((permission, i) => (
                              <tr>
                                <td style={{ width: '30%' }} key={i}>
                                  <strong>{permission?.title}</strong>
                                  <>
                                    {permission?.subGroup?.map((value) => {
                                      return (
                                        <tr
                                          style={
                                            toggleIndex.includes(i)
                                              ? { marginLeft: 5, display: 'block' }
                                              : { marginLeft: 5, display: 'none' }
                                          }
                                        >
                                          <strong>{value?.title}</strong>
                                        </tr>
                                      );
                                    })}
                                  </>
                                </td>
                                <td>
                                  <Row span={24}>
                                    <Col
                                      xl={24}
                                      lg={24}
                                      md={24}
                                      sm={24}
                                      style={{ marginBottom: -10 }}
                                    >
                                      <span style={{ marginLeft: -32 }}>
                                        {!toggleIndex.includes(i) ? (
                                          <Button
                                            icon={<DownOutlined />}
                                            style={{
                                              border: 'none',
                                              backgroundColor: 'transparent',
                                            }}
                                            onClick={(e) => handleToggleOpen(e, i)}
                                          />
                                        ) : (
                                          <Button
                                            icon={<UpOutlined />}
                                            style={{
                                              border: 'none',
                                              backgroundColor: 'transparent',
                                            }}
                                            onClick={(e) => handleToggleClose(e, i)}
                                          />
                                        )}
                                      </span>
                                      {toggleIndex.includes(i) ? (
                                        <>
                                          <FormItem
                                            name={`permissions[${permission?.title}][selectAll]`}
                                            rules={[{ validator: handleModulePermission }]}
                                            initialValue={
                                              setInitialCheckedValue(permission).checkAll[
                                                `${permission.title}`
                                              ]
                                            }
                                            valuePropName="checked"
                                            noStyle
                                          >
                                            <Checkbox
                                              className="mr-1"
                                              indeterminate={
                                                setInitialCheckedValue(permission).indeterminate[
                                                  `${permission.title}`
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
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </Col>
                                  </Row>
                                  {toggleIndex.includes(i) ? (
                                    <>
                                      <Row span={24}>
                                        <Col xl={24} lg={24} md={24} sm={24}>
                                          <FormItem
                                            name={`permissions[${
                                              permission?.subGroup?.permissions?.find(
                                                (permissionItem) => permissionItem
                                              ).title
                                            }]`}
                                            rules={[
                                              {
                                                validator: (rule, value) =>
                                                  handleModulePermission(rule, value),
                                              },
                                            ]}
                                            initialValue={
                                              setInitialCheckedValue(permission).checkedList[
                                                `${permission.title}`
                                              ]
                                            }
                                            valuePropName="checked"
                                            noStyle
                                          >
                                            <CheckboxGroup
                                              onChange={(titles) => {
                                                onCheckboxChange(titles, permission);
                                              }}
                                              value={
                                                setInitialCheckedValue(permission).checkedList[
                                                  `${permission.title}`
                                                ]
                                              }
                                              style={
                                                toggleIndex.includes(i)
                                                  ? { width: '100%', display: 'block' }
                                                  : { width: '100%', display: 'none' }
                                              }
                                            >
                                              <Row>
                                                {permission?.subGroup?.map((submodules) => {
                                                  return (
                                                    <>
                                                      {submodules.permissions.map(
                                                        (per, itemIndex) => {
                                                          return (
                                                            <>
                                                              {submodules?.permissions.length >
                                                              1 ? (
                                                                <>
                                                                  <Col
                                                                    xl={8}
                                                                    lg={8}
                                                                    md={8}
                                                                    sm={8}
                                                                    xs={8}
                                                                    key={itemIndex}
                                                                  >
                                                                    <Checkbox
                                                                      value={`${submodules?.title}.${per?.title}`}
                                                                    >
                                                                      {per?.title}
                                                                    </Checkbox>
                                                                  </Col>
                                                                </>
                                                              ) : (
                                                                <>
                                                                  <Col
                                                                    xl={25}
                                                                    lg={15}
                                                                    md={15}
                                                                    sm={15}
                                                                    xs={15}
                                                                    key={itemIndex}
                                                                  >
                                                                    <Checkbox
                                                                      value={`${submodules?.title}.${per?.title}`}
                                                                    >
                                                                      {per?.title}
                                                                    </Checkbox>
                                                                  </Col>
                                                                </>
                                                              )}
                                                            </>
                                                          );
                                                        }
                                                      )}
                                                    </>
                                                  );
                                                })}
                                              </Row>
                                            </CheckboxGroup>
                                          </FormItem>
                                        </Col>
                                      </Row>
                                    </>
                                  ) : (
                                    <></>
                                  )}
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
                        {'Please select at least one permission'}
                      </span>
                    )}
                  </Row>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Col>
        {/* </Spin> */}
      </Modal>
    </>
  );
};
export default EditRoleModal;
