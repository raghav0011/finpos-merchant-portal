import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import custom components
import * as passwordPolicySlice from '../../PasswordPolicy/slice';
import Tabs from '../components/Tabs';

export const PolicyFormContainer = (props) => {
  const dispatch = useDispatch();

  const passwordPolicies = useSelector((state) => state.passwordPolicies.payload);
  const passwordErrors = useSelector((state) => state.passwordPolicies.errors);
  const passwordLoading = useSelector((state) => state.passwordPolicies.loading);

  props = { ...props, passwordPolicies, passwordErrors, passwordLoading };

  /**
   * Fetch password policy records.
   *
   */
  const fetchPasswordPolicy = () => {
    dispatch(passwordPolicySlice.fetchPasswordPolicy());
  };

  /**
   * Update password policy records.
   * @param {object} formData
   *
   */
  const updatePasswordPolicy = (formData) => {
    dispatch(passwordPolicySlice.updatePasswordPolicy(formData));
  };

  /**
   * Clean password policy records.
   *
   */
  const cleanPasswordPolicy = () => {
    dispatch(passwordPolicySlice.cleanPasswordPolicy());
  };

  /**
   * Fetch pending password policy records.
   *
   */
  const fetchPendingPasswordPolicy = () => {
    dispatch(passwordPolicySlice.fetchPendingPasswordPolicy());
  };

  /**
   * Approve password policy changes.
   * @param {object} formData
   *
   */
  const approvePasswordPolicyChanges = (formData) => {
    dispatch(passwordPolicySlice.approvePasswordPolicyChanges(formData));
  };

  /**
   * Reject password policy changes with reason.
   * @param {object} formData
   *
   */
  const rejectPasswordPolicyChanges = (formData) => {
    dispatch(passwordPolicySlice.rejectPasswordPolicyChanges(formData));
  };

  return (
    <Tabs
      fetchPendingPasswordPolicy={fetchPendingPasswordPolicy}
      approvePasswordPolicyChanges={approvePasswordPolicyChanges}
      rejectPasswordPolicyChanges={rejectPasswordPolicyChanges}
      fetchPasswordPolicy={fetchPasswordPolicy}
      updatePasswordPolicy={updatePasswordPolicy}
      cleanPasswordPolicy={cleanPasswordPolicy}
      {...props}
    />
  );
};

export default PolicyFormContainer;
