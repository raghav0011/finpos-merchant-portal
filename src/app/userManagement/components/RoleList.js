import React, { useEffect, useState } from 'react';
import { getStatusLabel } from '../../../utils/commonUtil';
import { Popover, Divider, Form, Input, Button, Row, Col, Checkbox } from 'antd';
import { UnorderedListOutlined, SearchOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import { WCustomSearchTable, WButton } from '../../shared/Widgets';

import RoleModal from './details/RoleModal';
import EditRoleModal from './details/EditRoleModal';

const RoleList = (props) => {
  const { roles, permissions } = props;
  const [popover, setPopOver] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState();
  const [selectedId, setSelectedId] = useState(undefined);

  const [form] = Form.useForm();
  const CheckboxGroup = Checkbox.Group;

  useEffect(() => {
    roles.fetchRoleListByCriteria({});
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    console.log('🚀 ~ file: RoleList.js ~ line 27 ~ handleTableChange ~ pagination', pagination);
    setPageSize(pagination);
    const tableRequest = {
      searchInfo: { fullText: searchValue },
      pageInfo: {
        page: pagination?.current,
        perPage: pagination?.pageSize,
      },
      sortBy: {},
    };
    roles.fetchRoleListByCriteria(tableRequest);
  };

  const handleClear = () => {
    form.resetFields();
    setPopOver(false);
    roles.fetchRoleListByCriteria({
      pageInfo: {
        perPage: pageSize?.pageSize,
      },
    });
  };
  const handleSubmit = (value) => {
    if (value?.active.toString() === 'true,false' || value?.active.toString() === '') {
      value.active = '';
    } else {
      value.active = value.active.toString();
    }
    roles.fetchRoleListByCriteria({
      searchInfo: value,
      pageInfo: {
        page: pageSize?.current,
        perPage: pageSize?.pageSize,
      },
    });
    setPopOver(false);
  };
  const togglePopOver = () => {
    setPopOver((val) => !val);
  };
  const onSearch = debounce((value) => {
    setSearchValue(value);
    value === ''
      ? roles.fetchRoleListByCriteria({
          pageInfo: {
            page: 1,
            perPage: pageSize?.pageSize,
          },
        })
      : roles.fetchRoleListByCriteria({
          searchInfo: { fullText: value },
          pageInfo: {
            page: 1,
            perPage: pageSize?.pageSize,
          },
        });
  }, 600);

  const handleEditModalVisible = () => {
    permissions.fetchPermission();
    setModalVisible(true);
  };

  const columns = [
    {
      width: '5%',
      title: 'S.N',
      key: 'index',
      align: 'center',

      render: (text, record, index) => {
        return (roles.rolePagination.page - 1) * roles.rolePagination.perPage + index + 1;
      },
    },
    {
      width: '20%',
      title: 'Role Type',
      key: 'type',
      dataIndex: 'type',
      align: 'left',
    },
    {
      width: '50%',
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
      align: 'left',
    },
    {
      width: '15%',
      title: 'User#',
      key: 'userCount',
      dataIndex: 'userCount',
      align: 'left',
    },
    {
      width: '10%',
      title: 'Active',
      key: 'active',
      dataIndex: 'active',
      align: 'left',

      render: (_, record) => {
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
  const activeOptions = [
    { label: 'Active', value: 'true' },
    { label: 'Inactive', value: 'false' },
  ];
  const content = (
    <Form
      name="roleSearch"
      form={form}
      style={{ padding: '10px', width: '590px', backgroundColor: '#ffffff' }}
      className="user-form"
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Row>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            {...formItemLayout}
            label="Role Type"
            name="type"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            {...formItemLayout}
            label="Description"
            name="description"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            {...formItemLayout}
            label="User Count"
            name="userCount"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            {...formItemLayout}
            label="Status"
            name="active"
            valuePropName="checked"
            initialValue={['']}
          >
            <CheckboxGroup options={activeOptions} />
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
  );
  const tableProps = {
    onSearch: onSearch,
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
    dataSource: roles?.roles?.results,
    rowKey: 'id',
    columns: columns,
    tableLoading: roles?.loading,
    pagination: roles?.rolePagination,
    handleTableChange: handleTableChange,
    className: 'clickable-table-row',
    onRow: (record, rowIndex) => {
      return {
        onClick: (e) => {
          roles.fetchRoleById(record?.id);
          setSelectedId(record?.id);
          handleEditModalVisible();
        },
      };
    },
  };

  return (
    <div>
      <WCustomSearchTable {...tableProps} columns={columns} />
      {modalVisible && (
        <EditRoleModal
          pageSize={pageSize}
          editRoleModalVisible={modalVisible}
          setEditRoleModalVisible={setModalVisible}
          roleId={selectedId}
          permissions={permissions}
          {...props}
        />
      )}
    </div>
  );
};

export default RoleList;
