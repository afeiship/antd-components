/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-10-03 07:11:26
 * @LastEditors: aric 1290657123@qq.com
 * @LastEditTime: 2025-10-23 16:28:57
 */
import type { EventMittNamespace } from '@jswork/event-mitt';
import { ReactHarmonyEvents } from '@jswork/harmony-events';
import UrlSyncFlat from '@jswork/url-sync-flat';
import { Table, TableProps, message } from 'antd';
import cx from 'classnames';
import React from 'react';
import nx from '@jswork/next';
import '@jswork/next-create-fetcher';

declare global {
  interface NxStatic {
    $nav: any;
    $api: Record<string, any>;
  }
}

const CLASS_NAME = 'ac-table';

export type AcTableProps = TableProps & {
  /**
   * The identity name.
   * @default '@'
   */
  name?: string;
  /**
   * The platform module name.
   * @default admin
   */
  module?: string;
  /**
   * The extra params when query data.
   */
  params?: Record<string, any>;
  /**
   * Custom get standard data.
   * @param params { current: number; pageSize: number }
   * @returns Promise<{ data: any[]; total: number }>
   */
  fetcher: (params: {
    current: number;
    pageSize: number;
    params?: Record<string, any>;
  }) => Promise<{ data: any[]; total: number }>;
  /**
   * @param page
   * @param size
   */
  onPageChange?: (page: number, size: number) => void;
  /**
   * Default page.
   */
  defaultCurrent?: number;
  /**
   * Default page size.
   */
  defaultPageSize?: number;
  /**
   * Total data from backend.
   */
  total?: number;
};

type AcTableState = {
  currentRowId: any;
  dataSource: TableProps['dataSource'];
  isLoading: boolean;
  current: any;
  pageSize: any;
  total: any;
}

export class AcTable extends React.Component<AcTableProps, AcTableState> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  private harmonyEvents: ReactHarmonyEvents | null = null;
  static event: EventMittNamespace.EventMitt;
  static events = ['refetch', 'reset', 'toAdd', 'toEdit', 'toDestroy'];

  static defaultProps = {
    name: '@',
    module: 'admin',
    rowKey: 'id',
    defaultCurrent: 1,
    defaultPageSize: 10,
  };

  public eventBus: EventMittNamespace.EventMitt = AcTable.event;
  public sync = new UrlSyncFlat();

  constructor(props: AcTableProps) {
    super(props);
    const { defaultCurrent, defaultPageSize, params } = this.props;
    const defaults = { page: defaultCurrent, size: defaultPageSize, ...params };
    const init = this.sync.readInitialState({ defaults });

    this.state = {
      currentRowId: null,
      dataSource: [],
      isLoading: false,
      current: init.page,
      pageSize: init.size,
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
    this.sync.cancel();
  }

  fetchData = async (page: number, size: number) => {
    const abortController = new AbortController();
    const { fetcher, params } = this.props;
    const { current, pageSize } = this.state;
    this.setState({ isLoading: true });
    this.sync.schedule({ page: current, size: pageSize, ...params });
    try {
      const result = await fetcher({ current: page, pageSize: size, params });
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
    this.setState(
      {
        current: defaultCurrent,
        pageSize: defaultPageSize,
      },
      () => {
        void this.fetchData(defaultCurrent!, defaultPageSize!);
      },
    );
  };

  public toDestroy = (item) => {
    const { name } = this.props;
    this.setState({ isLoading: true });
    nx.$api[`${name}_destroy`](item)
      .then(this.refetch)
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  public toAdd = () => {
    const { module, name } = this.props;
    nx.$nav?.(`/${module}/${name}/add`);
  };

  public toEdit = (item: any) => {
    const { module, name, rowKey } = this.props;
    nx.$nav?.(`/${module}/${name}/edit/${item[rowKey as string]}`);
  };

  /* ----- public eventBus methods end  ----- */

  handleOnRow = (record) => {
    const { rowKey } = this.props;
    return {
      onMouseEnter: () => {
        this.setState({ currentRowId: record[rowKey as any] });
      },
      onMouseLeave: () => {
        this.setState({ currentRowId: null });
      },
    };
  };

  render() {
    const { className, pagination, onPageChange, params, ...rest } = this.props;
    const { dataSource, isLoading, current, pageSize, total } = this.state;
    return (
      <Table
        className={cx(className, CLASS_NAME)}
        loading={isLoading}
        dataSource={dataSource}
        onRow={this.handleOnRow}
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
  dataPath?: string;
  totalPath?: string;
};

export const AcTableMain = React.forwardRef<any, AcTableMainProps>(
  (props, ref) => {
    const { name, dataPath, totalPath, ...rest } = {
      dataPath: 'rows',
      totalPath: 'total',
      ...props,
    };
    const resourceId = `${name}_index`;
    const fetcher = nx.createFetcher(resourceId, { dataPath, totalPath });

    return (
      <AcTable
        ref={ref}
        size="middle"
        rowKey="id"
        bordered
        name={name}
        fetcher={fetcher}
        pagination={{ showSizeChanger: true }}
        {...rest}
      />
    );
  },
);
