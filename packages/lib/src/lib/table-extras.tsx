/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-10-24 20:40:55
 * @LastEditors: aric 1290657123@qq.com
 * @LastEditTime: 2025-10-26 14:48:21
 */
import { Space, SpaceProps } from 'antd';
import React, { FC } from 'react';
import nx from '@jswork/next';
import { BtnBack, BtnCreate, BtnRefresh } from './button';

declare global {
  interface NxStatic {
    $event: any;
  }
}

export type AcTableExtrasProps = SpaceProps & {
  name: string;
  lang?: string;
  as?: React.ComponentType<any>;
  asProps?: any;
  actions?: string []
}

const defaultExtras = {
  lang: 'zh-CN',
  actions: ['reset', 'add'],
};

export const AcTableExtras: FC<AcTableExtrasProps> = (props) => {
  const { name, lang, as, asProps, actions } = { ...defaultExtras, ...props };
  const handleRefresh = () => nx.$event?.emit?.(`${name}:reset`);
  const handleAdd = () => nx.$event?.emit?.(`${name}:add`);
  const handleBack = () => history.back();
  const AsComponent = as || Space;
  const items = {
    reset: <BtnRefresh key="reset" lang={lang} onClick={handleRefresh} />,
    add: <BtnCreate key="add" lang={lang} onClick={handleAdd} />,
    back: <BtnBack key="back" lang={lang} onClick={handleBack} />,
  };

  return (
    <AsComponent {...asProps}>
      {actions?.map((action) => items[action])}
    </AsComponent>
  );
};
