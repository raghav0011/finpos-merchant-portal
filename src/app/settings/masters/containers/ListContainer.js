import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as masterSlice from '../slice';
import MasterTabs from '../components/Tabs';

const ListContainer = (props) => {
  const dispatch = useDispatch();

  const masters = useSelector((state) => state.masters.payload);
  const mastersPagination = useSelector((state) => state.masters.pagination);
  const mastersErrors = useSelector((state) => state.masters.errors);
  const mastersLoading = useSelector((state) => state.masters.loading);
  const mastersDetails = useSelector((state) => state.masters.detailPayload);
  const mastersDetailsErrors = useSelector((state) => state.masters.detailErrors);
  const mastersDetailsLoading = useSelector((state) => state.masters.detailLoading);

  props = {
    ...props,

    masters,
    mastersPagination,
    mastersErrors,
    mastersLoading,
    mastersDetails,
    mastersDetailsErrors,
    mastersDetailsLoading,
  };

  /**
   * Add masters records.
   * @param {object} formData
   *
   */
  const addMasters = (formData) => {
    return dispatch(masterSlice.addMasters(formData));
  };

  /**
   * Fetch masters records with criteria.
   * @param {object} formData
   *
   */
  const fetchMastersWithCriteria = (formData) => {
    dispatch(masterSlice.fetchMasters(formData));
  };

  /**  Fetch master records by object type.
   * @param {object} formData
   *
   */
  const fetchMastersByObjectType = (formData) => {
    dispatch(masterSlice.fetchMastersByObjectType(formData));
  };

  /**
   * Update masters records.
   * @param {object} formData
   *
   */
  const updateMasters = (formData) => {
    return dispatch(masterSlice.updateMasters(formData));
  };

  /**
   * Fetch masters by id.
   * @param {string} id
   *
   */
  const fetchMastersByIdentifier = (id) => {
    dispatch(masterSlice.fetchMastersByIdentifier(id));
  };

  /**
   * Clean masters records.
   *
   */
  const cleanMasters = () => {
    dispatch(masterSlice.cleanMasters());
  };
  /**
   * Clean masters errors.
   *
   */
  const cleanMastersErrors = () => {
    dispatch(masterSlice.cleanMastersErrors());
  };

  /**
   * Fetch master record to update details
   * @param {object} id
   *
   */
  const fetchMasterUpdateRequestById = (id) => {
    dispatch(masterSlice.fetchMasterUpdateRequestById(id));
  };

  /**
   * Clean masters detail
   */
  const cleanMastersDetails = () => {
    dispatch(masterSlice.cleanMastersDetails());
  };

  return (
    <MasterTabs
      updateMasters={updateMasters}
      fetchMastersByIdentifier={fetchMastersByIdentifier}
      fetchMastersWithCriteria={fetchMastersWithCriteria}
      fetchMastersByObjectType={fetchMastersByObjectType}
      cleanMasters={cleanMasters}
      addMasters={addMasters}
      cleanMastersErrors={cleanMastersErrors}
      fetchMasterUpdateRequestById={fetchMasterUpdateRequestById}
      cleanMastersDetails={cleanMastersDetails}
      {...props}
    />
  );
};

export default ListContainer;
