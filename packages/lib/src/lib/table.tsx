/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-10-03 07:11:26
 * @LastEditors: aric.zheng 1290657123@qq.com
 * @LastEditTime: 2025-10-16 08:20:55
 */
import React, { FC } from 'react';
import { Table, TableProps, message } from 'antd';
import cx from 'classnames';
import type { EventMittNamespace } from '@jswork/event-mitt';
import { ReactHarmonyEvents } from '@jswork/harmony-events';
import '@jswork/next-create-fetcher';

const CLASS_NAME = 'ac-table';

export type AcTableProps = TableProps & {
  /**
   * The identity name.
   * @default '@'
   */
  name?: string;
  /**
   * 自定义数据获取函数
   * @param params { current: number; pageSize: number }
   * @returns Promise<{ data: any[]; total: number }>
   */
  fetcher: (params: { current: number; pageSize: number }) => Promise<{ data: any[]; total: number }>;
  onPageChange?: (current: number, size: number) => void;
  rowKey?: string;
  defaultCurrent?: number;
  defaultPageSize?: number;
  total?: number; // 如果 fetcher 不返回 total，可在此固定（不推荐）
};

export class AcTable extends React.Component<AcTableProps, any> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  private harmonyEvents: ReactHarmonyEvents | null = null;
  static event: EventMittNamespace.EventMitt;
  static events = [
    'refetch',
    'reset',
  ];

  static defaultProps = {
    name: '@',
    rowKey: 'id',
    defaultCurrent: 1,
    defaultPageSize: 10,
  };

  public eventBus: EventMittNamespace.EventMitt = AcTable.event;

  constructor(props: AcTableProps) {
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
    this.harmonyEvents = ReactHarmonyEvents.create(this);
    this.eventBus = AcTable.event;
    await this.fetchData(current, pageSize);
  }

  componentWillUnmount() {
    this.harmonyEvents?.destroy();
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
      void message.error(error.message || error.toString());
    } finally {
      if (!abortController.signal.aborted) {
        this.setState({ isLoading: false });
      }
    }
  };

  /* ----- public eventBus methods start ----- */
  refetch = async () => {
    const { current, pageSize } = this.state;
    await this.fetchData(current, pageSize);
  };

  reset = async () => {
    const { defaultCurrent, defaultPageSize } = this.props;
    this.setState({
      current: defaultCurrent,
      pageSize: defaultPageSize,
    }, () => {
      void this.fetchData(defaultCurrent!, defaultPageSize!);
    });
  };

  /* ----- public eventBus methods end  ----- */

  render() {
    const { className, pagination, onPageChange, ...rest } = this.props;
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
            onPageChange?.(page, size);
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

export type AcTableMainProps = Omit<AcTableProps, 'fetcher'> & {
  name: string;
  dataPath?: string
  totalPath?: string;
};

export const AcTableMain: FC<AcTableMainProps> = (props) => {
  const { name, dataPath, totalPath, ...rest } = { dataPath: 'rows', totalPath: 'total', ...props };
  const resourceId = `${name}_index`;
  const fetcher = nx.createFetcher(resourceId, { dataPath, totalPath });

  return (
    <AcTable
      size="middle"
      rowKey="id"
      bordered
      name={name}
      fetcher={fetcher}
      pagination={{ showSizeChanger: true }}
      {...rest}
    />
  );
};

