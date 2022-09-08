import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import custom components
import * as roleSlice from '../../role/slice';
import Tabs from '../components/Tabs';

export const ListContainer = (props) => {
  const dispatch = useDispatch();

  const roles = useSelector((state) => state.roles.payload.data);
  const roleErrors = useSelector((state) => state.roles.errors);
  const rolePagination = useSelector((state) => state.roles.pagination);
  const roleLoading = useSelector((state) => state.roles.loading);
  const roleFilterFields = useSelector((state) => state.roleFilterFields.payload);

  const roleDetails = useSelector((state) => state.roles.detailsPayload);
  const roleDetailsErrors = useSelector((state) => state.roles.detailsErrors);
  const roleDetailsLoading = useSelector((state) => state.roles.detailsLoading);

  const permissions = useSelector((state) => state.permissions.payload);
  const permissionLoading = useSelector((state) => state.permissions.loading);

  const roleAuditFilterFields = useSelector((state) => state.roleFilterFields.payload);

  props = {
    ...props,
    roleDetails,
    roleDetailsErrors,
    roleDetailsLoading,
    roles,
    roleErrors,
    rolePagination,
    roleLoading,
    roleFilterFields,
    permissions,
    permissionLoading,
    roleAuditFilterFields,
  };

  /**
   * Fetch role filter field records.
   * @param {object} formData
   *
   */
  const fetchRoleFilterField = (formData) => {
    dispatch(roleSlice.fetchRoleFilterField(formData));
  };

  /**
   * Fetch role records with criteria.
   * @param {object} formData
   *
   */
  const fetchRoleWithCriteria = (formData) => {
    dispatch(roleSlice.fetchRoleWithCriteria(formData));
  };

  /**
   * Clean role records.
   *
   */
  const cleanRole = () => {
    dispatch(roleSlice.cleanRole());
  };

  /**
   * Clean role filter filed records.
   *
   */
  const cleanRoleFilterField = () => {
    dispatch(roleSlice.cleanRoleFilterField());
  };

  /**
   * Fetch permission records.
   *
   */
  const fetchPermissionRequest = () => {
    dispatch(roleSlice.fetchPermission());
  };

  /**
   * Add role records.
   * @param {object} formData
   *
   */
  const addRole = (formData) => {
    return dispatch(roleSlice.addRole(formData));
  };

  /**
   * Clean permission records.
   *
   */
  const cleanPermission = () => {
    dispatch(roleSlice.cleanPermission());
  };

  /**
   * Fetch role by id.
   * @param {string} id
   *
   */
  const fetchRoleByIdentifier = (id) => {
    dispatch(roleSlice.fetchRoleByIdentifier(id));
  };

  /**
   * Fetch permission records.
   *
   */
  const fetchPermission = () => {
    dispatch(roleSlice.fetchPermission());
  };

  /**
   * Update role records.
   * @param {object} formData
   *
   */
  const updateRole = (formData) => {
    return dispatch(roleSlice.updateRole(formData));
  };

  /**
   * Fetch draft role records with criteria.
   * @param {object} formData
   *
   */
  const fetchDraftRoleWithCriteria = (formData) => {
    dispatch(roleSlice.fetchDraftRoleWithCriteria(formData));
  };

  /**
   * Fetch role audit log records with criteria.
   * @param {object} formData
   *
   */
  const fetchRoleAuditLogWithCriteria = (formData) => {
    dispatch(roleSlice.fetchRoleAuditLogWithCriteria(formData));
  };

  /**
   * Fetch role audit filter field records.
   *
   *
   */
  const fetchRoleAuditLogFilterField = () => {
    dispatch(roleSlice.fetchRoleAuditLogFilterField());
  };

  return (
    <Tabs
      updateRole={updateRole}
      fetchRoleAuditLogWithCriteria={fetchRoleAuditLogWithCriteria}
      fetchRoleAuditLogFilterField={fetchRoleAuditLogFilterField}
      fetchDraftRoleWithCriteria={fetchDraftRoleWithCriteria}
      fetchPermission={fetchPermission}
      fetchRoleByIdentifier={fetchRoleByIdentifier}
      fetchPermissionRequest={fetchPermissionRequest}
      addRole={addRole}
      cleanPermission={cleanPermission}
      fetchRoleFilterField={fetchRoleFilterField}
      fetchRoleWithCriteria={fetchRoleWithCriteria}
      cleanRole={cleanRole}
      cleanRoleFilterField={cleanRoleFilterField}
      {...props}
    />
  );
};
export default ListContainer;
