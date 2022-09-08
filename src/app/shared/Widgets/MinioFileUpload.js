import React, { forwardRef } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ManualFileUpload = forwardRef((props, ref) => {
  const {
    fileName,
    acceptType,
    placeholder,
    fileType,
    disabled,
    display,
    uploadUrl = null,
    customUploadHandler,
    formFieldName = null,
    minSize = 0, // in bytes
    maxSize = 100 * 1024 * 1024, // in bytes,
    // form: { setFieldsValue, setFields, validateFields },
    previewComponent = null,
  } = props;

  const fileProps = {
    onChange: ({ file, fileList }) => {},

    onRemove: (file) => {},

    beforeUpload: (file) => {
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
      return isFileTypeValid && isSizeValid;
    },

    customRequest: async (options) => {
      const { onSuccess, onError, file } = options;
      customUploadHandler(uploadUrl, file, formFieldName)
        .then((res) => {
          onSuccess('ok');
        })
        .catch((err) => {
          return onError(err);
        });
    },
  };

  return (
    <>
      <Upload
        {...fileProps}
        name={fileName}
        // fileList={selectedFileList[fileName]}
        accept={acceptType}
        listType={fileType}
        maxCount={1}
        showUploadList={'showPreviewIcon'}
      >
        {!display && (
          <Button block disabled={disabled}>
            <UploadOutlined /> {placeholder}
          </Button>
        )}
      </Upload>
      {previewComponent}
    </>
  );
});

export default ManualFileUpload;
