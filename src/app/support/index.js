import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router';

import NotFound from '../exception/containers/NotFoundContainer';
import Manual from './containers/ManualContainer';

const Profile = ({ match }) => (
  <Fragment>
    <Switch>
      <Route exact path={`${match.url}/`} component={Manual} />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default Profile;
