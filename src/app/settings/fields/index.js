import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import FormTabs from './containers/FormFieldsContainer';
import FormFields from './containers/AddFieldsContainer';
import Detail from './containers/DetailContainer';

import NotFound from '../../exception/containers/NotFoundContainer';
import Authorization from '../../../routes/Authorization';

const FormField = ({ match }) => (
  <Fragment>
    <Switch>
      <Authorization exact path={`${match.url}`} component={FormTabs} rights={['0']} />

      <Authorization exact path={`${match.url}/add`} component={FormFields} rights={['0']} />
      <Authorization exact path={`${match.url}/:id`} component={Detail} rights={['0']} />
      <Authorization exact path={`${match.url}/edit/:id`} component={FormFields} rights={['0']} />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default FormField;
