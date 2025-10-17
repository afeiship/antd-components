---
nav:
  title: 组件
  path: /components
---

## AcUpload
> 上传组件。

```jsx
import React, { useState } from 'react';
import { AcUpload } from '@jswork/antd-components';
import { Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });
    setUploading(true);

    // You can customize your upload logic here
    // For example, using fetch or axios to send formData
    fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success('upload successfully.');
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <AcUpload {...props}>
      <Button icon={<UploadOutlined />} disabled={uploading}>
        选择文件
      </Button>
      <Button
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? '上传中' : '开始上传'}
      </Button>
    </AcUpload>
  );
};
```