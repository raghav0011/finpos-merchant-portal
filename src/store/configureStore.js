import { configureStore, createImmutableStateInvariantMiddleware } from '@reduxjs/toolkit';

import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createRootReducer from '../reducers';

const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware({
  ignoredPaths: ['ignoredPath', 'ignoredNested.one', 'ignoredNested.two'],
});

function configureStoreSetUp(history) {
  // Add middleware
  // 1. Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
  // 2. thunk middleware can also accept an extra argument to be passed to each thunk action
  // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
  // 3. routerMiddleware: Syncs the location/URL path to the state

  const middleware = [immutableInvariantMiddleware, thunk, routerMiddleware(history)];

  return configureStore({
    reducer: createRootReducer,
    middleware,
  });
}

export default configureStoreSetUp;
