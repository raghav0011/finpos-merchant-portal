import React from 'react';

import {
  DashboardOutlined,
  WarningOutlined,
  LockOutlined,
  PlusCircleOutlined,
  BarsOutlined,
  AuditOutlined,
  SearchOutlined,
  SettingOutlined,
  EyeOutlined,
  UserAddOutlined,
  SendOutlined,
  TransactionOutlined,
  ApiOutlined,
  CreditCardOutlined,
  ContainerOutlined,
  HistoryOutlined,
  FormOutlined,
  UserOutlined,
  ExclamationCircleFilled,
  ExclamationCircleOutlined,
  FileProtectOutlined,
  PlusCircleTwoTone,
  DeleteTwoTone,
  MoneyCollectOutlined,
  CloseCircleOutlined,
  DollarCircleOutlined,
  ExceptionOutlined,
  TagOutlined,
  OrderedListOutlined,
  AccountBookOutlined,
  FileDoneOutlined,
  ReconciliationOutlined,
  BookOutlined
} from '@ant-design/icons';

const index = ({ type }) => {
  switch (type) {
    case 'PlusCircleOutlined':
      return <PlusCircleOutlined />;
    case 'SearchOutlined':
      return <SearchOutlined />;
    case 'BarsOutlined':
      return <BarsOutlined />;
    case 'AuditOutlined':
      return <AuditOutlined />;
    case 'DashboardOutlined':
      return <DashboardOutlined />;
    case 'LockOutlined':
      return <LockOutlined />;
    case 'SettingOutlined':
      return <SettingOutlined />;
    case 'EyeOutlined':
      return <EyeOutlined />;
    case 'UserAddOutlined':
      return <UserAddOutlined />;
    case 'SendOutlined':
      return <SendOutlined />;
    case 'TransactionOutlined':
      return <TransactionOutlined />;
    case 'ApiOutlined':
      return <ApiOutlined />;
    case 'CreditCardOutlined':
      return <CreditCardOutlined />;
    case 'HistoryOutlined':
      return <HistoryOutlined />;
    case 'ContainerOutlined':
      return <ContainerOutlined />;
    case 'HistoryOutlined':
      return <HistoryOutlined />;
    case 'FormOutlined':
      return <FormOutlined />;
    case 'CustomersOutlined':
      return <UserOutlined />;
    case 'ExclamationCircleFilled':
      return <ExclamationCircleFilled />;
    case 'ExclamationCircleOutlined':
      return <ExclamationCircleOutlined />;
    case 'FileProtectOutlined':
      return <FileProtectOutlined />;
    case 'PlusCircleTwoTone':
      return <PlusCircleTwoTone />;
    case 'DeleteTwoTone':
      return <DeleteTwoTone />;
    case 'MoneyCollectOutlined':
      return <MoneyCollectOutlined />;
    case 'CloseCircleOutlined':
      return <CloseCircleOutlined />;
    case 'DollarCircleOutlined':
      return <DollarCircleOutlined />;
    case 'ExceptionOutlined':
      return <ExceptionOutlined />;
    case 'TagOutlined':
      return <TagOutlined />;
    case 'OrderedListOutlined':
      return <OrderedListOutlined />;
    case 'AccountBookOutlined':
      return <AccountBookOutlined />;
    case 'FileDoneOutlined':
      return <FileDoneOutlined />;
    case 'ReconciliationOutlined':
      return <ReconciliationOutlined />;
    case 'BookOutlined':
      return <BookOutlined />;
    default:
      return <WarningOutlined />;
  }
};

export default index;
