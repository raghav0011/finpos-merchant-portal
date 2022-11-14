import React from 'react';
import OperationManual from '../components/OperationManual';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { pdfView } from '../slice/operationManualSlice';
import * as operationManualSlice from '../slice/operationManualSlice';

const ManualContainer = (props) => {
  const { pdfItems, isLoading } = useSelector((state) => state.OperationManual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pdfView());
  }, []);

  props = {
    ...props,
  };

  return (
    <div>
      <OperationManual {...props} />
    </div>
  );
};

export default ManualContainer;
