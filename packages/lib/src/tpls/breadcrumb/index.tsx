import { Breadcrumb } from 'antd';
import React from 'react';

export const breadcrumbDefault = ({ item, index, data }) => {
  const last = data?.length - 1 === index;
  const { label, ...rest } = item;
  const child = last ? <span {...rest}>{label}</span> : <a {...rest}>{label}</a>;
  return <Breadcrumb.Item key={index}>{child}</Breadcrumb.Item>;
};
