import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import List from './containers/ListContainer';

import NotFound from '../../exception/containers/NotFoundContainer';
import Authorization from '../../../routes/Authorization';

const Masters = ({ match }) => (
  <Fragment>
    <Switch>
      <Authorization exact path={`${match.url}`} component={List} rights={['0']} />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default Masters;
