---
nav:
  title: 组件
  path: /components
---

## AcDatePicker
> 日期选择器组件。

```jsx
import React, { useState } from 'react';
import { AcDatePicker } from '@jswork/antd-components';

export default () => {
  const [value, setValue] = useState('2023-01-01 12:00:00');
  return (
    <AcDatePicker
      value={value}
      onChange={(e) => setValue(e.target.value)}
      showTime
      format="YYYY-MM-DD HH:mm:ss"
    />
  );
};
```