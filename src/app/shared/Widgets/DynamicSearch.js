import React, { useState } from 'react';
import { Select } from 'antd';
import classNames from 'classnames';
import { isFunction } from '../../../utils/commonUtil';

const { Option } = Select;

/**
 *
 * @prop {function} onSearch(value,callback) must call the callback function provided which provides the option for the select
 */
const DynamicSearch = (
  {
    placeholder,
    style,
    onSearch,
    onChange,
    className,
    onClear,
    onSelect,
    loading = false,
    ...rest
  },
  ref
) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState();

  const handleSearch = (value) => {
    if (value && isFunction(onSearch)) {
      onSearch(value, (data) => setData(data));
    } else {
      setData([]);
    }
  };

  const handleChange = (value) => {
    // setValue(value);
    if (isFunction(onChange)) {
      onChange(value);
    }
  };
  const handleSelect = (value) => {
    setValue(value);
    if (isFunction(onSelect)) {
      onSelect(value);
    }
  };

  const handleClear = () => {
    setData([]);
    setValue();
    if (isFunction(onClear)) {
      onClear();
    }
  };

  const options = data.map((d) => (
    <Option key={d.value} value={d.value} title={d?.title}>
      {d.label}
    </Option>
  ));
  return (
    <Select
      loading={loading}
      ref={ref}
      dropdownClassName="dynamic-search"
      className={classNames(className)}
      allowClear
      showSearch
      value={value}
      placeholder={placeholder ?? 'Search'}
      style={{
        minWidth: '30ch',
        ...style,
      }}
      optionLabelProp="title"
      defaultActiveFirstOption={false}
      showArrow={true}
      filterOption={false}
      onSearch={handleSearch}
      onClear={handleClear}
      onChange={handleChange}
      onSelect={handleSelect}
      {...rest}
    >
      {options}
    </Select>
  );
};
export default React.forwardRef(DynamicSearch);
