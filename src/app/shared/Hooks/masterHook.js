import { useState, useEffect } from 'react';
import { fetch, store } from '../../../utils/httpUtil';

const useMasterData = (masterType) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [payload, setPayload] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        let res = await store(`v1/lookup/${masterType}`, {});
        if (res.data.message === 'SUCCESS') {
          setSuccess(true);
          setPayload(res.data.data);
          setLoading(false);
        } else {
          setSuccess(false);
          setLoading(false);
          setError({});
          setPayload();
        }
      } catch (error) {
        setSuccess(false);
        setLoading(false);
        setError(error);
      }
    };
    fetchApi();
  }, []);

  return { payload, loading, success, error };
};

export default useMasterData;
