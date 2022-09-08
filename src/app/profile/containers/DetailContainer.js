import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Detail from '../../profile/components/Detail';
import * as userSlice from '../../settings/users/slice/slice';

export const DetailContainer = (props) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.users.detailPayload);
  const userDetailsErrors = useSelector((state) => state.users.detailErrors);
  const userDetailsLoading = useSelector((state) => state.users.detailLoading);

  const userFormFields = useSelector((state) => state.userFormFields.payload);
  const userFormFieldsLoading = useSelector((state) => state.userFormFields.loading);
  const userFormFieldsErrors = useSelector((state) => state.userFormFields.errors);

  props = {
    ...props,
    users: userDetails,
    userErrors: userDetailsErrors,
    userLoading: userDetailsLoading,
    userFormFields,
    userFormFieldsLoading,
    userFormFieldsErrors,
  };

  /**
   * Fetch user profile records.
   *
   */
  const fetchUserProfile = (id) => {
    dispatch(userSlice.fetchUserProfile(id));
  };

  /**
   * Clean user detail records.
   *
   */
  const cleanUserDetails = () => {
    dispatch(userSlice.cleanUserDetails());
  };

  /**
   * Fetch user form fields.
   *
   */
  const fetchUserProfileEditFormFields = () => {
    dispatch(userSlice.fetchUserProfileEditFormFields());
  };

  /**
   * Clean user form fields.
   *
   */
  const cleanUserFormFields = () => {
    dispatch(userSlice.cleanUserFormFields());
  };

  return (
    <Detail
      fetchUserProfileEditFormFields={fetchUserProfileEditFormFields}
      cleanUserFormFields={cleanUserFormFields}
      fetchUserProfile={fetchUserProfile}
      cleanUserDetails={cleanUserDetails}
      {...props}
    />
  );
};

export default DetailContainer;
