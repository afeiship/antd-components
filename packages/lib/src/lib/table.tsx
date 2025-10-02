/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-10-03 07:11:26
 * @LastEditors: aric 1290657123@qq.com
 * @LastEditTime: 2025-10-03 07:13:49
 */
import React from 'react';
import { Table } from 'antd';
import cx from 'classnames';

const CLASS_NAME = 'ac-table';

type AcTableProps = React.ComponentProps<typeof Table>;

export class AcTable extends React.Component<AcTableProps, any> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {};

  render() {
    const { className, ...rest } = this.props;
    return <Table className={cx(className, CLASS_NAME)} {...rest} />;
  }
}
