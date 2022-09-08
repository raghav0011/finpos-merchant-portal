import React, { useState, useEffect } from 'react';
import { WCustomSearchTable } from '.';
import { Checkbox, Button, Popover, Radio } from 'antd';
import { FilterOutlined, ReloadOutlined, MenuOutlined } from '@ant-design/icons';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';

let CheckboxGroup = Checkbox.Group;

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'pointer', color: '#999', fontSize: '14px', paddingTop: '6px' }} />
));

const SortableItem = SortableElement((props) => {
  const { item, index } = props;

  return (
    <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }} className="mb-1">
      <DragHandle />
      <span>{item?.title}</span>
    </div>
  );
});

const SortableList = SortableContainer((props) => {
  const { sortedColumns } = props;

  return (
    <div>
      {sortedColumns.map((item, index) => {
        return <SortableItem item={item} index={index} />;
      })}
    </div>
  );
});

const CustomizableColumnTable = (props) => {
  const { columns, noOInitialColumns = 5, ...rest } = props;

  const [sortedColumns, setSortedColumns] = useState(columns);
  const [checkedValues, setCheckedValues] = useState([]);
  const [shownColumns, setShownColumns] = useState([]);
  const [filterType, setFilterType] = useState('showColumns');

  const filterOptions = [
    { label: 'Pick ', value: 'showColumns' },
    { label: 'Order ', value: 'orderColumns' },
  ];

  let checkOptions = () => {
    if (!columns instanceof Array) return [];
    let checkboxes = columns.map((item) => {
      return { label: item?.title, value: item?.dataIndex || item?.key };
    });
    return checkboxes;
  };

  const onChange = (value, e) => {
    setCheckedValues(value);
  };

  useEffect(() => {
    setSortedColumns(columns);
    setShownColumns(columns.slice(0, noOInitialColumns + 1));
    let defaultValues = columns
      .slice(0, noOInitialColumns + 1)
      .map((item) => item.dataIndex || item.key);
    setCheckedValues(defaultValues);
  }, [columns]);

  useEffect(() => {
    if (sortedColumns instanceof Array && sortedColumns.length > 0) {
      let newCols = sortedColumns.filter(
        (item) => checkedValues.includes(item.dataIndex) || checkedValues.includes(item.key)
      );
      setShownColumns(newCols);
    }
  }, [checkedValues, sortedColumns]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      setSortedColumns(() => {
        return arrayMoveImmutable([].concat(sortedColumns), oldIndex, newIndex).filter(
          (el) => !!el
        );
      });
    }
  };

  let selectComponent = (
    <>
      <Popover
        placement="bottom"
        overlayClassName="customizable-table-popover"
        content={
          <div
            style={{ maxWidth: '25ch', width: '22ch', height: 500, overflow: 'auto' }}
            className="customizable-table-popover-content"
          >
            <div className="text-right">
              <Button
                type="default"
                icon={<ReloadOutlined />}
                className="mb-2"
                onClick={() => {
                  setSortedColumns(columns);
                  let defaultValues = columns
                    .slice(0, noOInitialColumns + 1)
                    .map((item) => item.dataIndex || item.key);
                  setCheckedValues(defaultValues);
                }}
              >
                Reset
              </Button>
            </div>
            <div className="text-right">
              <Radio.Group
                options={filterOptions}
                onChange={(e) => {
                  setFilterType(e.target.value);
                }}
                value={filterType}
                optionType="button"
              >
                {filterOptions.map((item) => {
                  return (
                    <Radio.Button key={item.value} value={item.value}>
                      {item.label}
                    </Radio.Button>
                  );
                })}
              </Radio.Group>
            </div>
            <div>
              {filterType === 'orderColumns' ? (
                <SortableList
                  useDragHandle
                  disableAutoscroll
                  onSortEnd={onSortEnd}
                  transitionDuration={250}
                  sortedColumns={sortedColumns}
                />
              ) : filterType === 'showColumns' ? (
                <div>
                  <CheckboxGroup
                    style={{ display: 'flex', flexDirection: 'column' }}
                    value={checkedValues}
                    // options={checkOptions()}
                    onChange={onChange}
                  >
                    {checkOptions().map((item, index) => {
                      return (
                        <div
                          key={index}
                          style={{ display: 'flex', justifyContent: 'space-between' }}
                          className="mb-1"
                        >
                          <Checkbox {...item}>{item.label}</Checkbox>
                        </div>
                      );
                    })}
                  </CheckboxGroup>
                </div>
              ) : null}
            </div>
          </div>
        }
        trigger="click"
      >
        <Button icon={<FilterOutlined />}>Filter Columns</Button>
      </Popover>
    </>
  );

  return (
    <WCustomSearchTable {...rest} extraTitleContent={selectComponent} columns={shownColumns} />
  );
};

export default CustomizableColumnTable;
