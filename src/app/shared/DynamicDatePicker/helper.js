import React from 'react';
import { Config as ConfigBS, yearsBS } from './bs';
import { Config as ConfigAD, yearsAD } from './ad';

/**
 * Return either object is true or false
 * @param {object} obj
 */
export const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

/**
 * Return next button
 */
export const nextButton = (
  <svg
    version="1.1"
    id="Capa_1"
    x="0px"
    y="0px"
    viewBox="0 0 490.8 490.8"
    className={'date-header-icon'}
  >
    <path
      // style={{ fill: '#000000' }}
      d="M135.685,3.128c-4.237-4.093-10.99-3.975-15.083,0.262c-3.992,4.134-3.992,10.687,0,14.82
	l227.115,227.136L120.581,472.461c-4.237,4.093-4.354,10.845-0.262,15.083c4.093,4.237,10.845,4.354,15.083,0.262
	c0.089-0.086,0.176-0.173,0.262-0.262l234.667-234.667c4.164-4.165,4.164-10.917,0-15.083L135.685,3.128z"
    />
    <path
      // style={{ fill: '#000000' }}
      d="M128.133,490.68c-5.891,0.011-10.675-4.757-10.686-10.648c-0.005-2.84,1.123-5.565,3.134-7.571l227.136-227.115
	L120.581,18.232c-4.171-4.171-4.171-10.933,0-15.104c4.171-4.171,10.933-4.171,15.104,0l234.667,234.667
	c4.164,4.165,4.164,10.917,0,15.083L135.685,487.544C133.685,489.551,130.967,490.68,128.133,490.68z"
    />
  </svg>
);

/**
 * Return back button
 */
export const backButton = (
  <svg
    version="1.1"
    id="Capa_1"
    x="0px"
    y="0px"
    viewBox="0 0 490.787 490.787"
    className={'date-header-icon'}
  >
    <path
      // style={{ fill: '#000000' }}
      d="M362.671,490.787c-2.831,0.005-5.548-1.115-7.552-3.115L120.452,253.006
	c-4.164-4.165-4.164-10.917,0-15.083L355.119,3.256c4.093-4.237,10.845-4.354,15.083-0.262c4.237,4.093,4.354,10.845,0.262,15.083
	c-0.086,0.089-0.173,0.176-0.262,0.262L143.087,245.454l227.136,227.115c4.171,4.16,4.179,10.914,0.019,15.085
	C368.236,489.664,365.511,490.792,362.671,490.787z"
    />
    <path
      // style={{ fill: '#000000' }}
      d="M362.671,490.787c-2.831,0.005-5.548-1.115-7.552-3.115L120.452,253.006c-4.164-4.165-4.164-10.917,0-15.083L355.119,3.256
	c4.093-4.237,10.845-4.354,15.083-0.262c4.237,4.093,4.354,10.845,0.262,15.083c-0.086,0.089-0.173,0.176-0.262,0.262
	L143.087,245.454l227.136,227.115c4.171,4.16,4.179,10.914,0.019,15.085C368.236,489.664,365.511,490.792,362.671,490.787z"
    />
  </svg>
);

export const calenderIcon = (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="calendar"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path>
  </svg>
);

/**
 * Return starting date in AD calender
 * @param {int} year
 * @param {int} month
 * @param {string || "01"} date
 *
 * @return Date()
 */
export const getStartingDayAD = (year, month, date = '01') => {
  return new Date(year + '-' + month + '-' + date).getDay();
};

/**
 * Return number of days in AD calender
 * @param {int} year
 * @param {int} month
 *
 * @return Date()
 */
export const getDaysInMonthAD = (year, month) => {
  return new Date(year, month, 0).getDate();
};

/**
 * Return number of bsMonth days
 * @param {int} bsYear
 * @param {int} bsMonth
 * @returns {int} days
 */
