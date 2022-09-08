import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Input, Card, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import Message from '../../shared/Message';
import { DATE_FORMAT, PAGE_SIZE } from '../../../constants';
import { isAllowed } from '../../../utils/permissionUtil';
import { getSortingOrder, validateDateFormat } from '../../../utils/commonUtil';
import { WTable } from '../../shared/Widgets';

const Search = Input.Search;
const FormItem = Form.Item;

const DraftList = (props) => {
  const { t } = useTranslation();

  const { history, rolePagination, roleLoading, roles, roleErrors, fetchDraftRoleWithCriteria } =
    props;

  const [form] = Form.useForm();

  const [pagination, setPagination] = useState({ pageSize: PAGE_SIZE });

  const onFinish = (values) => {
    const searchParameter = validateDateFormat(values.searchParameter);
    if (searchParameter) {
      values.searchParameter = searchParameter;
    }
    values.pageSize = pagination.pageSize;
    values.sortField = pagination.sortField;
    values.sortOrder = pagination.sortOrder;
    fetchDraftRoleWithCriteria(values);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    fetchDraftRoleWithCriteria({
      pageSize: pagination.pageSize,
      pageNumber: pagination.current,
      sortField: sorter.field,
      sortOrder: getSortingOrder(sorter.order),
      searchParameter: validateDateFormat(form.getFieldValue('searchParameter')),
      ...filters,
    });
    setPagination({
      pageSize: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: getSortingOrder(sorter.order),
    });
  };

  const columns = [
    {
      title: t('table.serial.num'),
      align: 'left',
      width: '10%',
      key: 'index',
      render: (text, record, index) => {
        return (rolePagination.current - 1) * rolePagination.pageSize + index + 1;
      },
    },
    {
      title: t('roles.name.label'),
      dataIndex: 'name',
      align: 'left',
      sorter: true,
      render: (text, record) => {
        return <div>{record.newData && record.newData.name ? record.newData.name : ''}</div>;
      },
    },
    {
      title: t('table.request.column.label'),
      dataIndex: 'action',
      sorter: true,
      align: 'left',
    },
    {
      title: t('table.requestedOn.column.label'),
      dataIndex: 'requestedOn',
      align: 'left',
      sorter: true,
      defaultSortOrder: 'ascend',
      render: (text, record) => {
        return <div>{moment(record.requestedOn).format(DATE_FORMAT)}</div>;
      },
    },
    {
      title: t('table.requestedBy.column.label'),
      dataIndex: 'requestedBy',
      align: 'left',
      sorter: true,
    },
  ];

  return (
    <>
      <Message error={roleErrors}/>
      <Card>
        <Row>
          <Col
            xs={{ span: 20, offset: 2 }}
            md={{ span: 6, offset: 18 }}
            lg={{ span: 6, offset: 18 }}
          >
            <Form form={form} onFinish={onFinish}>
              <FormItem name="searchParameter">
                <Search placeholder={t('filter.search.placeholder')}/>
              </FormItem>
            </Form>
          </Col>
        </Row>

        <WTable
          className="clickable-table-row"
          columns={columns}
          rowKey={'id'}
          dataSource={roles}
          pagination={rolePagination}
          loading={roleLoading}
          onChange={handleTableChange}
          onRow={(record, rowIndex) => {
            return {
              onClick: (e) => {
                if (isAllowed(['role:pending:detail'])) {
                  history.push(`/roles/drafts/${record.id}/detail`);
                }
              },
            };
          }}
        />
      </Card>
    </>
  );
};

export default withRouter(DraftList);
