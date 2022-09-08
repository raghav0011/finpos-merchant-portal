import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import custom components
import * as passwordPolicySlice from '../../PasswordPolicy/slice';
import PolicyDetail from '../components/PolicyDetail';

export const PolicyDetailContainer = (props) => {
  const dispatch = useDispatch();

  const passwordPolicies = useSelector((state) => state.passwordPolicies.payload);
  const passwordErrors = useSelector((state) => state.passwordPolicies.errors);
  const passwordLoading = useSelector((state) => state.passwordPolicies.loading);

  props = { ...props, passwordPolicies, passwordErrors, passwordLoading };

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

  /**
   * Clean password policy records.
   *
   */
  const cleanPasswordPolicy = () => {
    dispatch(passwordPolicySlice.cleanPasswordPolicy());
  };

  return (
    <PolicyDetail
      approvePasswordPolicyChanges={approvePasswordPolicyChanges}
      rejectPasswordPolicyChanges={rejectPasswordPolicyChanges}
      fetchPendingPasswordPolicy={fetchPendingPasswordPolicy}
      cleanPasswordPolicy={cleanPasswordPolicy}
      {...props}
    />
  );
};

export default PolicyDetailContainer;
