---
nav:
  title: 组件
  path: /components
---

## AcInputTags
> 标签输入组件。

```jsx
import React, { useState } from 'react';
import { AcInputTags } from '@jswork/antd-components';

export default () => {
  const [tags, setTags] = useState(['tag1', 'tag2']);
  return <AcInputTags value={tags} onChange={setTags} />;
};
```