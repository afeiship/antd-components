---
nav:
  title: 组件
  path: /components
---

## AcUploadPicture
> 图片上传组件。

```jsx
import React, { useState } from 'react';
import { AcUploadPicture } from '@jswork/antd-components';

export default () => {
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <AcUploadPicture
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      fileList={fileList}
      onChange={onChange}
    />
  );
};
```