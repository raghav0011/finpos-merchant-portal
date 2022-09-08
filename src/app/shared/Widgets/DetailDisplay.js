import React, { forwardRef, useRef } from 'react';
import { Row, Col, Descriptions, Empty, Spin, Image } from 'antd';
import ReactToPrint from 'react-to-print';
import classnames from 'classnames';
import { isEmpty } from 'lodash';

import { WButton } from '.';

const DetailDisplay = forwardRef(
  (
    {
      printTitle,
      title,
      extraTitleContent,
      dataSource,
      footerContent,
      layout = 'vertical',
      loading = false,
      colon = false,
      showPrint = false,
      componentToPrint = null,
      column = { xl: 3, lg: 2, md: 2, sm: 1, xs: 1 },
      bordered = false,
      size = 'small',
      className = '',
      ...rest
    },
    ref,
  ) => {
    const printRef = useRef();

    const noData = (
      <Descriptions.Item className="p-0 px-1 d-flex justify-content-center" span={column.xl}>
        <Empty/>
      </Descriptions.Item>
    );

    const getDetailChildren = () => {
      if (isEmpty(dataSource)) {
        return noData;
      }
      if (typeof dataSource === 'object' && !Array.isArray(dataSource) && dataSource !== null) {
        return Object.entries(dataSource)
          .map(([key, value], index) => {
            if (key.startsWith('img-')) {
              return {
                label: key.split('-')[1],
                value: <Image width={150} src={value} alt={key}/>,
              };
            } else if (value === 1 || value === 0) {
              return {
                label: key,
                value: value ? 'YES' : 'NO',
              };
            }
            return {
              label: key,
              value: value || 'n/a',
            };
          })
          .map((item, index) => {
            return getDescriptionItem(item.label, item.value, index, item?.span || 1);
          });
      } else if (Array.isArray(dataSource) && dataSource.length > 0) {
        return dataSource.map((item, index) => {
          return getDescriptionItem(item.label, item.value, index, item?.span || 1);
        });
      } else {
        return noData;
      }
    };

    const getDescriptionItem = (label, value, key, span = 1) => {
      return (
        <Descriptions.Item className={!bordered && `p-0 px-1 `} key={key} span={span} label={label}>
          {value}
        </Descriptions.Item>
      );
    };

    const getComponentToPrint = () => {
      return (
        componentToPrint || (
          <Descriptions
            className="custom-description"
            layout={layout}
            title={printTitle || title}
            colon={false}
            column={3}
            labelStyle={{
              fontWeight: '600',
              paddingBottom: '.25em',
            }}
            contentStyle={{
              fontWeight: '400',
              paddingBottom: '1em',
            }}
          >
            {getDetailChildren()}
          </Descriptions>
        )
      );
    };

    return (
      <Spin spinning={loading}>
        {showPrint && (
          <div className="text-right p-2">
            <ReactToPrint
              bodyClass="p-5 print-class"
              trigger={() => <WButton customType="exportPdf">Print</WButton>}
              content={() => printRef.current}
            />
            <div style={{ display: 'none' }}>
              <div ref={printRef}>{getComponentToPrint()}</div>
            </div>
          </div>
        )}
        <div>
          <Descriptions
            size={size}
            bordered={bordered}
            className={classnames('custom-description', className)}
            layout={layout}
            title={title}
            extra={extraTitleContent}
            colon={colon}
            column={column}
            labelStyle={{
              fontWeight: '600',
              paddingBottom: '.25em',
            }}
            contentStyle={{
              fontWeight: '400',
              paddingBottom: '1em',
            }}
            {...rest}
          >
            {getDetailChildren()}
          </Descriptions>
        </div>
        {footerContent && (
          <Row>
            <Col xs={24} className="text-right mt-2">
              {footerContent}
            </Col>
          </Row>
        )}{' '}
      </Spin>
    );
  },
);

export default DetailDisplay;
