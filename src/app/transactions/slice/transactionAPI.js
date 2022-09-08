import { store, fetch } from '../../../utils/httpUtil';

let base = 'transaction-manager/v1/admin/transactions';

export const selectCustomerForTransaction = async (formData) => {
  try {
    const res = await store(`${base}/select`, formData);
    if (res.data.success) {
      return res.data.data;
    }
  } catch (error) {
    throw error.response.data || error;
  }
};

export const transactionAuthorize = async (formData) => {
  try {
    const res = await store(`${base}/authorize`, formData);
    if (res.data.success) {
      return res.data.data;
    }
  } catch (error) {
    throw error.response.data || error;
  }
};

export const transactionReject = async (formData) => {
  try {
    const res = await store(`${base}/reject`, formData);
    if (res.data.success) {
      return res.data.data;
    }
  } catch (error) {
    throw error.response.data || error;
  }
};

export const transactionCancel = async (id, formData) => {
  try {
    const res = await store(`transaction-manager/v1/api-calls/cancel/${id}`, formData);
    if (res.data.success) {
      return res.data.data;
    }
  } catch (error) {
    throw error.response.data || error;
  }
};

export const fetchPurposesFromRemitKey = async (remit_key) => {
  try {
    const res = await store(`${base}/purposes`, { remit_key });
    if (res.data.success) {
      return res.data.data;
    }
  } catch (error) {
    throw error.response.data || error;
  }
};

export const fetchFormFieldsFromPurpose = async (purpose) => {
  try {
    const res = await fetch(`${base}/form-fields/${purpose}`);
    if (res.data.success) {
      return res.data.data;
    }
  } catch (error) {
    throw error.response.data || error;
  }
};
