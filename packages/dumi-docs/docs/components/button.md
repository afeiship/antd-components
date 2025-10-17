---
nav:
  title: 组件
  path: /components
---

## Button
> 按钮组件

### lang

`lang` 属性用于设置按钮组件的国际化语言。目前支持 `en-US` (英文) 和 `zh-CN` (中文)。

```jsx
import React from 'react';
import { BtnCreate } from '@jswork/antd-components';

export default () => {
  return <BtnCreate lang="zh-CN" onClick={() => nx.msg('创建按钮点击!')} />;
};
```


## 代码示例

```jsx
import React from 'react';
import { BtnBack, BtnCreate, BtnCancel, BtnEdit } from '@jswork/antd-components';
import { Space } from 'antd';

export default () => {
  return (
    <Space direction="vertical" size="large">
      <Space direction="horizontal" size="large">
        <BtnCreate lang="zh-CN" onClick={() => nx.msg('Create button clicked!')} />
        <BtnEdit lang="zh-CN" onClick={() => nx.msg('Edit button clicked!')} />
        <BtnCancel lang="zh-CN" onClick={() => nx.msg('Cancel button clicked!')} />
        <BtnBack lang="zh-CN" onClick={() => nx.msg('Back button clicked!')} />
      </Space>
      <Space direction="horizontal" size="large">
        <BtnCreate lang="en-US" onClick={() => nx.msg('Create button clicked!')} />
        <BtnEdit lang="en-US" onClick={() => nx.msg('Edit button clicked!')} />
        <BtnCancel lang="en-US" onClick={() => nx.msg('Cancel button clicked!')} />
        <BtnBack lang="en-US" onClick={() => nx.msg('Back button clicked!')} />
      </Space>
    </Space>
  );
};
```

## BtnCreate
> 创建按钮

```jsx
import React from 'react';
import { BtnCreate } from '@jswork/antd-components';

export default () => {
  return <BtnCreate lang="en-US" onClick={() => nx.msg('Create button clicked!')} />;
};
```

## BtnEdit
> 编辑按钮

```jsx
import React from 'react';
import { BtnEdit } from '@jswork/antd-components';

export default () => {
  return <BtnEdit lang="en-US" onClick={() => nx.msg('Edit button clicked!')} />;
};
```

## BtnDelete
> 删除按钮

```jsx
import React from 'react';
import { BtnDelete } from '@jswork/antd-components';

export default () => {
  return <BtnDelete lang="en-US" onClick={() => nx.msg('Delete button clicked!')} />;
};
```

## BtnView
> 查看按钮

```jsx
import React from 'react';
import { BtnView } from '@jswork/antd-components';

export default () => {
  return <BtnView lang="en-US" onClick={() => nx.msg('View button clicked!')} />;
};
```

## BtnSave
> 保存按钮

```jsx
import React from 'react';
import { BtnSave } from '@jswork/antd-components';

export default () => {
  return <BtnSave lang="en-US" onClick={() => nx.msg('Save button clicked!')} />;
};
```

## BtnExport
> 导出按钮

```jsx
import React from 'react';
import { BtnExport } from '@jswork/antd-components';

export default () => {
  return <BtnExport lang="en-US" onClick={() => nx.msg('Export button clicked!')} />;
};
```

## BtnImport
> 导入按钮

```jsx
import React from 'react';
import { BtnImport } from '@jswork/antd-components';

export default () => {
  return <BtnImport lang="en-US" onClick={() => nx.msg('Import button clicked!')} />;
};
```

## BtnRefresh
> 刷新按钮

```jsx
import React from 'react';
import { BtnRefresh } from '@jswork/antd-components';

export default () => {
  return <BtnRefresh lang="en-US" onClick={() => nx.msg('Refresh button clicked!')} />;
};
```

## BtnBack
> 返回按钮

```jsx
import React from 'react';
import { BtnBack } from '@jswork/antd-components';

export default () => {
  return <BtnBack lang="en-US" onClick={() => nx.msg('Back button clicked!')} />;
};
```

## BtnSubmit
> 提交按钮

```jsx
import React from 'react';
import { BtnSubmit } from '@jswork/antd-components';

export default () => {
  return <BtnSubmit lang="en-US" onClick={() => nx.msg('Submit button clicked!')} />;
};
```

## BtnCancel
> 取消按钮

```jsx
import React from 'react';
import { BtnCancel } from '@jswork/antd-components';

export default () => {
  return <BtnCancel lang="en-US" onClick={() => nx.msg('Cancel button clicked!')} />;
};
```
