import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import List from './containers/ListContainer';
import AuditLogDetail from './containers/AuditLogDetailContainer';
import UserForm from './containers/UserFormContainer';
import UserDetails from './containers/DetailContainer';

import NotFound from '../../exception/containers/NotFoundContainer';
import Authorization from '../../../routes/Authorization';

const User = ({ match }) => (
  <Fragment>
    <Switch>
      <Authorization
        exact
        path={`${match.url}`}
        component={List}
        // rights={['user:list']}
        rights={['0']}
      />
      <Authorization
        path={`${match.url}/add`}
        component={UserForm}
        // rights={['user:audit:log']}
        rights={['0']}
      />
      <Authorization
        exact
        path={`${match.url}/:id`}
        component={UserDetails}
        // rights={['user:audit:log']}
        rights={['0']}
      />
      <Authorization
        exact
        path={`${match.url}/:id/edit`}
        component={UserForm}
        // rights={['user:audit:log']}
        rights={['0']}
      />
      <Authorization
        path={`${match.url}/audits/:id/detail`}
        component={AuditLogDetail}
        // rights={['user:audit:log']}
        rights={['0']}
      />

      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default User;
