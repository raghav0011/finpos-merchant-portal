import React, { useState, useEffect } from 'react';

import { Upload, message, Spin } from 'antd';
import { fetch, store } from '../../../utils/httpUtil';
import axios from 'axios';
import { WButton } from '.';
import { UploadOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { openInNewTab } from '../../../utils/commonUtil';

const DynamicMinioUploader = (props, ref) => {
  const {
    acceptType = 'any',
    minSize = 0,
    maxSize = 100 * 1024 * 1024,
    value,
    onChange,
    maxCount = 1,
    placeholder = 'Upload',
    listType = 'picture',
    id,
    formName,

    ...rest
  } = props;

  const [loading, setLoading] = useState(false);

  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const [uploadFormData, setUploadFormData] = useState({});
  const [uploadUrl, setUploadUrl] = useState(undefined);

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (value) {
      setLoading(true);
      let id;
      if (typeof value === 'string') {
        id = value;
      } else if (value?.id) {
        id = value.id;
      } else {
        // TODO
      }

      store('config/v1/uploader/get-url', { object_name: `${id}` })
        .then((res) => {
          if (res.data.success) {
            setUploadedImageUrl(res?.data?.data?.url);
            const name = res?.data?.data?.url.split('?')[0].split('__')[1] || 'file';
            setFileList([
              {
                uid: '-1',
                name,
                status: 'done',
                url: res?.data?.data?.url,
              },
            ]);
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [value]);

  const fileProps = {
    beforeUpload: async (file) => {
      let isFileTypeValid;
      if (acceptType !== 'any') {
        isFileTypeValid = acceptType.includes(file.type);
        if (!isFileTypeValid) {
          message.error(`You can only upload ${acceptType} file!`);
          file.status = 'error';
        }
      } else isFileTypeValid = true;
      const isSizeValid = file.size < maxSize && file.size > minSize;

      if (!isSizeValid) {
        message.error(
          `Image must be between ${parseFloat(minSize / 1024 / 1024)} MB and ${parseFloat(
            maxSize / 1024 / 1024
          )} MB`
        );
        file.status = 'error';
      }

      if (isFileTypeValid && isSizeValid) {
        try {
          let res = await fetch(
            'config/v1/uploader/fetch-url',
            {
              field: id,
              formName: formName,
            },
            {
              acceptType: file.type,
            }
          );

          if (!res.data.success) throw new Error('Something went wrong fetching upload meta');

          setUploadFormData(res.data?.data?.formData);
          setUploadUrl(res.data?.data?.postURL);
        } catch (error) {
          message.error(error?.message || 'Minio Error');
          return false;
        }
      }
      return isFileTypeValid && isSizeValid;
    },
    customRequest: (options) => {
      const { file, onError, onSuccess } = options;
      setLoading(true);
      const formData = new FormData();
      Object.entries(uploadFormData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('file', file);

      axios
        .post(uploadUrl, formData)
        .then((res) => {
          if (res?.status >= 200) {
            onSuccess('ok');
            onChange({ id: uploadFormData?.key, etag: res.headers.etag.split('"')?.[1] });
            setLoading(false);
            message.success('Successfully Uploaded');
          }
        })
        .catch((err) => {
          message.error(err?.message || 'Minio upload Error. please try again');
          onError(err);
          setLoading(false);
        });
    },
    onChange: ({ file }) => {
      if (file.status === 'done') {
        message.success('Successfully Uploaded');
      } else if (file.status === 'error') {
        message.error(file?.error?.message || 'Minio upload Error. please try again');
      }
    },
    onPreview: (file) => {
      openInNewTab(uploadedImageUrl);
    },
    onRemove: (file) => {
      setFileList([]);
      onChange(undefined);
    },
  };

  const pictureCardUploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const uploadBtn =
    listType === 'picture-card' ? (
      pictureCardUploadButton
    ) : (
      <WButton icon={<UploadOutlined />} full>
        {placeholder}
      </WButton>
    );
  return (
    <>
      <Upload
        listType={listType}
        ref={ref}
        className="single-uploader p-0 m-0"
        maxCount={maxCount}
        {...fileProps}
        {...rest}
        fileList={fileList}
      >
        {loading ? <Spin spinning /> : fileList.length >= maxCount ? null : uploadBtn}
      </Upload>
    </>
  );
};

export default React.forwardRef(DynamicMinioUploader);
