import moment from 'moment';

import { CUSTOM_FIELD_DATE_FORMAT, PENDING_DATE_FORMAT, SEARCH_DATE_FORMAT } from '../constants';

import { Spin, Select } from 'antd';
import CustomLoader from '../assets/finpos_loader.gif';
import ReactCountryFlag from 'react-country-flag';

// Custom Spinner

export const antIcon = <img src={CustomLoader} alt="loading" />;
Spin.setDefaultIndicator(antIcon);

export const toUpper = (v, prev) => {
  if (v === prev) {
    return v;
  }
  return v && v.charAt(0).toUpperCase() + v.slice(1);
};

export const urlToList = (url) => {
  if (url) {
    const urlList = url.split('/').filter((i) => i);
    return urlList.map((urlItem, index) => `/${urlList.slice(0, index + 1).join('/')}`);
  }
};

export const isEmpty = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const stringExplode = (str, delimiter) => {
  return str.split(delimiter);
};

export const isDuplicate = (array, title) => {
  return array.some((el) => el.title === title);
};

export const arrayCompare = (arr1, arr2) => {
  if (!arr1 || !arr2) return;
  let result;
  arr1.forEach((e1, i) =>
    arr2.forEach((e2) => {
      if (e1.length > 1 && e2.length) {
        result = arrayCompare(e1, e2);
      } else if (e1 !== e2) {
        result = false;
      } else {
        result = true;
      }
    })
  );
  return result;
};

export const stringCompare = (str1, str2) => {
  const string1 = !isEmpty(str1) ? str1.toString() : '';
  const string2 = !isEmpty(str2) ? str2.toString() : '';
  return string1 === string2;
};

export const objectCompare = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const exactMatchByKey = (matchVal, myArray, matchKey = 'key') => {
  if (myArray) {
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i][matchKey] === matchVal) {
        return myArray[i];
      }
    }
  }
};

export const matchBySearchKey = (matchKey, arrayItems) => {
  if (arrayItems) {
    return arrayItems.filter((item) => {
      return item.searchKey.toLowerCase().search(matchKey.toLowerCase()) !== -1;
    });
  }
};

export const matchByDynamicKey = (matchKey, myArray) => {
  if (myArray) {
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i][matchKey]) {
        return myArray[i][matchKey];
      }
    }
  }
  return;
};

export const hasPermission = (permissionCode, permissions) => {
  return permissions && permissions.includes(permissionCode);
};

// export const getFilterFieldValue = (reportModel) => {
//   let fieldValue =
//     reportModel &&
//     reportModel.map((index, obj) => {
//       let rObj = {};
//       if (index.condition && index.field && (index.value || (index.fromDate && index.toDate))) {
//         const value = index.value;
//         const fromDate = moment(index.fromDate).format(SEARCH_DATE_FORMAT);
//         const toDate = moment(index.toDate).format(SEARCH_DATE_FORMAT);
//         const condition = index.condition;
//         const field = index.field;
//         const customizable = index.customizable;

//         if (!value) {
//           rObj.dateValue = toDate;
//           rObj.value = fromDate;
//         } else {
//           if (moment.isMoment(value)) {
//             rObj.value = moment(value).format(SEARCH_DATE_FORMAT);
//           } else {
//             rObj.value = value;
//           }
//         }

//         rObj.condition = condition;
//         rObj.field = field;
//         rObj.customizable = customizable;
//       }
//       return rObj;
//     });

//   return fieldValue && fieldValue.filter(Boolean);
// };
export const getFilterFieldValue = (reportModel) => {
  let filterFieldValues =
    reportModel &&
    reportModel.map((index, obj) => {
      if (index.condition && index.field && (index.value || index.fromDate)) {
        var rObj = {};
        let fromDate;
        let toDate;
        const value = index.value;
        fromDate = moment(index.fromDate).format(SEARCH_DATE_FORMAT);
        toDate = moment(index.toDate).format(SEARCH_DATE_FORMAT);

        if (!value) {
          rObj.dateValue = toDate;
          rObj.value = fromDate;
        } else {
          if (moment.isMoment(value)) {
            rObj.value = moment(value).format(SEARCH_DATE_FORMAT);
          } else {
            rObj.value = value;
          }
        }
        const condition = index.condition;
        const field = index.field;
        const customizable = index.customizable;

        rObj.condition = condition;
        rObj.field = field;
        rObj.customizable = customizable;
      }
      return rObj;
    });

  filterFieldValues = filterFieldValues?.filter(Boolean);
  return filterFieldValues;
};

