import React from 'react';
import { Modal, Form } from 'antd';
import FormBuilder from 'antd-form-builder';
import Message from '../Message';

// not in use
const CustomAddModal = (props) => {
  const { form, title, meta, forceUpdate, loading, error, addService, ...rest } = props;
  const config = {
    title: title,
    icon: null,
    content: (
      <Form
        className="user-form"
        form={form}
        onFieldsChange={(prev, curr) => {}}
        onValuesChange={!!forceUpdate && forceUpdate}
      >
        <Message error={error} />

        <FormBuilder meta={meta()} form={form} />
      </Form>
    ),
    onOk: (close) => {
      form
        .validateFields()
        .then((values) => {
          if (typeof addService === 'function') {
            addService(values).then((response) => {
              if (response?.status === 200) {
                close();
              }
            });
          }
        })
        .catch((err) => {});
    },
    onCancel: (close) => {
      form.resetFields();
      close();
    },
    okButtonProps: {
      loading: loading,
    },
  };

  return Modal.confirm(config);
};

export default CustomAddModal;
