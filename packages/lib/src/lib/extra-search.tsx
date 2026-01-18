/**
 * @Author: aric.zheng 1290657123@qq.com
 * @Date: 2025-10-29 10:54:41
 * @LastEditors: aric 1290657123@qq.com
 * @LastEditTime: 2025-10-31 08:32:21
 */
import React, { FC, useEffect } from 'react';
import { readSearchString, writeSearchString } from '@jswork/url-sync-flat';
import nx from '@jswork/next';
import { Input } from 'antd';
import { SearchProps } from 'antd/es/input';

declare global {
  interface NxStatic {
    $event: any;
    $api: Record<string, any>;
  }
}

export type AcExtraSearchProps = SearchProps & {
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

const EMPTY_STR = '';

export const AcExtraSearch: FC<AcExtraSearchProps> = (props) => {
  const { name, lang, queryKey, routerType, ...rest } = { ...defaultProps, ...props };
  const t = (key: string) => locales[lang!][key];
  const searchParams = readSearchString(routerType);
  const defaultQuery = searchParams.get(queryKey) || '';
  const [value, setValue] = React.useState(defaultQuery);
  const defaultParams = Object.fromEntries(searchParams.entries());
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setValue(q);
  };

  const handleSearch = (q: string) => {
    setValue(q);
    nx.$event?.emit?.(`${name}:load`, { ...defaultParams, [queryKey]: q, page: 1 });
  };

  useEffect(() => {
    const res = nx.$event.on(`${name}:reset`, () => {
      setValue(EMPTY_STR);
      searchParams.delete(queryKey);
      writeSearchString(routerType, searchParams, true);
    });
    return res.destroy;
  }, []);

  return (
    <Input.Search
      size="small"
      enterButton
      autoFocus
      allowClear
      value={value}
      placeholder={t('placeholder')}
      onChange={handleSearchChange}
      onSearch={handleSearch}
      {...rest}
    />
  );
};
