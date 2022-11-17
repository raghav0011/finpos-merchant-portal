import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router';

import NotFound from '../exception/containers/NotFoundContainer';
import OperationManualContainer from './containers/OperationManualContainer';

const Profile = ({ match }) => (
  <Fragment>
    <Switch>
      <Route exact path={`${match.url}/operationManual`} component={OperationManualContainer} />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default Profile;
