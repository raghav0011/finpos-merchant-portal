import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ChangePassword from '../../profile/components/ChangePassword';
import * as userSlice from '../../settings/users/slice/slice';
import * as passwordPolicySlice from '../../settings/PasswordPolicy/slice';

export const ChangePasswordContainer = (props) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.users.detailPayload);
  const userDetailsErrors = useSelector((state) => state.users.detailErrors);
  const userDetailsLoading = useSelector((state) => (state) => state.users.loading);

  const passwordPolicies = useSelector((state) => state.passwordPolicies.payload);
  const passwordErrors = useSelector((state) => state.passwordPolicies.errors);
  const passwordLoading = useSelector((state) => state.passwordPolicies.loading);

  props = {
    ...props,
    passwordPolicies,
    passwordErrors,
    passwordLoading,
    users: userDetails,
    userErrors: userDetailsErrors,
    userLoading: userDetailsLoading,
  };

  /**
   * Fetch user records.
   *
   */
  const fetchUserProfile = (id) => {
    dispatch(userSlice.fetchUserProfile(id));
  };

  /**
   * Update user password records.
   * @param {object} formData
   *
   */
  const updatePassword = (formData) => {
    return dispatch(userSlice.updatePassword(formData));
  };

  /**
   * Fetch password policy records.
   *
   */
  const fetchPasswordPolicy = () => {
    dispatch(passwordPolicySlice.fetchPasswordPolicy());
  };

  return (
    <ChangePassword
      fetchUserProfile={fetchUserProfile}
      fetchPasswordPolicy={fetchPasswordPolicy}
      updatePassword={updatePassword}
      {...props}
    />
  );
};

export default ChangePasswordContainer;
