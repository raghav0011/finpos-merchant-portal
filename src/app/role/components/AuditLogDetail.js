import React, { Fragment, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Row, Col, Card, Descriptions, Skeleton } from 'antd';
import moment from 'moment';

import { isEmpty, getStatusLabel, setColorStyle } from '../../../utils/commonUtil';
import Message from '../../shared/Message';
import { DATE_FORMAT } from '../../../constants';
import { WButton } from '../../shared/Widgets';
import { TitleBar } from '../../shared/TitleBar';

const AuditLogDetail = (props) => {
  const { t } = useTranslation();
  const { id } = useParams();

  const {
    history,
    roles,
    roleLoading,
    roleErrors,
    fetchRoleAuditLogByIdentifier,
    cleanRole,
    cleanPermission,
  } = props;

  const oldValues = roles && roles.oldData ? roles.oldData : '';
  const newValues = roles && roles.newData ? roles.newData : '';
  const oldName = roles && roles.oldData ? roles.oldData.name : '';
  const newName = roles && roles.newData ? roles.newData.name : '';
  const oldActive = roles && roles.oldData ? roles.oldData.active : '';
  const newActive = roles && roles.newData ? roles.newData.active : '';

  const newDataPermission = roles && roles.newData ? roles.newData.permissions : '';
  const oldDataPermission = roles && roles.oldData ? roles.oldData.permissions : '';

  useEffect(() => {
    fetchRoleAuditLogByIdentifier(id);
    return () => {
      cleanRole();
      cleanPermission();
    };
  }, []);

  return (
    <div className="container-fluid no-breadcrumb page-dashboard">
      <article className="article" id="components-form-demo-advanced-search">
        <TitleBar
          title={t('audit.log.detail.title')}
          breadCrumbObject={{
            Roles: '/roles',
            'Audit log': { pathname: '/roles', state: { tabState: 'auditLog' } },
            View: '',
          }}
        />
        <Message error={roleErrors} />
        <Card>
          <Skeleton loading={roleLoading} active>
            <Row>
              <Col lg={12} md={24} sm={24}>
                <Col lg={18} md={24} sm={24}>
                  <Descriptions size="default">
                    <Descriptions.Item label={t('detail.request.label')}>
                      {roles ? roles.action : ''}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col lg={18} md={24} sm={24}>
                  <Descriptions size="default">
                    <Descriptions.Item label={t('detail.requestedBy.label')}>
                      {roles ? roles.requestedBy : ''}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>

                <Col lg={18} md={24} sm={24}>
                  <Descriptions size="default">
                    <Descriptions.Item label={t('detail.requestedOn.label')}>
                      {roles ? moment(roles.requestedOn).format(DATE_FORMAT) : ''}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Col>
              <Col lg={12} md={24} sm={24}>
                <Col lg={18} md={24} sm={24}>
                  <Descriptions size="default">
                    <Descriptions.Item label={t('detail.status.label')}>
                      {roles ? roles.status : ''}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
                {(roles.respondedBy || roles.respondedOn) && (
                  <Fragment>
                    <Col lg={18} md={24} sm={24}>
                      <Descriptions size="default">
                        <Descriptions.Item label={t('detail.verifiedBy.label')}>
                          {roles.respondedBy ? roles.respondedBy : ''}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>

                    <Col lg={18} md={24} sm={24}>
                      <Descriptions size="default">
                        <Descriptions.Item label={t('detail.verifiedOn.label')}>
                          {roles.respondedOn ? moment(roles.respondedOn).format(DATE_FORMAT) : ''}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Fragment>
                )}
              </Col>
              {roles && roles.responseRemarks && (
                <Col lg={12} md={24} sm={24}>
                  <Descriptions size="default">
                    <Descriptions.Item
                      className="column-wrap"
                      label={t('detail.response.remarks.label')}
                    >
                      {roles ? roles.responseRemarks : ''}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              )}
            </Row>

            <div className="detail-table table-responsive">
              <table className="table table-bordered" style={{ backgroundColor: 'white' }}>
                <thead className="ant-table-thead">
                  <tr>
                    <th scope="col">{t('detail.table.fields')}</th>
                    {!isEmpty(roles && roles.oldData) && (
                      <th scope="col">{t('detail.table.oldValues')}</th>
                    )}
                    <th scope="col">
                      {!isEmpty(roles && roles.oldData)
                        ? t('detail.table.newValues')
                        : t('detail.table.values')}{' '}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    style={setColorStyle(
                      oldValues ? oldName : '',
                      newValues ? newName : '',
                      oldValues
                    )}
                  >
                    <td>{t('roles.name.label')}</td>
                    {!isEmpty(roles && roles.oldData) && <td>{oldName}</td>}
                    <td>{newName}</td>
                  </tr>

                  <tr
                    style={setColorStyle(
                      oldValues ? getStatusLabel(oldActive) : '',
                      newValues ? getStatusLabel(newActive) : '',
                      oldValues
                    )}
                  >
                    <td>{t('roles.active.label')}</td>
                    {!isEmpty(roles && roles.oldData) && <td>{getStatusLabel(oldActive)}</td>}
                    <td>{getStatusLabel(newActive)}</td>
                  </tr>

                  {newDataPermission &&
                    newDataPermission.map((permission, index) =>
                      permission.permissions ? (
                        <tr
                          key={index}
                          style={
                            roles &&
                            roles.oldData &&
                            setColorStyle(
                              oldDataPermission
                                ? oldDataPermission.map((obj, index) => {
                                    if (permission.moduleTitle === obj.moduleTitle) {
                                      return obj.permissions;
                                    }
                                    return null;
                                  })
                                : '',

                              newDataPermission
                                ? newDataPermission.map((obj, index) => {
                                    if (permission.moduleTitle === obj.moduleTitle) {
                                      return obj.permissions;
                                    }
                                    return null;
                                  })
                                : '',
                              oldValues
                            )
                          }
                        >
                          <td>{permission.moduleTitle}</td>
                          {!isEmpty(roles && roles.oldData) && (
                            <td>
                              {oldDataPermission
                                ? oldDataPermission.map((obj, index) => {
                                    if (permission.moduleTitle === obj.moduleTitle) {
                                      return obj.permissions;
                                    }
                                    return null;
                                  })
                                : ''}
                            </td>
                          )}
                          <td>
                            {newDataPermission
                              ? newDataPermission.map((obj, index) => {
                                  if (permission.moduleTitle === obj.moduleTitle) {
                                    return obj.permissions;
                                  }
                                  return null;
                                })
                              : ''}
                          </td>
                        </tr>
                      ) : (
                        oldDataPermission &&
                        oldDataPermission[index].permissions && (
                          <tr
                            key={index}
                            style={
                              roles &&
                              roles.oldData &&
                              setColorStyle(
                                oldDataPermission
                                  ? oldDataPermission.map((obj, index) => {
                                      if (permission.moduleTitle === obj.moduleTitle) {
                                        return obj.permissions;
                                      }
                                      return null;
                                    })
                                  : '',

                                newDataPermission
                                  ? newDataPermission.map((obj, index) => {
                                      if (permission.moduleTitle === obj.moduleTitle) {
                                        return obj.permissions;
                                      }
                                      return null;
                                    })
                                  : '',
                                oldValues
                              )
                            }
                          >
                            <td>{permission.moduleTitle}</td>
                            {!isEmpty(roles && roles.oldData) && (
                              <td>
                                {oldDataPermission
                                  ? oldDataPermission.map((obj, index) => {
                                      if (permission.moduleTitle === obj.moduleTitle) {
                                        return obj.permissions;
                                      }
                                      return null;
                                    })
                                  : ''}
                              </td>
                            )}
                            <td>
                              {newDataPermission
                                ? newDataPermission.map((obj, index) => {
                                    if (permission.moduleTitle === obj.moduleTitle) {
                                      return obj.permissions;
                                    }
                                    return null;
                                  })
                                : ''}
                            </td>
                          </tr>
                        )
                      )
                    )}
                </tbody>
              </table>
            </div>

            <WButton
              customType="cancel"
              htmlType="button"
              danger
              onClick={() => history.push({ pathname: '/roles', state: { tabState: 'auditLog' } })}
            >
              {t('cancel.button.label')}
            </WButton>
          </Skeleton>
        </Card>
      </article>
    </div>
  );
};

export default withRouter(AuditLogDetail);
