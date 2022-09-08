import React, { useState, useEffect } from 'react';
import { Card, Image, message } from 'antd';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';

import { TitleBar } from '../../../shared/TitleBar';
import Message from '../../../shared/Message';
import { WButton, WDetailDisplay } from '../../../shared/Widgets';
import { fetchUserFormFields } from '../slice/userAPI';

const UserDetail = (props) => {
  const {
    history,
    userDetailLoading,
    userDetailPayload,
    userDetailErrors,

    cleanUserDetails,
    fetchUserByIdentifier,
  } = props;
  const { id } = useParams();

  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    fetchUserFormFields()
      .then((res) => {
        setFormFields(res);
      })
      .catch((err) => {
        message.error('Error fetching frm Fields');
      });

    fetchUserByIdentifier(id);
    return () => {
      cleanUserDetails();
    };
  }, []);

  const getDataSource = () => {
    if (isEmpty(userDetailPayload)) return {};

    const dataSource = Object.entries(userDetailPayload)
      .filter(([key]) => !['id', 'full_name'].includes(key))
      .map(([key, value]) => {
        if (key === 'profile_picture') {
          return {
            label: 'Profile Picture',
            value: <Image src={value} height={50} />,
          };
        }
        if (key === 'current_status') {
          return {
            label: 'Current Status',
            value: value ? 'Active' : 'Inactive',
          };
        }

        return {
          value: value || '-',
          label: formFields.find((item) => item.key === key)?.label || key.split('_').join(' '),
        };
      });
    return dataSource;
  };

  const detailProps = {
    dataSource: getDataSource(),
    title: userDetailPayload?.['full_name'] || null,
    loading: userDetailLoading,
    column: { xxl: 4, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 },
    extraTitleContent: (
      <WButton
        customType="edit"
        onClick={() => {
          history.push(`/setting/users/${id}/edit`);
        }}
      >
        Edit User
      </WButton>
    ),
  };
  return (
    <div className="container-fluid no-breadcrumb page-dashboard">
      <TitleBar
        title="User Detail"
        breadCrumbObject={{
          Settings: '',
          Users: '/setting/users',
          Detail: '',
        }}
      />
      <Card className="mt-2">
        <Message error={userDetailErrors} />
        <WDetailDisplay {...detailProps} />
      </Card>
    </div>
  );
};

export default UserDetail;
