---
nav:
  title: 组件
  path: /components
---

## AcTree
> 树形组件。

```jsx
import React from 'react';
import { AcTree } from '@jswork/antd-components';

export default () => {
  const items = [
    {
      label: 'Node1',
      value: '0-0',
      children: [
        { label: 'Child1', value: '0-0-0' },
        { label: 'Child2', value: '0-0-1' },
      ],
    },
    {
      label: 'Node2',
      value: '0-1',
      children: [
        { label: 'Child3', value: '0-1-0' },
        { label: 'Child4', value: '0-1-1' },
      ],
    },
  ];
  return <AcTree items={items} />;
};
```