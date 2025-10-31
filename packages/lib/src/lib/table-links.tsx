/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-10-03 07:11:26
 * @LastEditors: aric 1290657123@qq.com
 * @LastEditTime: 2025-10-31 15:09:46
 */
import nx from '@jswork/next';
import { Space } from 'antd';
import React, { FC } from 'react';
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
    action: '操作',
  },
  'en-US': {
    edit: 'Edit',
    destroy: 'Destroy',
    action: 'Action',
  },
};

export type AcTableLinksProps = {
  name: string;
  model?: any;
  lang?: string;
  extraBefore?: React.ReactNode;
  extraAfter?: React.ReactNode;
  as?: React.ComponentType<any>;
  asProps?: any;
  actions?: string[];
};

export type TableActionArgs = {
  name: string;
  lang?: string;
  [key: string]: any;
}

const defaultProps = {
  lang: 'zh-CN',
  actions: ['edit', 'destroy'],
};

export const AcTableLinks: FC<AcTableLinksProps> = (props) => {
  const { name, as, lang, actions, model, asProps, extraBefore, extraAfter } = { ...defaultProps, ...props };
  const t = (key: string) => locales[lang][key];
  const AsComponent = as || Space;
  const handleEdit = () => nx.$event?.emit?.(`${name}:edit`, model);
  const handleDestroy = () => nx.$event?.emit?.(`${name}:destroy`, model);
  const items = {
    edit: (
      <a key="edit" onClick={handleEdit}>
        {t('edit')}
      </a>
    ),
    destroy: (
      <AcConfirmButton key="destroy" type="anchor" lang={lang} onClick={handleDestroy}>
        {t('destroy')}
      </AcConfirmButton>
    ),
  };
  return (
    <AsComponent {...asProps}>
      {extraBefore}
      {actions.map((action) => items[action])}
      {extraAfter}
    </AsComponent>
  );
};

export const tableAction = (args: TableActionArgs) => {
  const { name, lang, ...rest } = args;
  const t = (key: string) => locales[lang!][key];
  return {
    title: t('action'),
    dataIndex: '__action__',
    key: '__action__',
    width: 120,
    render: (_, record) => <AcTableLinks name={name} model={record} />,
    ...rest,
  };
};
