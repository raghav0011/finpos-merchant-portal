import React from 'react';
import classNames from 'classnames';
import { Table } from 'antd';

const WTable = (props) => {
  const {
    className,
    scroll = { x: 'max-content' },
    rowClassName,
    bordered = true,
    columns,
    dataSource,
    rowKey,
    pagination,
    handleTableChange,
    ...rest
  } = props;

  const getRowKey = (record) => {
    if (typeof rowKey === 'string') {
      return record?.[rowKey];
    } else if (typeof rowKey === 'function') {
      rowKey(record);
    }
  };
  let paginationObj = {
    total: pagination?.total,
    showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total}`,
    showSizeChanger: true,
    current: pagination?.page,
    pageSizeOptions: [5, 10, 20, 50, 100],
    totalPages: pagination?.totalPages,
    // perPage: pagination?.perPage,
  };

  return (
    <Table
      className={classNames('table-root', className)}
      rowKey={getRowKey}
      // rowClassName={(record, index) => {
      //   if (typeof rowClassName === 'function' && typeof rowClassName() === 'string') {
      //     return rowClassName();
      //   }
      //   return index % 2 === 0
      //     ? 'table-default-row table-row-light'
      //     : 'table-default-row table-row-dark';
      // }}
      columns={columns.filter((d) => d.isVisible !== false)}
      scroll={scroll}
      dataSource={dataSource instanceof Array ? dataSource : []}
      pagination={pagination ? paginationObj : false}
      bordered={bordered}
      onChange={handleTableChange}
      {...rest}
    />
  );
};

export default WTable;
