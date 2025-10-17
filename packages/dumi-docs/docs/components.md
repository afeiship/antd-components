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

## AcTable
> 表格组件，支持远程数据加载。
```jsx
import React from 'react';
import { AcTable, AcTableMain } from '@jswork/antd-components';

export default ()=>{
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 100 },
    { title: 'Title', dataIndex: 'title', key: 'title', width: 200 },
    { title: 'Body', dataIndex: 'body', key: 'body', width: 300 },
  ];

  const fetcher = async ({ current, pageSize }) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${current}&_limit=${pageSize}`,
    );
    const data = await res.json();
    return { data, total: 100 };
  };

  nx.$api = {
    posts_index: async ({ page, size }) => {
      return fetcher({ current: page, pageSize: size });
    },
  };

  return (
    <div className="border border-solid container mx-auto my-10 bg-gray-200 p-5" data-role="app-container">
      <AcTable fetcher={fetcher} columns={columns} />
      <hr />
      <AcTableMain size="large" name="posts" columns={columns} defaultPageSize={5} dataPath="data" />
    </div>
  );
}
```
