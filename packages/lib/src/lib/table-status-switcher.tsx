/**
 * @Author: aric.zheng 1290657123@qq.com
 * @Date: 2025-10-29 14:09:01
 * @LastEditors: aric.zheng 1290657123@qq.com
 * @LastEditTime: 2025-10-29 15:08:25
 */
import ReactAntStatusSwitch from '@jswork/react-ant-status-switch';
import React, { FC } from 'react';
import { ReactAntStatusSwitchProps } from '@jswork/react-ant-status-switch/dist/components';
import nx from '@jswork/next';

export type AcTableStatusSwitcherProps = ReactAntStatusSwitchProps & {
  name: string;
  items: any[];
  model: any;
  params?: any;
  idKey?: string;
  updateKey?: string;
  updateApi?: string;
  onSuccess?: () => void;
};

const defaultProps = {
  items: [],
  idKey: 'id',
  updateKey: 'status',
};

export const AcTableStatusSwitcher: FC<AcTableStatusSwitcherProps> = (props) => {
  const {
    name,
    items,
    model,
    updateKey,
    idKey,
    updateApi,
    params,
    onSuccess,
    ...rest
  } = { ...defaultProps, ...props };
  const _apiPath = updateApi || `${name}_update`;
  const _onSuccess = onSuccess || (() => nx.$event.emit(`${name}:refetch`));
  const _currentStatus = nx.get(model, updateKey!);
  const handleStatusChange = (e) => {
    const id = nx.get(model, idKey!);
    const { value } = e.target;
    const payload = { id, [updateKey!]: value, ...params };
    nx.$event.emit(`${name}:draft`, { ...model, ...payload });
    nx.$api[_apiPath](payload).then(_onSuccess);
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
