import React from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import { FilePdfOutlined, FileExcelOutlined, PlusCircleOutlined } from '@ant-design/icons';

const  WButton = (props) => {
  const {
    customType, // submit,reset,exportXls,exportPdf,edit,add
    className,
    style,
    icon,
    full = false, // for full width button
    quarter = false, // for quarter width button
    half = false, // for half width button
    ...rest
  } = props;

  const customClasses = () => {
    switch (customType) {
      case 'submit':
        return 'submit';
      case 'reset':
        return 'reset';
      case 'exportXls':
        return 'xls-export';
      case 'exportPdf':
        return 'pdf-export';
      case 'edit':
        return 'edit';
      case 'add':
        return 'add';
      default:
        return null;
    }
  };

  const getIcon = () => {
    if (icon) return icon;
    if (customType === 'exportXls') return <FileExcelOutlined />;
    if (customType === 'exportPdf') return <FilePdfOutlined />;
    if (customType === 'add') return <PlusCircleOutlined />;
  };

  return (
    <Button
      className={classNames('button-root', customClasses(), className, {
        'full-btn': full,
        'quarter-btn': quarter,
        'half-btn': half,
      })}
      style={{
        ...style,
      }}
      icon={getIcon()}
      {...rest}
    />
  );
};
export default WButton;
