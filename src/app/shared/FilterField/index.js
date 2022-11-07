import React from 'react';
import { useTranslation } from 'react-i18next';

import DynamicFieldSet from './DynamicField';
import { Col } from 'antd';

const FilterField = (props) => {
  const { t } = useTranslation();

  return <DynamicFieldSet {...props} />;
};

export default FilterField;
