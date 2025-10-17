---
nav:
  title: 组件
  path: /components
---

## AcSearch
> 搜索组件。

```jsx
import React, { useState } from 'react';
import { AcSearch } from '@jswork/antd-components';

export default () => {
  const [value, setValue] = useState('');
  return <AcSearch value={value} onChange={(e) => setValue(e.target.value)} onSearch={(val) => console.log(val)} />;
};
```