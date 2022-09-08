import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as userSlice from '../slice/slice';
import UserTabs from '../components/Tabs';

const ListContainer = (props) => {
  const dispatch = useDispatch();

  const usersData = useSelector((state) => state.users);
  const users = usersData.payload;
  const userPagination = usersData.pagination;
  const userErrors = usersData.errors;
  const userLoading = usersData.loading;

  /**
   * Fetch user records with criteria.
   * @param {object} formData
   *
   */
  const fetchUserWithCriteria = (formData) => {
    dispatch(userSlice.fetchUser(formData));
  };

  /**
   * Clean user records.
   *
   */
  const cleanUser = () => {
    dispatch(userSlice.cleanUser());
  };

  /**
   * Fetch user audit log records with criteria.
   * @param {object} formData
   *
   */
  const fetchUserAuditLogWithCriteria = (formData) => {
    dispatch(userSlice.fetchUserAuditLogWithCriteria(formData));
  };

  props = {
    ...props,
    users,
    userPagination,
    userErrors,
    userLoading,

    fetchUserAuditLogWithCriteria,
    fetchUserWithCriteria,
    cleanUser,
  };

  return <UserTabs {...props} />;
};

export default ListContainer;
