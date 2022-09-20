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

  /**
   * Fetch txn list
   * @param {string} formData
   * @returns
   */
  const fetchTransactionListByCriteria = (formData) => {
    return dispatch(transactionSlice.fetchTransactionListByCriteria(formData));
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
  };
  return <Tabs {...props} />;
};

export default TransactionListContainer;
