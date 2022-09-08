import React, { useContext, useState } from 'react';
import { Form, Select, Input, Checkbox } from 'antd';
import { MinusCircleOutlined, MenuOutlined } from '@ant-design/icons';
import { SortableHandle } from 'react-sortable-hoc';

import FieldsContext from '../FieldsContext';

import './style.css';

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
));

const { Option } = Select;

const FormFieldsRow = ({ field, operations, formItemLayout }) => {
  let [_, setRender] = useState(false);
  const { fields, payload, options, editMode, visible } = useContext(FieldsContext);
  const fieldName = fields?.map((item) => {
    return {
      value: item.field_name,
      label: item.label_name,
    };
  });

  return (
    <tr gutter={24}>
      <td>
        <DragHandle />
      </td>
      <td>
        <Form.Item name={'id'} noStyle>
          <Input hidden />
        </Form.Item>
        <Form.Item
          className="mb-0"
          {...formItemLayout}
          name={[field.name, 'field_name']}
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select Field Name"
            showSearch={true}
            optionFilterProp="label"
            options={fieldName}
            disabled={!editMode && visible}
          />
        </Form.Item>
      </td>
      <td>
        <Form.Item
          className="mb-0"
          {...formItemLayout}
          name={[field.name, 'field_type']}
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select Field Type"
            options={payload}
            optionFilterProp="label"
            showSearch={true}
            disabled={!editMode && visible}
          />
        </Form.Item>
      </td>
      <td>
        <Form.Item
          className="mb-0"
          {...formItemLayout}
          name={[field.name, 'label_name']}
          rules={[{ required: true }]}
        >
          <Input placeholder="Label Name" disabled={!editMode && visible} />
        </Form.Item>
      </td>
      <td>
        <Form.Item className="mb-0" {...formItemLayout} name={[field.name, 'default_value']}>
          <Input placeholder="Default Value" disabled={!editMode && visible} />
        </Form.Item>
      </td>

      <td>
        <Form.Item className="mb-0" {...formItemLayout} name={[field.name, 'placeholder']}>
          <Input placeholder="Placeholder" disabled={!editMode && visible} />
        </Form.Item>
      </td>
      <td className="check">
        <Form.Item
          className="mb-0 "
          {...formItemLayout}
          name={[field.name, 'is_required']}
          valuePropName="checked"
          normalize={(value) => (value ? 1 : 0)}
        >
          <Checkbox disabled={!editMode && visible} />
        </Form.Item>
      </td>
      <td className="check">
        <Form.Item
          className="mb-0"
          {...formItemLayout}
          name={[field.name, 'is_active']}
          valuePropName="checked"
          normalize={(value) => (value ? 1 : 0)}
        >
          <Checkbox style={{ textAlign: 'center' }} disabled={!editMode && visible} />
        </Form.Item>
      </td>
      <td className="check">
        <Form.Item
          className="mb-0"
          {...formItemLayout}
          name={[field.name, 'is_read_only']}
          valuePropName="checked"
          normalize={(value) => (value ? 1 : 0)}
        >
          <Checkbox disabled={!editMode && visible} />
        </Form.Item>
      </td>

      <td>
        <Form.Item className="mb-0" {...formItemLayout} name={[field.name, 'label_align']}>
          <Select placeholder="Select Label Align" allowClear disabled={!editMode && visible}>
            <Option value="left">Left</Option>
            <Option value="right">Right</Option>
          </Select>
        </Form.Item>
      </td>
      <td>
        <Form.Item
          className="mb-0"
          {...formItemLayout}
          name={[field.name, 'min_length']}
          wrapperCol={24}
          rules={[
            { pattern: /^[0-9]*$/, message: 'Please enter correct min length' },

            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!getFieldValue(['fields', field.name, 'max_length'])) {
                  return Promise.resolve();
                }
                if (
                  parseInt(getFieldValue(['fields', field.name, 'max_length'])) >= parseInt(value)
                ) {
                  return Promise.resolve();
                }
                return Promise.reject('Min length must be less than max length.');
              },
            }),
          ]}
          normalize={(value) => value || undefined}
        >
          <Input
            placeholder="Min Length"
            onChange={() => {
              setRender((curr) => !curr);
            }}
            disabled={!editMode && visible}
          />
        </Form.Item>
      </td>
      <td>
        <Form.Item
          className="mb-0"
          {...formItemLayout}
          name={[field.name, 'max_length']}
          rules={[
            { pattern: /^[0-9]/, message: 'Please enter correct max length' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!getFieldValue(['fields', field.name, 'min_length']) || !value) {
                  return Promise.resolve();
                }
                if (
                  parseInt(getFieldValue(['fields', field.name, 'min_length'])) <= parseInt(value)
                ) {
                  return Promise.resolve();
                }

                return Promise.reject('Max length must be greater than min length.');
              },
            }),
          ]}
          normalize={(value) => value || undefined}
        >
          <Input
            placeholder="Max Length"
            onChange={() => {
              setRender((curr) => !curr);
            }}
            disabled={!editMode && visible}
          />
        </Form.Item>
      </td>

      <td>
        <Form.Item className="mb-0" {...formItemLayout} name={[field.name, 'reg_expression']}>
          <Input placeholder="Regular Expression" disabled={!editMode && visible} />
        </Form.Item>
      </td>
      <td>
        <Form.Item className="mb-0" {...formItemLayout} name={[field.name, 'options']}>
          <Select
            placeholder="Select Options"
            showSearch={true}
            allowClear
            options={options.payload}
            disabled={!editMode && visible}
          />
        </Form.Item>
      </td>
      {/* <td>
        {editMode ? (
          <Form.Item className="mb-0" {...formItemLayout} name={[field.name, 'field_group']}>
            <Select placeholder="Field Group"/>
          </Form.Item>
        ) : (
          <Form.Item className="mb-0" {...formItemLayout} name={[field.name, 'field_group']}>
            <Select
              placeholder="Field Group"
              showSearch={true}
              allowClear
              disabled={!editMode && visible}
              options={[
                { value: 'Basic Information', label: 'Basic Information' },
                { value: 'Additional Information', label: 'Additional Information' },
                { value: 'Additional Documents', label: 'Additional Documents' },
                { value: 'Virtual Account', label: 'Virtual Account' },
                { value: 'Withdrawal Account', label: 'Withdrawal Account' },
              ]}
            />
          </Form.Item>
        )}
      </td> */}

      <td>
        <MinusCircleOutlined
          style={{ color: 'red', fontSize: '2em' }}
          onClick={() => operations.remove(field?.name)}
        />
      </td>
    </tr>
  );
};

export default React.memo(FormFieldsRow);
