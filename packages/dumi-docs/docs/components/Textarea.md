---
nav:
  title: 组件
  path: /components
---

## AcTextarea
> 文本域组件。

```jsx
import React, { useState } from 'react';
import { AcTextarea } from '@jswork/antd-components';

export default () => {
  const [value, setValue] = useState('initial textarea value');
  return <AcTextarea value={value} onChange={(e) => setValue(e.target.value)} />;
};
```