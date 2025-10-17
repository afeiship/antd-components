---
nav:
  title: 组件
  path: /components
---

## AcTimePicker
> 时间选择器组件。

```jsx
import React, { useState } from 'react';
import { AcTimePicker } from '@jswork/antd-components';

export default () => {
  const [value, setValue] = useState(null);
  return <AcTimePicker value={value} onChange={(time, timeString) => setValue(time)} />;
};
```