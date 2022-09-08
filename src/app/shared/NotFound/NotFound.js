import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {} from 'antd';

const NotFound = ({ message, controlProps }) => {
  return (
    <div className="text-center m-4 p-4">
      <ExclamationCircleOutlined style={{ fontSize: 100, color: 'red' }} />
      <p className="p-3" style={{ fontSize: 20, color: 'red' }}>
        {message || 'DATA NOT FOUND'}
      </p>
      <div>{controlProps || null}</div>
    </div>
  );
};

export default NotFound;
