import React, { useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Col, Card, Descriptions, Skeleton } from 'antd';
import moment from 'moment';

import { isEmpty, setColorStyle, getStatusLabel } from '../../../utils/commonUtil';
import RejectModel from '../../shared/ModelBox/RejectModel';
import ApproveModel from '../../shared/ModelBox/ApproveModel';
import Message from '../../shared/Message';
import { DATE_FORMAT } from '../../../constants';
import { isAllowed } from '../../../utils/permissionUtil';
import { WButton } from '../../shared/Widgets';
import { TitleBar } from '../../shared/TitleBar';

const DraftDetail = (props) => {
  const { t } = useTranslation();
  const { id } = useParams();

  const {
    history,
    roles,
    rejectRoleChanges,
    roleLoading,
    roleErrors,
    fetchDraftRoleByIdentifier,
    approveRoleChanges,
    cleanRole,
    cleanPermission,
  } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const rejectModelShow = () => {
    setIsModalVisible(true);
  };

  const rejectModelHide = () => {
    setIsModalVisible(false);
  };

  const oldValue = roles.value && roles.value.oldData ? roles.value.oldData : '';
  const oldName = roles.value && roles.value.oldData ? roles.value.oldData.name : '';
  const oldActive = roles.value && roles.value.oldData ? roles.value.oldData.active : '';
  const newName = roles.value && roles.value.newData ? roles.value.newData.name : '';
  const newActive = roles.value && roles.value.newData ? roles.value.newData.active : '';
  const requestId = roles.value ? roles.value.id : '';

  const modalProps = {
    id: requestId,
    isModalVisible: isModalVisible,
    modelHide: rejectModelHide,
    title: t('detail.reject.title'),
    header: t('detail.reject.header'),
    remark: 'remarks',
    rejectEntity: rejectRoleChanges,
    path: '/roles/draft',
    history,
  };

  const approveModalProps = {
    title: t('detail.approve.title'),
    width: '360px',
    id: requestId,
    approveEntity: approveRoleChanges,
    path: '/roles/draft',
    history,
  };

  const newDataPermission =
    roles.value && roles.value.newData ? roles.value.newData.permissions : '';
  const oldDataPermission =
    roles.value && roles.value.oldData ? roles.value.oldData.permissions : '';

  useEffect(() => {
    fetchDraftRoleByIdentifier(id);
    return () => {
      cleanRole();
      cleanPermission();
    };
  }, []);

  return (
    <div className="container-fluid no-breadcrumb page-dashboard">
      <article className="article" id="components-form-demo-advanced-search">
        <TitleBar
          title={t('roles.draft.detail.title')}
          breadCrumbObject={{
            Roles: '/roles',
            Draft: { pathname: '/roles', state: { tabState: 'draft' } },
            View: '',
          }}
        />

        <Message error={roleErrors} />

        <Card>
          <Skeleton loading={roleLoading} active>
            <Col lg={18} md={24} sm={24}>
              <Descriptions size="default">
                <Descriptions.Item label={t('detail.request.label')}>
                  {roles.value ? roles.value.action : ''}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col lg={18} md={24} sm={24}>
              <Descriptions size="default">
                <Descriptions.Item label={t('detail.requestedBy.label')}>
                  {roles.value ? roles.value.requestedBy : ''}
                </Descriptions.Item>
              </Descriptions>
            </Col>

            <Col lg={18} md={24} sm={24}>
              <Descriptions size="default">
                <Descriptions.Item label={t('detail.requestedOn.label')}>
                  {roles.value ? moment(roles.value.requestedOn).format(DATE_FORMAT) : ''}
                </Descriptions.Item>
              </Descriptions>
            </Col>

            <div className="detail-table table-responsive">
              <table className="table table-bordered" style={{ backgroundColor: 'white' }}>
                <thead className="ant-table-thead">
                  <tr>
                    <th scope="col">{t('detail.table.fields')}</th>

                    {!isEmpty(roles.value && roles.value.oldData) && (
                      <th scope="col">{t('detail.table.oldValues')}</th>
                    )}
                    <th scope="col">
                      {' '}
                      {!isEmpty(roles.value && roles.value.oldData)
                        ? t('detail.table.newValues')
                        : t('detail.table.values')}{' '}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={setColorStyle(oldName, newName, oldValue)}>
                    <td>{t('roles.name.label')}</td>
                    {!isEmpty(roles.value && roles.value.oldData) && (
                      <td>
                        {roles.value && roles.value.oldData ? `${roles.value.oldData.name}` : ''}
                      </td>
                    )}
                    <td>
                      {roles.value && roles.value.newData ? `${roles.value.newData.name}` : ''}
                    </td>
                  </tr>

                  <tr
                    style={setColorStyle(
                      oldActive ? oldActive.toString() : '',
                      newActive ? newActive.toString() : '',
                      oldValue
                    )}
                  >
                    <td>{t('roles.active.label')}</td>
                    {!isEmpty(roles.value && roles.value.oldData) && (
                      <td>
                        {getStatusLabel(
                          roles.value && roles.value.oldData ? roles.value.oldData.active : ''
                        )}
                      </td>
                    )}
                    <td>
                      {getStatusLabel(
                        roles.value && roles.value.newData ? roles.value.newData.active : ''
                      )}
                    </td>
                  </tr>

                  {newDataPermission &&
                    newDataPermission.map((permission, index) =>
                      permission.permissions ? (
                        <tr
                          key={index}
                          style={
                            roles.value &&
                            roles.value.oldData &&
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
                              oldValue
                            )
                          }
                        >
                          <td>{permission.moduleTitle}</td>
                          {!isEmpty(roles.value && roles.value.oldData) && (
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
                              roles.value &&
                              roles.value.oldData &&
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
                                oldValue
                              )
                            }
                          >
                            <td>{permission.moduleTitle}</td>
                            {!isEmpty(roles.value && roles.value.oldData) && (
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
            {isAllowed(['role:approve']) && (
              <WButton
                type="primary"
                className="m-1"
                onClick={() => ApproveModel(approveModalProps)}
              >
                {t('approve.button.label')}
              </WButton>
            )}
            {isAllowed(['role:approve']) && (
              <WButton type="danger" className="m-1" onClick={rejectModelShow}>
                {t('reject.button.label')}
              </WButton>
            )}

            <WButton
              customType="cancel"
              htmlType="button"
              danger
              onClick={() => history.push({ pathname: '/roles', state: { tabState: 'draft' } })}
            >
              {t('cancel.button.label')}
            </WButton>
          </Skeleton>
        </Card>
      </article>
      <RejectModel {...modalProps} />
    </div>
  );
};

export default withRouter(DraftDetail);
