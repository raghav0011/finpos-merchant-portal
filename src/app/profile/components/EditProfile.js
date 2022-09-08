import React, { useEffect, useState } from 'react';
import { Card, Form, Spin, Row, Col, message } from 'antd';
import FormBuilder from 'antd-form-builder';

import Message from '../../shared/Message';
import { getLocalStorage } from '../../../utils/storageUtil';
import { LOGGED_IN_USER_ID } from '../../../constants';
import { WButton } from '../../shared/Widgets';
import { WidgetMapping } from '../../shared/WidgetMapping';

import { fetchUserProfileEditFormFields } from '../../settings/users/slice/userAPI';

const EditProfile = (props) => {
  const forceUpdate = FormBuilder.useForceUpdate();

  const [form] = Form.useForm();

  const {
    history,

    fetchProfileUpdateRequestById,
    updateProfile,
    cleanUserDetails,

    userDetails,
    userDetailsErrors,
    userDetailsLoading,
  } = props;

  const [loading, setLoading] = useState(false);
  const [formFieldData, setFormFieldData] = useState([]);

  useEffect(() => {
    const callApis = async () => {
      try {
        await fetchProfileUpdateRequestById(getLocalStorage(LOGGED_IN_USER_ID));
        setLoading(true);
        let res = await fetchUserProfileEditFormFields();
        setFormFieldData(res);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        message.error('Error fetching form');
      }
    };

    callApis();
    return () => {
      cleanUserDetails();
    };
  }, []);

  useEffect(() => {
    form.setFieldsValue({ ...userDetails });

    return () => {};
  }, [userDetails]);

  const meta = () => {
    const fields =
      formFieldData instanceof Array &&
      formFieldData.map((item) => {
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
        return {
          ...item,
          ...WidgetMapping[item.widget],
          widgetProps: {
            ...item.widgetProps,
            style: { width: '100%' },
          },
          formItemProps: {
            ...item.formItemProps,
            className: `mb-3`,
          },
        };
      });

    return {
      fields,
      columns: 1,
      formItemLayout: {
        labelCol: { xs: 24, sm: 24, lg: 8, xl: 6 },
        wrapperCol: { xs: 24, sm: 24, lg: 16, xl: 18 },
      },
    };
  };

  const uploadHandler = (values) => {
    updateProfile(getLocalStorage(LOGGED_IN_USER_ID), values).then((res) => {
      if (res.type.endsWith('fulfilled')) {
        history.push('/profile');
      }
    });
  };

  return (
    <div className="container-fluid no-breadcrumb page-dashboard ">
      <div className="article__section">
        <article className="article">
          <Card title={<strong>Update Profile</strong>}>
            <Spin spinning={loading || userDetailsLoading}>
              {userDetailsErrors && <Message error={userDetailsErrors} />}

              <Row>
                <Col xs={24} sm={24} lg={20} xl={16}>
                  <Form
                    form={form}
                    className=""
                    onFinish={uploadHandler}
                    onValuesChange={forceUpdate}
                  >
                    <FormBuilder meta={meta()} form={form} />

                    <Row>
                      <Col xs={24}>
                        <Form.Item noStyle>
                          <WButton
                            customType="edit"
                            htmlType="submit"
                            className="mr-2"
                            loading={userDetailsLoading}
                          >
                            Update
                          </WButton>
                        </Form.Item>
                        <Form.Item noStyle className="">
                          <WButton
                            customType="cancel"
                            htmlType="button"
                            danger
                            onClick={() => history.push('/profile')}
                          >
                            Cancel
                          </WButton>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Col>{' '}
              </Row>
            </Spin>
          </Card>
        </article>
      </div>
    </div>
  );
};

export default EditProfile;
