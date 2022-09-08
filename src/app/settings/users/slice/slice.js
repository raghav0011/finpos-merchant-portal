import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';

import { store, fetch, update } from '../../../../utils/httpUtil';
import { clearLocalStorage, getLocalStorage, setLocalStorage } from '../../../../utils/storageUtil';
import {
  JWT_TOKEN,
  USER_FULL_NAME,
  PERMISSION_KEY,
  LANGUAGE_KEY,
  ENFORCE_PASSWORD_CHANGE,
  LOGGED_IN_USER,
  LOGGED_IN_USER_ID,
  LOGGED_IN_USER_IMAGE,
} from '../../../../constants';

import { updateUiHeader } from '../../../../layout/duck/actions';

export const fetchUser = createAsyncThunk('user', (formData = {}, { rejectWithValue }) => {
  return store('config/v1/users/search', formData)
    .then((response) => {
      if (response.data.success) {
        return response.data.data;
      } else {
        // TODO
      }
    })
    .catch((error) => rejectWithValue(error.response.data));
});

export const fetchUserByIdentifier = createAsyncThunk(
  'user/detail',
  (identifier, { rejectWithValue }) => {
    return fetch(`config/v1/users/${identifier}`)
      .then((response) => {
        if (response.data.success) {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const fetchUserAuditLogByIdentifier = createAsyncThunk(
  'user/audit/detail',
  (id, { rejectWithValue }) => {
    return fetch(`config/v1/users/search/audits/${id}`)
      .then((response) => {
        if (response.data.success) {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const fetchUserAuditLogWithCriteria = createAsyncThunk(
  'user/audit',
  (formData = {}, { rejectWithValue }) => {
    return store('config/v1/users/search/audits', formData)
      .then((response) => {
        if (response.data.success) {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const addUser = createAsyncThunk('user/add', (formData, { dispatch, rejectWithValue }) => {
  return store(`config/v1/users`, formData)
    .then((response) => {
      if (response.data.success) {
        message.success('User Added Successfully.');
        return response.data.data;
      } else {
        // TODO
      }
    })
    .catch((error) => {
      return rejectWithValue(error.response.data);
    });
});

export const updateUser = createAsyncThunk(
  'user/update',
  (formData, { dispatch, rejectWithValue }) => {
    return update(`config/v1/users/${formData.id}`, formData.formData)
      .then((response) => {
        if (response.data.success) {
          message.success('user updated.');
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => {
        return rejectWithValue(error.response.data);
      });
  }
);

export const updatePassword = createAsyncThunk(
  'user/update/password',
  (formData, { dispatch, rejectWithValue }) => {
    return update(
      `config/v1/users/${getLocalStorage(LOGGED_IN_USER_ID)}/update-password `,
      formData
    )
      .then((response) => {
        if (response.data.success) {
          clearLocalStorage(JWT_TOKEN);
          // clearLocalStorage(PERMISSION_KEY);
          clearLocalStorage(USER_FULL_NAME);
          clearLocalStorage(LOGGED_IN_USER);
          clearLocalStorage(USER_FULL_NAME);
          clearLocalStorage(LOGGED_IN_USER_ID);

          return response.data.data;
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const resetPassword = createAsyncThunk(
  'user/reset/password',
  (formData, { dispatch, rejectWithValue }) => {
    return store(`auths/v1/users/password/change `, formData)
      .then((response) => {
        if (response.data.message === 'SUCCESS') {
          clearLocalStorage(JWT_TOKEN);
          clearLocalStorage(PERMISSION_KEY);
          clearLocalStorage(USER_FULL_NAME);
          clearLocalStorage(LANGUAGE_KEY);
          clearLocalStorage(ENFORCE_PASSWORD_CHANGE);
          // dispatch(push('/'));
          return response.data.data;
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const fetchUserProfile = createAsyncThunk('user/profile', (id, { rejectWithValue }) => {
  return fetch(`config/v1/users/${id}`)
    .then((response) => {
      if (response.data.success) {
        return response.data.data;
      } else {
        // TODO
      }
    })
    .catch((error) => rejectWithValue(error.response.data));
});

// Send user data update request and return data for user update (locked data)[prevent multiple updates at the same time]
export const fetchUserUpdateRequestById = createAsyncThunk(
  'user/update/detail',
  (identifier, { rejectWithValue }) => {
    return fetch(`config/v1/users/${identifier}/update-request`)
      .then((response) => {
        if (response.data.success) {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

// Send profile data update request and return data for profile update (locked data)[prevent multiple updates at the same time]
export const fetchProfileUpdateRequestById = createAsyncThunk(
  'user/profile/update/detail',
  (id, { rejectWithValue }) => {
    return fetch(`config/v1/users/${id}/profile-update-request`)
      .then((response) => {
        if (response.data.success) {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const updateProfile = createAsyncThunk(
  'user/Profile',
  (formData, { dispatch, rejectWithValue }) => {
    return update(`config/v1/users/${formData.id}/profile`, formData.formData)
      .then((response) => {
        if (response.data.success) {
          dispatch(
            updateUiHeader(
              response.data.data?.[0]?.full_name,
              response.data.data?.[0]?.profile_picture
            )
          );
          setLocalStorage(USER_FULL_NAME, response.data.data?.[0]?.full_name);
          setLocalStorage(LOGGED_IN_USER_IMAGE, response.data.data?.[0]?.profile_picture);
          message.success('Profile updated.');
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => {
        return rejectWithValue(error.response.data);
      });
  }
);

const usersPendingList = [
  'user/pending',
  'user/audit/pending',
  'user/update/password/pending',
  'user/reset/password/pending',
];

const userDetailPendingList = [
  'user/detail/pending',
  'user/audit/detail/pending',
  'user/add/pending',
  'user/update/pending',
  'user/profile/pending',
  'user/update/detail/pending',
  'user/profile/update/detail/pending',
  'user/Profile/pending',
];

const usersRejectedList = [
  'user/rejected',
  'user/audit/rejected',
  'user/update/password/rejected',
  'user/reset/password/rejected',
];

const userDetailRejectedList = [
  'user/detail/rejected',
  'user/audit/detail/rejected',
  'user/add/rejected',
  'user/update/rejected',
  'user/profile/rejected',
  'user/update/detail/rejected',
  'user/profile/update/detail/rejected',
  'user/Profile/rejected',
];

const genericUserResponseFulfilled = [
  'user/add/fulfilled',
  'user/update/fulfilled',
  'user/update/password/fulfilled',
  'user/reset/password/fulfilled',
  'user/Profile/fulfilled',
];

const arrayUserResponseFulfilled = ['user/fulfilled', 'user/audit/fulfilled'];

const detailUserResponseFulfilledList = [
  'user/detail/fulfilled',
  'user/profile/fulfilled',
  'user/audit/detail/fulfilled',
  'user/update/detail/fulfilled',
  'user/profile/update/detail/fulfilled',
];

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    detailPayload: {},
    payload: [],
    loading: false,
    detailLoading: false,
    errors: {},
    detailErrors: {},
    pagination: {},
  },
  reducers: {
    cleanUser(state) {
      state.loading = false;
      state.detailLoading = false;
      state.detailPayload = [];
      state.payload = [];
      state.errors = {};
      state.detailErrors = {};
      state.pagination = {
        current: 0,
        pageSize: 0,
        total: 0,
        totalPage: 0,
      };
    },

    cleanUserDetails(state) {
      state.detailLoading = false;
      state.detailPayload = [];
      state.detailErrors = {};
    },

    cleanUserErrors(state) {
      state.loading = false;
      state.detailLoading = false;
      state.errors = {};
      state.detailErrors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => usersPendingList.includes(action.type),
        (state, action) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => userDetailPendingList.includes(action.type),
        (state, action) => {
          state.detailLoading = true;
        }
      )
      .addMatcher(
        (action) => usersRejectedList.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.errors = action.payload;
        }
      )
      .addMatcher(
        (action) => userDetailRejectedList.includes(action.type),
        (state, action) => {
          state.detailLoading = false;
          state.detailErrors = action.payload;
        }
      )
      .addMatcher(
        (action) => genericUserResponseFulfilled.includes(action.type),
        (state, action) => {
          state.detailLoading = false;
        }
      )
      .addMatcher(
        (action) => arrayUserResponseFulfilled.includes(action.type),
        (state, action) => {
          state.loading = false;
          state.payload = action.payload.data;
          state.errors = {};
          state.pagination = {
            current: action.payload?.pagination?.page_number,
            pageSize: action.payload?.pagination?.page_size,
            total: action.payload?.pagination?.total_records,
            totalPage: action.payload?.pagination?.total_pages,
            showSizeChanger: true,
          };
        }
      )
      .addMatcher(
        (action) => detailUserResponseFulfilledList.includes(action.type),
        (state, action) => {
          state.detailLoading = false;
          state.detailPayload = action.payload?.[0];
          state.detailErrors = {};
        }
      );
  },
});

// user form field
export const fetchUserFormFields = createAsyncThunk('user/formFields', (_, { rejectWithValue }) => {
  return fetch(`config/v1/users/form-fields`)
    .then((response) => {
      if (response.data.success) {
        return response.data.data;
      } else {
        // TODO
      }
    })
    .catch((error) => rejectWithValue(error.response.data));
});

// user profile edit form field
export const fetchUserProfileEditFormFields = createAsyncThunk(
  'user/profile/formFields',
  (_, { rejectWithValue }) => {
    return fetch(`config/v1/users/profile-form-fields`)
      .then((response) => {
        if (response.data.success) {
          return response.data.data;
        } else {
          // TODO
        }
      })
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const userFormFieldSlice = createSlice({
  name: 'userFormFields',
  initialState: {
    payload: [],
    loading: false,
    errors: {},
  },
  reducers: {
    cleanUserFormFields(state) {
      state.loading = false;
      state.payload = [];
      state.errors = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          ['user/formFields/pending', 'user/profile/formFields/pending'].includes(action.type),
        (state, action) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) =>
          ['user/formFields/fulfilled', 'user/profile/formFields/fulfilled'].includes(action.type),
        (state, action) => {
          state.loading = false;
          state.payload = action.payload;
          state.errors = {};
        }
      )

      .addMatcher(
        (action) =>
          ['user/formFields/rejected', 'user/profile/formFields/rejected'].includes(action.type),
        (state, action) => {
          state.loading = false;
          state.errors = action.payload;
        }
      );
  },
});

export const { cleanUserFormFields } = userFormFieldSlice.actions;

export const { cleanUser, cleanUserErrors, cleanUserDetails } = userSlice.actions;

export default userSlice;
