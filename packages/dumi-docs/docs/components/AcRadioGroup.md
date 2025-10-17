---
nav:
  title: 组件
  path: /components
---

## AcRadioGroup
> 单选框组组件。

```jsx
import React, { useState } from 'react';
import { AcRadioGroup } from '@jswork/antd-components';

export default () => {
  const [value, setValue] = useState('1');
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];
  return <AcRadioGroup options={options} value={value} onChange={(e) => setValue(e.target.value)} />;
};
```