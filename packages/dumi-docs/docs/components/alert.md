---
nav:
  title: 组件
  path: /components
---

## AcAlert
> 警告提示框。

```jsx
import React from 'react';
import { Button, Space } from 'antd';
import '@jswork/antd-components';

export default () => {
  return (
    <Space direction="vertical">
      <Space>
        <Button onClick={() => nx.msg('Hello Antd Components!')}>Click to Success Msg</Button>
        <Button onClick={() => nx.err('Hello Antd Components!')}>Click to Error Msg</Button>
      </Space>
      <Button onClick={() => nx.alert('Hello Antd Components!')}>Click to Alert</Button>
      <Button
        onClick={async () => {
          const res = await nx.confirm('Are you sure?');
          alert(`You clicked: ${res}`);
        }}
      >
        Click to Confirm
      </Button>
      <Button
        onClick={async () => {
          const res = await nx.prompt('What is your name?');
          nx.alert(`Your name is: ${res}`);
        }}
      >
        Click to Prompt
      </Button>
    </Space>
  );
};
```
