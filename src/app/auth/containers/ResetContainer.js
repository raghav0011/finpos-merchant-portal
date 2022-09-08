import React from 'react';
import { useDispatch } from 'react-redux';

// Import custom components
import ResetForm from '../../auth/components/ResetForm';
import * as userSlice from '../../settings/users/slice/slice';

export const ResetContainer = (props) => {
  const dispatch = useDispatch();

  /**
   * Reset user password records.
   * @param {object} formData
   */
  const resetPassword = (formData) => {
    return dispatch(userSlice.resetPassword(formData));
  };

  return <ResetForm resetPassword={resetPassword} />;
};

export default ResetContainer;
