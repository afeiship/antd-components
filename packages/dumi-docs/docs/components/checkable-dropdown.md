---
nav:
  title: 组件
  path: /components
---

## AcCheckableDropdown
> 可选下拉菜单组件。
```jsx
import React from 'react';
import { AcCheckableDropdown } from '@jswork/antd-components';

export default () => {
  const items = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ];
  return <AcCheckableDropdown items={items} />;
};
```