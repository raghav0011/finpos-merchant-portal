import React, { useState, useEffect } from 'react';

import { Upload, message, Modal, Spin } from 'antd';
import { fetch, store } from '../../../utils/httpUtil';
import axios from 'axios';
import { WButton } from '.';
import { UploadOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';

// TODO
/**
 *
 * # add/edit
 * 1. upload all files to a test(temp) bucket
 * 2. on add/edit success in their respective services copy the files to their respective buckets
 * 3. periodically clean the temp bucket (once every 12/24 hrs)
 *
 * # on fetch
 * 1. do as it si currently being doe(its ok)
 *
 * # on fetch for edit
 * 1. send the field value along with the image/file url from tthe be.
 * as BE has access to the bucket location the id stored in the db can be used to get a fetchurl which can be sent
 * in form of [id, url] } props
 * 2. then using this component index 0 can be initialized in no deps useeffect like
 *           ``` onChange(value[0];```
 * 3. similarly the index 1 can be viewed for preview
 */
const DynamicMinioUploader = (props, ref) => {
  const {
    acceptType = 'any',
    minSize = 0,
    maxSize = 100 * 1024 * 1024,
    minioDirectory,
    value,
    onChange,
    maxCount = 1,
    placeholder = 'Upload',
    listType = 'picture',

    ...rest
  } = props;

  const [payload, setPayload] = useState();
  const [loading, setLoading] = useState(false);

  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (value) {
      setLoading(true);
      store('config/v1/uploader/get-url', { object_name: `${minioDirectory}/${value}` })
        .then((res) => {
          if (res.data.success) {
            setUploadedImageUrl(res?.data?.data?.url);
            setFileList([
              {
                uid: '-1',
                name: 'image.png',
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
          let res = await fetch(`config/v1/uploader/${minioDirectory}`);
          // let res = await fetch(`config/v1/uploader/test`);
          if (res.data.success) {
            setPayload(res.data.data);
          } else {
            setPayload();
          }
        } catch (error) {
          message.error(error?.message || 'Minio Error');
          return false;
        }
      }
      return isFileTypeValid && isSizeValid;
    },
    customRequest: (options) => {
      const { file, onError, onSuccess } = options;
      if (payload?.url) {
        setLoading(true);

        axios
          // .put(`${payload.url}a`, file)
          .put(payload.url, file)
          .then((res) => {
            setUploadedImageUrl('');
            onChange(payload.minio_id);
            onSuccess('ok');
            setLoading(false);
            message.success('Successfully Uploaded');
          })
          .catch((err) => {
            setLoading(false);
            message.error(file?.error?.message || 'Minio upload Error. please try again');
            onError(err);
          });
      }
    },
    onChange: ({ file }) => {
      if (file.status === 'done') {
        message.success('Successfully Uploaded');
      } else if (file.status === 'error') {
        message.error(file?.error?.message || 'Minio upload Error. please try again');
      }
    },
    onPreview: (file) => {
      setPreviewVisible(true);
    },
    onRemove: (file) => {
      setFileList([]);
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
  // TODO on form submission fail delete the uploaded image from minio
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
      <Modal
        centered
        bodyStyle={{ padding: 0 }}
        visible={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="add-document" style={{ width: '100%' }} src={uploadedImageUrl} />
      </Modal>
    </>
  );
};

export default React.forwardRef(DynamicMinioUploader);
