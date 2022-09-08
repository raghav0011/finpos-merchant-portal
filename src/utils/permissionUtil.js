import { getLocalStorage } from '../utils/storageUtil';
import { PERMISSION_KEY } from '../constants';

export let isAllowed = (permissionCode) => {
  const permissions = getLocalStorage(PERMISSION_KEY);
  let isAuthorized = false;
  Array.isArray(permissionCode) &&
    permissionCode.forEach((code) => {
      if (Array.isArray(permissions) && permissions.includes(code)) {
        isAuthorized = true;
      }
    });
  return isAuthorized;
};
