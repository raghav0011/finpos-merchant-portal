import React from 'react';
import { Timeline, Card, Empty, Row, Col } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { isEmpty } from 'lodash';

import './styles.css';

const StatusTimeline = ({ dataSource }) => {
  if (isEmpty(dataSource)) {
    return <Empty />;
  }
  return (
    <Card
      bodyStyle={{
        paddingBottom: '24px',
        paddingTop: '71px',
      }}
    >
      <Row>
        <Col xs={24} sm={16} md={24} lg={16} xl={12}>
          <Timeline mode={'left'}>
            {dataSource?.map((item) => {
              return (
                <Timeline.Item
                  position="left"
                  dot={
                    item?.remit_status === 'Hold' ? (
                      <CheckCircleTwoTone twoToneColor="Orange" className="timeline-font" />
                    ) : item?.remit_status === 'Passed' ? (
                      <CheckCircleTwoTone twoToneColor="DarkBlue" className="timeline-font" />
                    ) : item?.remit_status === 'Rejected' ? (
                      <CheckCircleTwoTone twoToneColor="Red" className="timeline-font" />
                    ) : item?.remit_status === 'Processing' ? (
                      <CheckCircleTwoTone twoToneColor="#98f3ff" className="timeline-font" />
                    ) : item?.remit_status === 'Compliance Reviewing' ? (
                      <CheckCircleTwoTone twoToneColor="a19209" className="timeline-font" />
                    ) : item?.remit_status === 'Parking' ? (
                      <CheckCircleTwoTone twoToneColor="Teal" className="timeline-font" />
                    ) : item?.remit_status === 'Authorizing' ? (
                      <CheckCircleTwoTone twoToneColor="LightGreen" className="timeline-font" />
                    ) : item?.remit_status === 'Authorized' ? (
                      <CheckCircleTwoTone twoToneColor="Green" className="timeline-font" />
                    ) : item?.remit_status === 'Completed' ? (
                      <CheckCircleTwoTone twoToneColor="DarkGreen" className="timeline-font" />
                    ) : item?.remit_status === 'Rejecting' ? (
                      <CheckCircleTwoTone twoToneColor="#f87b49" className="timeline-font" />
                    ) : (
                      <CheckCircleTwoTone twoToneColor="Blue" className="timeline-font" />
                    )
                  }
                  color={
                    item?.remit_status === 'Hold'
                      ? 'Orange'
                      : item?.remit_status === 'Passed'
                      ? 'DarkBlue'
                      : item?.remit_status === 'Rejected'
                      ? 'Red'
                      : item?.remit_status === 'Processing'
                      ? '#98f3ff'
                      : item?.remit_status === 'Compliance Reviewing'
                      ? 'Yellow'
                      : item?.remit_status === 'Parking'
                      ? 'Teal'
                      : item?.remit_status === 'Authorizing'
                      ? 'LightGreen'
                      : item?.remit_status === 'Authorized'
                      ? 'Green'
                      : item?.remit_status === 'Completed'
                      ? 'DarkGreen'
                      : item?.remit_status === 'Rejecting'
                      ? '#f87b49'
                      : 'Blue'
                  }
                  label={item.status_date}
                >
                  <strong>{item.remit_status}</strong>
                  <br />[<strong>{item.status_by}</strong>]
                </Timeline.Item>
              );
            })}
          </Timeline>
        </Col>
      </Row>
    </Card>
  );
};

export default StatusTimeline;
