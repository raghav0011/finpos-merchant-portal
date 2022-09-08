import React from 'react';
import { Modal, Form, Select, Input } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

import { WButton } from '../Widgets';
import './style.css';

const CustomFieldModal = (props) => {
  const {
    row,
    form,
    setShowEditBtn,
    fieldTable,
    fieldNamesState,
    field,
    formItemLayout,
    hideModal,
  } = props;

  return (
    <Modal
      title="Add Madatory Fields"
      width={'739px'}
      closable={false}
      {...props}
      maskClosable={false}
    >
      <Form.List name={[field.name, 'mandatory_fields']} initialValue={[{}]}>
        {(fields, operations, errors) => {
          return (
            <>
              <div className="table-container">
                <table className={'mandatory-table'}>
                  <tr gutter={24}>
                    <th>Field Table</th>
                    <th>Field Name</th>
                    <th>Action</th>
                  </tr>

                  <tbody>
                  {fields.map((modalField, index) => (
                    <tr>
                      <td>
                        <Form.Item name={'id'} noStyle>
                          <Input hidden/>
                        </Form.Item>

                        <Form.Item
                          className="mb-0 mr-2"
                          {...formItemLayout}
                          name={[modalField.name, 'field_table']}
                        >
                          <Select
                            placeholder="Field Table"
                            showSearch={true}
                            allowClear
                            optionFilterProp="label"
                            options={fieldTable.payload}
                            onChange={(value) => {
                              form.setFields([
                                {
                                  name: [
                                    row,
                                    field.name,
                                    'mandatory_fields',
                                    modalField.name,
                                    'field_name',
                                  ],
                                  value: undefined,
                                },
                              ]);
                            }}
                          />
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item
                          noStyle
                          shouldUpdate={(prev, curr) => {
                            return (
                              prev?.[row]?.[field.name]?.['mandatory_fields']?.[
                                modalField.name
                                ]?.['field_table'] !==
                              curr?.[row]?.[field.name]?.['mandatory_fields']?.[
                                modalField.name
                                ]?.['field_table']
                            );
                          }}
                        >
                          {() => {
                            return (
                              <Form.Item
                                className="mb-0"
                                {...formItemLayout}
                                name={[modalField.name, 'field_name']}
                              >
                                <Select
                                  allowClear
                                  showSearch
                                  optionFilterProp="label"
                                  placeholder="Field Name"
                                  disabled={
                                    !form.getFieldValue([
                                      row,
                                      field.name,
                                      'mandatory_fields',
                                      modalField.name,
                                      'field_table',
                                    ])
                                  }
                                >
                                  {fieldNamesState?.payload instanceof Array &&
                                  fieldNamesState?.payload
                                    .filter((item) => {
                                      return (
                                        item.object_type ===
                                        form.getFieldValue([
                                          row,
                                          field.name,
                                          'mandatory_fields',
                                          modalField.name,
                                          'field_table',
                                        ])
                                      );
                                    })
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
                        {fields.length > 1 && (
                          <MinusCircleOutlined
                            style={{ color: 'red', fontSize: '2em' }}
                            onClick={() => {
                              if (modalField.length === 1) {
                                setShowEditBtn(false);
                                hideModal();
                              }

                              operations.remove(modalField?.name);
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>

              <Form.Item
                wrapperCol={{ xs: 24, sm: 12, md: 12, lg: 10 }}
                style={{ marginBottom: 0 }}
              >
                <WButton onClick={() => operations.add()} block>
                  Add Fields
                </WButton>
              </Form.Item>
            </>
          );
        }}
      </Form.List>
    </Modal>
  );
};

export default CustomFieldModal;
