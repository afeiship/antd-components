---
nav:
  title: 组件
  path: /components
---

## AcUploadPictureCard
> 图片卡片上传组件。

```jsx
import React, { useState } from 'react';
import { AcUploadPictureCard } from '@jswork/antd-components';

export default () => {
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <AcUploadPictureCard
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture-card"
      fileList={fileList}
      onChange={onChange}
    />
  );
};
```