export const getBsMonthDays = (bsYear, bsMonth) => {
  var yearCount = 0;
  var totalYears = bsYear + 1 - ConfigBS.minBsYear;
  var bsMonthData = ConfigBS.extractedBsMonthData[bsMonth - 1];
  for (var i = 0; i < bsMonthData.length; i++) {
    if (bsMonthData[i] === 0) {
      continue;
    }

    var bsMonthUpperDaysIndex = i % 2;
    yearCount += bsMonthData[i];
    if (totalYears <= yearCount) {
      if ((bsYear === 2085 && bsMonth === 5) || (bsYear === 2088 && bsMonth === 5)) {
        return ConfigBS.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] - 2;
      } else {
        return ConfigBS.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex];
      }
    }
  }

  return null;
};

/**
 * Return total number of bsMonth days from minYear
 * @param {int} bsMonth
 * @param {int} yearDiff
 * @returns {int}
 */
const getMonthDaysNumFormMinBsYear = (bsMonth, yearDiff) => {
  var yearCount = 0;
  var monthDaysFromMinBsYear = 0;
  if (yearDiff === 0) {
    return 0;
  }

  var bsMonthData = ConfigBS.extractedBsMonthData[bsMonth - 1];
  for (var i = 0; i < bsMonthData.length; i++) {
    if (bsMonthData[i] === 0) {
      continue;
    }

    var bsMonthUpperDaysIndex = i % 2;
    if (yearDiff > yearCount + bsMonthData[i]) {
      yearCount += bsMonthData[i];
      monthDaysFromMinBsYear +=
        ConfigBS.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] * bsMonthData[i];
    } else {
      monthDaysFromMinBsYear +=
        ConfigBS.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] * (yearDiff - yearCount);
      yearCount = yearDiff - yearCount;
      break;
    }
  }
  return monthDaysFromMinBsYear;
};

const getTotalDaysNumFromMinBsYear = (bsYear, bsMonth, bsDate) => {
  if (bsYear < ConfigBS.minBsYear || bsYear > ConfigBS.maxBsYear) {
    return null;
  }

  var daysNumFromMinBsYear = 0;
  var diffYears = bsYear - ConfigBS.minBsYear;
  for (var month = 1; month <= 12; month++) {
    if (month < bsMonth) {
      daysNumFromMinBsYear += getMonthDaysNumFormMinBsYear(month, diffYears + 1);
    } else {
      daysNumFromMinBsYear += getMonthDaysNumFormMinBsYear(month, diffYears);
    }
  }

  if (bsYear > 2085 && bsYear < 2088) {
    daysNumFromMinBsYear += bsDate - 2;
  } else if (bsYear === 2085 && bsMonth > 5) {
    daysNumFromMinBsYear += bsDate - 2;
  } else if (bsYear > 2088) {
    daysNumFromMinBsYear += bsDate - 4;
  } else if (bsYear === 2088 && bsMonth > 5) {
    daysNumFromMinBsYear += bsDate - 4;
  } else {
    daysNumFromMinBsYear += bsDate;
  }

  return daysNumFromMinBsYear;
};

/**
 * Return total number of bsMonth days from minYear
 * @param {int} yearBS
 * @param {int} monthBS
 * @param {int} dateBS
 * @returns {int}
 */
export const covertBSToAD = (yearBS, monthBS, dateBS) => {
  var daysNumFromMinBsYear = getTotalDaysNumFromMinBsYear(yearBS, monthBS, dateBS);
  var adDate = new Date(
    ConfigBS.minAdDateEqBsDate.ad.year,
    ConfigBS.minAdDateEqBsDate.ad.month,
    ConfigBS.minAdDateEqBsDate.ad.date - 1
  );
  adDate.setDate(adDate.getDate() + daysNumFromMinBsYear);
  return adDate;
};

