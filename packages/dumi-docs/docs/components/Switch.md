---
nav:
  title: 组件
  path: /components
---

## AcSwitch
> 开关组件。

```jsx
import React, { useState } from 'react';
import { AcSwitch } from '@jswork/antd-components';

export default () => {
  const [checked, setChecked] = useState(false);
  return <AcSwitch checked={checked} onChange={setChecked} />;
};
```