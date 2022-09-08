import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

// 3rd
import '@styles/antd.less';
import '@styles/bootstrap/bootstrap.scss';
// custom
import '@styles/layout.scss';
import '@styles/theme.scss';
import '@styles/ui.scss';
import '@styles/vendors.scss';
import '@styles/themes/normalize.css';

import history from './utils/history';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';
import App from './app/App';
import { AuthProvider } from './app/shared/Context/Auth';

import './i18n';

const store = configureStore({}, history);
const mountNode = document.getElementById('root');

render(
  <Suspense fallback={<div className="loader-container">Error! Please refresh the page</div>}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router basename={process.env.PUBLIC_URL} history={history}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Router>
      </ConnectedRouter>
    </Provider>
  </Suspense>,
  mountNode
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
