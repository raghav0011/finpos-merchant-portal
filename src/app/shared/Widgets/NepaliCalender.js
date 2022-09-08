import React, { forwardRef, useState } from 'react';
import DynamicDatepicker from '../DynamicDatePicker';

const NepaliCalender = (props, ref) => {
  const [isDateTouched, setIsDateTouched] = useState(false);

  const {
    disabled,
    onChange,
    placeholder,

    viableDate, // viable date must be an array of length 1 or 2 with value of start and end interval

    value,
    bs = true,
    ad = true,
  } = props;

  const getViableDate = () => {
    if (!(viableDate instanceof Array)) return [false, false];
    if (viableDate.length === 0) return [false, false];
    if (viableDate.length === 1) return [...viableDate, false];
    if (viableDate.length > 2) return [false, false];
    return viableDate;
  };

  return (
    <>
      <DynamicDatepicker
        className="dynamic-datepicker"
        bs={bs}
        ad={ad}
        bsId={'BS'}
        adId={'AD'}
        adValue={value} // initialization available only in ad mode
        onValueChange={(event) => {
          if (event?.target?.id === 'AD') {
            onChange(event.target.value);
          }
        }}
        disabled={disabled}
        setIsDateTouched={setIsDateTouched}
        datePlaceholder={placeholder}
        maxDate={getViableDate()?.[1]}
        minDate={getViableDate()?.[0]}
      />
    </>
  );
};

export default forwardRef(NepaliCalender);
// export default NepaliCalender;
