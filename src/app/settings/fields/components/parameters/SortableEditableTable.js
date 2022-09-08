import React, { useState, useEffect, useContext } from 'react';
import { Form, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { arrayMoveImmutable } from 'array-move';
import { PlusOutlined } from '@ant-design/icons';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import { WButton } from '../../../../shared/Widgets';
import './style.css';
import FieldsContext from '../FieldsContext';

const SortableItem = SortableElement((props) => {
  const { RowComponent, ...rest } = props;

  return <RowComponent {...rest} />;
});

const SortableList = SortableContainer((props) => {
  const { fields, tableHeader } = props;
  const { t } = useTranslation();

  const tableHeaders = (
    <thead>
      <tr>
        {tableHeader instanceof Array &&
          tableHeader.map((item, index) => {
            if (!item) return <th></th>;
            else if (item === 'is_required' || item === 'is_active' || item === 'is_read_only')
              return <th className="check">{t(`field.table.headers.${item}`)}</th>;
            else return <th>{t(`field.table.headers.${item}`)}</th>;
          })}
      </tr>
    </thead>
  );

  return (
    <table className="field-table">
      {tableHeaders}
      <tbody>
        {fields.map((field, index) => (
          <SortableItem key={`item-${index}`} index={index} field={field} {...props} />
        ))}
      </tbody>
    </table>
  );
});

const SortableEditableTable = (props) => {
  const { form, listName, RowComponent, tableHeader, fieldsLoading } = props;
  const { visible, editMode } = useContext(FieldsContext);
  const [temp, setTemp] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (temp.length > 0) {
      form.setFields([
        {
          name: ['fields'],
          value: temp,
        },
      ]);
    }
  }, [temp]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let params = form.getFieldValue('fields');
    if (oldIndex !== newIndex) {
      setTemp(() => {
        return arrayMoveImmutable([].concat(params), oldIndex, newIndex).filter((el) => {
          return !!el;
        });
      });
    }
  };

  let sortableListProps = {
    form,
    listName,
    t,
    RowComponent,
    tableHeader,
  };
  return (
    <Spin spinning={fieldsLoading}>
      <Form.List name={[props.listName]} initialValue={[{}]}>
        {(fields, operations, errors) => {
          return (
            <>
              <SortableList
                useDragHandle
                fields={fields}
                operations={operations}
                {...sortableListProps}
                onSortEnd={onSortEnd}
              />
              <Form.Item wrapperCol={{ xs: 24, sm: 12, md: 12, lg: 8 }}>
                <WButton
                  type="dashed"
                  onClick={() => operations.add()}
                  block
                  icon={<PlusOutlined />}
                  disabled={!editMode && visible}
                >
                  Add Fields
                </WButton>
              </Form.Item>
            </>
          );
        }}
      </Form.List>
    </Spin>
  );
};

export default React.memo(SortableEditableTable);
