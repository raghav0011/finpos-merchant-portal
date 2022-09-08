import React, { useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { Row, Col, Card, Descriptions, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

import Message from '../../../shared/Message';
import { setColorStyle } from '../../../../utils/commonUtil';
import { WButton } from '../../../shared/Widgets';
import { TitleBar } from '../../../shared/TitleBar';

const AuditLogDetail = (props) => {
  const { t } = useTranslation();
  const { id } = useParams();

  const { history, users, userErrors, userLoading, fetchUserAuditLogByIdentifier, cleanUser } =
    props;

  useEffect(() => {
    fetchUserAuditLogByIdentifier(id);
    return () => {
      cleanUser();
    };
  }, []);

  const newValues = users ? users.new_value?.[0] : '';
  const oldValues = users ? users.old_value?.[0] : '';

  const newValuesKeys = typeof newValues === 'object' ? Object.keys(newValues) : [];

  return (
    <div className="container-fluid no-breadcrumb page-dashboard">
      <article className="article" id="components-form-demo-advanced-search">
        <TitleBar
          title={t('audit.log.detail.title')}
          breadCrumbObject={{
            Users: '/users',
            'Audit log': { pathname: '/setting/users', state: { tabState: 'auditLog' } },
            Detail: '',
          }}
        />

        <Message error={userErrors} />
        <Card>
          <Skeleton loading={userLoading} active>
            <Row className="pending-detail">
              <Col lg={12} md={24} sm={24}>
                <Col lg={18} md={24} sm={24}>
                  <Descriptions size="default">
                    <Descriptions.Item label={t('detail.request.label')}>
                      {users.user_action}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>

                <Col lg={18} md={24} sm={24}>
                  <Descriptions size="default">
                    <Descriptions.Item label={t('detail.requestedBy.label')}>
                      {users.update_by}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>

                <Col lg={18} md={24} sm={24}>
                  <Descriptions size="default">
                    <Descriptions.Item label={t('detail.requestedOn.label')}>
                      {/* {users.update_date ? moment(users.update_date).format(DATE_FORMAT) : ''} */}
                      {users.update_date}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Col>
              {/* <Col lg={18} md={24} sm={24}>
                  <Descriptions size="default">
                    <Descriptions.Item label={t('detail.status.label')}>
                      {users ? users.status : ''}
                    </Descriptions.Item>
                  </Descriptions>
                </Col> */}
            </Row>

            <Col span={24}>
              <div className="detail-table table-responsive">
                <table className="table table-bordered" style={{ backgroundColor: 'white' }}>
                  <thead className="ant-table-thead">
                    <tr>
                      <th scope="col">{t('detail.table.fields')}</th>
                      {users.old_value && <th scope="col">{t('detail.table.oldValues')}</th>}
                      {users.old_value && users.new_value ? (
                        <th scope="col">{t('detail.table.newValues')}</th>
                      ) : (
                        <th scope="col">{t('detail.table.values')}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {newValuesKeys instanceof Array &&
                      newValuesKeys.length > 0 &&
                      newValuesKeys
                        .filter((item) => ![].includes(item))
                        .map((item, index) => {
                          return (
                            <tr
                              key={index}
                              style={setColorStyle(
                                oldValues ? oldValues[item] : '',
                                newValues ? newValues[item] : '',
                                oldValues
                              )}
                            >
                              <td>{item}</td>
                              {oldValues && <td>{oldValues[item] ? oldValues[item] : 'n/a'}</td>}
                              <td>{newValues[item] ? newValues[item] : 'n/a'}</td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>

              <WButton
                customType="cancel"
                htmlType="button"
                danger
                onClick={() =>
                  history.push({ pathname: '/setting/users', state: { tabState: 'auditLog' } })
                }
              >
                {t('cancel.button.label')}
              </WButton>
            </Col>
          </Skeleton>
        </Card>
      </article>
    </div>
  );
};

export default withRouter(AuditLogDetail);
