import React, { Fragment } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';

// Import custom components
import PrivateRoute from '../routes/PrivateRoute';
import RestrictRoute from '../routes/RestrictRoute';

const AsyncAppLayout = loadable(() => import('../layout/main'));
const AsyncAppStaticLayout = loadable(() => import('../layout/main/ContentOnly'));

const AsyncNotFound = loadable(() => import('./exception/containers/NotFoundContainer'));
const AsyncForbidden = loadable(() => import('./exception/containers/ForbiddenContainer'));
const AsyncInternalServer = loadable(() =>
  import('./exception/containers/InternalServerContainer')
);

const AsyncLoginForm = loadable(() => import('./auth/containers/LoginContainer'));
const AsyncOtpForm = loadable(() => import('./auth/containers/OtpContainer'));
const AsyncResetForm = loadable(() => import('./auth/containers/ResetContainer'));
const AsyncResetPasswordForm = loadable(() => import('./auth/containers/ResetPasswordContainer'));

const AsyncDashboard = loadable(() => import('./dashboard/'));
const AsyncPasswordPolicy = loadable(() => import('./settings/PasswordPolicy'));
const AsyncRole = loadable(() => import('./role/'));
const AsyncUser = loadable(() => import('./settings/users/'));
const AsyncUserManagement = loadable(() => import('./userManagement'));
const AsyncFormFields = loadable(() => import('./settings/fields/'));
const AsyncProfile = loadable(() => import('./profile/'));
const AsyncSupport = loadable(() => import('./support/'));

const AsyncTransaction = loadable(() => import('./transactions/'));

const App = () => (
  <Fragment>
    <Switch>
      <RestrictRoute exact path="/" layout={AsyncAppStaticLayout} component={AsyncLoginForm} />
      <RestrictRoute exact path="/otp" layout={AsyncAppStaticLayout} component={AsyncOtpForm} />
      <RestrictRoute path="/reset" layout={AsyncAppStaticLayout} component={AsyncResetForm} />
      <Route
        path="/reset-password/:id"
        layout={AsyncAppStaticLayout}
        component={AsyncResetPasswordForm}
      />

      <PrivateRoute path="/dashboard" layout={AsyncAppLayout} component={AsyncDashboard} />
      <PrivateRoute path="/roles" layout={AsyncAppLayout} component={AsyncRole} />
      <PrivateRoute path="/setting/users" layout={AsyncAppLayout} component={AsyncUser} />
      <PrivateRoute
        path="/usersManagement"
        layout={AsyncAppLayout}
        component={AsyncUserManagement}
      />

      <PrivateRoute path="/profile" layout={AsyncAppLayout} component={AsyncProfile} />
      <PrivateRoute path="/support" layout={AsyncAppLayout} component={AsyncSupport} />
      <PrivateRoute
        path="/setting/password-policy"
        layout={AsyncAppLayout}
        component={AsyncPasswordPolicy}
      />

      <PrivateRoute path="/transactions" layout={AsyncAppLayout} component={AsyncTransaction} />

      <PrivateRoute path="/403" layout={AsyncAppLayout} component={AsyncForbidden} />
      <Route path="/500" component={AsyncInternalServer} />
      <Route path="/404" component={AsyncNotFound} />
      <Route component={AsyncNotFound} />
    </Switch>
  </Fragment>
);

export default withRouter(App);
