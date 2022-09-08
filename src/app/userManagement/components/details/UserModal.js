import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Form, Modal, Input, Checkbox, Select, Spin, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

// import Message from '@app/shared/Message/index';
import { exactMatchByKey, allowOnlyNumber, onlyAlphabets } from '../../../../utils/commonUtil';
import useMasterData from '../../../shared/Hooks/masterHook';

import { x } from 'joi';

const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;

const UserModal = (props) => {
  const { users, addUserModalVisible, setAddUserModalVisible, isEdit, userId } = props;
  console.log('🚀 ~ file: UserModal.js ~ line 18 ~ UserModal ~ users', users);
  const { t } = useTranslation();

  const [addConfirm, setAddConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const branchOption = useMasterData('BRANCHES');
  const roleOption = useMasterData('ROLES');

  const [form] = Form.useForm();

  const currentTableRequest = {
    searchInfo: {},
    pageInfo: {
      page: users?.userPagination?.page,
      perPage: users?.userPagination?.perPage,
      total: users?.userPagination?.total,
      totalPages: users?.userPagination?.totalPages,
    },
    sortBy: {
      // column: pagination.column,
      // sortOrder: pagination.sortOrder,
    },
  };

  const formItemLayout = {
    labelCol: {
      xl: { span: 6 },
      lg: { span: 6 },
      md: { span: 8 },
      sm: { span: 8 },
      xs: { span: 24 },
    },
    wrapperCol: {
      xl: { span: 18 },
      lg: { span: 18 },
      md: { span: 16 },
      sm: { span: 24 },
      xs: { span: 24 },
    },
    labelAlign: 'left',
  };

  const onFinish = (values) => {
    setLoading(true);
    const formData = { ...values };
    formData.branch = { id: formData.branch };
    // formData.roles = [{ id: ];
    formData.roles = formData.roles.map((id) => {
      return {
        id,
      };
    });

    users.AddUser(formData).then((response) => {
      if (response?.meta?.requestStatus === 'fulfilled') {
        setAddUserModalVisible(false);
        setLoading(false);
        users.fetchUserListByCriteria(currentTableRequest);
      } else if (response?.meta?.requestStatus === 'rejected') {
        let error = response?.payload?.errors.map((error) => error.detail);
        message.error(error);
        setLoading(false);
      }
    });
  };
  const showAddConfirm = () => {
    addConfirm
      ? confirm({
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
          okText: 'Confirm',
          okType: 'danger',
          okButtonProps: {
            type: 'primary',
            style: { float: 'right' },
          },
          cancelButtonProps: {
            style: { float: 'left' },
          },
          onCancel() {},
          onOk() {
            form.resetFields();
            setAddUserModalVisible(false);
            setAddConfirm(false);
          },
        })
      : setAddUserModalVisible(false);
  };

  const handleAddDisabling = () => {
    setAddConfirm(true);
  };

  return (
    <>
      <Modal
        visible={addUserModalVisible}
        title={'Add User'}
        okText={'Save'}
        cancelText="Cancel"
        destroyOnClose
        keyboard={false}
        // maskClosable={false}

        width="600px"
        centered
        onCancel={() => {
          showAddConfirm();
        }}
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
        {/* <Spin spinning={userLoading} size="large" delay={300} tip={t('loading.spin.tip.message')}> */}
        {/* {userErrors && <Message error={userErrors} />} */}
        {/* {roleErrors && <Message error={roleErrors} />} */}
        {/* {branchErrors && <Message error={branchErrors} />} */}

        <Form
          form={form}
          className="user-form"
          preserve={false}
          onFinish={onFinish}
          onValuesChange={() => handleAddDisabling()}
        >
          <Row>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                label={'User Id'}
                name="userId"
                rules={[
                  { required: true, message: 'Please enter User Id' },
                  {
                    max: 50,
                    message: 'Please enter within 50 characters',
                  },
                  {
                    type: 'email',
                    message: t('Please enter valid Email'),
                  },
                ]}
              >
                <Input type="text" placeholder="Enter User ID" />
              </FormItem>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                label={'Name'}
                name="name"
                rules={[
                  { required: true, message: 'Please enter Name' },
                  {
                    max: 50,
                    message: 'Please enter within 50 characters',
                  },
                  {
                    pattern: new RegExp(/^[a-zA-Z\s]*$/),
                    message: 'Please enter valid Name',
                  },
                ]}
              >
                <Input type="text" placeholder="Enter Name" />
              </FormItem>
            </Col>

            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                label={'Role Type:'}
                name="roles"
                rules={[{ required: true, message: 'Please select Role Type' }]}
              >
                <Select
                  mode="multiple"
                  showSearch
                  placeholder="Select Role Type"
                  optionFilterProp="children"
                  // loading={roleLoading}
                  // onChange={(e) => {
                  //  roles.fetchRoleListByCriteria({})
                  // }}
                >
                  {/* {roleOption.map((option) => (
                    <Option key={option.id}>{option.name}</Option>
                  ))} */}
                  {roleOption?.payload instanceof Array &&
                    roleOption?.payload.map((d) => (
                      <Option key={d.itemValue}>{d.itemLabel}</Option>
                    ))}
                </Select>
              </FormItem>
            </Col>

            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                label={'Branch'}
                // name={['branch', 'id']}
                name="branch"
                className="not-required-label"
                rules={[{ required: false, message: 'Please select the branch.' }]}
              >
                <Select
                  showSearch
                  placeholder="Select branch"
                  optionFilterProp="children"
                  // loading={branchLoading}
                  // onChange={(e) => {
                  //   handleBranchOnChange(e);
                  // }}
                >
                  {/* {branchOption.map((option) => (
                    <Option key={option.id}>{option.name}</Option>
                  ))} */}
                  {/* <Select.Option value="1">1</Select.Option> */}
                  {branchOption?.payload instanceof Array &&
                    branchOption?.payload.map((d) => (
                      <Option value={d.itemValue}>{d.itemLabel}</Option>
                    ))}
                </Select>
              </FormItem>
            </Col>

            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                label={'Mobile No.:'}
                name="mobileNo"
                rules={[
                  { required: true, message: 'Please enter Mobile Number' },

                  {
                    max: 10,
                    message: 'Please enter within 10 digits',
                  },
                ]}
              >
                <Input type="text" placeholder="Enter Mobile Number" onKeyPress={allowOnlyNumber} />
              </FormItem>
            </Col>

            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                className="not-required-label"
                label={'Active'}
                name={'active'}
                valuePropName="checked"
                initialValue={true}
              >
                <Checkbox />
              </FormItem>
            </Col>
          </Row>
        </Form>
        {/* </Spin> */}
      </Modal>
    </>
  );
};

export default UserModal;
