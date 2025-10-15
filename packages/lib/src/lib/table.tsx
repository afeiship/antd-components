/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-10-03 07:11:26
 * @LastEditors: aric 1290657123@qq.com
 * @LastEditTime: 2025-10-03 07:13:49
 */
import React from 'react';
import { Table, TableProps } from 'antd';
import cx from 'classnames';

const CLASS_NAME = 'ac-table';

type AcTableProps = TableProps & {
  /**
   * 自定义数据获取函数
   * @param params { current: number; pageSize: number }
   * @returns Promise<{ data: any[]; total: number }>
   */
  fetcher: (params: { current: number; pageSize: number }) => Promise<{ data: any[]; total: number }>;
  rowKey?: string;
  defaultCurrent?: number;
  defaultPageSize?: number;
  total?: number; // 如果 fetcher 不返回 total，可在此固定（不推荐）
};

export class AcTable extends React.Component<AcTableProps, any> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    rowKey: 'id',
    defaultCurrent: 1,
    defaultPageSize: 10,
  };

  constructor(props) {
    super(props);
    const { defaultCurrent, defaultPageSize } = this.props;
    this.state = {
      dataSource: [],
      isLoading: false,
      current: defaultCurrent,
      pageSize: defaultPageSize,
      total: 0,
    };
  }

  async componentDidMount() {
    const { current, pageSize } = this.state;
    await this.fetchData(current, pageSize);
  }

  fetchData = async (page: number, size: number) => {
    const abortController = new AbortController();
    const { fetcher } = this.props;
    this.setState({ isLoading: true });
    try {
      const result = await fetcher({ current: page, pageSize: size });
      if (!abortController.signal.aborted) {
        this.setState({
          dataSource: result.data || [],
          total: result.total ?? 0,
        });
      }
    } catch (error) {
      if (!abortController.signal.aborted) {
        this.setState({
          dataSource: [],
          total: 0,
        });
      }
    } finally {
      if (!abortController.signal.aborted) {
        this.setState({ isLoading: false });
      }
    }
  };

  render() {
    const { className, pagination, ...rest } = this.props;
    const { dataSource, isLoading, current, pageSize, total } = this.state;
    return (
      <Table
        className={cx(className, CLASS_NAME)} loading={isLoading}
        dataSource={dataSource}
        pagination={{
          total,
          current,
          pageSize,
          onChange: (page, size) => {
            this.setState({ current: page, pageSize: size }, () => {
              void this.fetchData(page, size);
            });
          },
          ...pagination,
        }}
        {...rest}
      />
    );
  }
}
