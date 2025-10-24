/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-10-03 07:11:26
 * @LastEditors: aric 1290657123@qq.com
 * @LastEditTime: 2025-10-24 21:04:35
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
  asProps?: any;
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
  const handleEdit = () => nx.$event?.emit?.(`${name}:edit`, model);
  const handleDestroy = () => nx.$event?.emit?.(`${name}:destroy`, model);
  const links = {
    edit: <a key="edit" onClick={handleEdit}>{t('edit')}</a>,
    destroy: <AcConfirmButton key="destroy" lang={lang} onClick={handleDestroy}>{t('destroy')}</AcConfirmButton>,
  };
  return <AsComponent {...asProps}>
    {actions.map(((action) => links[action]))}
  </AsComponent>;
};

