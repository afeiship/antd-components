---
nav:
  title: 组件
  path: /components
---

## AcBreadcrumb
> 面包屑导航组件。


## 代码示例1
```jsx
import React from 'react';
import { AcBreadcrumb } from '@jswork/antd-components';

export default () => {
  return <AcBreadcrumb items={[{ label: '首页' }, { label: '组件' }, { label: '面包屑导航' }]} />;
};
```

## 代码示例2
```jsx
import React from 'react';
import { AcBreadcrumb } from '@jswork/antd-components';

export default () => {
  return (
    <AcBreadcrumb
      items={[
        { label: '首页', href: '/' },
        { label: '组件', href: '/components' },
        { label: '面包屑导航' }
      ]}
    />
  );
};
```