export const covertADToBS = (adYear, adMonth, adDate) => {
  adYear = Number(adYear);
  adMonth = Number(adMonth);
  adDate = Number(adDate);

  var bsYear = adYear + 57;
  var bsMonth = (adMonth + 9) % 12;
  bsMonth = bsMonth === 0 ? 12 : bsMonth;
  var bsDate = 1;

  if (adMonth < 4) {
    bsYear -= 1;
  } else if (adMonth === 4) {
    var bsYearFirstAdDate = covertBSToAD(bsYear, 1, 1);
    if (adDate < bsYearFirstAdDate.getDate()) {
      bsYear -= 1;
    }
  }

  var bsMonthFirstAdDate = covertBSToAD(bsYear, bsMonth, 1);
  if (adDate >= 1 && adDate < bsMonthFirstAdDate.getDate()) {
    bsMonth = bsMonth !== 1 ? bsMonth - 1 : 12;
    var bsMonthDays = getBsMonthDays(bsYear, bsMonth);
    bsDate = bsMonthDays - (bsMonthFirstAdDate.getDate() - adDate) + 1;
  } else {
    bsDate = adDate - bsMonthFirstAdDate.getDate() + 1;
  }

  return {
    bsYear: bsYear,
    bsMonth: bsMonth,
    bsDate: bsDate,
  };
};

/**
 * Return year dropdown for calender
 * @param {string} calenderType
 * @param {string} selectedYear
 *
 * @return Array
 */
export const getYearDropDown = (calenderType, selectedYear) => {
  let returnDropdown = [];

  if (calenderType === 'AD') {
    if (yearsAD.indexOf(selectedYear) < 0) {
      returnDropdown.push(
        <option value={selectedYear} key={selectedYear}>
          {selectedYear}
        </option>
      );
    }
    yearsAD.map((year) =>
      returnDropdown.push(
        <option value={year} key={year}>
          {year}
        </option>
      )
    );
  } else {
    if (yearsBS.indexOf(selectedYear) < 0) {
      returnDropdown.push(
        <option value={selectedYear} key={selectedYear}>
          {selectedYear}
        </option>
      );
    }
    yearsBS.map((year) =>
      returnDropdown.push(
        <option value={year} key={year}>
          {year}
        </option>
      )
    );
  }

  return returnDropdown;
};

/**
 * Return month dropdown for calender
 * @param {string} calenderType
 *
 * @return Array
 */
export const getMonthDropdown = (calenderType) => {
  let returnDropdown = [];

  if (calenderType === 'AD') {
    ConfigAD.adMonths.map((month, monthIndex) =>
      returnDropdown.push(
        <option value={monthIndex} key={monthIndex}>
          {month}
        </option>
      )
    );
  } else {
    ConfigBS.bsMonths.map((month, monthIndex) =>
      returnDropdown.push(
        <option value={monthIndex} key={monthIndex}>
          {month}
        </option>
      )
    );
  }

  return returnDropdown;
};

/**
 * Return weeks for calender
 * @param {string} calenderType
 *
 * @return Array
 */
export const getCalenderWeek = (calenderType) => {
  let returnWeek = [];

  if (calenderType === 'AD') {
    ConfigAD.adDays.map((item) => returnWeek.push(<th>{item}</th>));
  } else {
    ConfigBS.bsDays.map((item) => returnWeek.push(<th>{item}</th>));
  }
  return returnWeek;
};

/**
 * Return weeks for calender
 * @param {string} value is date format "YYYY-mm-DD"
 *
 * @return Object{
        year ,
        month,
        date,
        display,
      } || undefined
 */
export const refactoringDate = (value, calenderType) => {
  let enterYear = undefined;
  let enterMonth = undefined;
  let enterDate = undefined;
  let displayDate = undefined;

  if (value && !isEmpty(value)) {
    let dashSplitValue = value.split('-');
    if (dashSplitValue.length === 3) {
      enterYear = parseInt(dashSplitValue[0]);
      enterMonth = parseInt(dashSplitValue[1]) - 1;
      enterDate = parseInt(dashSplitValue[2]);

      if (enterMonth > 11 || enterMonth < 1) {
        enterMonth = 0;
      }
      if (calenderType === 'AD') {
        if (
          enterDate < 1 ||
          enterDate > parseInt(getDaysInMonthAD(enterYear, parseInt(enterMonth) + 1))
        ) {
          enterDate = 1;
        }
      }

      displayDate = `${enterYear}-${parseInt(enterMonth) + 1}-${enterDate}`;
    }
  }

  return displayDate
    ? {
        year: enterYear,
        month: enterMonth,
        date: enterDate,
        display: displayDate,
      }
    : undefined;
};

