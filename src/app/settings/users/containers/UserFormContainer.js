import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserForm from '../components/UserForm';

import * as userSlice from '../slice/slice';

const UserFormContainer = (props) => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const userDetailLoading = users.detailLoading;
  const userDetailPayload = users.detailPayload;
  const userDetailErrors = users.detailErrors;

  /**
   * Add user records.
   * @param {object} formData
   *
   */
  const addUser = (formData) => {
    return dispatch(userSlice.addUser(formData));
  };

  /**
   * Update user records.
   * @param {string} id
   * @param {object} formData
   *
   */
  const updateUser = (id, formData) => {
    return dispatch(userSlice.updateUser({ id, formData }));
  };

  /**
   * Clean user errors.
   *
   */
  const cleanUserErrors = () => {
    dispatch(userSlice.cleanUserErrors());
  };

  /**
   * Clean user details.
   *
   */
  const cleanUserDetails = () => {
    dispatch(userSlice.cleanUserDetails());
  };

  /**
   * Fetch user record to update details
   * @param {object} id
   *
   */
  const fetchUserUpdateRequestById = (id) => {
    dispatch(userSlice.fetchUserUpdateRequestById(id));
  };

  props = {
    ...props,

    userDetailLoading,
    userDetailPayload,
    userDetailErrors,

    addUser,
    updateUser,
    cleanUserErrors,
    cleanUserDetails,
    fetchUserUpdateRequestById,
  };
  return <UserForm {...props} />;
};

export default UserFormContainer;
