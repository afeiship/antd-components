---
nav:
  title: 组件
  path: /components
---

## AcPreSelect
> 预设选择组件。

```jsx
import React, { useState } from 'react';
import { AcPreSelect } from '@jswork/antd-components';

export default () => {
  const [value, setValue] = useState('item1');
  const options = [
    { label: 'Item 1', value: 'item1' },
    { label: 'Item 2', value: 'item2' },
    { label: 'Item 3', value: 'item3' },
  ];
  return <AcPreSelect options={options} value={value} onChange={setValue} />;
};
```