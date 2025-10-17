---
nav:
  title: 组件
  path: /components
---

## AcInputNumber
> 数字输入框组件。

```jsx
import React, { useState } from 'react';
import { AcInputNumber } from '@jswork/antd-components';

export default () => {
  const [value, setValue] = useState(1);
  return <AcInputNumber value={value} onChange={setValue} />;
};
```