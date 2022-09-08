/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Form, Card, Row, Col, Input, Spin, Switch } from 'antd';
import { useLocation, useParams } from 'react-router-dom';

import { TitleBar } from '../../../shared/TitleBar';
import { WButton } from '../../../shared/Widgets';
import { SortableEditableTable, FormFieldsRow, formFieldsTableHeaders } from './parameters';
import BasicFields from './basicFields';
import { useMasterData } from '../../../shared/Hooks';
import FieldsContext from './FieldsContext';
import Message from '../../../shared/Message';

const validateMessages = {
  required: 'Required.',
};

const FormFields = (props) => {
  const [form] = Form.useForm();
  const { pathname } = useLocation();
  const params = useParams();
  const { payload } = useMasterData('field_type');
  const country = useMasterData('country');
  const options = useMasterData('options');
  const [editMode, setEditMode] = useState(false);
  const [visible, setVisible] = useState(true);

  const {
    fields,
    addFields,
    fetchFieldUpdateRequestById,
    updateFields,
    fieldsDetailsLoading,
    fetchFieldsIfDefault,
    fieldsLoading,
    fieldsDetailErrors,
    cleanFieldsDetails,
    cleanFieldsErrors,
  } = props;

  let fieldsAddProps = {
    editMode,
    fields,
    payload,
    country,
    options,
    form,
    setVisible,
    visible,
  };

  const loadDefault = (value) => {
    if (!value) {
      form.setFieldsValue({ fields: [{}] });
    }
    if (form.getFieldValue('customer_category') && form.getFieldValue('customer_type') && value) {
      fetchFieldsIfDefault(
        form.getFieldValue('customer_category'),
        form.getFieldValue('customer_type')
      ).then((response) => {
        if (response.type.endsWith('fulfilled')) {
          props
            .fetchFieldsName(
              response.payload?.[0].customer_category,
              response.payload?.[0].customer_type
            )
            .then((res) => {
              if (res.type.endsWith('fulfilled')) {
                form.setFieldsValue({ fields: response?.payload?.[0]?.['fields'] });
              }
            });
        }
      });
    }
  };

  useEffect(() => {
    // check if the path is edit or not
    if (pathname.includes('edit')) {
      setEditMode(true);
    }
    return () => {
      cleanFieldsDetails();
      cleanFieldsErrors();
    };
  }, []);

  useEffect(() => {
    if (editMode) {
      async function fetchDetails() {
        try {
          let response = await fetchFieldUpdateRequestById(params?.id);
          if (response.type.endsWith('fulfilled')) {
            let res = await props.fetchFieldsName(
              response.payload?.[0].customer_category,
              response.payload?.[0].customer_type
            );
            if (res.type.endsWith('fulfilled')) {
              form.setFieldsValue(response.payload[0]);
              form.setFieldsValue({ id: params?.id });
            }
          }
        } catch (error) {}
      }

      fetchDetails();
    }
  }, [editMode]);

  const preSubmitHandler = (res) => {
    return res.fields.map((param, index) => ({
      ...param,
      sequence_order: index,
    }));
  };
  const onFinishAdd = (values) => {
    values.fields = preSubmitHandler(values);
    if (editMode) {
      updateFields(params?.id, values).then((res) => {
        if (res.type.endsWith('fulfilled')) {
          const id = res.payload?.[0].id;
          props.history.push(`/setting/form-fields/${id}`);
        }
      });
    } else {
      delete values?.default;
      addFields(values).then((res) => {
        if (res.type.endsWith('fulfilled')) {
          props.history.push('/setting/form-fields/');
        } else {
        }
      });
    }
  };

  return (
    <div className="container-fluid no-breadcrumb page-dashboard article__section">
      <TitleBar
        breadCrumbObject={
          editMode
            ? {
                Settings: '',
                'Form Fields': '/setting/form-fields/',
                Edit: '',
              }
            : {
                Settings: '',
                'Form Fields': '/setting/form-fields/',
                Add: '',
              }
        }
      />
      {fieldsDetailErrors && <Message error={fieldsDetailErrors} />}
      <Spin spinning={fieldsDetailsLoading}>
        <FieldsContext.Provider value={fieldsAddProps}>
          <Card title={editMode ? <h4>Edit Form Fields</h4> : <h4>Add Form Fields</h4>}>
            <Form
              form={form}
              layout="horizontal"
              onFinish={onFinishAdd}
              validateMessages={validateMessages}
              initialValues={{ is_default: 0 }}
            >
              <>
                <Form.Item name={'id'} noStyle>
                  <Input hidden />
                </Form.Item>

                <BasicFields form={form} loadDefault={loadDefault} {...props} />
                <div>
                  <h5 className=" my-3 mr-3">Fields</h5>

                  {!editMode && (
                    <div>
                      <Form.Item name={'default'} label="Load Template">
                        <Switch onClick={loadDefault} disabled={visible} />
                      </Form.Item>
                    </div>
                  )}
                </div>

                <SortableEditableTable
                  form={form}
                  listName="fields"
                  RowComponent={FormFieldsRow}
                  tableHeader={formFieldsTableHeaders}
                  fieldsLoading={fieldsLoading}
                />
              </>
              <Row className="mt-4">
                <Col xl={16} lg={24} xs={24}>
                  <Form.Item noStyle shouldUpdate={true}>
                    {() => (
                      <WButton customType={'add'} className="mr-1" htmlType="submit">
                        Submit
                      </WButton>
                    )}
                  </Form.Item>
                  <Form.Item noStyle>
                    <WButton
                      customType="cancel"
                      htmlType="button"
                      danger
                      onClick={() => {
                        props.history.push('/setting/form-fields');
                      }}
                    >
                      Cancel
                    </WButton>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </FieldsContext.Provider>
      </Spin>
    </div>
  );
};

export default FormFields;
