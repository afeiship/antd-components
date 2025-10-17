---
nav:
  title: 组件
  path: /components
---

## AcEditableTagGroup
> 可编辑标签组组件。

```jsx
import React, { useState } from 'react';
import { AcEditableTagGroup } from '@jswork/antd-components';

export default () => {
  const [value, setValue] = useState(['标签一', '标签二']);
  return (
    <AcEditableTagGroup
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
```