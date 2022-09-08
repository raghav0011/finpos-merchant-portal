import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Authorization from '../../routes/Authorization';

import List from './containers/ListContainer';
import DraftDetail from './containers/DraftDetailContainer';
import AuditLogDetail from './containers/AuditLogDetailContainer';

import NotFound from '../exception/containers/NotFoundContainer';

const Role = ({ match }) => (
  <Fragment>
    <Switch>
      <Authorization exact path={`${match.url}`} component={List} rights={['0']} />

      <Authorization
        path={`${match.url}/drafts/:id/detail`}
        component={DraftDetail}
        rights={['0']}
      />

      <Authorization
        path={`${match.url}/audits/:id/detail`}
        component={AuditLogDetail}
        rights={['0']}
      />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default Role;
