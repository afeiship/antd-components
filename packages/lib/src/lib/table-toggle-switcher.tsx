/**
 * @Author: aric.zheng 1290657123@qq.com
 * @Date: 2025-10-29 14:09:01
 * @LastEditors: aric.zheng 1290657123@qq.com
 * @LastEditTime: 2025-10-29 15:49:36
 */
import React, { FC } from 'react';
import nx from '@jswork/next';
import { Switch, SwitchProps } from 'antd';

export type AcTableToggleSwitcherProps = SwitchProps & {
  name: string;
  model: any;
  updateKey: string;
  params?: any;
  idKey?: string;
  updateApi?: string;
  onSuccess?: () => void;
};

const defaultProps = {
  items: [],
  idKey: 'id',
};

export const AcTableToggleSwitcher: FC<AcTableToggleSwitcherProps> = (props) => {
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
  const _currentValue = nx.get(model, updateKey);
  const handleStatusChange = (value) => {
    const id = nx.get(model, idKey!);
    const payload = { id, [updateKey]: value, ...params };
    nx.$event.emit(`${name}:draft`, { ...model, ...payload });
    nx.$api[_apiPath](payload).then(_onSuccess);
  };

  return (
    <Switch
      size="small"
      defaultChecked={_currentValue}
      onChange={handleStatusChange}
      {...rest}
    />
  );
};
