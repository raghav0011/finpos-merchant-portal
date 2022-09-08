import React from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';

const Timepicker = ({ onChange, value, ...props }) => {
  // this is to used in forms only. will probably break if used as stand alone(not sure)
  return (
    <TimePicker
      style={{ width: '100%' }}
      value={
        value
          ? moment()
              .hour(value?.split(':')[0])
              .minute(value?.split(':')[1])
              .second(value?.split(':')?.[2] || 0)
          : undefined
      }
      onChange={(e) => {
        if (e) {
          onChange(moment(e).format(props?.format || 'hh:mm:ss'));
        } else {
          onChange(undefined);
        }
      }}
      {...props}
    />
  );
};

export default Timepicker;
