import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as fieldsSlice from '../slice';
import FieldsTabs from '../components/Tabs';

const FormFieldsContainer = (props) => {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.fields.payload);
  const fieldsPagination = useSelector((state) => state.fields.pagination);
  const fieldsErrors = useSelector((state) => state.fields.errors);
  const fieldsLoading = useSelector((state) => state.fields.loading);
  const fieldsDetails = useSelector((state) => state.fields.detailPayload);
  const fieldsDetailErrors = useSelector((state) => state.fields.detailErrors);
  const fieldsDetailsLoading = useSelector((state) => state.fields.detailLoading);

  props = {
    ...props,
    fields,
    fieldsPagination,
    fieldsErrors,
    fieldsLoading,
    fieldsDetails,
    fieldsDetailErrors,
    fieldsDetailsLoading,
  };

  /**
   * Add fields.
   * @param {object} formData
   *
   */
  const addFields = (formData) => {
    return dispatch(fieldsSlice.addFields(formData));
  };

  /**
   * Fetch fields with criteria.
   * @param {object} formData
   *
   */
  const fetchFieldsWithCriteria = (formData) => {
    dispatch(fieldsSlice.fetchFields(formData));
  };

  /**
   * Fetch field by id.
   * @param {string} id
   *
   */
  const fetchFieldsByIdentifier = (id) => {
    dispatch(fieldsSlice.fetchFieldsByIdentifier(id));
  };

  /**
   * Clean fields.
   *
   */
  const cleanFields = () => {
    dispatch(fieldsSlice.cleanFields());
  };
  /**
   * Clean fields errors.
   *
   */
  const cleanFieldsErrors = () => {
    dispatch(fieldsSlice.cleanFieldsErrors());
  };

  /**
   * Clean fields detail
   */
  const cleanFieldsDetails = () => {
    dispatch(fieldsSlice.cleanFieldsDetails());
  };

  return (
    <FieldsTabs
      fetchFieldsByIdentifier={fetchFieldsByIdentifier}
      fetchFieldsWithCriteria={fetchFieldsWithCriteria}
      cleanFields={cleanFields}
      addFields={addFields}
      cleanFieldsErrors={cleanFieldsErrors}
      cleanFieldsDetails={cleanFieldsDetails}
      {...props}
    />
  );
};

export default FormFieldsContainer;
