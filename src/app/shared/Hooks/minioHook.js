import { useState, useEffect } from 'react';
import { message } from 'antd';

import { fetch } from '../../../utils/httpUtil';

const useMinio = (type) => {
  const [payload, setPayload] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        let res = await fetch(`config/v1/uploader/${type}`);
        if (res.data.success) {
          setPayload(res.data.data);
        } else {
          setPayload();
        }
      } catch (error) {
        message.error(error?.message || 'Minio Error!');
      }
    };
    fetchApi();
  }, []);

  return payload;
};

export default useMinio;
