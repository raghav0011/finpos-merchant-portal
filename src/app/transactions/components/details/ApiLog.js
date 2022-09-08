import { Card, Empty, Collapse, Tabs } from 'antd';
import { isEmpty } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { WDetailDisplay } from '../../../shared/Widgets';

const ApiLog = ({ dataSource }) => {
  const { t } = useTranslation();
  if (isEmpty(dataSource)) {
    return <Empty />;
  }
  return (
    <Card>
      <Collapse>
        {dataSource instanceof Array &&
          dataSource.map((item) => {
            const apiDetails = Object.entries(item)
              .filter(([key]) =>
                ['method_id', 'request_by', 'request_date', 'response_date'].includes(key)
              )
              .map(([key, value]) => {
                return {
                  label: t(`apiLog.${key}`),
                  value,
                };
              });
            return (
              <Collapse.Panel
                header={<strong style={{ textTransform: 'uppercase' }}>{item?.method_name}</strong>}
                key={item?.id}
              >
                <div>
                  <WDetailDisplay
                    dataSource={apiDetails}
                    column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }}
                  />
                  <Tabs>
                    <Tabs.TabPane tab="API Request" key="api_request">
                      <JsonViewer dataSource={item?.api_request} payloadType={'Request'} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="API Response" key="api_response">
                      <JsonViewer dataSource={item?.api_response} payloadType={'Response'} />
                    </Tabs.TabPane>
                  </Tabs>
                </div>
              </Collapse.Panel>
            );
          })}
      </Collapse>
    </Card>
  );
};

const JsonViewer = ({ dataSource, payloadType }) => {
  if (isEmpty(dataSource)) {
    return <Empty />;
  }

  return (
    <div>
      <pre>
        <div style={{ paddingTop: 20 }}>
          <h6>
            <strong>{payloadType}:</strong>
          </h6>

          <pre>
            <h6>{JSON.stringify(dataSource, ' ', 4)}</h6>
          </pre>
        </div>
      </pre>
    </div>
  );
};
export default ApiLog;
