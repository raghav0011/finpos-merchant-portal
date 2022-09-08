import React from 'react';
import { WTable } from '.';
import { Input, Row, Col, Card } from 'antd';
import DynamicSearch from './DynamicSearch';
import { UnorderedListOutlined } from '@ant-design/icons';

// const { Search } = Input;

const ListDisplay = (props) => {
  const {
    title,
    columns,
    suffix,
    prefix,
    dataSource,
    handleTableChange,
    onSearch,
    extraTitleContent,
    pagination,
    searchLoading,
    tableLoading,
    extraCardContent,
    rowKey = 'id',
    showSearch = true,
    ...rest
  } = props;

  return (
    <Card title={title} bordered={false} extra={extraCardContent} className="">
      <Row className="mb-2" gutter={16}>
        <Col xs={24} lg={10} className="text-left mb-2 mb-lg-0" span={24} offset={14}>
          {showSearch && (
            <Input
              loading={false}
              name="fullText"
              // allowClear
              placeholder=" Search..."
              onChange={(e) => {
                e.preventDefault();

                // if (e.target.value !== '') {
                onSearch(e.target.value);
                // }
                // return null;
              }}
              // type="search"
              style={{ width: '100%', margin: '5px' }}
              suffix={suffix}
              size="large"
              prefix={prefix}
            />
          )}
        </Col>
        {extraTitleContent && (
          <Col xs={24} lg={14} className="text-right mb-2 mb-lg-0">
            {extraTitleContent}
          </Col>
        )}
      </Row>
      <WTable
        dataSource={dataSource}
        columns={columns}
        rowKey={rowKey}
        pagination={pagination}
        loading={tableLoading}
        onChange={handleTableChange}
        {...rest}
      />
    </Card>
  );
};

export default ListDisplay;
