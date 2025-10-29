/**
 * @Author: aric.zheng 1290657123@qq.com
 * @Date: 2025-10-29 10:54:41
 * @LastEditors: aric.zheng 1290657123@qq.com
 * @LastEditTime: 2025-10-29 13:31:47
 */
import React, { FC } from 'react';
import { AcSearch, AcSearchProps } from './search';
import { useSearchParams } from 'react-router-dom';


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
};

export const AcTableExtraSearch: FC<AcTableExtraSearchProps> = (props) => {
  const { name, lang, queryKey, ...rest } = { ...defaultProps, ...props };
  const t = (key: string) => locales[lang!][key];
  const [searchParams] = useSearchParams();
  const defaultQuery = searchParams.get(queryKey) || '';
  const defaultParams = Object.fromEntries(searchParams.entries());

  return (
    <AcSearch
      size="small"
      enterButton
      allowClear
      defaultValue={defaultQuery}
      placeholder={t('placeholder')}
      onSearch={(e) => {
        const q = e.target.value;
        nx.$event?.emit?.(`${name}:load`, { page: 1, ...defaultParams, [queryKey]: q });
      }}
      {...rest}
    />
  );
};
