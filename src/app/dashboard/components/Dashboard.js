import React from 'react';

import NumberCards from './NumberCards';
import TransactionList from './TransactionList';

import { TitleBar } from '../../shared/TitleBar';
import QueueAnim from 'rc-queue-anim';

const Dashboard = (props) => (
  <div className="container-fluid no-breadcrumb page-dashboard">
    <QueueAnim type="right" className="ui-animate">
      <h4 className="article-title mb-2">Dashboard</h4>

      <div key="1">
        {' '}
        <NumberCards {...props} />{' '}
      </div>

      <div key="2">
        <h4 className="article-title mb-2" style={{ marginTop: 20 }}>
          Recent Transactions
        </h4>
        <TransactionList {...props} />{' '}
      </div>
    </QueueAnim>
  </div>
);

export default Dashboard;