/**
 * Return body for calender
 * @param {string} calenderType
 * @param {int} useYear
 * @param {int} useMonth
 * @param {int} useDate
 * @param {function} setUseDate
 * @param {function} setActive
 * @param {int} selectedYear
 * @param {int} selectedMonth,
 * @param {int} selectedDate,
 * @param {function} setYear,
 * @param {function} setMonth,
 * @param {function} setDate,
 * @param {string} minDate,
 * @param {string} maxDate,
 *
 * @return Array
 */
export const getCalenderBody = (
  calenderType,
  useYear,
  useMonth,
  useDate,
  setUseDate,
  setActive,
  selectedYear,
  selectedMonth,
  selectedDate,
  setYear,
  setMonth,
  setDate,
  minDate,
  maxDate
) => {
  let today = new Date();
  let rowIndex = 0;
  let DynamicDatepickerCalender = [];
  let temp = [];
  let domDataArray = [];

  if (calenderType === 'AD') {
    for (let i = 1; i <= getDaysInMonthAD(useYear, useMonth + 1); i++) {
      DynamicDatepickerCalender[getStartingDayAD(useYear, parseInt(useMonth) + 1) + i - 1] = i;
    }

    for (let i = 0; i < DynamicDatepickerCalender.length; i++) {
      if (i !== 0 && i % 7 === 0) {
        temp[rowIndex] = domDataArray;
        rowIndex += 1;
        domDataArray = [];
      }

      if (DynamicDatepickerCalender[i]) {
        domDataArray.push(
          <td
            className={`date-selectable 
              ${
                DynamicDatepickerCalender[i] === today.getDate() &&
                useMonth === today.getMonth() &&
                useYear === today.getFullYear()
                  ? 'date-today'
                  : 'date-not-today'
              } 
            ${
              isClickAble(
                useYear,
                useMonth,
                DynamicDatepickerCalender[i],
                minDate,
                maxDate,
                calenderType
              )
                ? 'clickable'
                : 'date-disabled'
            }
            ${
              useYear === selectedYear &&
              useMonth === selectedMonth &&
              DynamicDatepickerCalender[i] === selectedDate
                ? 'date-selected'
                : 'date-not-selected'
            }`}
            onClick={() => {
              if (
                isClickAble(
                  useYear,
                  useMonth,
                  DynamicDatepickerCalender[i],
                  minDate,
                  maxDate,
                  calenderType
                )
              ) {
                setYear(useYear);
                setMonth(useMonth);
                setDate(DynamicDatepickerCalender[i]);
                setUseDate(parseInt(DynamicDatepickerCalender[i]));
                setActive(false);
              }
            }}
          >
            <div>{DynamicDatepickerCalender[i]}</div>
          </td>
        );
      } else {
        domDataArray.push(<td />);
      }
    }

    temp[rowIndex] = domDataArray;
  } else {
    let todayBS = covertADToBS(today.getFullYear(), today.getMonth() + 1, today.getDate());

    let refactoringMinBS = refactoringDate(minDate, 'BS');
    let minBS =
      refactoringMinBS &&
      covertADToBS(refactoringMinBS.year, refactoringMinBS.month, refactoringMinBS.date - 1);
    let minBSDate = minBS && `${minBS.bsYear}- ${minBS.bsMonth + 1}-${minBS.bsDate}`;
    let refactoringMaxBS = refactoringDate(maxDate, 'BS');
    let maxBS =
      refactoringMaxBS &&
      covertADToBS(refactoringMaxBS.year, refactoringMaxBS.month, refactoringMaxBS.date);
    let maxBSDate = maxBS && `${maxBS.bsYear}- ${maxBS.bsMonth + 1}-${maxBS.bsDate - 1}`;

    let test2 = covertBSToAD(useYear, useMonth + 1, 1);
    for (let i = 1; i <= getBsMonthDays(useYear, useMonth + 1); i++) {
      DynamicDatepickerCalender[
        getStartingDayAD(test2.getFullYear(), parseInt(test2.getMonth()) + 1, test2.getDate()) +
          i -
          1
      ] = i;
    }

    for (let i = 0; i < DynamicDatepickerCalender.length; i++) {
      if (i !== 0 && i % 7 === 0) {
        temp[rowIndex] = domDataArray;
        rowIndex += 1;
        domDataArray = [];
      }
      if (DynamicDatepickerCalender[i]) {
        domDataArray.push(
          <td
            className={`date-selectable
              ${
                DynamicDatepickerCalender[i] === todayBS?.bsDate &&
                useMonth + 1 === todayBS?.bsMonth &&
                useYear === todayBS?.bsYear
                  ? 'date-today'
                  : 'date-not-today'
              }
            ${
              isClickAble(
                useYear,
                useMonth,
                DynamicDatepickerCalender[i],
                minBSDate,
                maxBSDate,
                calenderType
              )
                ? 'clickable'
                : 'date-disabled'
            }
            ${
              useYear === selectedYear &&
              useMonth === selectedMonth &&
              DynamicDatepickerCalender[i] === selectedDate
                ? 'date-selected'
                : 'date-not-selected'
            }`}
            onClick={() => {
              if (
                isClickAble(
                  useYear,
                  useMonth,
                  DynamicDatepickerCalender[i],
                  minBSDate,
                  maxBSDate,
                  calenderType
                )
              ) {
                setYear(useYear);
                setMonth(useMonth);
                setDate(DynamicDatepickerCalender[i]);
                setUseDate(parseInt(DynamicDatepickerCalender[i]));
                setActive(false);
              }
            }}
          >
            <div>{DynamicDatepickerCalender[i]}</div>
          </td>
        );
      } else {
        domDataArray.push(<td />);
      }
    }

    temp[rowIndex] = domDataArray;
  }

  return (
    <>
      {temp.map((item) => (
        <tr>{item.map((item2) => item2)}</tr>
      ))}
    </>
  );
};

