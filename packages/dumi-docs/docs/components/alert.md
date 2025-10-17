---
nav:
  title: 组件
  path: /components
---

## AcAlert
> 警告提示框/消息

## msg
- success
- error

```jsx
import React from 'react';
import { Button, Space } from 'antd';
import '@jswork/antd-components';

export default () => {
  return (
    <Space>
      <Button onClick={() => nx.msg('Hello Antd Components!')}>Click to Success Msg</Button>
      <Button onClick={() => nx.err('Hello Antd Components!')}>Click to Error Msg</Button>
    </Space>
  );
};
```

## alert
> 基于 antd 的 Modal 实现的 alert 方法
```jsx
import React from 'react';
import { Button, Space } from 'antd';
import '@jswork/antd-components';

export default () => {
  return (
    <Space direction="vertical">
      <Button onClick={() => nx.alert('Hello Antd Components!')}>Click to Alert</Button>
    </Space>
  );
};
```

## confirm
> 基于 antd 的 Modal 实现的 confirm 方法
```jsx
import React from 'react';
import { Button } from 'antd';
import '@jswork/antd-components';

export default () => {
  return (
    <Button
      onClick={async () => {
        const res = await nx.confirm('Are you sure?');
        console.log(`You clicked: ${res}`);
      }}
    >
      Click to Confirm
    </Button>
  );
};
```

## prompt
> 基于 antd 的 Modal + Input 实现的 prompt 方法
```jsx
import React from 'react';
import { Button } from 'antd';
import '@jswork/antd-components';

export default () => {
  return (
    <Button
      onClick={async () => {
        const res = await nx.prompt('What is your name?');
        console.log(`Your name is: ${res}`);
      }}
    >
      Click to Prompt
    </Button>
  );
};
```
