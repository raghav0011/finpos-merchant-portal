import { fetch } from '../../../../utils/httpUtil';

const base = 'config/v1/users';

export const fetchUserFormFields = async () => {
  try {
    const res = await fetch(`${base}/form-fields`);
    if (res.data.success) {
      return res.data.data;
    }
  } catch (error) {
    throw error.response.data || error;
  }
};

export const fetchUserProfileEditFormFields = async () => {
  try {
    const res = await fetch(`${base}/profile-form-fields`);
    if (res.data.success) {
      return res.data.data;
    }
  } catch (error) {
    throw error.response.data || error;
  }
};
