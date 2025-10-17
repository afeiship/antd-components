---
nav:
  title: 组件
  path: /components
---

## AcCodeFlask
> 代码编辑器组件。

```jsx
import React, { useState } from 'react';
import { AcCodeFlask } from '@jswork/antd-components';

export default () => {
  const [value, setValue] = useState('// Write your code here');
  return (
    <AcCodeFlask
      code={value}
      onChange={(code) => setValue(code)}
      language="javascript"
      theme="dark"
    />
  );
};
```