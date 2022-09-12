export const API_URL = `${process.env.REACT_APP_REST_API_HOST}`;
export const PERMISSION_KEY = 'finpos-merchant-permissions';
export const MENU_KEY = 'finpos-merchant-menus';
export const LANGUAGE_KEY = 'finpos-merchant-language';
export const DATE_FORMAT = 'MM/DD/YYYY HH:mm:ss';
export const PAGE_SIZE = 10;
export const ENFORCE_PASSWORD_CHANGE = 'finpos-merchant-enforce-password-change';
export const ENFORCE_TYPE = 'finpos-merchant-enforceType';
export const SEARCH_DATE_FORMAT = 'MM-DD-YYYY';
export const CUSTOM_FIELD_DATE_FORMAT = 'YYYY-MM-DD';
export const PENDING_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const JWT_TOKEN = 'finpos-merchant-token';
export const USER_FULL_NAME = 'finpos-merchant-fullName';
export const LOGGED_IN_USER = 'finpos-merchant-user';
export const LOGGED_IN_USER_ID = 'finpos-merchant-user-id';
export const LOGGED_IN_USER_IMAGE = 'finpos-merchant-user-image';

export const CUSTOMER_TYPE = 'CUSTOMER_TYPE';
export const SENDER = 'sender';
export const RECEIVER = 'receiver';
export const SENDER_ID = 'sender_id';

export const URL_REGEX = new RegExp(
  '^(https?:\\/\\/)?([\\da-z\\.-]+\\.[a-z\\.]{2,6}|[\\d\\.]+)([\\/:?=&#]{1}[\\da-z\\.-]+)*[\\/\\?]?$'
);
