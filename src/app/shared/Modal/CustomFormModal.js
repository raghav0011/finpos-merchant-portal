import React from 'react';
import { Modal, Form, Row, Col, Spin } from 'antd';
import FormBuilder from 'antd-form-builder';
import Message from '../Message';
import { WButton } from '../Widgets';

const CustomModal = (props) => {
  const {
    onFinishAdd,
    onFinishEdit,
    form,
    title,
    meta,
    forceUpdate,
    loading,
    error,
    visible,
    onCancel,
    content,
    afterClose,
    // to control different modes fo the modal
    editMode,
    setEditMode,
    viewMode,
    setViewMode,
    footer = null,
    ...restOfTheModalProps
  } = props;

  const getForm = () => {
    return (
      <Spin spinning={loading}>
        <Form className="user-form" form={form} onValuesChange={!!forceUpdate && forceUpdate}>
          <Message error={error} />
          <FormBuilder meta={meta()} form={form} viewMode={viewMode} />
          <Row className="mt-2">
            <Col xl={16} lg={24} xs={24}>
              <Form.Item {...submitFormLayout} noStyle shouldUpdate={true}>
                {() => (
                  <WButton
                    customType={viewMode ? 'edit' : form.isFieldsTouched() ? 'submit' : null}
                    disabled={viewMode ? false : !form.isFieldsTouched()}
                    className="mr-1"
                    onClick={() => {
                      if (viewMode) {
                        setEditMode(true);
                        setViewMode(false);
                      } else if (editMode) {
                        form
                          .validateFields()
                          .then((values) => {
                            onFinishEdit(values);
                          })
                          .catch((err) => {});
                      } else {
                        form
                          .validateFields()
                          .then((values) => {
                            onFinishAdd(values);
                          })
                          .catch((err) => {});
                      }
                    }}
                    // loading={loading}
                  >
                    {viewMode ? 'Edit' : 'Submit'}
                  </WButton>
                )}
              </Form.Item>
              <Form.Item {...submitFormLayout} noStyle>
                <WButton
                  customType="cancel"
                  htmlType="button"
                  danger
                  onClick={() => {
                    onCancel();
                  }}
                >
                  Cancel
                </WButton>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    );
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
    <Modal
      afterClose={() => {
        afterClose();
        form && form.resetFields();
        setEditMode(false);
        setViewMode(false);
      }}
      title={title}
      centered
      visible={visible}
      footer={footer}
      {...restOfTheModalProps}
      closable={false}
      destroyOnClose
    >
      {content || getForm()}
    </Modal>
  );
};

export default CustomModal;
