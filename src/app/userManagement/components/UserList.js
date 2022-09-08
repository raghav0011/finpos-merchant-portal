import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  message,
  Tag,
  Popover,
  Divider,
  Form,
  Input,
  Button,
  DatePicker,
  Row,
  Col,
  Checkbox,
} from 'antd';
import classNames from 'classnames';
import { debounce } from 'lodash';

import {
  WCustomizableColumnTable,
  WButton,
  WCustomSearchTable,
  WDatePicker,
} from '../../shared/Widgets';
import Message from '../../shared/Message';
import { isEmpty } from 'lodash';
import useModalHook from '../../shared/Hooks/modalHook';
import { getSortingOrder, getStatusLabel } from '../../../utils/commonUtil';
import UserModal from './details/UserModal';
import { UnorderedListOutlined, SearchOutlined } from '@ant-design/icons';
import { clearLocalStorage, setLocalStorage } from '../../../utils/storageUtil';
import EditUserModal from './details/EditUserModal';
import useMasterData from '../../shared/Hooks/masterHook';

const CheckboxGroup = Checkbox.Group;

const UserList = (props) => {
  const { t } = useTranslation();
  const { users, roles, userDetail } = props;
  const [searchValue, setSearchValue] = useState('');
  const [popover, setPopover] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState();

  const plainOptions = [
    { label: 'Active', value: 'true' },
    { label: 'Inactive', value: 'false' },
  ];
  const branchOption = useMasterData('BRANCHES');
  const roleOption = useMasterData('ROLES');

  useEffect(() => {
    users.fetchUserListByCriteria({}).then((res) => setDataLoaded(true));
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
    users.fetchUserListByCriteria(tableRequest);
  };

  const onSearch = debounce((value) => {
    setSearchValue(value);
    value === ''
      ? users.fetchUserListByCriteria({
          pageInfo: {
            page: 1,
            perPage: pageSize?.pageSize,
          },
        })
      : users.fetchUserListByCriteria({
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
    users.fetchUserListByCriteria({
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
    users.fetchUserListByCriteria({
      searchInfo: value,
      pageInfo: {
        page: pageSize?.current,
        perPage: pageSize?.pageSize,
        total: pageSize?.total,
        totalPages: pageSize?.totalPages,
      },
    });
    setPopover(false);
  };

  const editUserModal = () => {
    setIsEdit(true);
    setEditModalVisible(true);
  };

  const columns = [
    {
      // title: t('table.serial.num'),
      width: '5%',
      title: 'S.N',
      key: 'id',
      align: 'center',
      render: (text, record, index) => {
        return (users.userPagination.page - 1) * users.userPagination.perPage + index + 1;
      },
    },
    {
      width: '35%',
      title: 'User ID',
      key: 'userId',
      dataIndex: 'userId',
      align: 'left',
      // render: (text, record) => {
      //   return <div>{record.userId}</div>;
      // },
    },
    {
      width: '25%',
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      align: 'left',
      // render: (text, record) => {
      //   return <div>{record.name}</div>;
      // },
    },
    {
      width: '25%',
      title: 'Role Type',
      key: 'roles',
      dataIndex: 'roles',
      align: 'left',
      render: (roles) => {
        // console.log('🚀 ~ file: UserList.js ~ line 114 ~ UserList ~ record', record);
        return <>{roles.map((x) => x.type).toString()}</>;
      },
    },

    {
      width: '10%',
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
      form={form}
      name="UserSearch"
      style={{ padding: '10px', width: '590px', backgroundColor: '#ffffff' }}
      className="user-form"
      // initialValues=""
      onFinish={handleSubmit}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            {...formItemLayout}
            label="User Id"
            name="userId"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            {...formItemLayout}
            label="User Name"
            name="name"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            {...formItemLayout}
            label="Role Type"
            name="role"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item {...formItemLayout} label="Branch" name="branch" rules={[{ required: false }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            {...formItemLayout}
            label="Created Date"
            name="createdOn"
            rules={[{ required: false }]}
          >
            <WDatePicker />
          </Form.Item>
        </Col>

        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            {...formItemLayout}
            // className="not-required-label"
            label={'Status'}
            name={'active'}
            valuePropName="checked"
            // initialValue={!isEdit ? true : branches?.branchDetail?.active}
            // initialValue=""
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
    suffix: (
      <Popover
        placement="bottomRight"
        content={content}
        trigger="click"
        visible={popover}
        onVisibleChange={togglePopOver}
      >
        <UnorderedListOutlined
          // visible={popover}
          style={{ fontSize: '20px', marginRight: '5px' }}
          // onClick={togglePopOver}
        />
      </Popover>
    ),
    prefix: <SearchOutlined />,
    className: 'clickable-table-row',
    rowKey: 'id',
    searchLoading: users.userLoading,
    pagination: users.userPagination,
    // tableLoading: users.userLoading,
    dataSource: users?.users?.results,
    onRow: (record, rowIndex) => {
      return {
        onClick: (e) => {
          e.preventDefault();
          users.fetchUserById(record?.id);
          setSelectedId(record?.id);
          editUserModal();
        },
      };
    },
  };

  return (
    <div>
      <div className="mb-2">
        {/* {users.userErrors && <Message error={users.userErrors} />}{' '} */}
        <WCustomSearchTable {...tableProps} columns={columns} />
      </div>

      {editUserModal && (
        <EditUserModal
          isEdit={isEdit}
          branchOption={branchOption}
          roleOption={roleOption}
          editUserModalVisible={editModalVisible}
          setEditUserModalVisible={setEditModalVisible}
          userId={selectedId}
          {...props}
        />
      )}
    </div>
  );
};
export default UserList;
