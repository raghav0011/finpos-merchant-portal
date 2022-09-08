import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TransactionList from '../components';
import * as transactionSlice from '../slice/transactionSlice';

const TransactionListContainer = (props) => {
  const dispatch = useDispatch();

  const transactions = useSelector((state) => state.transactions.payload);
  const transactionLoading = useSelector((state) => state.transactions.loading);
  const transactionErrors = useSelector((state) => state.transactions.errors);
  const transactionPagination = useSelector((state) => state.transactions.pagination);

  const transactionDetail = useSelector((state) => state.transactions.detailPayload);
  const transactionDetailLoading = useSelector((state) => state.transactions.detailLoading);
  const transactionDetailError = useSelector((state) => state.transactions.detailErrors);

  /**
   * Fetch txn by id
   * @param {string} id
   * @returns
   */
  const fetchTransactionById = (id) => {
    return dispatch(transactionSlice.fetchTransactionById(id));
  };

  /**
   * Fetch txn list
   * @param {string} formData
   * @returns
   */
  const fetchTransactionListByCriteria = (formData) => {
    return dispatch(transactionSlice.fetchTransactionListByCriteria(formData));
  };

  /**
   * Clean txn data
   */
  const cleanTransaction = () => {
    dispatch(transactionSlice.cleanTransaction());
  };

  /**
   * Clean txn detail data
   */
  const cleanTransactionDetails = () => {
    dispatch(transactionSlice.cleanTransactionDetails());
  };

  /**
   * Clean txn list data
   */
  const cleanTransactionList = () => {
    dispatch(transactionSlice.cleanTransactionList());
  };

  /**
   * Clean txn error data
   */
  const cleanTransactionErrors = () => {
    dispatch(transactionSlice.cleanTransactionErrors());
  };

  props = {
    ...props,
    transactions: {
      transactions,
      transactionLoading,
      transactionErrors,
      transactionPagination,
      transactionDetail,
      transactionDetailLoading,
      transactionDetailError,
      fetchTransactionById,
      fetchTransactionListByCriteria,
      cleanTransaction,
      cleanTransactionDetails,
      cleanTransactionList,
      cleanTransactionErrors,
    },
  };
  return <TransactionList {...props} />;
};

export default TransactionListContainer;
