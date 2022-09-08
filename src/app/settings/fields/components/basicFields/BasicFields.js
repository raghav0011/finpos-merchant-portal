import React, { useContext } from 'react';
import { Card, Row, Col, Form, Select, Input, Switch } from 'antd';
import { isEmpty } from 'lodash';

import FieldsContext from '../FieldsContext';
import { getCountryWithFlag } from '../../../../../utils/commonUtil';
import { useMasterData } from '../../../../shared/Hooks';

const BasicConfig = (props) => {
  let formItemLayout = {
    labelCol: { xs: 24, sm: 24, md: 10, lg: 8, xl: 8 },
    wrapperCol: { xs: 24, sm: 24, md: 14, lg: 16, xl: 16 },
    labelAlign: 'left',
  };
  const customerCategoryData = useMasterData('customer_category');
  const customerTypeData = useMasterData('customer_type');
  const { form, fetchFieldsName, fieldsDetails, loadDefault } = props;

  const { editMode, country, setVisible } = useContext(FieldsContext);
  return (
    <div>
      <Card>
        <Row>
          <Col xs={24} md={24} lg={20} xl={16}>
            {editMode ? (
              <Form.Item
                {...formItemLayout}
                name={['customer_category']}
                label="Customer Category"
                rules={[{ required: true }]}
                labelCol={16}
              >
                <strong>{fieldsDetails.customer_category}</strong>
              </Form.Item>
            ) : (
              <Form.Item
                {...formItemLayout}
                name={['customer_category']}
                label="Customer Category"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select Customer Category"
                  onChange={(value) => {
                    if (value && form.getFieldValue('customer_type')) {
                      fetchFieldsName(value, form.getFieldValue('customer_type'));
                      loadDefault(form.getFieldValue('default'));
                      setVisible(false);
                    }
                  }}
                  options={
                    !isEmpty(customerCategoryData?.payload) ? [...customerCategoryData.payload] : []
                  }
                />
              </Form.Item>
            )}
          </Col>
          <Col xs={24} md={24} lg={20} xl={16}>
            {editMode ? (
              <Form.Item
                {...formItemLayout}
                name={['customer_type']}
                label="Customer Type"
                rules={[{ required: true }]}
                labelCol={16}
              >
                <strong>{fieldsDetails.customer_type}</strong>
              </Form.Item>
            ) : (
              <Form.Item
                {...formItemLayout}
                name={['customer_type']}
                label="Customer Type"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select Customer Type"
                  onChange={(value) => {
                    if (value && form.getFieldValue('customer_category')) {
                      fetchFieldsName(form.getFieldValue('customer_category'), value);
                      loadDefault(form.getFieldValue('default'));
                      setVisible(false);
                    }
                  }}
                  options={!isEmpty(customerTypeData?.payload) ? [...customerTypeData.payload] : []}
                />
              </Form.Item>
            )}
          </Col>
          <Col xs={24} md={24} lg={20} xl={16}>
            {editMode ? (
              <Form.Item
                {...formItemLayout}
                name={['country']}
                label="Country"
                rules={[{ required: true }]}
                labelCol={16}
              >
                <strong>
                  {country?.payload?.find((value) => value?.value === fieldsDetails?.country)
                    ?.label || fieldsDetails?.country}
                </strong>
              </Form.Item>
            ) : (
              <Form.Item
                {...formItemLayout}
                name={['country']}
                label="Country"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select Country"
                  children={getCountryWithFlag(country?.payload || [])}
                  showSearch={true}
                  optionFilterProp="label"
                />
              </Form.Item>
            )}
          </Col>
          <Col xs={24} md={24} lg={20} xl={16}>
            {editMode ? (
              <Form.Item
                {...formItemLayout}
                name={['form_version']}
                label="Form Verison"
                labelCol={16}
                rules={[
                  { pattern: /^\d+(?:\.\d)?$/, message: "Please follow the format ' 1.1 ' " },
                ]}
              >
                <Input placeholder="Enter Form Version" />
              </Form.Item>
            ) : (
              <Form.Item
                {...formItemLayout}
                name={['form_version']}
                label="Form Verison"
                rules={[
                  { pattern: /^\d+(?:\.\d)?$/, message: "Please follow the format ' 1.1 ' " },
                ]}
              >
                <Input placeholder="Enter Form Version" />
              </Form.Item>
            )}
          </Col>
          <Col xs={24} md={24} lg={20} xl={16}>
            {editMode ? (
              <Form.Item
                {...formItemLayout}
                name={['is_default']}
                label="Default"
                labelCol={16}
                valuePropName="checked"
                normalize={(value) => (value ? 1 : 0)}
              >
                <Switch />
              </Form.Item>
            ) : (
              <Form.Item
                {...formItemLayout}
                name={['is_default']}
                label="Is Default"
                valuePropName="checked"
                normalize={(value) => (value ? 1 : 0)}
              >
                <Switch />
              </Form.Item>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default BasicConfig;
