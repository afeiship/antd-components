/**
 * @Author: aric.zheng 1290657123@qq.com
 * @Date: 2025-10-29 14:09:01
 * @LastEditors: aric.zheng 1290657123@qq.com
 * @LastEditTime: 2025-10-29 14:23:52
 */
import ReactAntStatusSwitch from '@jswork/react-ant-status-switch';
import React, { FC } from 'react';
import { ReactAntStatusSwitchProps } from '@jswork/react-ant-status-switch/dist/components';
import nx from '@jswork/next';

declare global {
  interface NxStatic {
    $api: Record<string, any>;
  }
}

export type AcTableStatusSwitcherProps = ReactAntStatusSwitchProps & {
  name: string;
  items: any[];
  statusKey?: string;
  rowKey?: string;
  model?: any;
  statusUpdateApi?: string;
};

const defaultProps = {
  items: [],
  rowKey: 'id',
};

export const AcTableStatusSwitcher: FC<AcTableStatusSwitcherProps> = (props) => {
  const { name, items, statusKey, rowKey, model, statusUpdateApi, ...rest } = { ...defaultProps, ...props };
  const _apiPath = statusUpdateApi || `${name}_update`;
  const handleStatusChange = (e) => {
    const id = model[rowKey];
    const status = e.target.value;
    const payload = { id, [statusKey!]: status };
    nx.$event.emit(`${name}:draft`, { ...model, status });
    nx.$api[_apiPath](payload).then(() => {
      nx.$event.emit(`${name}:refresh`);
    });
  };

  return (
    <ReactAntStatusSwitch
      items={items}
      value={nx.get(model, statusKey!)}
      onChange={handleStatusChange}
      {...rest}
    />
  );
};
