---
nav:
  title: 组件
  path: /components
---

## AcUploadDragger
> 拖拽上传组件。

```jsx
import React from 'react';
import { AcUploadDragger } from '@jswork/antd-components';
import { message } from 'antd';

export default () => {
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return <AcUploadDragger {...props}>点击或拖拽文件到此区域上传。</AcUploadDragger>;
};
```