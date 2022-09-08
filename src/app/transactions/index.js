import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import List from './containers/ListContainer';

import NotFound from '../exception/containers/NotFoundContainer';

const Transaction = ({ match }) => (
  <Fragment>
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        component={List}
        // rights={['role:list']}
      />

      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default Transaction;
