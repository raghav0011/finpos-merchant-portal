import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isAllowed } from '../utils/permissionUtil';

const Authorization = ({ component: Component, rights, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        // check if route is restricted by role
        if (!isAllowed(rights)) {
          return (
            <Redirect
              to={{
                pathname: '/403',
                state: { from: props.location },
              }}
            />
          );
        }

        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
};

export default Authorization;
