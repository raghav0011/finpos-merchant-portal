import React, { useEffect, useState } from 'react';

import './index.css';
import {
  nextButton,
  backButton,
  covertADToBS,
  covertBSToAD,
  getCalenderBody,
  getCalenderWeek,
  getMonthDropdown,
  getYearDropDown,
  isEmpty,
  refactoringDate,
  calenderIcon,
} from './helper';
import { Input, Divider } from 'antd';

/**
 * Return datepicker input
 * @param {string} props.minDate, default false, format('YYYY-mm-DD')
 * @param {string} props.maxDate, default false, format('YYYY-mm-DD')
 * @param {string} props.className
 * @param {string} props.bs, default false,
 * @param {string} props.bsValue
 * @param {string} props.bsId
 * @param {string} props.ad, default true,
 * @param {string} props.adId
 * @param {string} props.adValue
 * @param {string} props.datePlaceholder
 * @param {function} props.onValueChange
 */
const useDatepicker = (props) => {
  const {
    minDate = false,
    maxDate = false,
    className,
    bs = true,
    bsId,
    ad = true,
    adId,
    adValue,
    datePlaceholder = ' ',
    onValueChange,
    setIsDateTouched,
    disabled = false,
  } = props;
  const date = new Date();

  // #region states
  // when date is fetched
  const [first, setFirst] = useState(false);
  // toggle datepicker box
  const [datepickerActive, setDatepickerActive] = useState(false);
  // datepicker set to AD as AD is default true
  const [datepickerCalenderType, setDatepickerCalenderType] = useState(ad ? 'AD' : 'BS');
  // for datepicker division year & month dropdown
  const [datepickerSelectedYear, setDatepickerSelectedYear] = useState(date.getFullYear());
  const [datepickerSelectedMonth, setDatepickerSelectedMonth] = useState(date.getMonth());
  const [datepickerSelectedDate, setDatepickerSelectedDate] = useState(date.getDate());
  // for actual main date division of datepicker actual selected date
  const [selectedYear, setSelectedYear] = useState(undefined);
  const [selectedMonth, setSelectedMonth] = useState(undefined);
  const [selectedDate, setSelectedDate] = useState(undefined);
  // date to display in input box
  const [displayDate, setDisplayDate] = useState(undefined);
  // #endregion states

  // if ad in initial render is false
  useEffect(() => {
    if (!ad) {
      let tempDate = covertADToBS(
        datepickerSelectedYear,
        datepickerSelectedMonth + 1,
        datepickerSelectedDate
      );

      setDatepickerSelectedYear(tempDate?.bsYear);
      setDatepickerSelectedMonth(tempDate?.bsMonth - 1);
      setDatepickerSelectedDate(tempDate?.bsDate);

      let tempSelectedDate = covertADToBS(selectedYear, selectedMonth + 1, selectedDate);
      setSelectedYear(tempSelectedDate?.bsYear);
      setSelectedMonth(tempSelectedDate?.bsMonth - 1);
      setSelectedDate(tempSelectedDate?.bsDate);
    }
    return () => {};
  }, []);

  // @function handleCalenderTypeChange
  // @param {string} calenderType either 'AD' or 'BS'
  const handleCalenderTypeChange = (calenderType) => {
    if (calenderType === 'AD') {
      let tempDate = covertBSToAD(
        datepickerSelectedYear,
        datepickerSelectedMonth + 1,
        datepickerSelectedDate
      );
      setDatepickerSelectedYear(tempDate.getFullYear());
      setDatepickerSelectedMonth(tempDate.getMonth());
      setDatepickerSelectedDate(tempDate.getDate());

      let tempSelectedDate = covertBSToAD(selectedYear, selectedMonth + 1, selectedDate);
      setSelectedYear(tempSelectedDate.getFullYear());
      setSelectedMonth(tempSelectedDate.getMonth());
      setSelectedDate(tempSelectedDate.getDate());
    } else {
      let tempDate = covertADToBS(
        datepickerSelectedYear,
        datepickerSelectedMonth + 1,
        datepickerSelectedDate
      );

      setDatepickerSelectedYear(tempDate?.bsYear);
      setDatepickerSelectedMonth(tempDate?.bsMonth - 1);
      setDatepickerSelectedDate(tempDate?.bsDate);

      let tempSelectedDate = covertADToBS(selectedYear, selectedMonth + 1, selectedDate);
      setSelectedYear(tempSelectedDate?.bsYear);
      setSelectedMonth(tempSelectedDate?.bsMonth - 1);
      setSelectedDate(tempSelectedDate?.bsDate);
    }
  };

  // #region sideeffects
  // @INIT
  // add event listener when datepicker is opened
  //   remove even listener when datepicker is off
  useEffect(() => {
    document.addEventListener('mouseup', (e) => {
      const dynamicDatepicker = document.getElementById('dynamic-datepicker');
      if (dynamicDatepicker && !dynamicDatepicker?.contains(e.target)) {
        setDatepickerActive(false);
      }
    });
    return () => {
      document.removeEventListener('mouseup', (e) => {});
    };
  }, []);

  // @Init
  //     initialValue of datepicker set that date into respective states
  useEffect(() => {
    if (!first && adValue && !isEmpty(adValue) && datepickerCalenderType === 'AD') {
      let refactoredDate = refactoringDate(adValue, datepickerCalenderType);

      if (
        refactoredDate &&
        refactoredDate.year &&
        (refactoredDate.month || refactoredDate.month === 0) &&
        refactoredDate.date
      ) {
        setDatepickerSelectedYear(refactoredDate.year);
        setDatepickerSelectedMonth(refactoredDate.month);
        setDatepickerSelectedDate(refactoredDate.date);
        setSelectedYear(refactoredDate.year);
        setSelectedMonth(refactoredDate.month);
        setSelectedDate(refactoredDate.date);
        setDisplayDate(refactoredDate.display);
        setFirst(true);
      } else {
        setDisplayDate('');
      }
    } else if (!adValue) {
      setDisplayDate('');
    }
  }, [adValue]);

  // when selected year, month or date changes
  useEffect(() => {
    let refactoredDate =
      selectedYear && (selectedMonth || selectedMonth === 0) && selectedDate
        ? refactoringDate(
            `${selectedYear}-${selectedMonth + 1}-${selectedDate}`,
            datepickerCalenderType
          )
        : undefined;

    if (refactoredDate) {
      setDisplayDate(refactoredDate.display);
      if (datepickerCalenderType === 'AD') {
        let temp = {
          target: {
            value: refactoredDate.display,
            id: adId,
          },
        };
        onValueChange(temp);

        let covertData = covertADToBS(selectedYear, selectedMonth + 1, selectedDate);

        let temp2 = {
          target: {
            value: `${covertData.bsYear}-${covertData.bsMonth}-${covertData.bsDate}`,
            id: bsId,
          },
        };
        onValueChange(temp2);
      } else {
        let temp = {
          target: {
            value: refactoredDate.display,
            id: bsId,
          },
        };
        onValueChange(temp);

        let covertData = covertBSToAD(selectedYear, selectedMonth + 1, selectedDate);

        let temp2 = {
          target: {
            value: `${covertData.getFullYear()}-${
              covertData.getMonth() + 1
            }-${covertData.getDate()}`,
            id: adId,
          },
        };
        onValueChange(temp2);
      }
    }
  }, [selectedYear, selectedMonth, selectedDate]);
  // #endregion sideeffects

  return (
    <>
      <div className={'datepicker-input-div'}>
        <Input
          disabled={disabled}
          readOnly
          value={displayDate}
          className={className}
          maxLength={10}
          placeholder={datePlaceholder}
          onClick={() => {
            setDatepickerActive(true);
            if (selectedYear && selectedMonth && selectedDate) {
              setDatepickerSelectedYear(selectedYear);
              setDatepickerSelectedMonth(selectedMonth);
              setDatepickerSelectedDate(selectedDate);
            }
          }}
          onChange={(e) => {
            setDisplayDate(e.target.value);
          }}
          onBlur={(e) => {
            if (isEmpty(e.target.value)) {
              let temp = {
                target: {
                  value: undefined,
                  id: bsId,
                },
              };
              onValueChange(temp);

              let temp2 = {
                target: {
                  value: undefined,
                  id: adId,
                },
              };
              onValueChange(temp2);

              setSelectedYear(undefined);
              setSelectedMonth(undefined);
              setSelectedDate(undefined);
            } else {
              let refactoredDate = refactoringDate(e.target.value, datepickerCalenderType);
              if (
                refactoredDate &&
                refactoredDate.year &&
                (refactoredDate.month || refactoredDate.month === 0) &&
                refactoredDate.date
              ) {
                setDatepickerSelectedYear(refactoredDate.year);
                setDatepickerSelectedMonth(refactoredDate.month);
                setDatepickerSelectedDate(refactoredDate.date);
                setSelectedYear(refactoredDate.year);
                setSelectedMonth(refactoredDate.month);
                setSelectedDate(refactoredDate.date);

                setDisplayDate(refactoredDate.display);
              } else {
                setDisplayDate('');
              }
            }
          }}
          addonAfter={<span className="mx-1">{datepickerCalenderType}</span>}
          suffix={<span className="datepicker-input-postfix">{calenderIcon}</span>}
        />
      </div>

      {datepickerActive && (
        <div id={'dynamic-datepicker'}>
          <div className="date-wrapper">
            <div className="date-header">
              <div
                className="date-header-btn"
                onClick={() => {
                  let temp = parseInt(datepickerSelectedMonth);
                  if (temp - 1 < 0) {
                    temp = 11;
                    setDatepickerSelectedYear(datepickerSelectedYear - 1);
                  } else {
                    temp -= 1;
                  }
                  setDatepickerSelectedMonth(temp);
                }}
              >
                {backButton}
              </div>
              <select
                className="date-header-select"
                onChange={(e) => {
                  setDatepickerSelectedYear(parseInt(e.target.value));
                }}
                value={datepickerSelectedYear}
              >
                {getYearDropDown(datepickerCalenderType, datepickerSelectedYear)}
              </select>
              <select
                className="date-header-select"
                onChange={(e) => {
                  setDatepickerSelectedMonth(parseInt(e.target.value));
                }}
                value={datepickerSelectedMonth}
              >
                {getMonthDropdown(datepickerCalenderType)}
              </select>
              <select
                className="date-header-select"
                defaultValue={datepickerCalenderType}
                onChange={(e) => {
                  handleCalenderTypeChange(e.target.value);
                  setDatepickerCalenderType(e.target.value);
                }}
              >
                {ad && (
                  <option key={'AD'} value={'AD'}>
                    AD
                  </option>
                )}
                {bs && (
                  <option key={'BS'} value={'BS'}>
                    BS
                  </option>
                )}
              </select>
              <div
                className="date-header-btn"
                onClick={() => {
                  let temp = parseInt(datepickerSelectedMonth);
                  if (temp + 1 > 11) {
                    temp = 0;
                    setDatepickerSelectedYear(datepickerSelectedYear + 1);
                  } else {
                    temp += 1;
                  }
                  setDatepickerSelectedMonth(temp);
                }}
              >
                {nextButton}
              </div>
            </div>
            <Divider style={{ margin: '5px 10px' }} />
            <div className="date-body mb-1">
              <table>
                <thead>
                  <tr>{getCalenderWeek(datepickerCalenderType)}</tr>
                </thead>
                <tbody id={'dynamic-datepicker-body'} onClick={() => setIsDateTouched(true)}>
                  {getCalenderBody(
                    datepickerCalenderType,
                    datepickerSelectedYear,
                    datepickerSelectedMonth,
                    datepickerSelectedDate,
                    setDatepickerSelectedDate,
                    setDatepickerActive,
                    selectedYear,
                    selectedMonth,
                    selectedDate,
                    setSelectedYear,
                    setSelectedMonth,
                    setSelectedDate,
                    minDate,
                    maxDate
                  )}
                </tbody>
              </table>
            </div>
            <div className="calender-footer">
              <span
                className="today-btn"
                onClick={() => {
                  let today = new Date();
                  let adDate = today.getDate();
                  let adMonth = today.getMonth();
                  let adYear = today.getFullYear();
                  let todayBS = covertADToBS(adYear, adMonth + 1, adDate);
                  if (datepickerCalenderType === 'AD') {
                    setSelectedDate(adDate);
                    setSelectedMonth(adMonth);
                    setSelectedYear(adYear);
                  } else if (datepickerCalenderType === 'BS') {
                    setSelectedDate(todayBS.bsDate);
                    setSelectedMonth(todayBS.bsMonth - 1);
                    setSelectedYear(todayBS.bsYear);
                  }
                  setDatepickerActive(false);
                }}
              >
                Today
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default useDatepicker;
