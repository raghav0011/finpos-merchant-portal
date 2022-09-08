import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button, Card, Descriptions, Skeleton, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import RejectModel from '../../../shared/ModelBox/RejectModel';
import ApproveModel from '../../../shared/ModelBox/ApproveModel';
import { DATE_FORMAT } from '../../../../constants';
import { getStatusLabel, setColorStyle, isEmpty } from '../../../../utils/commonUtil';

const PolicyDetail = (props) => {
  const { t } = useTranslation();

  const {
    passwordPolicies,
    passwordPolicies: { id },
    passwordLoading,
    rejectPasswordPolicyChanges,
    approvePasswordPolicyChanges,
  } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const rejectModelShow = () => {
    setIsModalVisible(true);
  };

  const rejectModelHide = () => {
    setIsModalVisible(false);
  };

  const modalProps = {
    id: id,
    isModalVisible: isModalVisible,
    modelHide: rejectModelHide,
    title: t('detail.reject.title'),
    header: t('detail.reject.header'),
    remark: 'remarks',
    rejectEntity: rejectPasswordPolicyChanges,
  };

  const approveModalProps = {
    title: t('detail.approve.title'),
    width: '380px',
    id: id,
    approveEntity: approvePasswordPolicyChanges,
  };

  const oldValue = passwordPolicies ? passwordPolicies.oldPasswordPolicy : '';
  const newValue = passwordPolicies ? passwordPolicies.newPasswordPolicy : '';

  return (
    <>
      {passwordLoading ? (
        <Card>
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        </Card>
      ) : (
        <Fragment>
          {newValue && (
            <Card>
              <Skeleton loading={passwordLoading} active>
                <Col lg={18} md={24} sm={24}>
                  <Descriptions size="default">
                    <Descriptions.Item label={t('detail.request.label')}>
                      {passwordPolicies ? passwordPolicies.action : ''}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col lg={18} md={24} sm={24}>
                  <Descriptions size="default">
                    <Descriptions.Item label={t('detail.requestedBy.label')}>
                      {passwordPolicies ? passwordPolicies.requestedBy : ''}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col lg={18} md={24} sm={24}>
                  <Descriptions size="default">
                    <Descriptions.Item label={t('detail.requestedOn.label')}>
                      {passwordPolicies && passwordPolicies.requestedOn
                        ? moment(passwordPolicies.requestedOn).format(DATE_FORMAT)
                        : ''}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
                <div className="detail-table table-responsive">
                  <table className="table table-bordered" style={{ backgroundColor: 'white' }}>
                    <thead className="ant-table-thead">
                      <tr>
                        <th scope="col">{t('detail.table.fields')}</th>
                        {oldValue && <th scope="col">{t('detail.table.oldValues')}</th>}
                        <th scope="col">{t('detail.table.newValues')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        style={setColorStyle(
                          oldValue ? oldValue.enabled : '',
                          newValue ? newValue.enabled : '',
                          oldValue
                        )}
                      >
                        <td>{t('settings.passwordPolicy.label.enabled')}</td>
                        {oldValue && <td> {oldValue ? getStatusLabel(oldValue.enabled) : ''}</td>}
                        <td>{newValue ? getStatusLabel(newValue.enabled) : ''}</td>
                      </tr>
                      <tr
                        style={setColorStyle(
                          oldValue ? oldValue.minimumLength.toString() : '',
                          newValue ? newValue.minimumLength.toString() : '',
                          oldValue
                        )}
                      >
                        <td>{t('settings.passwordPolicy.label.minimumLength')}</td>
                        {oldValue && <td>{oldValue ? oldValue.minimumLength : ''} </td>}
                        <td> {newValue ? newValue.minimumLength : ''}</td>
                      </tr>
                      <tr
                        style={setColorStyle(
                          oldValue ? oldValue.maximumLength.toString() : '',
                          newValue ? newValue.maximumLength.toString() : '',
                          oldValue
                        )}
                      >
                        <td>{t('settings.passwordPolicy.label.maximumLength')}</td>
                        {oldValue && <td> {oldValue ? oldValue.maximumLength : ''}</td>}
                        <td>{newValue ? newValue.maximumLength : ''}</td>
                      </tr>
                      <tr
                        style={setColorStyle(
                          oldValue ? oldValue.minimumUpperCaseLetters.toString() : '',
                          newValue ? newValue.minimumUpperCaseLetters.toString() : '',
                          oldValue
                        )}
                      >
                        <td>{t('settings.passwordPolicy.label.minimumUpperCaseLetters')}</td>
                        {oldValue && <td>{oldValue ? oldValue.minimumUpperCaseLetters : ''} </td>}
                        <td> {newValue ? newValue.minimumUpperCaseLetters : ''}</td>
                      </tr>
                      <tr
                        style={setColorStyle(
                          oldValue ? oldValue.minimumNumbers.toString() : '',
                          newValue ? newValue.minimumNumbers.toString() : '',
                          oldValue
                        )}
                      >
                        <td>{t('settings.passwordPolicy.label.minimumNumbers')}</td>
                        {oldValue && <td>{oldValue ? oldValue.minimumNumbers : ''} </td>}
                        <td> {newValue ? newValue.minimumNumbers : ''} </td>
                      </tr>

                      <tr
                        style={setColorStyle(
                          oldValue ? oldValue.minimumSpecialCharacters.toString() : '',
                          newValue ? newValue.minimumSpecialCharacters.toString() : '',
                          oldValue
                        )}
                      >
                        <td>{t('settings.passwordPolicy.label.minimumSpecialCharacters')}</td>
                        {oldValue && <td>{oldValue ? oldValue.minimumSpecialCharacters : ''} </td>}
                        <td>{newValue ? newValue.minimumSpecialCharacters : ''} </td>
                      </tr>
                      <tr
                        style={setColorStyle(
                          `After ${oldValue.dontAllowPasswordSimilarToUserName} Unsuccessful Login Attempts (${oldValue.dontAllowPasswordSimilarToUserName})`,
                          `After ${newValue.dontAllowPasswordSimilarToUserName} Unsuccessful Login Attempts (${newValue.dontAllowPasswordSimilarToUserName})`,
                          oldValue
                        )}
                      >
                        <td>
                          {' '}
                          {t('settings.passwordPolicy.label.dontAllowPasswordSimilarToUserName')}
                        </td>
                        {oldValue && (
                          <td>
                            {oldValue
                              ? getStatusLabel(oldValue.dontAllowPasswordSimilarToUserName)
                              : ''}
                          </td>
                        )}
                        <td>
                          {newValue
                            ? getStatusLabel(newValue.dontAllowPasswordSimilarToUserName)
                            : ''}
                        </td>
                      </tr>
                      <tr
                        style={setColorStyle(
                          `After ${oldValue.passwordsRemembered} Unsuccessful Login Attempts (${oldValue.passwordsRemembered})`,
                          `After ${newValue.passwordsRemembered} Unsuccessful Login Attempts (${newValue.passwordsRemembered})`,
                          oldValue
                        )}
                      >
                        <td>{t('settings.passwordPolicy.label.enforcePasswordHistory')}</td>
                        {oldValue && (
                          <td>
                            {' '}
                            {oldValue
                              ? getStatusLabel(oldValue.enforcePasswordHistory) === 'Yes'
                                ? `${oldValue.passwordsRemembered} Password Remembered`
                                : getStatusLabel(oldValue.enforcePasswordHistory)
                              : ''}
                          </td>
                        )}
                        <td>
                          {newValue
                            ? getStatusLabel(newValue.enforcePasswordHistory) === 'Yes'
                              ? `${newValue.passwordsRemembered} Password Remembered`
                              : getStatusLabel(newValue.enforcePasswordHistory)
                            : ''}
                        </td>
                      </tr>
                      <tr
                        style={setColorStyle(
                          `After ${oldValue.noOfFailAttempt} Unsuccessful Login Attempts (${oldValue.lockUserCount})`,
                          `After ${newValue.noOfFailAttempt} Unsuccessful Login Attempts (${newValue.lockUserCount})`,
                          oldValue
                        )}
                      >
                        <td>{t('settings.passwordPolicy.detail.lockOutTheUser')}</td>
                        {oldValue && (
                          <td>
                            {' '}
                            {oldValue
                              ? getStatusLabel(oldValue.lockOutUserAfterFailAttempts) === 'Yes'
                                ? `After ${oldValue.noOfFailAttempt} Unsuccessful Login Attempts (${oldValue.lockUserCount})`
                                : getStatusLabel(oldValue.lockOutUserAfterFailAttempts)
                              : ''}
                          </td>
                        )}
                        <td>
                          {newValue
                            ? getStatusLabel(newValue.lockOutUserAfterFailAttempts) === 'Yes'
                              ? `After ${newValue.noOfFailAttempt} Unsuccessful Login Attempts (${newValue.lockUserCount})`
                              : getStatusLabel(newValue.lockOutUserAfterFailAttempts)
                            : ''}
                        </td>
                      </tr>

                      <tr
                        style={
                          setColorStyle(
                            oldValue ? oldValue.passwordNeverExpires : '',
                            newValue ? newValue.passwordNeverExpires : '',
                            oldValue
                          ) &&
                          setColorStyle(
                            oldValue ? oldValue.passwordExpiryDay : '',
                            newValue ? newValue.passwordExpiryDay : '',
                            oldValue
                          )
                        }
                      >
                        <td>{t('settings.passwordPolicy.detail.passwordExpires')}</td>
                        {oldValue && (
                          <td>
                            {oldValue
                              ? getStatusLabel(oldValue.passwordNeverExpires) === 'Yes'
                                ? getStatusLabel(oldValue.passwordNeverExpires)
                                : `After ${oldValue.passwordExpiryDay} days`
                              : ''}
                          </td>
                        )}
                        <td>
                          {newValue
                            ? getStatusLabel(newValue.passwordNeverExpires) === 'Yes'
                              ? getStatusLabel(newValue.passwordNeverExpires)
                              : `After ${newValue.passwordExpiryDay} days`
                            : ''}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <Button
                  type="primary"
                  className="btn-custom-field m-1"
                  onClick={() => ApproveModel(approveModalProps)}
                >
                  {t('approve.button.label')}
                </Button>
                <Button type="danger" className="m-1" onClick={rejectModelShow}>
                  {t('reject.button.label')}
                </Button>
              </Skeleton>
            </Card>
          )}

          {isEmpty(newValue) && (
            <Card>
              <Row type="flex" justify="center">
                <strong>{t('settings.passwordPolicy.detail.noDraftRecordFound')}</strong>
              </Row>
            </Card>
          )}
        </Fragment>
      )}

      <RejectModel {...modalProps} />
    </>
  );
};

export default withRouter(PolicyDetail);
