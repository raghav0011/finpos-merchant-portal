import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as roleSlice from '../../role/slice';
import AuditLogDetail from '../components/AuditLogDetail';

export const AuditLogDetailContainer = (props) => {
  const dispatch = useDispatch();

  const roles = useSelector((state) => state.roles.payload);
  const roleErrors = useSelector((state) => state.roles.errors);
  const roleLoading = useSelector((state) => state.roles.loading);

  const permissions = useSelector((state) => state.permissions.payload);

  props = { ...props, roles, roleLoading, roleErrors, permissions };

  /**
   * Fetch role audit record by id.
   * @param {string} id
   *
   */
  const fetchRoleAuditLogByIdentifier = (id) => {
    dispatch(roleSlice.fetchRoleAuditLogByIdentifier(id));
  };

  /**
   * Fetch permission records.
   *
   */
  const fetchPermission = () => {
    dispatchEvent(roleSlice.fetchPermission());
  };

  /**
   * Clean role records.
   *
   */
  const cleanRole = () => {
    dispatch(roleSlice.cleanRole());
  };

  /**
   * Clean permission records.
   *
   */
  const cleanPermission = () => {
    dispatch(roleSlice.cleanPermission());
  };
  return (
    <AuditLogDetail
      fetchRoleAuditLogByIdentifier={fetchRoleAuditLogByIdentifier}
      fetchPermission={fetchPermission}
      cleanRole={cleanRole}
      cleanPermission={cleanPermission}
      {...props}
    />
  );
};
export default AuditLogDetailContainer;
