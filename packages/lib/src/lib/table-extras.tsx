/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-10-24 20:40:55
 * @LastEditors: aric 1290657123@qq.com
 * @LastEditTime: 2025-10-24 20:50:02
 */
import { Button, Space, SpaceProps } from 'antd';
import React, { FC } from 'react';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import nx from '@jswork/next';

declare global {
  interface NxStatic {
    $event: any;
  }
}

export type AcTableExtrasProps = SpaceProps & {
  name: string;
  lang?: string;
  as?: React.ComponentType<any>;
  asProps?: React.ComponentType<any>;
  actions?: string []
}

const locales = {
  'zh-CN': {
    reset: '刷新',
    add: '添加',
  },
  'en-US': {
    reset: 'Refresh',
    add: 'Create',
  },
};

const defaultExtras = {
  lang: 'zh-CN',
  actions: ['reset', 'add'],
};

export const AcTableExtras: FC<AcTableExtrasProps> = (props) => {
  const { name, lang, as, asProps, actions } = { ...defaultExtras, ...props };
  const t = (key: string) => locales[lang][key];
  const handleRefresh = () => nx.$event?.emit?.(`${name}:reset`);
  const handleAdd = () => nx.$event?.emit?.(`${name}:add`);
  const AsComponent = as || Space;
  const items = {
    reset: <Button key="reset" size="small" icon={<ReloadOutlined />} onClick={handleRefresh}>
      {t('reset')}
    </Button>,
    add: <Button key="add" size="small" icon={<PlusOutlined />} onClick={handleAdd}>
      {t('add')}
    </Button>,
  };

  return (
    <AsComponent {...asProps}>
      {actions?.map((action) => items[action])}
    </AsComponent>
  );
};
