import React, { useState } from 'react';
import { Form, Input, Button, Select, Col, Row, DatePicker } from 'antd';
import {
  PlusOutlined,
  MinusCircleOutlined,
  SearchOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import './index.css';
import { exactMatchByKey, isEmpty } from '../../../utils/commonUtil';

const FormItem = Form.Item;
const FormList = Form.List;
const { Option } = Select;

const DynamicField = (props) => {
  const {
    filterFields,
    searchCriteria,
    reportSearchParameter,
    multiple = false,
    disableFuture = true,
    form: { resetFields, setFields },
  } = props;

  const [fromDate, setFromDate] = useState({});

  const [toDate, setToDate] = useState({});

  const [condition, setCondition] = useState([]);

  const [dropdownOptions, setDropdownOptions] = useState([]);

  const resetFilterFields = () => {
    resetFields();
    setFromDate({});
    setToDate({});

    reportSearchParameter ? searchCriteria(reportSearchParameter) : searchCriteria();
  };

  const handleFieldNameChange = (value, k) => {
    setFields([
      {
        name: ['searchKeys', [`${k}`], 'condition'],
        value: '',
      },
      {
        name: ['searchKeys', [`${k}`], 'value'],
        value: '',
      },
      {
        name: ['searchKeys', [`${k}`], 'fromDate'],
        value: '',
      },
      {
        name: ['searchKeys', [`${k}`], 'toDate'],
        value: '',
      },
    ]);

    if (value) {
      const conditionList = exactMatchByKey(value, filterFields, 'code');
      const conditionValue = getDefaultCondition(conditionList);

      condition[`${k}`] = conditionList.conditions;
      setCondition(condition);

      dropdownOptions[`${k}`] = conditionList.dropDownDatas;
      setDropdownOptions(dropdownOptions);

      setFields([
        {
          name: ['searchKeys', [`${k}`], 'condition'],
          value: conditionValue,
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

  const disabledFromDate = (fromDate, index) => {
    if (!fromDate || !toDate?.[index]) {
      // disable future dates even when toDate is undefined
      if (disableFuture) {
        return fromDate.format('YYYY-MM-DD') > moment().format('YYYY-MM-DD');
      }
      return false;
    }

    return fromDate.format('YYYY-MM-DD') > toDate?.[index].format('YYYY-MM-DD');
  };

  const disabledToDate = (toDate, index) => {
    if (!toDate || !fromDate?.[index]) {
      // disable future dates even when fromDate is undefined
      if (disableFuture) {
        return toDate.valueOf() >= moment().valueOf();
      }
      return false;
    }
    if (disableFuture) {
      // disable future dates and dates before fromDate.
      return (
        toDate.format('YYYY-MM-DD') < fromDate?.[index].format('YYYY-MM-DD') ||
        toDate.format('YYYY-MM-DD') > moment().format('YYYY-MM-DD')
      );
    }
    return toDate.valueOf() < fromDate?.[index].valueOf();
  };
  const handleFromChange = (value, k) => {
    setFromDate({ ...fromDate, [k]: value });
  };

  const handleToChange = (value, k) => {
    setToDate({ ...toDate, [k]: value });
  };

  const getDefaultCondition = (fieldType) => {
    switch (fieldType?.dataType?.toUpperCase()) {
      case 'STRING':
        return 'contains';
      case 'DROPDOWN':
        return 'eq';
      case 'DATE':
        return 'between';

      default:
        return '';
    }
  };
  const formItemLayout = {
    labelCol: {
      xl: { span: 24 },
      lg: { span: 24 },
      md: { span: 24 },
      sm: { span: 24 },
      xs: { span: 24 },
    },
    wrapperCol: {
      xl: { span: 24 },
      lg: { span: 24 },
      md: { span: 24 },
      sm: { span: 24 },
      xs: { span: 24 },
    },
    // labelAlign: 'left',
  };

  return (
    <FormList name="searchKeys">
      {(fields, { add, remove }) => {
        return (
          <Row>
            <Col xxl={16} xl={12} lg={24} md={24} sm={24}>
              {fields.map((field, index) => (
                <div key={index} style={{ display: 'flex' }}>
                  <FormItem
                    {...field}
                    fieldKey={[field.fieldKey, 'customizable']}
                    name={[field.name, 'customizable']}
                    noStyle
                    hidden={true}
                  >
                    <Input type="hidden" />
                  </FormItem>

                  <FormItem
                    {...field}
                    fieldKey={[field.fieldKey, 'dataType']}
                    name={[field.name, 'dataType']}
                    noStyle
                    hidden={true}
                  >
                    <Input type="hidden" />
                  </FormItem>

                  <Col xxl={11} xl={11} lg={12} md={12} sm={12} xs={12} className="mr-1">
                    <FormItem
                      {...field}
                      {...formItemLayout}
                      label={index === 0 ? `Fields` : ' '}
                      fieldKey={[field.fieldKey, 'field']}
                      name={[field.name, 'field']}
                      className="filter-field-dropdown"
                      rules={[
                        {
                          required: true,
                          message: 'Please select from the dropdown.',
                        },
                      ]}
                    >
                      <Select
                        onChange={(value) => handleFieldNameChange(value, index)}
                        showSearch
                        optionFilterProp="children"
                      >
                        {filterFields &&
                          filterFields.map((d) => <Option key={d.code}>{d.title}</Option>)}
                      </Select>
                    </FormItem>
                  </Col>

                  <FormItem
                    {...field}
                    fieldKey={[field.fieldKey, 'condition']}
                    name={[field.name, 'condition']}
                    className="filter-field-dropdown"
                    rules={[
                      {
                        required: true,
                        message: 'Please select from the dropdown.',
                      },
                    ]}
                    hidden={true}
                  >
                    <Input type="hidden" />
                    {/* </FormItem>
                    )} */}
                  </FormItem>

                  <Col xxl={11} xl={11} lg={11} md={12} sm={12} xs={12}>
                    <FormItem
                      noStyle
                      shouldUpdate={(prevValues, currentValues) =>
                        // prevValues?.searchKeys?.[`${index}`]?.['condition'] !==
                        //   currentValues?.searchKeys?.[`${index}`]?.['condition'] ||
                        prevValues?.searchKeys?.[`${index}`]?.['field'] !==
                        currentValues?.searchKeys?.[`${index}`]?.['field']
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue(`searchKeys`)?.[`${index}`]?.['condition'] === 'between' ? (
                          <div
                            style={
                              index !== 0
                                ? {
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginTop: '30px',
                                  }
                                : { display: 'flex', flexDirection: 'row' }
                            }
                          >
                            <FormItem
                              {...field}
                              {...formItemLayout}
                              label={index === 0 ? 'Start Date' : ''}
                              name={[field.name, 'fromDate']}
                              fieldKey={[field.fieldKey, 'fromDate']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Please select date.',
                                },
                              ]}
                              style={{ height: '100%' }}
                            >
                              <DatePicker
                                style={{ width: '100%' }}
                                // className="form-control"
                                format="MM-DD-YYYY"
                                disabledDate={(date) => disabledFromDate(date, index)}
                                onChange={(value) => handleFromChange(value, index)}
                                placeholder={'From Date'}
                              />
                            </FormItem>

                            <FormItem
                              {...field}
                              {...formItemLayout}
                              label={index === 0 ? 'End Date' : ''}
                              name={[field.name, 'toDate']}
                              fieldKey={[field.fieldKey, 'toDate']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Please select date.',
                                },
                              ]}
                              style={{ marginLeft: '10px', height: '100%' }}
                            >
                              <DatePicker
                                style={{ width: '100%' }}
                                format="MM-DD-YYYY"
                                disabledDate={(date) => disabledToDate(date, index)}
                                onChange={(value) => handleToChange(value, index)}
                                placeholder={'To Date'}
                                // className="form-control"
                              />
                            </FormItem>
                          </div>
                        ) : getFieldValue(`searchKeys`)?.[`${index}`]?.['dataType'] ===
                          'DropDown' ? (
                          <FormItem
                            {...field}
                            {...formItemLayout}
                            label={index === 0 ? 'Value' : ' '}
                            name={[field.name, 'value']}
                            fieldKey={[field.fieldKey, 'value']}
                            rules={[
                              {
                                required: true,
                                message: 'Please select from the dropdown.',
                              },
                            ]}
                          >
                            <Select showSearch optionFilterProp="children">
                              {dropdownOptions &&
                                dropdownOptions[`${index}`] &&
                                dropdownOptions[`${index}`].map((d) => (
                                  <Option key={d.code}>{d.title}</Option>
                                ))}
                            </Select>
                          </FormItem>
                        ) : getFieldValue(`searchKeys`)?.[`${index}`]?.['dataType'] === 'Date' ? (
                          <FormItem
                            {...field}
                            {...formItemLayout}
                            name={[field.name, 'value']}
                            label={index === 0 ? 'Value' : ' '}
                            fieldKey={[field.fieldKey, 'value']}
                            rules={[
                              {
                                required: true,
                                message: 'Please select date.',
                              },
                            ]}
                          >
                            <DatePicker
                              style={{ width: '100%' }}
                              format="YYYY-MM-DD"
                              placeholder={'Select Date'}
                            />
                          </FormItem>
                        ) : (
                          <FormItem
                            {...field}
                            {...formItemLayout}
                            label={index === 0 ? 'Value' : ' '}
                            name={[field.name, 'value']}
                            fieldKey={[field.fieldKey, 'value']}
                            rules={[
                              {
                                required: true,
                                message: 'Please enter value.',
                              },
                            ]}
                          >
                            <Input type="text" />
                          </FormItem>
                        )
                      }
                    </FormItem>
                  </Col>

                  {fields.length > 1 ? (
                    <Button
                      style={{ border: '#ffffff', marginTop: '22px' }}
                      title="Remove"
                      icon={<MinusCircleOutlined className="dynamic-delete-button  mb-0 ml-2" />}
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </div>
              ))}
            </Col>
            <Col xxl={8} xl={12} lg={24} md={24} sm={24}>
              <div className="d-flex transaction-btn justify-content-lg-end mt-4 ">
                <Col>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    className="btn-float-right transaction-btn ml-sm-1"
                  >
                    <PlusOutlined />
                    Add condition
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="ant-btn btn-custom-field ml-2"
                    htmlType="submit"
                    icon={<SearchOutlined />}
                  >
                    Search
                  </Button>
                </Col>
                <Col>
                  <Button className="ant-btn no-underline ml-2" onClick={() => resetFilterFields()}>
                    Reset
                  </Button>
                </Col>
              </div>
            </Col>
          </Row>
        );
      }}
    </FormList>
  );
};

export default DynamicField;
