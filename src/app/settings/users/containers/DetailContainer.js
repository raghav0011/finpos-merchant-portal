import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as userSlice from '../slice/slice';
import UserDetail from '../components/UserDetail';

const DetailContainer = (props) => {
  const users = useSelector((state) => state.users);
  const userDetailLoading = users.detailLoading;
  const userDetailPayload = users.detailPayload;
  const userDetailErrors = users.detailErrors;

  const dispatch = useDispatch();

  /**
   * Clean user details.
   *
   */
  const cleanUserDetails = () => {
    dispatch(userSlice.cleanUserDetails());
  };

  /**
   * Fetch user by id.
   * @param {string} id
   *
   */
  const fetchUserByIdentifier = (id) => {
    dispatch(userSlice.fetchUserByIdentifier(id));
  };

  props = {
    ...props,

    userDetailLoading,
    userDetailPayload,
    userDetailErrors,

    cleanUserDetails,
    fetchUserByIdentifier,
  };

  return <UserDetail {...props} />;
};

export default DetailContainer;
