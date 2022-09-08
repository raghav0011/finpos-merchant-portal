import { Card } from 'antd';
import { isEmpty } from 'lodash';
import React, { useRef } from 'react';
import { WDetailDisplay, WButton } from '../../../shared/Widgets';
import ReactToPrint from 'react-to-print';

const Transaction = ({ dataSource }) => {
  const printRef = useRef();

  return (
    <Card>
      <div className="text-right p-2">
        <ReactToPrint
          bodyClass="p-5 print-class"
          trigger={() => <WButton customType="exportPdf">Print</WButton>}
          content={() => printRef.current}
        />
        <div style={{ display: 'none' }}>
          <div ref={printRef}>
            <TransactionDetailComponent dataSource={dataSource} />
          </div>
        </div>
      </div>

      <TransactionDetailComponent dataSource={dataSource} />
    </Card>
  );
};

const TransactionDetailComponent = ({ dataSource }) => {
  return (
    <div>
      {!isEmpty(dataSource) &&
        Object.entries(dataSource)
          .filter(([key, value]) => {
            return (
              !isEmpty(value) &&
              [
                'Sender Details',
                'Receiver Details',
                'Transaction Details',
                'Calculation Details',
              ].includes(key)
            );
          })
          .map(([key, value], index, recordv) => {
            return (
              <div className="my-2 pt-3" key={index}>
                <h5>
                  <strong style={{ textDecoration: 'underline' }}>{key}</strong>
                </h5>
                <WDetailDisplay
                  dataSource={value[0]}
                  column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}
                />
                {index < recordv.length - 1 && (
                  <div style={{ borderBottom: 'rgba(0,0,0,.6) dashed 1px', marginRight: '5px' }} />
                )}
              </div>
            );
          })}
    </div>
  );
};
export default Transaction;
