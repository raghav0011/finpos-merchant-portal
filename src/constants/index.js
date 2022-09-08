export const API_URL = `${process.env.REACT_APP_REST_API_HOST}`;
export const PERMISSION_KEY = 'cityremit-permissions';
export const MENU_KEY = 'cityremit-menus';
export const LANGUAGE_KEY = 'cityremit-language';
export const DATE_FORMAT = 'MM/DD/YYYY HH:mm:ss';
export const PAGE_SIZE = 10;
export const ENFORCE_PASSWORD_CHANGE = 'cityremit-platform-enforce-password-change';
export const ENFORCE_TYPE = 'cityremit-platform-enforceType';
export const SEARCH_DATE_FORMAT = 'MM-DD-YYYY';
export const CUSTOM_FIELD_DATE_FORMAT = 'YYYY-MM-DD';
export const PENDING_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const JWT_TOKEN = 'cityremit-token';
export const USER_FULL_NAME = 'cityremit-fullName';
export const LOGGED_IN_USER = 'cityremit-user';
export const LOGGED_IN_USER_ID = 'cityremit-user-id';
export const LOGGED_IN_USER_IMAGE = 'cityremit-user-image';

export const CUSTOMER_TYPE = 'CUSTOMER_TYPE';
export const SENDER = 'sender';
export const RECEIVER = 'receiver';
export const SENDER_ID = 'sender_id';

export const URL_REGEX = new RegExp(
  '^(https?:\\/\\/)?([\\da-z\\.-]+\\.[a-z\\.]{2,6}|[\\d\\.]+)([\\/:?=&#]{1}[\\da-z\\.-]+)*[\\/\\?]?$'
);
