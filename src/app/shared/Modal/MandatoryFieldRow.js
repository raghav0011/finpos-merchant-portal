import React, { useContext } from 'react';
import { Form, Select, Input } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

import amlContext from '../AmlContext';

import './style.css';

const MandatoryRow = ({ form, field, operations, formItemLayout, fields }) => {
  const { fieldTable, fieldNamesState, setShowField } = useContext(amlContext);

  return (
    <tr>
      <td>
        <Form.Item name={'id'} noStyle>
          <Input hidden />
        </Form.Item>

        <Form.Item className="mb-0 mr-2" {...formItemLayout} name={[field.name, 'field_table']}>
          <Select
            placeholder="Field Table"
            showSearch={true}
            allowClear
            optionFilterProp="label"
            options={fieldTable.payload}
            onChange={(value) => {
              form.setFields([
                {
                  name: ['mandatory', field.name, 'field_name'],
                  value: undefined,
                },
              ]);
            }}
          />
        </Form.Item>
      </td>
      <td>
        <Form.Item noStyle shouldUpdate>
          {() => {
            return (
              <Form.Item
                className="mb-0"
                {...formItemLayout}
                name={[field.name, 'field_name']}
                shouldUpdate
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  placeholder="Value"
                  disabled={!form.getFieldValue(['mandatory', field.name, 'field_table'])}
                >
                  {fieldNamesState?.payload instanceof Array &&
                    fieldNamesState?.payload
                      .filter(
                        (item) =>
                          item.object_type ===
                          form.getFieldValue(['mandatory', field.name, 'field_table'])
                      )
                      .map((item, index) => {
                        return (
                          <Select.Option key={index} value={item.value}>
                            {item.label}
                          </Select.Option>
                        );
                      })}
                </Select>
              </Form.Item>
            );
          }}
        </Form.Item>
      </td>

      <td>
        <MinusCircleOutlined
          style={{ color: 'red', fontSize: '2em' }}
          onClick={() => {
            if (fields.length === 1) {
              setShowField(false);
            }
            operations.remove(field?.name);
          }}
        />
      </td>
    </tr>
  );
};

export default React.memo(MandatoryRow);
