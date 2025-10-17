---
nav:
  title: 组件
  path: /components
---

## AcSelect
> 选择器组件。

```jsx
import React, { useState } from 'react';
import { AcSelect } from '@jswork/antd-components';

export default () => {
  const [value, setValue] = useState('option1');
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];
  return <AcSelect options={options} value={value} onChange={setValue} />;
};
```