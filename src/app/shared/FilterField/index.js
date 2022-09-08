import React from 'react';
import { useTranslation } from 'react-i18next';

import DynamicField from './DynamicField';
import { Col } from 'antd';

const FilterField = (props) => {
  const { t } = useTranslation();

  return (
    <div className="table-responsive filter-field-table">
      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
        <table className="table table-borderless">
          <thead>
            <tr>
              <th style={{ width: '30%' }}> {t('filter.field.fields.label')}</th>
              <th style={{ width: '30%' }}> {t('filter.field.condition.label')}</th>
              <th style={{ width: '40%' }}>{t('filter.field.value.label')}</th>
            </tr>
          </thead>

          <tbody className="filter-field-item">
            <DynamicField {...props} />
          </tbody>
        </table>
      </Col>
    </div>
  );
};

export default FilterField;
