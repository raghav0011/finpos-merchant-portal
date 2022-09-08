import React, { Fragment } from 'react';
import { Button, Modal, Form, Input } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const RejectModel = (props) => {
  const { isModalVisible, modelHide, rejectEntity, header, id, title, remark, history, path } =
    props;

  const [form] = Form.useForm();

  const rejectOk = (values) => {
    form.validateFields().then((values) => {
      rejectEntity(values).then((response) => {
        if (response?.status === 200) {
          history?.push(path);
        }
      });
      modelHide();
    });
  };

  return (
    <Fragment>
      <Modal
        destroyOnClose
        width="387px"
        title={header || 'Reject'}
        visible={isModalVisible}
        onCancel={modelHide}
        footer={[
          <Button key="submit" type="primary" onClick={rejectOk}>
            Reject
          </Button>,
          <Button key="back" customType="cancel" htmlType="button" danger onClick={modelHide}>
            Cancel
          </Button>,
        ]}
      >
        <section>
          <Form form={form} initialValues={{ id: id }} className="reject-form">
            <FormItem name="id" noStyle>
              <Input type="hidden" value={id} />
            </FormItem>
            <FormItem
              label={title}
              name={remark}
              rules={[{ required: true, message: `Please enter ${remark}!` }]}
            >
              <TextArea style={{ width: 400 }} />
            </FormItem>
          </Form>
        </section>
      </Modal>
    </Fragment>
  );
};

export default RejectModel;
