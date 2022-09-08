import React, { useState } from 'react';
import { Form, Input, Button, Select, Col, Row, DatePicker } from 'antd';
import {
  PlusOutlined,
  MinusCircleOutlined,
  SearchOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import './index.css';
import { exactMatchByKey } from '../../../utils/commonUtil';
import { WButton } from '../Widgets';

const FormItem = Form.Item;
const FormList = Form.List;
const { Option } = Select;

const DynamicField = (props) => {
  const { t } = useTranslation();

  const {
    filterFields,
    searchCriteria,
    reportSearchParameter,
    form: { resetFields, setFields },
  } = props;

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [condition, setCondition] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const resetFilterFields = () => {
    resetFields();
    reportSearchParameter ? searchCriteria(reportSearchParameter) : searchCriteria();
  };

  const handleFieldNameChange = (value, k) => {
    if (value) {
      const conditionList = exactMatchByKey(value, filterFields, 'code');

      condition[`${k}`] = conditionList.conditions;
      setCondition(condition);

      dropdownOptions[`${k}`] = conditionList.dropDownDatas;
      setDropdownOptions(dropdownOptions);

      setFields([
        {
          name: ['searchKeys', [`${k}`], 'condition'],
          value: undefined,
        },
        {
          name: ['searchKeys', [`${k}`], 'value'],
          value: undefined,
        },
        {
          name: ['searchKeys', [`${k}`], 'customizable'],
          value: conditionList.customizable,
        },
        {
          name: ['searchKeys', [`${k}`], 'dataType'],
          value: conditionList.dataType,
        },
      ]);
    }
  };

  const disabledFromDate = (fromDate) => {
    if (!fromDate || !toDate) {
      return false;
    }
    return fromDate.valueOf() > toDate.valueOf();
  };

  const disabledToDate = (toDate) => {
    if (!toDate || !fromDate) {
      return false;
    }
    return toDate.valueOf() <= fromDate.valueOf();
  };

  const handleFromChange = (value) => {
    setFromDate(value);
  };

  const handleToChange = (value) => {
    setToDate(value);
  };

  return (
    <FormList name="searchKeys">
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, index) => (
              <tr key={index}>
                <FormItem
                  {...field}
                  fieldKey={[field.fieldKey, 'customizable']}
                  name={[field.name, 'customizable']}
                  noStyle
                >
                  <Input type="hidden" />
                </FormItem>
                <FormItem
                  {...field}
                  fieldKey={[field.fieldKey, 'dataType']}
                  name={[field.name, 'dataType']}
                  noStyle
                >
                  <Input type="hidden" />
                </FormItem>
                <td>
                  <FormItem
                    {...field}
                    fieldKey={[field.fieldKey, 'field']}
                    name={[field.name, 'field']}
                    className="filter-field-dropdown"
                    rules={[
                      {
                        required: true,
                        message: t('filter.field.dropdown.required.message'),
                      },
                    ]}
                  >
                    <Select
                      placeholder={t('filter.field.fields.placeholder')}
                      onChange={(value) => handleFieldNameChange(value, index)}
                      showSearch
                      optionFilterProp="children"
                    >
                      {filterFields &&
                        filterFields.map((d) => <Option key={d.code}>{d.title}</Option>)}
                    </Select>
                  </FormItem>
                </td>
                <FormItem
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues?.searchKeys?.[`${index}`]?.['field'] !==
                    currentValues?.searchKeys?.[`${index}`]?.['field']
                  }
                >
                  {() => (
                    <td>
                      <FormItem
                        {...field}
                        fieldKey={[field.fieldKey, 'condition']}
                        name={[field.name, 'condition']}
                        className="filter-field-dropdown"
                        rules={[
                          {
                            required: true,
                            message: t('filter.field.dropdown.required.message'),
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          placeholder={t('filter.field.condition.placeholder')}
                          optionFilterProp="children"
                        >
                          {condition &&
                            condition[`${index}`] &&
                            condition[`${index}`].map((d) => (
                              <Option key={d.code}>{d.title}</Option>
                            ))}
                        </Select>
                      </FormItem>
                    </td>
                  )}
                </FormItem>
                <FormItem
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues?.searchKeys?.[`${index}`]?.['condition'] !==
                      currentValues?.searchKeys?.[`${index}`]?.['condition'] ||
                    prevValues?.searchKeys?.[`${index}`]?.['field'] !==
                      currentValues?.searchKeys?.[`${index}`]?.['field']
                  }
                >
                  {({ getFieldValue }) =>
                    getFieldValue(`searchKeys`)?.[`${index}`]?.['condition'] === 'between' ? (
                      <td>
                        <div>
                          <div
                            style={{
                              display: 'table-cell',
                              width: '37%',
                            }}
                          >
                            <FormItem
                              {...field}
                              name={[field.name, 'fromDate']}
                              fieldKey={[field.fieldKey, 'fromDate']}
                              rules={[
                                {
                                  required: true,
                                  message: t('filter.field.date.required.message'),
                                },
                              ]}
                            >
                              <DatePicker
                                style={{ width: '100%' }}
                                className="from-btn"
                                format="MM-DD-YYYY"
                                disableDate={disabledFromDate}
                                onChange={handleFromChange}
                                placeholder={t('filter.from.date.placeholder')}
                              />
                            </FormItem>
                          </div>
                          <div
                            style={{ display: 'table-cell', paddingLeft: '0.3rem', width: '37%' }}
                          >
                            <FormItem
                              {...field}
                              name={[field.name, 'toDate']}
                              fieldKey={[field.fieldKey, 'toDate']}
                              rules={[
                                {
                                  required: true,
                                  message: t('filter.field.date.required.message'),
                                },
                              ]}
                            >
                              <DatePicker
                                style={{ width: '100%' }}
                                format="MM-DD-YYYY"
                                disabledDate={disabledToDate}
                                onChange={handleToChange}
                                placeholder={t('filter.to.date.placeholder')}
                              />
                            </FormItem>
                          </div>
                        </div>
                      </td>
                    ) : getFieldValue(`searchKeys`)?.[`${index}`]?.['dataType'] === 'dropdown' ? (
                      <td>
                        {' '}
                        <FormItem
                          {...field}
                          name={[field.name, 'value']}
                          fieldKey={[field.fieldKey, 'value']}
                          rules={[
                            {
                              required: true,
                              message: t('filter.field.dropdown.required.message'),
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            placeholder={t('filter.field.select.value.label')}
                            optionFilterProp="children"
                          >
                            {dropdownOptions &&
                              dropdownOptions[`${index}`] &&
                              dropdownOptions[`${index}`].map((d) => (
                                <Option key={d.code}>{d.title}</Option>
                              ))}
                          </Select>
                        </FormItem>
                      </td>
                    ) : getFieldValue(`searchKeys`)?.[`${index}`]?.['dataType'] === 'Date' ? (
                      <td>
                        <FormItem
                          {...field}
                          name={[field.name, 'value']}
                          fieldKey={[field.fieldKey, 'value']}
                          rules={[
                            {
                              required: true,
                              message: t('filter.field.date.required.message'),
                            },
                          ]}
                        >
                          <DatePicker
                            style={{ width: '100%' }}
                            format="MM-DD-YYYY"
                            placeholder={t('filter.field.select.date.label')}
                          />
                        </FormItem>
                      </td>
                    ) : (
                      <td>
                        <FormItem
                          {...field}
                          name={[field.name, 'value']}
                          fieldKey={[field.fieldKey, 'value']}
                          rules={[
                            {
                              required: true,
                              message: t('filter.field.input.required.message'),
                            },
                          ]}
                        >
                          <Input type="text" placeholder={t('filter.field.value.label')} />
                        </FormItem>
                      </td>
                    )
                  }
                </FormItem>

                {fields.length > 1 ? (
                  <WButton
                    style={{ border: '#ffffff', minWidth: 0 }}
                    title="Remove"
                    icon={<MinusCircleOutlined className="dynamic-delete-button" />}
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </tr>
            ))}
            <tr>
              <td colSpan={2}>
                <Row type="flex" justify="space-between" style={{ float: 'left' }}>
                  <Col>
                    <WButton customType="submit" htmlType="submit" icon={<SearchOutlined />}>
                      {t('filter.search.button.label')}
                    </WButton>
                    <WButton
                      customType="reset"
                      className="ml-2"
                      icon={<ReloadOutlined />}
                      onClick={() => resetFilterFields()}
                    >
                      {t('filter.reset.button.label')}
                    </WButton>
                  </Col>
                </Row>
              </td>
              <td>
                <Row type="flex" justify="space-between" style={{ float: 'right' }}>
                  <Col>
                    <Button type="dashed" onClick={() => add()} className="btn-float-right">
                      <PlusOutlined />
                      {t('filter.add.condition.button.label')}
                    </Button>
                  </Col>
                </Row>
              </td>
            </tr>
          </>
        );
      }}
    </FormList>
  );
};

export default DynamicField;
