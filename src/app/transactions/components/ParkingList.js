// import { isEmpty } from 'lodash';
// import React, { useEffect, useState } from 'react';
// import { message, Tag } from 'antd';
// import classNames from 'classnames';
// import { getSortingOrder } from '../../../utils/commonUtil';

// import { WCustomSearchTable, WButton } from '../../shared/Widgets';
// import { useModalHook } from '../../shared/Hooks';
// import Details from './details';
// // import { transactionAuthorize, transactionReject } from '../slice/transactionAPI';

// const ParkingList = (props) => {
//   const {
//     transactions: {
//       transactionLoading,
//       transactionPagination,
//       transactions,
//       fetchTransactionListByCriteria,
//       fetchTransactionById,
//       cleanTransaction,
//       cleanTransactionDetails,
//       cleanTransactionErrors,
//     },
//   } = props;
//   const [searchValue, setSearchValue] = useState('');
//   const [modalVisible, showModal, hideModal] = useModalHook();
//   const [modalRejectVisible, showRejectModal, hideRejectModal] = useModalHook();
//   const [modalAcceptVisible, showAcceptModal, hideAcceptModal] = useModalHook();
//   const [loading, setLoading] = useState(false);

//   const [selectedId, setSelectedId] = useState(undefined);

//   useEffect(() => {
//     fetchTransactionListByCriteria({
//       status: 'Parking',
//     });
//     return () => {
//       cleanTransaction();
//     };
//   }, []);

//   const handleTableChange = (pagination, filters, sorter) => {
//     fetchTransactionListByCriteria({
//       search_key: searchValue ? searchValue : undefined,
//       page_size: pagination.pageSize,
//       page_number: pagination.current,
//       sort_by: sorter?.field,
//       status: 'Parking',
//       sort_order: getSortingOrder(sorter.order),
//     });
//   };

//   const onSearch = (value) => {
//     fetchTransactionListByCriteria({ search_key: value, status: 'Parking' });
//     setSearchValue(value);
//   };

//   const getCols = () => {
//     if (isEmpty(transactions)) return [];
//     if (!(transactions instanceof Array)) return [];

//     const columns = Object.entries(transactions[0])
//       .filter(([key]) => !['id'].includes(key))
//       .map(([key, value]) => {
//         if (key === 'Current Status') {
//           return {
//             title: key,
//             dataIndex: key,
//             align: 'center',
//             render: (text) => {
//               const upperCaseText = text.toUpperCase();
//               return (
//                 <Tag
//                   className={classNames({
//                     'error-bg-1': upperCaseText === 'REJECTED',
//                     'warning-bg-1': upperCaseText === 'HOLD',
//                     'initiated-bg-1': upperCaseText === 'INITIATED',
//                     'authorized-bg-1': upperCaseText === 'AUTHORIZED',
//                     'review-bg-1': upperCaseText === 'COMPLIANCE REVIEWING',
//                     'parking-bg-1 ': upperCaseText === 'PARKING',
//                     'processing-bg-1 ': upperCaseText === 'PROCESSING',
//                     'passed-bg-1 ': upperCaseText === 'PASSED',
//                     'authorizing-bg-1 ': upperCaseText === 'AUTHORIZING',
//                     'complete-bg-1 ': upperCaseText === 'COMPLETED',
//                     'parked-bg-1 ': upperCaseText === 'PARKED',
//                   })}
//                   style={{ width: '21ch' }}
//                 >
//                   {upperCaseText}
//                 </Tag>
//               );
//             },
//           };
//         }
//         return {
//           title: key,
//           dataIndex: key,
//           // sorter: true,
//           render: (text) => text || '-',
//         };
//       });
//     const id = {
//       title: '#',
//       key: 'index',
//       align: 'center',
//       render: (text, record, index) => {
//         return (transactionPagination.current - 1) * transactionPagination.pageSize + index + 1;
//       },
//     };
//     return [id, ...columns];
//   };
//   const tableProps = {
//     dataSource: transactions,
//     rowKey: 'id',
//     columns: getCols(),
//     tableLoading: transactionLoading,
//     pagination: transactionPagination,
//     handleTableChange,
//     onSearch,
//     className: 'clickable-table-row',
//     onRow: (record, rowIndex) => {
//       return {
//         onClick: (e) => {
//           fetchTransactionById(record?.id);
//           setSelectedId(record?.id);
//           showModal();
//         },
//       };
//     },
//   };

//   const onCancel = () => {
//     hideRejectModal();
//     hideAcceptModal();
//   };

//   const onApprove = (values) => {
//     setLoading(true);
//     transactionAuthorize({ ...values, id: selectedId })
//       .then((res) => {
//         message.success(res?.return_msg || 'Transaction Authorized');
//         hideAcceptModal();
//         hideModal();
//         fetchTransactionListByCriteria({
//           status: 'Parking',
//         });
//         setLoading(false);
//       })
//       .catch((err) => {
//         setLoading(false);
//         message.error(err?.message);
//       });
//   };

//   const onReject = (values) => {
//     setLoading(true);
//     transactionReject({ ...values, id: selectedId })
//       .then((res) => {
//         message.success(res?.return_msg || 'Transaction Rejected');
//         hideRejectModal();
//         hideModal();
//         fetchTransactionListByCriteria({
//           status: 'Parking',
//         });
//         setLoading(false);
//       })
//       .catch((err) => {
//         setLoading(false);
//         message.error(err?.message);
//       });
//   };

//   return (
//     <div>
//       <WCustomSearchTable {...tableProps} />
//       <Details
//         additionalComponents={
//           <div className="text-right pb-4">
//             <WButton
//               className="mr-1"
//               type="primary"
//               onClick={() => {
//                 showAcceptModal();
//               }}
//             >
//               Authorize
//             </WButton>

//             <WButton
//               danger
//               onClick={() => {
//                 showRejectModal();
//               }}
//             >
//               Reject
//             </WButton>
//           </div>
//         }
//         hideModal={hideModal}
//         modalVisible={modalVisible}
//         transactions={props.transactions}
//         afterClose={() => {
//           cleanTransactionDetails();
//           cleanTransactionErrors();
//           setSelectedId(undefined);
//           onCancel();
//         }}
//       />
//     </div>
//   );
// };

// export default ParkingList;