/**
 * Check if given date is clickable or not
 * @param {int} year
 * @param {int} month
 * @param {int} date
 * @param {string} minDate,
 * @param {string} maxDate,
 *
 * @return Boolean
 */
const isClickAble = (year, month, date, minDate, maxDate, calenderType) => {
  let minDateObject = refactoringDate(minDate, calenderType);
  let maxDateObject = refactoringDate(maxDate, calenderType);

  if (minDateObject && maxDateObject) {
    if (year > minDateObject.year && year < maxDateObject.year) {
      return true;
    }

    if (year === minDateObject.year && year === maxDateObject.year) {
      if (month === minDateObject.month && month === maxDateObject.month) {
        if (date >= minDateObject.date && date <= maxDateObject.date) {
          return true;
        }
      }
      if (month === minDateObject.month && month !== maxDateObject.month) {
        if (date >= minDateObject.date) {
          return true;
        }
      }

      if (month === maxDateObject.month && month !== minDateObject.month) {
        if (date <= maxDateObject.date) {
          return true;
        }
      }
      if (month > minDateObject.month && month < maxDateObject.month) {
        return true;
      }
    }

    if (year === minDateObject.year && year < maxDateObject.year) {
      if (month + 1 > minDateObject.month) {
        return true;
      }

      if (month + 1 === minDateObject.month) {
        if (date >= minDateObject.date) {
          return true;
        }
      }
    }

    if (year > minDateObject.year && year === maxDateObject.year) {
      if (month < maxDateObject.month) {
        return true;
      }

      if (month === maxDateObject.month) {
        if (date <= maxDateObject.date) {
          return true;
        }
      }
    }
  } else if (maxDateObject) {
    if (year < maxDateObject.year) {
      return true;
    }

    if (year === maxDateObject.year) {
      if (month < maxDateObject.month) {
        return true;
      }

      if (month === maxDateObject.month) {
        if (date <= maxDateObject.date) {
          return true;
        }
      }
    }
  } else if (minDateObject) {
    if (year > minDateObject.year) {
      return true;
    }

    if (year === minDateObject.year) {
      if (month > minDateObject.month) {
        return true;
      }

      if (month === minDateObject.month) {
        if (date >= minDateObject.date) {
          return true;
        }
      }
    }
  } else {
    return true;
  }

  return false;
};
