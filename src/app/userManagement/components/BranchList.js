import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, InputNumber, message, Tag } from 'antd';
import classNames from 'classnames';
import { Popover, Divider, Form, Input, Button, DatePicker, Row, Col } from 'antd';
import { UnorderedListOutlined, SearchOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';

import { WCustomizableColumnTable, WButton, WCustomSearchTable } from '../../shared/Widgets';
import Message from '../../shared/Message';
import { isEmpty } from 'lodash';
import useModalHook from '../../shared/Hooks/modalHook';
import { getSortingOrder, getStatusLabel } from '../../../utils/commonUtil';
import BranchModal from './details/BranchModal';
import { clearLocalStorage, setLocalStorage } from '../../../utils/storageUtil';

const CheckboxGroup = Checkbox.Group;

const BranchList = (props) => {
  const { t } = useTranslation();
  const { branches } = props;
  const [popover, setPopover] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedId, setSelectedId] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [pageSize, setPageSize] = useState();

  const [form] = Form.useForm();
  const plainOptions = [
    { label: 'Active', value: 'true' },
    { label: 'Inactive', value: 'false' },
  ];

  useEffect(() => {
    branches.fetchBranchListByCriteria({}).then((res) => setDataLoaded(true));
    // setPopover(true);

    return () => {
      // branches.cleanBranches();
    };
  }, []);

  const togglePopOver = () => {
    setPopover((val) => !val);
  };
  const handleTableChange = (pagination, filters, sorter) => {
    setPageSize(pagination);
    const tableRequest = {
      searchInfo: { fullText: searchValue },
      pageInfo: {
        page: pagination?.current,
        perPage: pagination?.pageSize,
      },
      sortBy: {},
    };
    branches.fetchBranchListByCriteria(tableRequest);
  };

  const onSearch = debounce((value) => {
    setSearchValue(value);
    value === ''
      ? branches.fetchBranchListByCriteria({
          pageInfo: {
            page: 1,
            perPage: pageSize?.pageSize,
          },
        })
      : branches.fetchBranchListByCriteria({
          searchInfo: { fullText: value },
          pageInfo: {
            page: 1,
            perPage: pageSize?.pageSize,
          },
        });
  }, 600);
  const handleClear = () => {
    form.resetFields();
    setPopover(false);
    branches.fetchBranchListByCriteria({
      pageInfo: {
        page: pageSize?.current,
        perPage: pageSize?.pageSize,
      },
    });
  };

  const handleSubmit = (value) => {
    if (value.active.toString() === 'true,false' || value.active.toString() === '') {
      value.active = '';
    } else {
      value.active = value.active.toString();
    }
    branches.fetchBranchListByCriteria({
      searchInfo: value,
      pageInfo: {
        page: pageSize?.current,
        perPage: pageSize?.pageSize,
      },
    });
    setPopover(false);
  };

  const handleEditModalVisible = () => {
    setIsEdit(true);
    setModalVisible(true);
  };

  const columns = [
    {
      // title: t('table.serial.num'),
      width: '5%',
      title: 'S.N',
      key: 'index',
      align: 'center',
      render: (text, record, index) => {
        return (branches.branchPagination.page - 1) * branches.branchPagination.perPage + index + 1;
      },
    },
    {
      width: '10%',
      title: 'Code',
      key: 'code',
      dataIndex: 'code',
      align: 'left',
    },
    {
      width: '55%',
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      align: 'left',
    },
    {
      width: '30%',
      title: 'Active',
      key: 'active',
      dataIndex: 'active',
      align: 'left',
      render: (text, record) => {
        return <div>{getStatusLabel(record.active)}</div>;
      },
    },
  ];
  const formItemLayout = {
    labelCol: {
      xl: { span: 6 },
      lg: { span: 6 },
      md: { span: 8 },
      sm: { span: 8 },
      xs: { span: 24 },
    },
    wrapperCol: {
      xl: { span: 18 },
      lg: { span: 18 },
      md: { span: 16 },
      sm: { span: 24 },
      xs: { span: 24 },
    },
    labelAlign: 'left',
  };
  const content = (
    // <div style={{ width: '590px' }}>
    <Form
      name="UserSearch"
      form={form}
      style={{ padding: '10px', width: '590px', backgroundColor: '#ffffff' }}
      className="user-form"
      // initialValues={{ remember: true }}
      onFinish={handleSubmit}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item {...formItemLayout} label="Code" name="code" rules={[{ required: false }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            {...formItemLayout}
            label="Branch Name"
            name="name"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            {...formItemLayout}
            label="Branch Address"
            name="address"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            {...formItemLayout}
            label="Branch Email"
            name="email"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            {...formItemLayout}
            label="Contact Number"
            name="contactNumber"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            {...formItemLayout}
            // className="not-required-label"
            label={'Status'}
            name={'active'}
            valuePropName="checked"
            initialValue={['']}
          >
            <CheckboxGroup options={plainOptions} />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <Form.Item style={{ marginRight: 6 }}>
          <Button type="ghost" onClick={handleClear}>
            Clear Filters
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </div>
    </Form>
    // </div>
  );

  let tableProps = {
    handleTableChange: handleTableChange,
    onSearch: onSearch,
    className: 'clickable-table-row',
    suffix: (
      <Popover
        placement="bottomRight"
        content={content}
        trigger="click"
        visible={popover}
        onVisibleChange={togglePopOver}
      >
        <UnorderedListOutlined style={{ fontSize: '20px', marginRight: '5px' }} />
      </Popover>
    ),
    prefix: <SearchOutlined />,
    rowKey: 'id',
    searchLoading: branches.branchLoading,
    pagination: branches.branchPagination,
    // tableLoading: branches.branchLoading,
    dataSource: branches?.branches?.results,
    onRow: (record, rowIndex) => {
      return {
        onClick: (e) => {
          e.preventDefault();
          branches.fetchBranchById(record?.id);
          setSelectedId(record?.id);

          // setLocalStorage('id', record?.id);
          handleEditModalVisible();
        },
      };
    },
  };

  return (
    <div>
      <div className="mb-2">
        {/* {transactions.transactionErrors && <Message error={transactions.transactionErrors} />}{' '} */}
        <WCustomSearchTable {...tableProps} columns={columns} />
      </div>

      {modalVisible && (
        <BranchModal
          isEdit={isEdit}
          addBranchModalVisible={modalVisible}
          setAddBranchModalVisible={setModalVisible}
          branchId={selectedId}
          {...props}
        />
      )}
    </div>
  );
};

export default BranchList;
