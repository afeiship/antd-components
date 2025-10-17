---
nav:
  title: 组件
  path: /components
---

## AcCheckableTag
> 可选择标签组件。

```jsx
import React, { useState } from 'react';
import { AcCheckableTag } from '@jswork/antd-components';

export default () => {
  const [checked, setChecked] = useState(true);
  return (
    <AcCheckableTag
      checked={checked}
      onChange={(e) => setChecked(e.target.value)}
    >
      Tag1
    </AcCheckableTag>
  );
};
```