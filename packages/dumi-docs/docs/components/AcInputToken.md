---
nav:
  title: 组件
  path: /components
---

## AcInputToken
> 令牌输入组件。

```jsx
import React, { useState } from 'react';
import { AcInputToken } from '@jswork/antd-components';

export default () => {
  const [token, setToken] = useState('initial_token');
  return <AcInputToken value={token} onChange={setToken} />;
};
```