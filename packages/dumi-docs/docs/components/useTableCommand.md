---
nav:
  title: 组件
  path: /components
---

## useTableCommand
> 表格命令 Hook。

```tsx
import { useTableCommand } from '@jswork/antd-components';
import { Button } from 'antd';

export default () => {
  const { run, loading } = useTableCommand(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(console.log('Command executed!'));
      }, 1000);
    });
  });

  return (
    <Button onClick={run} loading={loading}>
      Execute Command
    </Button>
  );
};
```