import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router';

import Detail from './containers/DetailContainer';
import ChangePassword from './containers/ChangePasswordContainer';
import EditProfile from './containers/EditProfileContainer';
import Authorization from '../../routes/Authorization';

import NotFound from '../exception/containers/NotFoundContainer';

const Profile = ({ match }) => (
  <Fragment>
    <Switch>
      <Route exact path={`${match.url}`} component={Detail} rights={['0']} />
      <Route
        exact
        path={`${match.url}/change-password`}
        component={ChangePassword}
        rights={['0']}
      />
      <Route exact path={`${match.url}/edit-profile`} component={EditProfile} rights={['0']} />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default Profile;
