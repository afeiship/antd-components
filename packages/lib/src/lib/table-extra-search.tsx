/**
 * @Author: aric.zheng 1290657123@qq.com
 * @Date: 2025-10-29 10:54:41
 * @LastEditors: aric.zheng 1290657123@qq.com
 * @LastEditTime: 2025-10-29 11:11:33
 */
import React from 'react';
import { AcSearch } from './search';
import { FC } from 'react';


declare global {
  interface NxStatic {
    $event: any;
    $api: Record<string, any>;
  }
}

export type AcTableExtraSearchProps = AcSearch & {
  name: string;
  lang?: string;
  queryKey?: string;
}

const locales = {
  'zh-CN': {
    placeholder: '请输入关键字搜索',
  },
  'en-US': {
    placeholder: 'Please enter keywords to search',
  },
};

const defaultProps = {
  lang: 'zh-CN',
  queryKey: 'keywords',
};

export const AcTableExtraSearch: FC<AcTableExtraSearchProps> = (props) => {
  const { name, lang, queryKey, ...rest } = { ...defaultProps, ...props };
  const t = (key: string) => locales[lang!][key];

  return (
    <AcSearch
      size="small"
      enterButton
      allowClear
      placeholder={t('placeholder')}
      onSearch={(e) => {
        const q = e.target.value;
        nx.$event.emit(`${name}:load`, { [queryKey]: q });
      }}
      {...rest}
    />
  );
};
