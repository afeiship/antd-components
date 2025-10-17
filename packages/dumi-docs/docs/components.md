---
nav:
  title: 组件
  order: -1
group:
  title: 介绍
  order: -1
---

## AcBreadcrumb
> 面包屑导航组件。

```jsx
import React from 'react';
import { Button } from 'antd';
import { AcBreadcrumb } from '@jswork/antd-components';

export default () => {
  return <AcBreadcrumb items={[{ label: '首页' }, { label: '组件' }, { label: '面包屑导航' }]} />;
};
```
