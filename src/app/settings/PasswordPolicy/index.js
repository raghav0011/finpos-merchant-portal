import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Authorization from '../../../routes/Authorization';

import PasswordPolicyForm from './containers/PolicyFormContainer';
import PasswordPolicyDetail from './containers/PolicyDetailContainer';

import NotFound from '../../exception/containers/NotFoundContainer';

const PasswordPolicy = ({ match }) => (
  <Fragment>
    <Switch>
      <Authorization exact path={`${match.url}`} component={PasswordPolicyForm} rights={['0']} />
      <Authorization
        path={`${match.url}/drafts`}
        component={PasswordPolicyDetail}
        rights={['0']}
      />{' '}
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default PasswordPolicy;
