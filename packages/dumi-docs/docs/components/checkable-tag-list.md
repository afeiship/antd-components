---
nav:
  title: 组件
  path: /components
---

## AcCheckableTagList
> 可选择标签列表组件。

```jsx
import React from 'react';
import { AcCheckableTagList } from '@jswork/antd-components';

export default () => {
  const items = [
    { label: '标签一', value: '1' },
    { label: '标签二', value: '2' },
    { label: '标签三', value: '3' },
  ];
  return <AcCheckableTagList items={items} />;
};
```