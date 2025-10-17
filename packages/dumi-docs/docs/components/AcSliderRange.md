---
nav:
  title: 组件
  path: /components
---

## AcSliderRange
> 范围选择滑块组件。

```jsx
import React, { useState } from 'react';
import { AcSliderRange } from '@jswork/antd-components';

export default () => {
  const [value, setValue] = useState([20, 50]);
  return <AcSliderRange value={value} onChange={setValue} />;
};
```