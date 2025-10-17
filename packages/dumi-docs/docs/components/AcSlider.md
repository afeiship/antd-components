---
nav:
  title: 组件
  path: /components
---

## AcSlider
> 滑块输入组件。

```jsx
import React, { useState } from 'react';
import { AcSlider } from '@jswork/antd-components';

export default () => {
  const [value, setValue] = useState(30);
  return <AcSlider value={value} onChange={setValue} />;
};
```