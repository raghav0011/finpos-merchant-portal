import React, { Fragment } from 'react';
import { Alert } from 'antd';

import { isEmpty } from 'lodash';
const ErrorMessage = ({ error }) => {
  let message = (
    <div>
      <h6>{error?.message || error || 'Something Went Wrong'}</h6>
      {!isEmpty(error?.details) && (
        <ul style={{ display: 'grid', placeContent: 'center' }}>
          {error.details instanceof Array &&
            error.details.map((item, index) => {
              return <li key={index}>{item.message}</li>;
            })}
        </ul>
      )}
    </div>
  );

  return (
    <Fragment>
      {!isEmpty(error) && (
        <div style={{ textAlign: 'center', paddingBottom: '10px' }}>
          <Alert showIcon={false} message={message} type="error" />
        </div>
      )}
    </Fragment>
  );
};

export default ErrorMessage;
