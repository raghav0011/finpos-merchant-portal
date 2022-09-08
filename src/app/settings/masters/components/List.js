import React from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import { WCustomSearchTable } from '../../../shared/Widgets';

const List = (props) => {
  const { t } = useTranslation();

  const {
    masters,
    mastersLoading,
    fetchMastersByObjectType,
    setViewMode,
    showModal,
    selectType,
    objectType,
    setCurrentMastersId,
    setObjectType,
    fetchMastersWithCriteria,
  } = props;

  const onFinish = (value) => {
    fetchMastersWithCriteria({ search_key: value, object_type: objectType });
  };

  const columns = [
    {
      title: t('table.serial.num'),
      width: '6%',
      key: 'index',
      align: 'center',
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: 'Label',
      dataIndex: 'label',
      align: 'left',
    },
    {
      title: 'Key',
      dataIndex: 'value',
      align: 'left',
    },
  ];

  const tableProps = {
    columns: columns,
    dataSource: masters?.data || masters,
    rowKey: 'id',
    tableLoading: mastersLoading,
    pagination: false,
    className: 'clickable-table-row',
    onSearch: onFinish,
    onRow: (record, rowIndex) => {
      return {
        onClick: (e) => {
          setCurrentMastersId(record.id);
          setViewMode(true);
          showModal();
        },
      };
    },
    // showSearch: false,
    extraTitleContent: objectType && (
      <Select
        options={selectType}
        style={{ width: 200, textAlign: 'left' }}
        value={objectType}
        onChange={(value) => {
          fetchMastersByObjectType(value);
          setObjectType(value);
        }}
        placeholder="Select type"
      />
    ),
  };

  return (
    <>
      <WCustomSearchTable {...tableProps} />
    </>
  );
};

export default withRouter(List);
