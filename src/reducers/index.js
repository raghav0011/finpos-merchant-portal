import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './../utils/history';

import uiReducer, { headerProfileReducer } from '../layout/duck/uiReducer';

// import userSlice, { userFormFieldSlice } from '../app/settings/users/slice/slice';

// import { roleSlice, roleFilterFieldSlice, permissionSlice } from '../app/role/slice';
import passwordPolicySlice from '../app/settings/PasswordPolicy/slice';

import { transactionSlice } from '../app/transactions/slice/transactionSlice';

import dashboardSlice from '../app/dashboard/slice/dashboardSlice';

import dashboardSummarySlice from '../app/dashboard/slice/dashboardSummarySlice';

import { branchSlice } from '../app/userManagement/slice/branchSlice';
import { userSlice } from '../app/userManagement/slice/userSlice';
import { roleSlice } from '../app/userManagement/slice/roleSlice';
import { permissionSlice as rolePermissionSlice } from '../app/userManagement/slice/permissionSlice';

const rootReducer = combineReducers({
  router: connectRouter(history),
  ui: uiReducer,
  uiHeaderData: headerProfileReducer,
  roles: roleSlice.reducer,
  users: userSlice.reducer,
  branches: branchSlice.reducer,

  permissions: rolePermissionSlice.reducer,
  // userFormFields: userFormFieldSlice.reducer,
  // permissions: permissionSlice.reducer,
  dashboard: dashboardSlice.reducer,
  // roleFilterFields: roleFilterFieldSlice.reducer,
  passwordPolicies: passwordPolicySlice.reducer,

  transactions: transactionSlice.reducer,
  summary: dashboardSummarySlice.reducer,
});

export default rootReducer;
