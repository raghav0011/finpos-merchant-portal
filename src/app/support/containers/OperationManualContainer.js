import React from 'react';
import OperationManual from '../components/operationManual/OperationManual';
// import { useDispatch } from 'react-redux';
// import * as operationManualSlice from '../slice/operationManualSlice';

const ManualContainer = (props) => {
  // const dispatch = useDispatch();

  // const pdfView = () => {
  //   return dispatch(operationManualSlice.pdfView());
  // };

  // props = {
  //   ...props,
  //   pdfView,
  // };

  return (
    <div>
      <OperationManual {...props} />
    </div>
  );
};

export default ManualContainer;
