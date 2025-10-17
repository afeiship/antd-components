---
nav:
  title: 组件
  path: /components
---

## AcRangePicker
> 范围选择器组件。

```jsx
import React, { useState } from 'react';
import { AcRangePicker } from '@jswork/antd-components';

export default () => {
  const [value, setValue] = useState(null);
  return <AcRangePicker value={value} onChange={(dates, dateStrings) => setValue(dates)} />;
};
```