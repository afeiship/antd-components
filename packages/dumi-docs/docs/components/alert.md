---
nav:
  title: 组件
  path: /components
---

## AcAlert
> 警告提示框。

```jsx
import React from 'react';
import { alert } from '@jswork/antd-components';

export default () => {
  console.log('nx.version: ', nx.VERSION);
  return <button onClick={() => nx.alert('Hello Antd Components!')}>Click to Alert</button>;
};
```