import React from 'react';
import { Breadcrumb, BreadcrumbProps } from 'antd';
import { INDEX, ReactList } from '@jswork/react-list';
import { breadcrumbDefault } from '../tpls/breadcrumb';
import cx from 'classnames';
import type { StdCallback } from './types';

const CLASS_NAME = 'ac-breadcrumb';

export type AcBreadcrumbProps = {
  className?: string;
  items?: any[];
  template?: (args: { item: any; index: number; data: any[] }) => React.ReactNode;
  value?: number;
  onChange?: StdCallback;
} & BreadcrumbProps;

export class AcBreadcrumb extends React.Component<AcBreadcrumbProps> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    template: breadcrumbDefault,
  };

  render() {
    const { className, value, items, template, onChange, ...props } = this.props;
    return (
      <Breadcrumb className={cx(className, CLASS_NAME)} {...props}>
        <ReactList data={items || []} keyExtractor={INDEX} slots={{ item: template! }} />
      </Breadcrumb>
    );
  }
}

export const AcBreadcrumbFc = (props: AcBreadcrumbProps) => {
  return <AcBreadcrumb {...props} />;
};
