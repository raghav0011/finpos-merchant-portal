import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as fieldsSlice from '../slice';
import FieldsDetail from '../components/FieldsDetail';

const FormFieldsDetailContainer = (props) => {

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
   *  Field Names
   * @param {string} customer_type
   * @param {string} customer_category
   */
  const fetchFieldsName = (customer_category, customer_type) => {
    return dispatch(fieldsSlice.fetchFieldsName({ customer_category, customer_type }));
  };

  /**
   * Update field details.
   * @param {object} formData
   *
   */
  const updateFields = (id, formData) => {
    return dispatch(fieldsSlice.updateFields({ id, formData }));
  };

  /**
   * Fetch field record to update details
   * @param {object} id
   *
   */
  const fetchFieldUpdateRequestById = (id) => {
    return dispatch(fieldsSlice.fetchFieldUpdateRequestById(id));
  };
  /**
   * Fetch fields by id.
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
   * clean fields detail
   */
  const cleanFieldsDetails = () => {
    dispatch(fieldsSlice.cleanFieldsDetails());
  };

  return (
    <FieldsDetail
      fetchFieldsByIdentifier={fetchFieldsByIdentifier}
      fetchFieldsWithCriteria={fetchFieldsWithCriteria}
      cleanFields={cleanFields}
      addFields={addFields}
      updateFields={updateFields}
      cleanFieldsErrors={cleanFieldsErrors}
      fetchFieldUpdateRequestById={fetchFieldUpdateRequestById}
      cleanFieldsDetails={cleanFieldsDetails}
      fetchFieldsName={fetchFieldsName}
      {...props}
    />
  );
};

export default FormFieldsDetailContainer;
