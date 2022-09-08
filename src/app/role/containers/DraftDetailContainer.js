import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import custom components
import * as roleSlice from '../../role/slice';
import DraftDetail from '../components/DraftDetail';

export const DraftDetailContainer = (props) => {
  const dispatch = useDispatch();

  const roles = useSelector((state) => state.roles.payload);
  const roleErrors = useSelector((state) => state.roles.errors);
  const roleLoading = useSelector((state) => state.roles.loading);

  const permissions = useSelector((state) => state.permissions.payload);

  props = { ...props, roles, roleErrors, roleLoading, permissions };

  /**
   * Fetch draft role record by id.
   * @param {string} id
   *
   */
  const fetchDraftRoleByIdentifier = (id) => {
    dispatch(roleSlice.fetchDraftRoleByIdentifier(id));
  };

  /**
   * Reject role changes with reason.
   * @param {object} formData
   *
   */
  const rejectRoleChanges = (formData) => {
    return dispatch(roleSlice.rejectRoleChanges(formData));
  };

  /**
   * Approve role changes.
   * @param {object} formData
   *
   */
  const approveRoleChanges = (formData) => {
    return dispatch(roleSlice.approveRoleChanges(formData));
  };

  /**
   * Fetch permission records.
   *
   */
  const fetchPermission = () => {
    dispatch(roleSlice.fetchPermission());
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
    <DraftDetail
      fetchDraftRoleByIdentifier={fetchDraftRoleByIdentifier}
      fetchPermission={fetchPermission}
      approveRoleChanges={approveRoleChanges}
      rejectRoleChanges={rejectRoleChanges}
      cleanRole={cleanRole}
      cleanPermission={cleanPermission}
      {...props}
    />
  );
};

export default DraftDetailContainer;
