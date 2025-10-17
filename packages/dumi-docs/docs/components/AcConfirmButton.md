---
nav:
  title: 组件
  path: /components
---

## AcConfirmButton
> 确认按钮组件。

```jsx
import React from 'react';
import { AcConfirmButton } from '@jswork/antd-components';
import { message } from 'antd';

export default () => {
  return (
    <AcConfirmButton
      title="确定要删除吗？"
      onConfirm={() => message.success('删除成功')}
      onCancel={() => message.info('取消删除')}
    >
      删除
    </AcConfirmButton>
  );
};
```