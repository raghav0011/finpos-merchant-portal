import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UserManagement from '../components';
import * as branchSlice from '../slice/branchSlice';
import * as userSlice from '../slice/userSlice';
import * as roleSlice from '../slice/roleSlice';
import * as permissionSlice from '../slice/permissionSlice';

const UserManagementListContainer = (props) => {
  const dispatch = useDispatch();

  // branch slectors
  const branches = useSelector((state) => state.branches.payload);
  const branchLoading = useSelector((state) => state.branches.loading);
  const branchErrors = useSelector((state) => state.branches.errors);
  const branchPagination = useSelector((state) => state.branches.pagination);

  const branchDetail = useSelector((state) => state.branches.detailPayload);
  const branchDetailLoading = useSelector((state) => state.branches.detailLoading);
  const branchDetailError = useSelector((state) => state.branches.detailErrors);

  // user selector
  const users = useSelector((state) => state.users.payload);
  const userLoading = useSelector((state) => state.users.loading);
  const userErrors = useSelector((state) => state.users.errors);
  const userPagination = useSelector((state) => state.users.pagination);

  const userDetail = useSelector((state) => state.users.detailPayload);
  const userDetailLoading = useSelector((state) => state.users.detailLoading);
  const userDetailError = useSelector((state) => state.users.detailErrors);

  //role selector
  const roles = useSelector((state) => state.roles.payload);
  const roleLoading = useSelector((state) => state.roles.loading);
  const roleErrors = useSelector((state) => state.roles.errors);
  const rolePagination = useSelector((state) => state.roles.pagination);

  const roleDetail = useSelector((state) => state.roles.detailPayload);
  //permission selector
  const permissions = useSelector((state) => state.permissions.payload);
  const permissionLoading = useSelector((state) => state.permissions.loading);
  const permissionErrors = useSelector((state) => state.permissions.errors);

  /**
   * add branch

   * @returns
   */
  const AddBranch = (formData) => {
    return dispatch(branchSlice.AddBranch(formData));
  };
  /**
   * Fetch branch by id
   * @param {string} id
   * @returns
   */
  const fetchBranchById = (id) => {
    return dispatch(branchSlice.fetchBranchById(id));
  };

  /**
   * modify branch by id

   * @returns
   */
  const modifyBranchById = (formData, branchId) => {
    // console.log('🚀 ~ file: ListContainer.js ~ line 61 ~ modifyBranchById ~ branchId', branchId);
    return dispatch(branchSlice.modifyBranchById({ formData, branchId }));
  };
  /**
   * Fetch branch list
   * @param {string} formData
   * @returns
   */
  const fetchBranchListByCriteria = (formData) => {
    return dispatch(branchSlice.fetchBranchListByCriteria(formData));
  };

  /**
   * Clean branch data
   */
  const cleanBranch = () => {
    dispatch(branchSlice.cleanBranch());
  };

  const cleanBranchDetail = () => {
    dispatch(branchSlice.cleanBranchDetail());
  };
  /**
   * Clean branch error data
   */
  const cleanBranchErrors = () => {
    dispatch(branchSlice.cleanBranchErrors());
  };

  /**
   * add role

   * @returns
   */
  const addRole = (formData) => {
    return dispatch(roleSlice.addRole(formData));
  };

  const fetchPermission = () => {
    return dispatch(permissionSlice.fetchPermission());
  };
  /**
   * Fetch user by id
   * @param {string} id
   * @returns
   */
  const fetchRoleById = (id) => {
    return dispatch(roleSlice.fetchRoleById(id));
  };

  /**
   * modify Role by id

   * @returns
   */
  const modifyRoleById = (formData, roleId) => {
    return dispatch(roleSlice.modifyRoleById({ formData, roleId }));
  };
  /**
   * Fetch rolelist
   * @param {string} formData
   * @returns
   */
  const fetchRoleListByCriteria = (formData) => {
    return dispatch(roleSlice.fetchRoleWithCriteria(formData));
  };

  /**
   * Clean role data
   */
  const cleanRole = () => {
    dispatch(roleSlice.cleanRole());
  };

  /**
   * Clean role error data
   */
  const cleanRoleErrors = () => {
    dispatch(roleSlice.cleanRoleErrors());
  };

  /**
   * add user

   * @returns
   */
  const AddUser = (formData) => {
    return dispatch(userSlice.AddUser(formData));
  };
  /**
   * Fetch user by id
   * @param {string} id
   * @returns
   */
  const fetchUserById = (id) => {
    return dispatch(userSlice.fetchUserById(id));
  };

  /**
   * modify User by id

   * @returns
   */
  const modifyUserById = (formData, userId) => {
    // console.log('🚀 ~ file: ListContainer.js ~ line 160 ~ modifyUserById ~ userId', userId);
    return dispatch(userSlice.modifyUserById({ formData, userId }));
  };
  /**
   * Fetch User list
   * @param {string} formData
   * @returns
   */
  const fetchUserListByCriteria = (formData) => {
    return dispatch(userSlice.fetchUserListByCriteria(formData));
  };

  /**
   * Clean User data
   */
  const cleanUser = () => {
    dispatch(userSlice.cleanUser());
  };
  const cleanUserDetail = () => {
    dispatch(userSlice.cleanUserDetail());
  };
  /**
   * Clean User error data
   */
  const cleanUserErrors = () => {
    dispatch(userSlice.cleanUserErrors());
  };

  props = {
    ...props,
    roleDetail,
    branchDetail,
    userDetail,
    branches: {
      branches,
      branchLoading,
      branchErrors,
      branchPagination,
      AddBranch,
      fetchBranchById,
      branchDetail,
      cleanBranchDetail,
      branchDetailLoading,
      branchDetailError,
      modifyBranchById,
      fetchBranchListByCriteria,
      cleanBranch,
      cleanBranchErrors,
    },
    roles: {
      roles,
      roleLoading,
      roleErrors,
      rolePagination,
      roleDetail,
      addRole,
      fetchRoleById,
      modifyRoleById,
      fetchRoleListByCriteria,
      cleanRole,
      cleanRoleErrors,
    },
    users: {
      users,
      userLoading,
      userErrors,
      userPagination,
      AddUser,
      fetchUserById,
      modifyUserById,
      fetchUserListByCriteria,
      cleanUser,
      cleanUserErrors,
      userDetail,
      cleanUserDetail,
      userDetailLoading,
      userDetailError,
    },
    permissions: {
      fetchPermission,
      permissions,
      permissionLoading,
      permissionErrors,
    },
  };
  return <UserManagement {...props} />;
};

export default UserManagementListContainer;
