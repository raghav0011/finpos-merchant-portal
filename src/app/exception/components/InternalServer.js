import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import './index.scss';

const InternalServer = () => {
  return (
    <div className="page-error">
      <div key="1">
        <div className="err-container text-center">
          <div className="err-code-container">
            <div className="err-code">
              {' '}
              <h1>500</h1>{' '}
            </div>
          </div>
          <h2>Sorry, server goes wrong.</h2>
          <Link to={'/dashboard'}>
            <Button className="btn">Go Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InternalServer;
