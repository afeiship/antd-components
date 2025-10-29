/**
 * @Author: aric.zheng 1290657123@qq.com
 * @Date: 2025-10-29 14:09:01
 * @LastEditors: aric.zheng 1290657123@qq.com
 * @LastEditTime: 2025-10-29 14:43:35
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
  model: any;
  params?: any;
  statusKey?: string;
  rowKey?: string;
  statusUpdateApi?: string;
  onSuccess?: () => void;
};

const defaultProps = {
  items: [],
  rowKey: 'id',
  statusKey: 'status',
};

export const AcTableStatusSwitcher: FC<AcTableStatusSwitcherProps> = (props) => {
  const {
    name,
    items,
    model,
    statusKey,
    rowKey,
    statusUpdateApi,
    params,
    onSuccess,
    ...rest
  } = { ...defaultProps, ...props };
  const _apiPath = statusUpdateApi || `${name}_update`;
  const _currentStatus = nx.get(model, statusKey!);
  const handleStatusChange = (e) => {
    const id = nx.get(model, rowKey!);
    const status = e.target.value;
    const payload = { id, [statusKey!]: status, ...params };
    nx.$event.emit(`${name}:draft`, { ...model, ...payload });
    nx.$api[_apiPath](payload)
      .then(() => {
        nx.$event.emit(`${name}:refetch`);
        onSuccess?.();
      });
  };

  return (
    <ReactAntStatusSwitch
      items={items}
      value={_currentStatus}
      onChange={handleStatusChange}
      {...rest}
    />
  );
};
