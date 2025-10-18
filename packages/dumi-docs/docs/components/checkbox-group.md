---
nav:
  title: 组件
  path: /components
---

## AcCheckboxGroup
> 复选框组组件。

```jsx
import React, { useState } from 'react';
import { AcCheckboxGroup } from '@jswork/antd-components';

export default () => {
  const [value, setValue] = useState(['1']);
  const items = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ];
  return (
    <AcCheckboxGroup 
      items={items} 
      value={value} 
      onChange={(e) => {
        setValue(e.target.value);
        console.log('🌈 value: ', e.target.value);
      }}
    />
  )
};
```