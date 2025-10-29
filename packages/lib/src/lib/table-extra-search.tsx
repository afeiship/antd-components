/**
 * @Author: aric.zheng 1290657123@qq.com
 * @Date: 2025-10-29 10:54:41
 * @LastEditors: aric.zheng 1290657123@qq.com
 * @LastEditTime: 2025-10-29 11:05:07
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
  name: string,
  queryKey?: 'keywords'
}

export const AcTableExtraSearch: FC<AcTableExtraSearchProps> = (props) => {
  const { name, queryKey = 'keywords', ...rest } = props;
  return (
    <AcSearch
      name={name}
      onSearch={(e) => {
        const q = e.target.value;
        nx.$event.emit(`${name}:load`, { [queryKey]: q });
      }}
      {...rest}
    />
  );
};
