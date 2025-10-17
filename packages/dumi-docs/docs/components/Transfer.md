---
nav:
  title: 组件
  path: /components
---

## AcTransfer
> 穿梭框组件。

```jsx
import React, { useState } from 'react';
import { AcTransfer } from '@jswork/antd-components';

export default () => {
  const mockData = Array.from({ length: 20 }).map((_, i) => ({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
  }));

  const initialTargetKeys = mockData.filter(item => +item.key > 10).map(item => item.key);

  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <AcTransfer
      dataSource={mockData}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      render={item => item.title}
    />
  );
};
```