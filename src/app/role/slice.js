import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

import { fetch, store, update } from '../../utils/httpUtil';

// PERMISSIONS
export const fetchPermission = createAsyncThunk('permission/fetch', (_, { rejectWithValue }) => {
  return fetch(`auths/v1/roles/permissions/bank`)
    .then((response) => {
      if (response.data.message === 'SUCCESS') {
        return response.data.data;
      }
    })
    .catch((error) => rejectWithValue(error?.response?.data || error));
});

export const permissionSlice = createSlice({
  name: 'permission',
  initialState: {
    payload: [],
    loading: false,
    errors: {},
  },
  reducers: {
    cleanPermission(state) {
      state.payload = [];
      state.loading = false;
      state.errors = {};
    },
  },
  extraReducers: {
    [fetchPermission.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchPermission.fulfilled]: (state, action) => {
      state.payload = action.payload;
      state.loading = false;
      state.errors = {};
    },
    [fetchPermission.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
  },
});

// ROLES
// 1
export const fetchRoleWithCriteria = createAsyncThunk(
  'role/criteria',
  (formData = {}, { rejectWithValue }) => {
    return store('auths/v1/roles/dynamic-search', formData)
      .then((response) => {
        if (response.data.message === 'SUCCESS') {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error?.response?.data || error));
  },
);
// 2
export const fetchRole = createAsyncThunk('role', (_, { rejectWithValue }) => {
  return store(`auths/v1/roles`)
    .then((response) => {
      if (response.data.message === 'SUCCESS') {
        return response.data.data;
      } else {
        // TODO
      }
    })
    .catch((error) => rejectWithValue(error?.response?.data || error));
});
// 3
export const fetchRoleByIdentifier = createAsyncThunk(
  'role/identifier',
  (identifier, { rejectWithValue }) => {
    return fetch(`auths/v1/roles/${identifier}`)
      .then((response) => {
        if (response.data.message === 'SUCCESS') {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error?.response?.data || error));
  },
);

// 4
export const fetchDraftRoleWithCriteria = createAsyncThunk(
  'role/draft/criteria',
  (formData = {}, { rejectWithValue }) => {
    return store('auths/v1/roles/draft', formData)
      .then((response) => {
        if (response.data.message === 'SUCCESS') {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error?.response?.data || error));
  },
);

// 5
export const fetchRoleAuditLogWithCriteria = createAsyncThunk(
  'role/auditlog/criteria',
  (formData = {}, { rejectWithValue }) => {
    return store('auths/v1/roles/search/audits', formData)
      .then((response) => {
        if (response.data.message === 'SUCCESS') {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error?.response?.data || error));
  },
);

// 6
export const fetchRoleAuditLogByIdentifier = createAsyncThunk(
  'role/auditlog/identifier',
  (identifier, { rejectWithValue }) => {
    return fetch(`auths/v1/roles/search/audits/${identifier}`)
      .then((response) => {
        if (response.data.message === 'SUCCESS') {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error?.response?.data || error));
  },
);

// 7
export const fetchDraftRoleByIdentifier = createAsyncThunk(
  'role/draftrole/identifier',
  (identifier, { rejectWithValue }) => {
    return fetch(`auths/v1/roles/draft/detail/${identifier}`)
      .then((response) => {
        if (response.data.message === 'SUCCESS') {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error?.response?.data || error));
  },
);
// 8
export const addRole = createAsyncThunk('role/add', (formData, { dispatch, rejectWithValue }) => {
  return store('auths/v1/roles', formData)
    .then((response) => {
      if (response.data.message === 'SUCCESS') {
        message.success('Request added in draft. Please wait for verification.');
        // dispatch(push('/roles'));
        return response.data.data;
      } else {
        // TODO
      }
    })
    .catch((error) => rejectWithValue(error?.response?.data || error));
});

// 9

export const updateRole = createAsyncThunk(
  'role/update',
  (formData, { dispatch, rejectWithValue }) => {
    return update('auths/v1/roles', formData)
      .then((response) => {
        if (response.data.message === 'SUCCESS') {
          message.success('Request added in draft. Please wait for verification.');
          // dispatch(push('/roles'));
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error?.response?.data || error));
  },
);

// 10
export const approveRoleChanges = createAsyncThunk(
  'role/approve',
  (formData, { dispatch, rejectWithValue }) => {
    return store('auths/v1/roles/approve', formData)
      .then((response) => {
        if (response.data.message === 'SUCCESS') {
          message.success('Request has been approved successfully.');
          // dispatch(push('/roles/drafts'));
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error?.response?.data || error));
  },
);

// 11
export const rejectRoleChanges = createAsyncThunk(
  'role/reject',
  (formData, { dispatch, rejectWithValue }) => {
    return store('auths/v1/roles/reject', formData)
      .then((response) => {
        if (response.data.message === 'SUCCESS') {
          message.success('Request has been rejected.');
          // dispatch(push('/roles/drafts'));
          return response;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error?.response?.data || error));
  },
);

const rolesPendingList = [
  'role/criteria/pending',
  'role/pending',
  'role/draft/criteria/pending',
  'role/auditlog/criteria/pending',
  'role/auditlog/identifier/pending',
  'role/draftrole/identifier/pending',
  'role/add/pending',
  'role/update/pending',
  'role/approve/pending',
  'role/reject/pending',
];

const roleDetailsPendingList = ['role/identifier/pending'];
const roleDetailsFulfilledList = ['role/identifier/fulfilled'];
const roleDetailsRejectedList = ['role/identifier/rejected'];

const defaultFulfilledList = [
  'role/add/fulfilled',
  'role/update/fulfilled',
  'role/approve/fulfilled',
  'role/reject/fulfilled',
];

const arrayResponseFulfilledTypeList = [
  'role/criteria/fulfilled',
  'role/fulfilled',
  'role/draft/criteria/fulfilled',
  'role/auditlog/criteria/fulfilled',
];

const detailResponseFulfilledTypeList = [
  'role/auditlog/identifier/fulfilled',
  'role/draftrole/identifier/fulfilled',
];

const rejectedList = [
  'role/criteria/rejected',
  'role/rejected',
  'role/draft/criteria/rejected',
  'role/auditlog/criteria/rejected',
  'role/auditlog/identifier/rejected',
  'role/draftrole/identifier/rejected',
  'role/add/rejected',
  'role/update/rejected',
  'role/approve/rejected',
  'role/reject/rejected',
];

export const roleSlice = createSlice({
  name: 'role',
  initialState: {
    payload: [],
    detailsPayload: [],
    loading: false,
    detailsLoading: false,
    errors: {},
    detailsErrors: {},
    pagination: {},
  },
  reducers: {
    cleanRole(state) {
      state.payload = [];
      state.loading = false;
      state.errors = {};
      state.pagination = {
        current: 0,
        pageSize: 0,
        total: 0,
        totalPage: 0,
      };
    },
    cleanRoleDetails(state) {
      state.detailsPayload = [];
      state.detailsLoading = false;
      state.detailsErrors = {};
      state.pagination = {
        current: 0,
        pageSize: 0,
        total: 0,
        totalPage: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder

    //   use addCase for unique case
    // .addCase(uniquecase.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.payload = action.payload;
    //   state.errors = {};
    //   state.pagination = {
    //     current: action.payload.currentPage,
    //     pageSize: action.payload.pageSize,
    //     total: action.payload.totalRecord,
    //     totalPage: action.payload.totalPage,
    //     showSizeChanger: true,
    //   };
    // })
      .addMatcher(
        (action) => roleDetailsPendingList.includes(action.type),
        (state, action) => {
          state.loading = true;
        },
      )
      .addMatcher(
        (action) => roleDetailsFulfilledList.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.detailsPayload = action.payload;
          state.errors = {};
        },
      )
      .addMatcher(
        (action) => roleDetailsRejectedList.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.detailsErrors = action.payload;
        },
      )
      .addMatcher(
        (action) => rolesPendingList.includes(action.type),
        (state, action) => {
          state.loading = true;
        },
      )
      .addMatcher(
        (action) => defaultFulfilledList.includes(action.type),
        (state, action) => {
          state.loading = false;
        },
      )
      .addMatcher(
        (action) => arrayResponseFulfilledTypeList.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.payload = action.payload;
          state.errors = {};
          state.pagination = {
            current: action.payload.currentPage,
            pageSize: action.payload.pageSize,
            total: action.payload.totalRecord,
            totalPage: action.payload.totalPage,
            showSizeChanger: true,
          };
        },
      )

      .addMatcher(
        (action) => detailResponseFulfilledTypeList.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.payload = action.payload;
          state.errors = {};
        },
      )
      .addMatcher(
        (action) => rejectedList.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.errors = action.payload;
        },
      );
  },
});

// ROLEFILTERFIELD
// 12
export const fetchRoleFilterField = createAsyncThunk(
  'role/filterfield',
  (_, { rejectWithValue }) => {
    return fetch('auths/v1/roles/fields')
      .then((response) => {
        if (response.data.message === 'SUCCESS') {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error?.response?.data || error));
  },
);
// 13
export const fetchRoleAuditLogFilterField = createAsyncThunk(
  'role/auditLog/filterfield',
  (_, { rejectWithValue }) => {
    return fetch('auths/v1/roles/fields/audit')
      .then((response) => {
        if (response.data.message === 'SUCCESS') {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error?.response?.data || error));
  },
);

export const roleFilterFieldSlice = createSlice({
  name: 'roleFilterField',
  initialState: {
    payload: [],
    loading: false,
    errors: {},
    pagination: {},
  },
  extraReducers: {
    // 12
    [fetchRoleFilterField.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchRoleFilterField.fulfilled]: (state, action) => {
      state.loading = false;
      state.payload = action.payload;
      state.errors = {};
    },
    [fetchRoleFilterField.rejected]: (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    },

    // 13
    [fetchRoleAuditLogFilterField.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchRoleAuditLogFilterField.fulfilled]: (state, action) => {
      state.loading = false;
      state.payload = action.payload;
      state.errors = {};
    },
    [fetchRoleAuditLogFilterField.rejected]: (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    },
  },
  reducers: {
    cleanRoleFilterField(state) {
      state.payload = [];
      state.loading = false;
      state.errors = {};
    },
  },
});

export const { cleanPermission } = permissionSlice.actions;
export const { cleanRole, cleanRoleDetails } = roleSlice.actions;
export const { cleanRoleFilterField } = roleFilterFieldSlice.actions;
export default roleSlice;
