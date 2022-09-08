import React, { useEffect } from 'react';
import {
  UsergroupAddOutlined,
  RiseOutlined,
  PieChartOutlined,
  DollarOutlined,
} from '@ant-design/icons';

const Section = (props) => {
  const { summary, fetchSummary, cleanSummary } = props;

  useEffect(() => {
    fetchSummary();
    return () => {
      cleanSummary();
    };
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <div className="row">
      <div className="col-xl-3 mb-4">
        <div className="number-card-v1">
          <div className="card-top">
            <PieChartOutlined />
          </div>
          <div className="card-info">
            <span>Transaction Volume</span>
          </div>

          <div className="card-bottom">
            {summary?.[0]?.transaction_volume
              ? Intl.NumberFormat('en-US', {
                  notation: 'compact',
                  maximumFractionDigits: 2,
                }).format(summary?.[0]?.transaction_volume)
              : 0}
          </div>
        </div>
      </div>

      <div className="col-xl-3 mb-4">
        <div className="number-card-v1">
          <div className="card-top">
            {summary?.[0]?.new_customers ? (
              <span>
                {summary?.[0]?.new_customers}
                <span className="h5" />
              </span>
            ) : (
              0
            )}
          </div>
          <div className="card-info">
            <span>New Customers</span>
          </div>
          <div className="card-bottom">
            <UsergroupAddOutlined />
          </div>
        </div>
      </div>

      <div className="col-xl-3 mb-4">
        <div className="number-card-v1">
          <div className="card-top">
            <RiseOutlined />
          </div>
          <div className="card-info">
            <span>Receivable</span>
          </div>
          <div className="card-bottom">
            {summary?.[0]?.total_receivable
              ? Intl.NumberFormat('en-US', {
                  notation: 'compact',
                  maximumFractionDigits: 2,
                }).format(summary?.[0]?.total_receivable)
              : 0}
          </div>
        </div>
      </div>

      <div className="col-xl-3 mb-4">
        <div className="number-card-v1">
          <div className="card-top">
            {summary?.[0]?.fx_gain
              ? Intl.NumberFormat('en-US', {
                  notation: 'compact',
                  maximumFractionDigits: 2,
                }).format(summary?.[0]?.fx_gain)
              : 0}
          </div>
          <div className="card-info">
            <span>FX Gain</span>
          </div>
          <div className="card-bottom">
            <DollarOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
