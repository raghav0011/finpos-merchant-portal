import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Col, Row, DatePicker } from 'antd';
import {
  PlusOutlined,
  MinusCircleOutlined,
  SearchOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import './index.css';
import { exactMatchByKey, isEmpty } from '../../../utils/commonUtil';
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
    status,
    form: { resetFields, setFields, getFieldValue, setFieldsValue, getFieldsValue },
  } = props;

  const [initialFieldValue, setInitialFieldValue] = useState(status);
  const [initialConditionValue, setConditionValue] = useState(status);
  const [initialDropdownValue, setInitialDropdownValue] = useState(status);

  useEffect(() => {
    if (
      initialFieldValue &&
      !isEmpty(initialFieldValue) &&
      filterFields &&
      !isEmpty(filterFields)
    ) {
      if (temp) {
        let condition = [];
        const conditionList = console.log(
          '🚀 ~ file: DynamicFieldSet.js ~ line 58 ~ useEffect ~ conditionList',
          conditionList
        );
        filterFields && exactMatchByKey(initialFieldValue, filterFields, 'code');
        condition[0] = conditionList?.conditions;
        setCondition(condition);

        dropdownOptions[0] = conditionList?.dropDownData || conditionList?.dropDownDatas;

        setDropdownOptions(dropdownOptions);

        setFieldsValue({
          [`${'searchKeys'}[0][dataType]`]: conditionList?.dataType,
        });
        setTemp(false);
      }
    }

    return () => {
      setKeyFlag([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialConditionValue, filterFields]);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [condition, setCondition] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [keyFlag, setKeyFlag] = useState([]);
  const [temp, setTemp] = useState(true);

  const isFieldsFilled = (index) => {
    const fieldValues = getFieldsValue()?.reportModel?.[index];
    return fieldValues?.field ||
      fieldValues?.condition ||
      fieldValues?.value ||
      fieldValues?.fromDate ||
      fieldValues?.toDate
      ? true
      : false;
  };

  const handleFilterFieldsValueChange = (e, index) => {
    if (!e.target.value) {
      setFields({
        [`${'searchKeys'}[${index}][field]`]: {
          value: getFieldsValue()?.reportModel?.[index]?.field,
          errors: '',
        },
        [`${'searchKeys'}[${index}][condition]`]: {
          value: getFieldsValue()?.reportModel?.[index]?.condition,
          errors: '',
        },
        [`${'searchKeys'}[${index}][value]`]: { errors: '' },
        [`${'searchKeys'}[${index}][fromDate]`]: { errors: '' },
        [`${'searchKeys'}[${index}][toDate]`]: { errors: '' },
      });
    }
  };

  const resetFilterFields = () => {
    resetFields();
    setFromDate({});
    setToDate({});
    setInitialFieldValue('');
    setInitialDropdownValue('');
    setConditionValue('');

    reportSearchParameter ? searchCriteria(reportSearchParameter) : searchCriteria();
  };
  const handleFieldNameChange = (value, index) => {
    // resetFields(`${'searchKeys'}[${k}][condition]`);
    // resetFields(`${'searchKeys'}[${k}][value]`);

    const tempFromDate = { ...fromDate };
    delete tempFromDate[index];
    setFromDate(tempFromDate);

    const tempToDate = { ...toDate };
    delete tempToDate[index];
    setToDate(tempToDate);

    if (value) {
      const conditionList = exactMatchByKey(value, filterFields, 'code');

      const conditionValue = getDefaultCondition(conditionList);

      setFieldsValue({
        [`${'searchKeys'}[${index}][condition]`]: conditionValue,
      });
      condition[`${index}`] = conditionList.conditions;
      setCondition(condition);

      dropdownOptions[`${index}`] = conditionList.dropDownDatas;
      setDropdownOptions(dropdownOptions);

      setFieldsValue({
        [`${'searchKeys'}[${index}][customizable]`]: conditionList.customizable,
      });
      setFieldsValue({
        [`${'searchKeys'}[${index}][dataType]`]: conditionList.dataType,
      });
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

  const handleFromChange = (value, index) => {
    setFromDate({ ...fromDate, [index]: value });
  };

  const handleToChange = (value, index) => {
    setToDate({ ...toDate, [index]: value });
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
    labelAlign: 'left',
  };

  return (
    <FormList name="searchKeys">
      {(fields, { add, remove }) => {
        return (
          <Row>
            <Col xxl={16} xl={12} lg={11} md={24} sm={24}>
              {fields.map((field, index) => (
                <Row key={index}>
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
                  <Col xxl={11} xl={11} lg={11} md={24} sm={24} className="mr-2">
                    <FormItem
                      {...formItemLayout}
                      {...field}
                      fieldKey={[field.fieldKey, 'field']}
                      name={[field.name, 'field']}
                      className="filter-field-dropdown mr-1"
                      label={index === 0 ? `Fields` : ' '}
                      rules={[
                        {
                          required: isFieldsFilled(index),
                          message: t('filter.field.dropdown.required.message'),
                        },
                      ]}
                      initialValue={
                        index === 0 && initialFieldValue ? initialFieldValue : undefined
                      }
                    >
                      <Select
                        style={{ width: '100%' }}
                        placeholder={t('filter.field.fields.placeholder')}
                        onChange={(value) => handleFieldNameChange(value, index)}
                        showSearch
                        optionFilterProp="children"
                      >
                        {filterFields &&
                          filterFields.map((d) => <Option key={d.code}>{d.title}</Option>)}
                      </Select>
                    </FormItem>
                  </Col>

                  <Col xxl={11} xl={11} lg={11} md={24} sm={24}>
                    {getFieldValue(`searchKeys`)?.[`${index}`]?.['condition'] === 'between' ? (
                      <div
                        style={
                          index !== 0
                            ? {
                                display: 'flex',
                                flexDirection: 'row',
                                marginTop: '13px',
                              }
                            : { display: 'flex', flexDirection: 'row' }
                        }
                      >
                        <FormItem
                          {...formItemLayout}
                          abel={index === 0 ? 'Start Date' : ''}
                          {...field}
                          name={[field.name, 'fromDate']}
                          fieldKey={[field.fieldKey, 'fromDate']}
                          rules={[
                            {
                              required: isFieldsFilled(index),
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

                        <FormItem
                          {...field}
                          {...formItemLayout}
                          label={index === 0 ? 'End Date' : ''}
                          name={[field.name, 'toDate']}
                          fieldKey={[field.fieldKey, 'toDate']}
                          rules={[
                            {
                              required: isFieldsFilled(index),
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
                    ) : getFieldValue(`searchKeys`)?.[`${index}`]?.['dataType'] === 'dropdown' ? (
                      <FormItem
                        {...formItemLayout}
                        {...field}
                        label={index === 0 ? 'Value' : ' '}
                        name={[field.name, 'value']}
                        fieldKey={[field.fieldKey, 'value']}
                        rules={[
                          {
                            required: isFieldsFilled(index),
                            message: t('filter.field.dropdown.required.message'),
                          },
                        ]}
                        initialValue={
                          index === 0 &&
                          getFieldValue(`reportModel[${index}][field]`) === initialFieldValue
                            ? initialDropdownValue
                            : undefined
                        }
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
                    ) : (
                      <FormItem
                        {...formItemLayout}
                        label={index === 0 ? 'Value' : ' '}
                        {...field}
                        name={[field.name, 'value']}
                        fieldKey={[field.fieldKey, 'value']}
                        rules={[
                          {
                            required:
                              getFieldValue(`reportModel[${index}][field]`) ||
                              getFieldValue(`reportModel[${index}][condition]`),
                            message: t('filter.field.input.required.message'),
                          },
                        ]}
                        initialValue=""
                      >
                        <Input
                          type="text"
                          placeholder={t('filter.field.value.label')}
                          onChange={(e) => handleFilterFieldsValueChange(e, index)}
                        />
                      </FormItem>
                    )}
                  </Col>
                  {fields.length > 1 ? (
                    <Button
                      style={{ border: '#ffffff', marginTop: '30px' }}
                      title="Remove"
                      shape="circle"
                      icon={<MinusCircleOutlined className="dynamic-delete-button mb-0" />}
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Row>
              ))}
            </Col>
            <Col xxl={8} xl={12} lg={13} md={24} sm={24}>
              <FormItem {...formItemLayout} className="mt-m2_5rem mt-xs-0">
                <div className=" d-flex transaction-btn justify-content-lg-end">
                  <Col
                    xxl={{ order: 1 }}
                    xl={{ order: 1 }}
                    lg={{ order: 1 }}
                    md={{ order: 2 }}
                    sm={{ order: 2 }}
                  >
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      className="btn-float-right transaction-btn ml-sm-1"
                    >
                      <PlusOutlined />
                      {t('filter.add.condition.button.label')}
                    </Button>
                  </Col>
                  <Col
                    xxl={{ order: 2 }}
                    xl={{ order: 2 }}
                    lg={{ order: 2 }}
                    md={{ order: 1 }}
                    sm={{ order: 1 }}
                  >
                    <Button
                      className="ant-btn btn-custom-field ml-2"
                      customType="submit"
                      htmlType="submit"
                      icon={<SearchOutlined />}
                    >
                      {t('filter.search.button.label')}
                    </Button>
                    <Button
                      className="ant-btn no-underline ml-2"
                      style={{ width: '8rem' }}
                      icon={<ReloadOutlined />}
                      onClick={() => resetFilterFields()}
                    >
                      {t('filter.reset.button.label')}
                    </Button>
                  </Col>
                </div>
              </FormItem>
            </Col>
          </Row>
        );
      }}
    </FormList>
  );
};

export default DynamicField;
