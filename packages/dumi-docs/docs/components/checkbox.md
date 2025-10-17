---
nav:
  title: 组件
  path: /components
---

## AcCheckbox
> 复选框组件。

```jsx
import React, { useState } from 'react';
import { AcCheckbox } from '@jswork/antd-components';

export default () => {
  const [checked, setChecked] = useState(true);
  return (
    <AcCheckbox
      checked={checked}
      onChange={(e) => setChecked(e.target.value)}
    >
      Checkbox
    </AcCheckbox>
  );
};
```