---
nav:
  title: 组件
  path: /components
---

## AcInput
> 输入框组件。

```jsx
import React, { useState } from 'react';
import { AcInput } from '@jswork/antd-components';

export default () => {
  const [value, setValue] = useState('initial value');
  return <AcInput value={value} onChange={(e) => setValue(e.target.value)} />;
};
```