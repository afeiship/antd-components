/**
 * @Author: aric.zheng 1290657123@qq.com
 * @Date: 2025-10-29 10:54:41
 * @LastEditors: aric.zheng 1290657123@qq.com
 * @LastEditTime: 2025-10-29 15:50:45
 */
import React, { FC, useEffect } from 'react';
import { AcSearch, AcSearchProps } from './search';
import { readSearchString } from '@jswork/url-sync-flat';
import nx from '@jswork/next';


declare global {
  interface NxStatic {
    $event: any;
    $api: Record<string, any>;
  }
}

export type AcTableExtraSearchProps = AcSearchProps & {
  name: string;
  lang?: string;
  queryKey?: string;
  routerType?: 'hash' | 'browser';
}

const locales = {
  'zh-CN': {
    placeholder: '搜索',
  },
  'en-US': {
    placeholder: 'Search',
  },
};

const defaultProps = {
  lang: 'zh-CN',
  queryKey: 'keywords',
  routerType: 'hash' as const,
};

export const AcTableExtraSearch: FC<AcTableExtraSearchProps> = (props) => {
  const { name, lang, queryKey, routerType, ...rest } = { ...defaultProps, ...props };
  const t = (key: string) => locales[lang!][key];
  const [value, setValue] = React.useState('');
  const searchParams = readSearchString(routerType);
  const defaultQuery = searchParams.get(queryKey) || '';
  const defaultParams = Object.fromEntries(searchParams.entries());
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setValue(q);
  };

  useEffect(() => {
    const res = nx.$event.on(`${name}:reset`, () => {
      setValue('');
    });
    return res.destroy;
  }, []);

  return (
    <AcSearch
      size="small"
      enterButton
      allowClear
      defaultValue={defaultQuery}
      value={value}
      placeholder={t('placeholder')}
      onChange={handleSearchChange}
      onSearch={(e) => {
        const q = e.target.value;
        nx.$event?.emit?.(`${name}:load`, { page: 1, ...defaultParams, [queryKey]: q });
      }}
      {...rest}
    />
  );
};
