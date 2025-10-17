---
nav:
  title: 组件
  path: /components
---

## AcInteractiveList
> 交互式列表组件。

```jsx
import React from 'react';
import { AcInteractiveList } from '@jswork/antd-components';

export default () => {
  const data = [
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
  ];
  return <AcInteractiveList dataSource={data} renderItem={(item) => item.content} />;
};
```