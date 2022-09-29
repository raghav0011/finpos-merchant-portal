import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Tabs from '../components/Tabs';
import * as transactionSlice from '../slice/transactionSlice';

const TransactionListContainer = (props) => {
  const dispatch = useDispatch();

  const transactions = useSelector((state) => state.transactions.payload);
  const transactionLoading = useSelector((state) => state.transactions.loading);
  const transactionErrors = useSelector((state) => state.transactions.errors);
  const transactionPagination = useSelector((state) => state.transactions.pagination);
  const transactionFilterFields = useSelector((state) => state.transactionFilterField.payload);
  const totalApprovedAmounts = useSelector((state) => state.transactions.totalApprovedAmounts);

  /**
   * Fetch role filter field records.
   * @param {object} formData
   *
   */
  const fetchTransactionFilterField = (formData) => {
    dispatch(transactionSlice.fetchTransactionFilterField(formData));
  };

  /**
   * Fetch  Today txn list
   * @param {string} formData
   * @returns
   */
  const fetchTodayTransactionWithCriteria = (formData) => {
    return dispatch(transactionSlice.fetchTodayTransactionWithCriteria(formData));
  };

  /**
   * Fetch  all txn list
   * @param {string} formData
   * @returns
   */
  const fetchTransactionListByCriteria = (formData) => {
    return dispatch(transactionSlice.fetchTransactionListByCriteria(formData));
  };

  /**
   * Fetch  watch txn list
   * @param {string} formData
   * @returns
   */
  const fetchTransactionWatchListWithCriteria = (formData) => {
    return dispatch(transactionSlice.fetchTransactionWatchListWithCriteria(formData));
  };

  /**
   * Clean txn list data
   */
  const cleanTransactionList = () => {
    dispatch(transactionSlice.cleanTransactionList());
  };

  props = {
    ...props,

    transactions,
    transactionLoading,
    transactionErrors,
    transactionPagination,
    fetchTransactionListByCriteria,
    cleanTransactionList,
    fetchTransactionWatchListWithCriteria,
    fetchTransactionFilterField,
    transactionFilterFields,
    fetchTodayTransactionWithCriteria,
    totalApprovedAmounts,
  };
  return <Tabs {...props} />;
};

export default TransactionListContainer;
