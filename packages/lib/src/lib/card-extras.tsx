/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-10-24 20:40:55
 * @LastEditors: aric 1290657123@qq.com
 * @LastEditTime: 2025-10-31 13:56:09
 */
import { Space, SpaceProps } from 'antd';
import React, { FC, Fragment } from 'react';
import nx from '@jswork/next';
import { BtnBack, BtnCreate, BtnRefresh } from './button';

declare global {
  interface NxStatic {
    $event: any;
  }
}

export type AcCardExtrasProps = SpaceProps & {
  name: string;
  lang?: string;
  as?: React.ComponentType<any>;
  extraBefore?: React.ReactNode;
  extraAfter?: React.ReactNode;
  asProps?: any;
  actions?: string []
}

const defaultExtras = {
  lang: 'zh-CN',
  actions: ['refresh', 'add'],
};

export const AcCardExtras: FC<AcCardExtrasProps> = (props) => {
  const { name, lang, as, extraBefore, extraAfter, asProps, actions } = { ...defaultExtras, ...props };
  const handleRefresh = () => nx.$event?.emit?.(`${name}:refresh`);
  const handleReset = () => nx.$event?.emit?.(`${name}:reset`);
  const handleAdd = () => nx.$event?.emit?.(`${name}:add`);
  const handleBack = () => history.back();
  const AsComponent = as || Space;
  const items = {
    refresh: <BtnRefresh lang={lang} onClick={handleRefresh} />,
    reset: <BtnRefresh lang={lang} onClick={handleReset} />,
    add: <BtnCreate lang={lang} onClick={handleAdd} />,
    back: <BtnBack lang={lang} onClick={handleBack} />,
  };

  return (
    <AsComponent {...asProps}>
      {extraBefore}
      {actions?.map((action) => <Fragment key={action}>{items[action]}</Fragment>)}
      {extraAfter}
    </AsComponent>
  );
};
