---
nav:
  title: 组件
  path: /components
---

## AcTreeSelect
> 树选择组件。

```jsx
import React, { useState } from 'react';
import { AcTreeSelect } from '@jswork/antd-components';

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child1',
        value: '0-0-1',
        key: '0-0-1',
      },
      {
        title: 'Child2',
        value: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
  },
];

export default () => {
  const [value, setValue] = useState(undefined);
  const onChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <AcTreeSelect
      treeData={treeData}
      value={value}
      onChange={onChange}
      placeholder="Please select"
      treeDefaultExpandAll
    />
  );
};
```