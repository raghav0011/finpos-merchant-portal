import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import custom components
import Dashboard from '../../dashboard/components/Dashboard';
import * as dashboardSlice from '../slice/dashboardSlice';
import * as dashboardSummarySlice from '../slice/dashboardSummarySlice';

export const DashboardContainer = (props) => {
  const dispatch = useDispatch();

  const dashboard = useSelector((state) => state.dashboard.payload);
  const dashboardLoading = useSelector((state) => state.dashboard.loading);
  const dashboardErrors = useSelector((state) => state.dashboard.errors);
  const dashboardPagination = useSelector((state) => state.dashboard.pagination);
  const summary = useSelector((state) => state.summary.payload);
  const summaryLoading = useSelector((state) => state.summary.loading);
  const summaryErrors = useSelector((state) => state.summary.errors);

  /**
   * Fetch  transaction summary data
   * @param {string} formData
   * @returns
   */
  const fetchSummary = (formData) => {
    dispatch(dashboardSummarySlice.fetchDashboardSummary(formData));
  };

  /**
   * Fetch transaction list on dashboard
   * @param {string} formData
   * @returns
   */
  const fetchTransactionListByCriteria = (formData) => {
    return dispatch(dashboardSlice.fetchTransactionListByCriteria(formData));
  };

  /**
   * Clean transaction data on dashboard
   */
  const cleanDashboard = () => {
    dispatch(dashboardSlice.cleanDashboard());
  };

  /**
   * Clean transaction list data on dashboard
   */
  const cleanDashboardList = () => {
    dispatch(dashboardSlice.cleanDashboardList());
  };

  /**
   * Clean transaction error data on dashboard
   */
  const cleanDashboardErrors = () => {
    dispatch(dashboardSlice.cleanDashboardErrors());
  };

  const cleanSummary = () => {
    dispatch(dashboardSummarySlice.cleanSummary());
  };

  /**
   * Clean transaction summary  data on dashboard
   */
  const cleanDashboardSummary = () => {
    dispatch(dashboardSummarySlice.cleanDashboardSummary());
  };

  /**
   * Clean transaction summary error data on dashboard
   */
  const cleanDashboardSummaryErrors = () => {
    dispatch(dashboardSummarySlice.cleanDashboardSummaryErrors());
  };

  props = {
    ...props,
    dashboard,
    dashboardLoading,
    dashboardErrors,
    dashboardPagination,
    fetchTransactionListByCriteria,
    fetchSummary,
    cleanDashboard,
    cleanDashboardList,
    cleanDashboardErrors,
    summary,
    summaryLoading,
    summaryErrors,
    cleanSummary,
    cleanDashboardSummary,
    cleanDashboardSummaryErrors,
  };
  return <Dashboard {...props} />;
};

export default DashboardContainer;
