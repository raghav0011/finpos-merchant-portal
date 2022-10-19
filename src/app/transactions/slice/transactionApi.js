import { fetch, store, download } from '../../../utils/httpUtil';
import { message } from 'antd';

//download merchnat Receipt

// export const fetchDownloadMerchantReceipt = async (id) => {
//   return () => {
//     message.loading('Generating...');
//     return download(`v1/transaction/receipt/${id}`)
//       .then((response) => {
//         if (response.status === 200) {
//           message.destroy();
//           return response;
//         } else {
//           message.error('Download Failed');
//         }
//       })
//       .catch((error) => {
//         message.error('Unable to generate receipt. Please try again later');
//       });
//   };
// };

export const fetchDownloadMerchantReceipt = async (id) => {
  try {
    const res = await download(`v1/transaction/receipt/${id}`);
    console.log('🚀 ~ file: transactionApi.js ~ line 27 ~ fetchDownloadMerchantReceipt ~ res', res);
    message.loading('Generating...');
    if (res.data.success) {
      return res.data.data;
    } else {
      message.error('Download Failed');
    }
  } catch (error) {
    message.error('Unable to generate receipt. Please try again later');
  }
};
