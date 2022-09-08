import CryptoJS from 'crypto-js';

const secretKey = 'NRNILYy7zs8n9dsgqlms7EAbW5RejBWU';

export const encrypt = (data) => {
  const jsonify = JSON.stringify(data);
  return CryptoJS.AES.encrypt(jsonify, secretKey).toString();
};

export const decrypt = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
