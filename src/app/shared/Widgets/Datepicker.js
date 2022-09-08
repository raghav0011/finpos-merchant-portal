import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const Datepicker = ({ onChange, value, ...props }) => {
  // this is to used in forms only. will probably break if used as stand alone(not sure)
  return (
    <DatePicker
      style={{ width: '100%' }}
      value={value ? moment(value) : undefined}
      onChange={(e) => {
        if (e) {
          onChange(moment(e).format('YYYY-MM-DD'));
        } else {
          onChange(undefined);
        }
      }}
      {...props}
    />
  );
};

export default Datepicker;
