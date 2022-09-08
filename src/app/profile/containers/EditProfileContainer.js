import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import EditProfile from '../components/EditProfile';
import * as userSlice from '../../settings/users/slice/slice';

const EditProfileContainer = (props) => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.users);
  const userDetails = userData.detailPayload;
  const userDetailsErrors = userData.detailErrors;
  const userDetailsLoading = userData.detailLoading;

  /**
   * Clean user fields.
   *
   */
  const cleanUserDetails = () => {
    dispatch(userSlice.cleanUserDetails());
  };

  /**
   * Fetch user details for update form fields.
   * @param {string} id
   *
   */
  const fetchProfileUpdateRequestById = (id) => {
    dispatch(userSlice.fetchProfileUpdateRequestById(id));
  };

  /**
   * Update user profile.
   * @param {object} formData
   *
   */
  const updateProfile = (id, formData) => {
    return dispatch(userSlice.updateProfile({ id, formData }));
  };

  props = {
    ...props,

    userDetails,
    userDetailsErrors,
    userDetailsLoading,

    fetchProfileUpdateRequestById,
    cleanUserDetails,
    updateProfile,
  };

  return <EditProfile {...props} />;
};

export default EditProfileContainer;
