import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Form, Modal, Input, Checkbox, Select, Spin, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

// import Message from '@app/shared/Message/index';
import { exactMatchByKey, allowOnlyNumber, onlyAlphabets } from '../../../../utils/commonUtil';
import useMasterData from '../../../shared/Hooks/masterHook';

import { x } from 'joi';
import axios from 'axios';

const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;

const EditUserModal = (props) => {
  const {
    users,
    editUserModalVisible,
    setEditUserModalVisible,
    userDetail,
    isEdit,
    userId,
    // roleOption,
    // branchOption,
  } = props;

  const { t } = useTranslation();
  const [updateButtonDisabled, setUpdateButtonDisabled] = useState(true);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [branchOption, setBranchOption] = useState();
  const [roleOption, setRoleOption] = useState();
  const [loading, setLoading] = useState(false);

  //   const branchOption = useMasterData('BRANCHES');
  //   console.log('🚀 ~ file: EditUserModal.js ~ line 37 ~ EditUserModal ~ branchOption', branchOption);
  //   const roleOption = useMasterData('ROLES');

  const [form] = Form.useForm();

  const currentTableRequest = {
    searchInfo: {},
    pageInfo: {
      page: users?.userPagination?.page,
      perPage: users?.userPagination?.perPage,
      total: users?.userPagination?.total,
      totalPages: users?.userPagination?.totalPages,
    },
    sortBy: {},
  };

  useEffect(() => {
    axios
      .post(`https://dev.citytech.global/finpay-admin/v1/lookup/ROLES`, {})
      .then((res) => setRoleOption(res.data.data));
    axios
      .post(`https://dev.citytech.global/finpay-admin/v1/lookup/BRANCHES`, {})
      .then((res) => setBranchOption(res.data.data));
    if (isEdit) {
      form.setFieldsValue(userDetail);
      form.setFieldsValue({
        branch: userDetail.branch.id,
        roles: userDetail.roles.map((x) => x.id),
      });
    }
  }, [userDetail]);

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

    users.modifyUserById(formData, userId).then((response) => {
      if (response?.meta?.requestStatus === 'fulfilled') {
        setEditUserModalVisible(false);
        setUpdateButtonDisabled(true);
        setConfirmModalVisible(false);
        setLoading(false);
        users.fetchUserListByCriteria(currentTableRequest);
      } else if (response?.meta?.requestStatus === 'rejected') {
        let error = response?.payload?.errors.map((error) => error.detail);
        message.error(error);
      }
    });
   
  };
  const showConfirmModal = () => {
    confirmModalVisible
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
            setEditUserModalVisible(false);
            setUpdateButtonDisabled(true);
            setConfirmModalVisible(false);
          },
        })
      : setEditUserModalVisible(false);
  };

  const handleAddDisabling = () => {
    setUpdateButtonDisabled(false);
    setConfirmModalVisible(true);
  };

  return (
    <>
      <Modal
        visible={editUserModalVisible}
        title={'Edit User'}
        okText={'Update'}
        cancelText="Cancel"
        destroyOnClose
        keyboard={false}
        // maskClosable={false}

        width="600px"
        centered
        onCancel={() => {
          showConfirmModal();
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
        okButtonProps={{ disabled: updateButtonDisabled, loading: loading }}
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
                >
                  {/* {roleOption?.payload instanceof Array &&
                    roleOption?.payload.map((d) => (
                      <Option key={d.itemValue}>{d.itemLabel}</Option>
                    ))} */}
                  {roleOption &&
                    roleOption?.map((d) => <Option key={d.itemValue}>{d.itemLabel}</Option>)}
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
                <Select showSearch placeholder="Select branch" optionFilterProp="children">
                  {/* {branchOption?.payload instanceof Array &&
                    branchOption?.payload.map((d) => (
                      <Option value={d.itemValue}>{d.itemLabel}</Option>
                    ))} */}
                  {branchOption &&
                    branchOption?.map((d) => <Option value={d.itemValue}>{d.itemLabel}</Option>)}
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
                initialValue={users.userDetail.active}
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

export default EditUserModal;
