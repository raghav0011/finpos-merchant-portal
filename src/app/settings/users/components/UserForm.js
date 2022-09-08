import React, { useEffect, useState } from 'react';
import { Card, Form, Grid, message, Spin } from 'antd';
import FormBuilder from 'antd-form-builder';
import { useParams, useLocation } from 'react-router-dom';
import moment from 'moment';

import { normalizeBoolean } from '../../../../utils/commonUtil';
import { TitleBar } from '../../../shared/TitleBar';
import { WidgetMapping } from '../../../shared/WidgetMapping';
import { fetchUserFormFields } from '../slice/userAPI';
import Message from '../../../shared/Message';
import { WButton } from '../../../shared/Widgets';

const formItemLayout = {
  labelCol: {
    xs: 24,
    sm: 10,
    md: 10,
    lg: 24,
    xxl: 8,
  },
  wrapperCol: {
    xs: 24,
    sm: 14,
    md: 14,
    lg: 24,
    xxl: 16,
  },
  labelAlign: 'left',
};

const UserForm = (props) => {
  const {
    history,
    userDetailLoading,
    userDetailPayload,
    userDetailErrors,
    addUser,
    updateUser,
    cleanUserErrors,
    cleanUserDetails,
    fetchUserUpdateRequestById,
  } = props;

  const { id } = useParams();
  const { pathname } = useLocation();

  const forceUpdate = FormBuilder.useForceUpdate();
  const screens = Grid.useBreakpoint();

  const [loading, setLoading] = useState(false);
  const [formFieldData, setFormFieldData] = useState([]);
  const [form] = Form.useForm();

  const [editMode, setEditMode] = useState(false);

  const fetchUserFormField = () => {
    setLoading(true);
    fetchUserFormFields()
      .then((res) => {
        setFormFieldData(res);
        setLoading(false);
      })
      .catch((err) => {
        message.error('error fetching user form');
        setLoading(false);
      });
  };

  useEffect(() => {
    if (pathname.endsWith('edit')) {
      setEditMode(true);
      fetchUserUpdateRequestById(id);
    } else {
      setEditMode(false);
    }
  }, []);

  useEffect(() => {
    fetchUserFormField();
    return () => {
      cleanUserDetails();
    };
  }, []);

  useEffect(() => {
    if (editMode) {
      form.setFieldsValue({ ...userDetailPayload });
    }

    return () => {};
  }, [userDetailPayload]);

  const getMeta = () => {
    let fields = formFieldData.map((item) => {
      item.label = <strong>{item.label}</strong>;
      item.formItemProps = { ...item?.formItemProps, className: 'mb-1' };

      if (item.widget === 'select') {
        return {
          ...item,
          ...WidgetMapping[item.widget],
          widgetProps: {
            ...item.widgetProps,
            allowClear: true,
            optionFilterProp: 'label',
            showSearch: true,
          },
        };
      }
      if (['switch', 'checkbox'].includes(item.widget)) {
        return {
          ...item,
          ...WidgetMapping[item.widget],
          normalize: normalizeBoolean,
        };
      }
      if (item.widget === 'upload' || item.widget === 'dynamic-minio-upload') {
        return {
          ...item,
          ...WidgetMapping[item.widget],
          widgetProps: {
            ...item.widgetProps,
            formName: 'users',
          },
        };
      }
      if (item.key === 'middle_name') {
        return {
          ...item,
          ...WidgetMapping[item.widget],
          rules: [
            {
              pattern: '^[a-zA-Z]+$',
              message: 'Invalid Middle Name',
            },
          ],
        };
      }
      if (item.key === 'last_name') {
        return {
          ...item,
          ...WidgetMapping[item.widget],
          rules: [
            {
              pattern: '^[a-zA-Z]+$',
              message: 'Invalid Last Name',
            },
            {
              min: 1,
              message: 'Last Name should be more then 1',
            },
            {
              max: 30,
              message: 'Last Name should be less then 30',
            },
          ],
        };
      }
      if (item.key === 'working_position') {
        return {
          ...item,
          ...WidgetMapping[item.widget],
          rules: [
            {
              pattern: '^[a-zA-Z]+$',
              message: 'Invalid Working Position',
            },
            {
              min: 1,
              message: 'Working Position should be more then 1',
            },
            {
              max: 30,
              message: 'Working Position should be less then 30',
            },
          ],
        };
      }
      if (item.key === 'phone_no') {
        return {
          ...item,
          ...WidgetMapping[item.widget],
          rules: [
            {
              pattern: '^[0-9]+$',
              message: 'Invalid Phone Number',
            },
          ],
        };
      }
      if (item.key === 'login_id') {
        return {
          ...item,
          ...WidgetMapping[item.widget],
          disabled: editMode,
        };
      }
      if (item.key === 'date_of_birth') {
        return {
          ...item,
          ...WidgetMapping[item.widget],
          widgetProps: {
            disabledDate: (current) => {
              const date18YrsAgo = new Date();
              date18YrsAgo.setFullYear(date18YrsAgo.getFullYear() - 18);
              return date18YrsAgo < current;
            },
            defaultPickerValue: moment().subtract(18, 'years'),
          },
        };
      }
      if (item.key === 'join_date') {
        return {
          ...item,
          ...WidgetMapping[item.widget],
          widgetProps: {
            disabledDate: (current) => {
              const dateToday = new Date();
              return dateToday < current;
            },
          },
        };
      }
      if (item.key === 'terminate_date') {
        return {
          ...item,
          ...WidgetMapping[item.widget],
          widgetProps: {
            disabledDate: (current) => {
              return moment(form.getFieldValue('join_date')) > current;
            },
          },
        };
      }
      return {
        ...item,
        ...WidgetMapping[item.widget],
      };
    });
    return {
      columns: screens.xxl ? 3 : screens.xl ? 3 : screens.lg ? 2 : screens.md ? 1 : 1,
      formItemLayout: formItemLayout,
      initialValues: {},
      fields,
    };
  };

  const onAdd = (value) => {
    addUser(value).then((res) => {
      if (res.type.endsWith('fulfilled')) {
        history.push(`/setting/users/${res.payload?.[0]?.id}`);
      }
    });
  };
  const onEdit = (value) => {
    updateUser(id, value).then((res) => {
      if (res.type.endsWith('fulfilled')) {
        history.push(`/setting/users/${res.payload?.[0]?.id}`);
      }
    });
  };

  const onFinish = (value) => {
    cleanUserErrors();
    if (!editMode) {
      onAdd(value);
      return;
    }
    if (editMode) {
      onEdit(value);
      return;
    }
  };
  return (
    <div className="container-fluid no-breadcrumb page-dashboard">
      <TitleBar
        title="Users"
        breadCrumbObject={{
          Settings: '',
          Users: '/setting/users',
          [editMode ? 'Edit' : 'Add']: '',
        }}
      />
      <Card title={<strong>{editMode ? 'Edit User' : 'Add User'}</strong>}>
        <Message error={userDetailErrors} />

        <Spin spinning={loading || userDetailLoading}>
          <Form form={form} onValuesChange={forceUpdate} colon={false} onFinish={onFinish}>
            <FormBuilder meta={getMeta()} form={form} />
            <Form.Item>
              <WButton customType="submit" htmlType={'submit'}>
                Submit
              </WButton>
              <WButton
                danger
                className="ml-2"
                htmlType={'button'}
                onClick={() => {
                  if (editMode) {
                    history.push(`/setting/users/${id}`);
                  } else {
                    history.push('/setting/users');
                  }
                }}
              >
                Cancel
              </WButton>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

export default UserForm;
