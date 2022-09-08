import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import './index.scss';

const Forbidden = () => {
  return (
    <div className="page-error">
      <div key="1">
        <div className="err-container text-center">
          <div className="err-code-container">
            <div className="err-code">
              {' '}
              <h1>403</h1>{' '}
            </div>
          </div>
          <h2>Sorry, you don't have permission to access this page.</h2>
          <Link to={'/dashboard'}>
            <Button className="btn">Go Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
