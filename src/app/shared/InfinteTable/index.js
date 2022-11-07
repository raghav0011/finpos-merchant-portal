import React, { useState } from 'react';
import { Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

const InfiniteTable = (props) => {
  const { columns, rowKey, dataSource, fetchMoreData, total, onChange, loading = false } = props;

  const [sorter, setSorter] = useState({});

  return (
    <>
      <InfiniteScroll
        dataLength={dataSource.length}
        next={fetchMoreData}
        hasMore={dataSource.length !== total || loading}
        // height={100}
        loader={
          <div className={`text-center ${dataSource.length > 0 ? 'pt-4' : 'pt-5'} pb-4`}>
            <Spin />
          </div>
        }
        endMessage={
          <div style={{ textAlign: 'center', borderBottom: 'black solid 1px' }} className="py-3">
            {dataSource.length > 0 && !loading
              ? 'No more data'
              : dataSource.length === 0
              ? 'No data'
              : ''}
          </div>
        }
      >
        <table className="ant-table-fixed infinite-table-thead " style={{ width: '100%' }}>
          <thead className="ant-table-thead">
            <tr className="">
              {columns?.map((item) => (
                <th key={item?.title} className={`${item?.sorter && `hoverable`} `}>
                  <span className="ant-table-header-column">
                    <div
                      className="d-flex "
                      onClick={() => {
                        if (item?.sorter) {
                          const sorterPayload = {
                            column: item,
                            field: item?.dataIndex,
                            order:
                              sorter?.order === 'ascend' && sorter?.field === item?.dataIndex
                                ? 'descend'
                                : sorter?.order === 'descend' && sorter?.field === item?.dataIndex
                                ? ''
                                : 'ascend',
                          };
                          setSorter(sorterPayload);
                          onChange(item, '', sorterPayload);
                        }
                      }}
                    >
                      <span className="ant-table-column-title">{item?.title}</span>
                      <span className="ant-table-column-sorter my-auto">
                        {item?.sorter && (
                          <div
                            title="Sort"
                            class="ant-table-column-sorter-inner ant-table-column-sorter-inner-full"
                          >
                            <i
                              aria-label="icon: caret-up"
                              className={`anticon anticon-caret-up ant-table-column-sorter-up
                        ${
                          sorter?.order === 'ascend' && sorter?.field === item?.dataIndex
                            ? 'on'
                            : 'off'
                        }`}
                            >
                              <svg
                                viewBox="0 0 1024 1024"
                                focusable="false"
                                class=""
                                data-icon="caret-up"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
                              </svg>
                            </i>
                            <i
                              aria-label="icon: caret-down"
                              className={`anticon anticon-caret-up ant-table-column-sorter-up
                        ${
                          sorter?.order === 'descend' && sorter?.field === item?.dataIndex
                            ? 'on'
                            : 'off'
                        }`}
                            >
                              <svg
                                viewBox="0 0 1024 1024"
                                focusable="false"
                                class=""
                                data-icon="caret-down"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                              </svg>
                            </i>
                          </div>
                        )}
                      </span>
                    </div>
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="ant-table-tbody">
            {dataSource.map((row, rowIndex) => (
              <tr className="ant-table-row ant-table-row-level-0" key={rowIndex}>
                {columns?.map((column, colIndex) => (
                  <td key={colIndex}>
                    {dataSource.length > 0 && column?.render('', dataSource[rowIndex], rowIndex)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
      <div className="ant-pagination-total-text px-1 float-right">
        Showing {dataSource?.length ?? 0} of {total ?? 0}
      </div>
    </>
  );
};

export default InfiniteTable;
