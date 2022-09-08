import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import MaskedInput from 'antd-mask-input';

import { isFunction } from '../../../utils/commonUtil';

const MaskedInputWithSearch = React.forwardRef(
  ({ placeholder, mask, onSearch, onChange, onSelect, notFoundContent = <></>, ...rest }, ref) => {
    const [showSearch, setShowSearch] = useState(false);
    const [data, setData] = useState([]);

    const handleSearch = (value) => {
      if (value && isFunction(onSearch)) {
        onSearch(value, (data) => setData(data));
      } else {
        setData([]);
      }
    };

    const handleSelect = (value) => {
      onChange(value);
      setData([]);
      setShowSearch(false);

      if (isFunction(onSelect)) {
        onSelect(value);
      }
    };

    return (
      <>
        <MaskedInput
          autoComplete="off"
          // allowClear
          // ref={ref}
          placeholder={placeholder}
          mask={mask}
          onChange={(e) => {
            const value = e.target.value.split('_')[0];
            onChange(value);
            if (value.length >= 1) {
              setShowSearch(true);
              handleSearch(value);
            } else {
              setShowSearch(false);
            }
          }}
          {...rest}
        />
        {showSearch && (
          <div className="dropdown-container">
            {!isEmpty(data)
              ? data.map((item, index) => {
                  return (
                    <p
                      className="dropdown-item"
                      key={index}
                      onClick={() => {
                        handleSelect(item?.value);
                      }}
                    >
                      {item?.label}
                    </p>
                  );
                })
              : notFoundContent}
          </div>
        )}
      </>
    );
  }
);
export default MaskedInputWithSearch;
