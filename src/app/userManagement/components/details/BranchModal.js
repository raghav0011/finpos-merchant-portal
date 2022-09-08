import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Form, Modal, Input, Checkbox, Select, Spin, Skeleton, message } from 'antd';
import { clearLocalStorage, getLocalStorage } from '../../../../utils/storageUtil';
import { ExclamationCircleOutlined } from '@ant-design/icons';

// import Message from '@app/shared/Message/index';
import { exactMatchByKey, allowOnlyNumber, onlyAlphabets } from '../../../../utils/commonUtil';
import { disallow } from 'joi';
import { useHistory } from 'react-router';

const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;

const BranchModal = (props) => {
  const { t } = useTranslation();
  const [modalConfirm, setModalConfirm] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  // const history = useHistory();
  const {
    branches,
    addBranchModalVisible,
    setAddBranchModalVisible,
    isEdit,
    modalBranchValuel,
    branchDetail,
    branchId,
  } = props;

  const [form] = Form.useForm();

  const currentTableRequest = {
    searchInfo: {},
    pageInfo: {
      page: branches?.branchPagination?.page,
      perPage: branches?.branchPagination?.perPage,
    },
    sortBy: {
      // column: pagination.column,
      // sortOrder: pagination.sortOrder,
    },
  };

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue(branchDetail);
    }
    // return () => {
    //   branches.cleanBranchDetail();
    // };
  }, [branchDetail]);

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
    {
      isEdit
        ? branches.modifyBranchById(formData, branchId).then((response) => {
            if (response?.meta?.requestStatus === 'fulfilled') {
              setAddBranchModalVisible(false);
              setLoading(false);
              branches.fetchBranchListByCriteria(currentTableRequest);
            } else if (response?.meta?.requestStatus === 'rejected') {
              let error = response?.payload?.errors.map((error) => error.detail);
              message.error(error);
              setLoading(false);
            }
          })
        : branches.AddBranch(formData).then((response) => {
            if (response?.meta?.requestStatus === 'fulfilled') {
              setAddBranchModalVisible(false);
              setLoading(false);
              branches.fetchBranchListByCriteria(currentTableRequest);
            } else if (response?.meta?.requestStatus === 'rejected') {
              let error = response?.payload?.errors.map((error) => error.detail);
              message.error(error);
              setLoading(false);
            }
          });
    }
  };
  const showConfirm = () => {
    modalConfirm
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
            setAddBranchModalVisible(false);
          },
        })
      : setAddBranchModalVisible(false);
  };
  const handleDisabling = () => {
    setButtonDisabled(false);
    setModalConfirm(true);
  };
  return (
    <>
      <Modal
        visible={addBranchModalVisible}
        title={isEdit ? 'Edit Branch' : 'Add New Branch'}
        okText={isEdit ? 'Update' : 'Save'}
        cancelText="Cancel"
        keyboard={false}
        // maskClosable={false}
        destroyOnClose
        // okButtonProps={isEdit && !form.isFieldsTouched() ? { disabled: true } : { disabled: false }}
        onCancel={() => {
          if (isEdit && modalConfirm) {
            showConfirm();
          } else {
            showConfirm();
          }
        }}
        width="600px"
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
        okButtonProps={
          isEdit
            ? { disabled: buttonDisabled, loading: loading }
            : { disabled: false, loading: loading }
        }
      >
        {/* <Spin spinning={isEdit && !!(loading && branches.DetailLoading)} size="large" delay={300}> */}
        {/* {userErrors && <Message error={userErrors} />} */}
        {/* {roleErrors && <Message error={roleErrors} />} */}
        {/* {branchErrors && <Message error={branchErrors} />} */}
        {/* <Skeleton loading={isEdit && !!(!loading && branches.DetailLoading)} active> */}
        <Form
          form={form}
          className="user-form"
          onFinish={onFinish}
          onValuesChange={() => handleDisabling()}
        >
          <Row>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                initialValue={isEdit ? branches.branchDetail.code : ''}
                label={'Code'}
                name="code"
                rules={[
                  { required: true, message: 'Please enter 4 digits branch code' },
                  {
                    max: 4,
                    min: 4,
                    message: 'Exactly 4 digits is acceptable',
                  },
                ]}
              >
                <Input type="text" placeholder="Enter Branch Code" onKeyPress={allowOnlyNumber} />
              </FormItem>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                initialValue={isEdit ? branches.branchDetail.name : ''}
                label={'Name'}
                name="name"
                rules={[
                  { required: true, message: 'Please enter Branch Name' },
                  {
                    pattern: new RegExp(/^[a-zA-Z\s]*$/),
                    message: 'Please enter valid Branch Name',
                  },
                  {
                    max: 50,
                    message: 'Please enter within 50 characters',
                  },
                ]}
              >
                <Input type="text" placeholder="Enter Branch Name" />
              </FormItem>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                initialValue={isEdit ? branches.branchDetail.address : ''}
                label={'Address'}
                name="address"
                rules={[
                  { required: true, message: 'Please enter Branch Address' },
                  {
                    max: 100,
                    message: 'Please enter within 100 characters ',
                  },
                ]}
              >
                <Input type="text" placeholder="Enter Branch Address" />
              </FormItem>
            </Col>

            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                label={'Email'}
                name="email"
                rules={[
                  { required: true, message: 'Please enter Branch Email' },
                  {
                    type: 'email',
                    message: t('Please enter valid Email'),
                  },
                  {
                    max: 50,
                    message: 'Please enter within 50 characters',
                  },
                ]}
                initialValue={isEdit ? branches.branchDetail.email : ''}
              >
                <Input placeholder="Enter Branch Email Id" />
              </FormItem>
            </Col>

            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                initialValue={isEdit ? branches.branchDetail.contactNumber : ''}
                label={'Contact No.:'}
                name="contactNumber"
                rules={[
                  { required: true, message: 'Please enter Branch Contact Number' },
                  {
                    max: 30,
                    message: 'Please enter within 30 digits',
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Enter contact Number"
                  onKeyPress={allowOnlyNumber}
                />
              </FormItem>
            </Col>

            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                initialValue={!isEdit ? true : branches.branchDetail.active}
                className="not-required-label"
                label={'Active'}
                name={'active'}
                valuePropName="checked"
              >
                <Checkbox />
              </FormItem>
            </Col>
          </Row>
        </Form>
        {/* </Skeleton> */}
        {/* </Spin> */}
      </Modal>
    </>
  );
};

export default BranchModal;
