---
nav:
  title: 组件
  path: /components
---

## AcRate
> 评分组件。

```jsx
import React, { useState } from 'react';
import { AcRate } from '@jswork/antd-components';

export default () => {
  const [value, setValue] = useState(3);
  return <AcRate value={value} onChange={setValue} />;
};
```