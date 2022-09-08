import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as userSlice from '../slice/slice';
import AuditLogDetail from '../components/AuditLogDetail';

export const AuditLogDetailContainer = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => {
    return state.users.detailPayload;
  });
  const userErrors = useSelector((state) => state.users.detailErrors);
  const userLoading = useSelector((state) => state.users.detailLoading);

  /**
   * Fetch user audit log by id.
   * @param {string} id
   *
   */
  const fetchUserAuditLogByIdentifier = (id) => {
    dispatch(userSlice.fetchUserAuditLogByIdentifier(id));
  };

  /**
   * Clean user audit log records.
   *
   */
  const cleanUser = () => {
    dispatch(userSlice.cleanUser());
  };

  return (
    <AuditLogDetail
      fetchUserAuditLogByIdentifier={fetchUserAuditLogByIdentifier}
      cleanUser={cleanUser}
      users={users}
      userLoading={userLoading}
      userErrors={userErrors}
    />
  );
};
export default AuditLogDetailContainer;