export const getSortingOrder = (sorterOrdered) => {
  let orderType;
  if (sorterOrdered) {
    if (sorterOrdered === 'descend') {
      orderType = 'DESC';
    } else {
      orderType = 'ASC';
    }
  }
  return orderType;
};

export const setColorStyle = (str1, str2, oldData, colorCode = 'red') => {
  const isEqual = stringCompare(str1, str2);
  return !isEmpty(oldData) ? (isEqual ? { color: '' } : { color: colorCode }) : { color: '' };
};

export const validateDateFormat = (searchParameter) => {
  if (searchParameter && searchParameter.includes('/', 2)) {
    if (searchParameter.includes(':', 2)) {
      searchParameter = moment(searchParameter).format(PENDING_DATE_FORMAT);
    } else {
      searchParameter = moment(searchParameter).format(CUSTOM_FIELD_DATE_FORMAT);
    }
  }
  return searchParameter;
};

export const getStatusLabel = (value) => {
  let label = '';
  const statusValue = JSON.stringify(value);
  statusValue === 'true' ? (label = 'YES') : (label = 'NO');
  return label;
};

export const getFieldPropertyValue = (data, compareKey, compareCode, returnKey) => {
  let result,
    obj = '';
  let elements = [];
  if (Array.isArray(compareKey)) {
    compareKey.forEach((key) => {
      obj =
        Array.isArray(data) &&
        data.filter((d) => {
          return key === d[`${compareCode}`];
        });
      if (obj && obj[0] !== undefined && obj[0] !== null) {
        elements.push(obj[0][`${returnKey}`]);
      }
    });
    result = elements.join(', ');
  } else {
    obj =
      Array.isArray(data) &&
      data.filter((d) => {
        return compareKey === d[`${compareCode}`];
      });
    if (obj && obj[0] !== undefined && obj[0] !== null) {
      result = obj[0][`${returnKey}`];
    }
  }
  return result;
};

// file downloader
export const blobDownloader = (blobData, fileName) => {
  const a = document.createElement('a');
  a.download = `${fileName}`;
  a.href = window.URL.createObjectURL(blobData);
  const clickEvt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};

export function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

// get the query params from url
export const getQueryStringParams = (query) => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query).split('&').reduce((params, param) => {
        let [key, value] = param.split('=');
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
        return params;
      }, {})
    : {};
};

export const normalizeBoolean = (value) => {
  return value ? 1 : 0;
};

export const getCountryWithFlag = (countryList) => {
  return countryList?.map((item, index) => {
    return (
      <Select.Option key={index} value={item.value} label={item.label}>
        {item.value === 'a' || item.value === '-' ? (
          <span key={item.value}>{item.label}</span>
        ) : (
          <span key={item.value}>
            <ReactCountryFlag
              countryCode={item.value}
              svg
              className="mr-2"
              style={{ height: '1.8em', width: '1.8em' }}
            />
            {item.label}
          </span>
        )}
      </Select.Option>
    );
  });
};

export const getCurrencyWithFlag = (currencyList) => {
  if (currencyList instanceof Array && !isEmpty(currencyList)) {
    return currencyList?.map((item, index) => {
      return (
        <Select.Option key={index} value={item?.value} label={item?.label}>
          <span key={item?.value}>
            <ReactCountryFlag
              countryCode={item?.value.slice(0, 2)}
              svg
              className="mr-2"
              style={{ height: '1.8em', width: '1.8em' }}
            />
            {item?.label}
          </span>
        </Select.Option>
      );
    });
  }
};

export const rulesPreHandler = (rules) => {
  if (!rules) return [];
  if (isEmpty(rules)) return [];
  if (!(rules instanceof Array)) return [];

  if (!rules.some((item) => item.hasOwnProperty('pattern'))) return rules;

  let pattern;
  let message;
  rules.some((item) => {
    if (item.hasOwnProperty('pattern')) {
      pattern = item['pattern'];
      message = item['message'] || 'Invalid Format';
      return true;
    }
    return false;
  });
  //return [...rules, { pattern: new RegExp(`^${pattern}$`), message }];
  return [{ pattern: new RegExp(`^${pattern}$`), message }];
};

export const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

export const allowOnlyNumber = (evt) => {
  let charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    evt.preventDefault();
    return false;
  }
  return true;
};
export const onlyAlphabets = (e) => {
  let charCode = e.which ? e.which : e.keyCode;
  if ((e.charCode > 64 && e.charCode < 91) || e.charCode == 8) {
    e.preventDefault();
    return true;
  }
  return false;
};
