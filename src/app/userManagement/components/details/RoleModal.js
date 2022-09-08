import React, { useState } from 'react';
import { Row, Col, Form, Input, Checkbox, Skeleton, Modal, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { DownOutlined, UpOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { isEmpty } from '../../../../utils/commonUtil';

const { TextArea } = Input;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

const RoleModal = (props) => {
  const { t } = useTranslation();

  let [filteredList] = useState({});
  let [indeterminate] = useState({ initialValue: false });
  let [checkAll] = useState({});
  const [toggleIndex, setToggleIndex] = useState([]);
  const [permissionChecked, setPermissionChecked] = useState([]);
  const [checkedList, setCheckedList] = useState({});
  const [errorStatus, setErrorStatus] = useState(false);
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [confirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const {
    addRoleModalVisible,
    addRole,
    roles,
    roleLoading,
    permissionLoading,
    permissions,
    roleErrors,
    setAddRoleModalVisible,
    fetchRoleListByCriteria,
  } = props;
  console.log('🚀 ~ file: RoleModal.js ~ line 37 ~ RoleModal ~ roles', roles);

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

    const currentTableRequest = {
      searchInfo: {},
      pageInfo: {
        page: roles?.rolePagination?.page,
        perPage: roles?.rolePagination?.perPage,
      },
      sortBy: {
        // column: pagination.column,
        // sortOrder: pagination.sortOrder,
      },
    };
    const postData = JSON.parse(JSON.stringify(values));
    const type = postData?.type;
    const description = postData?.description;
    const active = postData?.active;

    if (type) {
      formData.type = type;
    }
    if (description) {
      formData.description = description;
    }
    if (active) {
      formData.active = active;
    }
    if (permissionChecked) {
      formData.permissions = permissionChecked?.flat();
    }
    formData.action = 'add';

    roles.addRole(formData).then((response) => {
      console.log('🚀 ~ file: RoleModal.js ~ line 105 ~ roles.addRole ~ response', response);
      if (response?.meta?.requestStatus === 'fulfilled') {
        setAddRoleModalVisible(false);
        setLoading(false);
        roles.fetchRoleListByCriteria(currentTableRequest);
      } else if (response?.meta?.requestStatus === 'rejected') {
        let error = response?.payload?.errors.map((error) => error.detail);
        message.error(error);
        setLoading(false);
      }
    });
  };

  const onCheckboxChange = (titles, permission) => {
    filteredList[`${permission.title}`] = [];
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
            setAddRoleModalVisible(false);
          },
        })
      : setAddRoleModalVisible(false);
  };
  return (
    <>
      <Modal
        visible={addRoleModalVisible}
        title="Role Permission"
        okText="Save"
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
        okButtonProps={{ loading: loading }}
      >
        <Col span={24}>
          <Form
            form={form}
            className="role-form"
            preserve={false}
            initialValues={{
              active: true,
            }}
            onValuesChange={() => setShowConfirm(true)}
          >
            <Row>
              <>
                <Col xl={18} lg={24} md={24} sm={24}>
                  <FormItem
                    {...formItemLayout}
                    label={'Role Type:'}
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
              </>
              <Col xl={18} lg={24} md={24} sm={24}>
                <FormItem
                  {...formItemLayout}
                  className="not-required-label"
                  label={t('roles.active.label')}
                  name={'active'}
                  valuePropName="checked"
                  initialValue={true}
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
                                            valuePropName="checked"
                                            noStyle
                                          >
                                            <Checkbox
                                              className="mr-1"
                                              indeterminate={indeterminate[`${permission.title}`]}
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
                                        valuePropName="checked"
                                        noStyle
                                      >
                                        <CheckboxGroup
                                          value={checkedList[`${permission.title}`]}
                                          onChange={(titles) => {
                                            onCheckboxChange(titles, permission);
                                          }}
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
                                                  {submodules.permissions.map((per, itemIndex) => {
                                                    return (
                                                      <>
                                                        {submodules?.permissions.length > 1 ? (
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
                                                              xl={15}
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
                                                  })}
                                                </>
                                              );
                                            })}
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

export default RoleModal;
