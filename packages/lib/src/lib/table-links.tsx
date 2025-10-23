/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-10-03 07:11:26
 * @LastEditors: aric 1290657123@qq.com
 * @LastEditTime: 2025-10-23 17:09:33
 */
import { Space } from 'antd';
import React, { FC } from 'react';
import nx from '@jswork/next';
import { AcConfirmButton } from './confirm-button';

declare global {
  interface NxStatic {
    $event: any;
  }
}

const locales = {
  'zh-CN': {
    edit: '编辑',
    destroy: '删除',
  },
  'en-US': {
    edit: 'Edit',
    destroy: 'Destroy',
  },
};


export type AcTableLinksProps = {
  name: string;
  model?: any;
  lang?: string;
  as?: React.ComponentType<any>;
  asProps?: React.ComponentType<any>;
  actions?: string []
}

const defaultLinks = {
  lang: 'zh-CN',
  actions: ['edit', 'destroy'],
};

export const AcTableLinks: FC<AcTableLinksProps> = (props) => {
  const { name, as, lang, actions, model, asProps } = { ...defaultLinks, ...props };
  const t = (key: string) => locales[lang][key];
  const AsComponent = as || Space;
  const handleEdit = () => nx.$event.emit(`${name}:toEdit`, model);
  const handleDestroy = () => nx.$event.emit(`${name}:toDestroy`, model);
  const links = {
    edit: <a onClick={handleEdit}>{t('edit')}</a>,
    destroy: <AcConfirmButton onClick={handleDestroy}>{t('destroy')}</AcConfirmButton>,
  };

  return <AsComponent {...asProps}>
    {nx.map(actions, (action) => links[action])}
  </AsComponent>;
};

