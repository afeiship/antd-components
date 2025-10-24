/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-10-03 07:11:26
 * @LastEditors: aric 1290657123@qq.com
 * @LastEditTime: 2025-10-24 21:10:47
 */
import type { EventMittNamespace } from '@jswork/event-mitt';
import { ReactHarmonyEvents } from '@jswork/harmony-events';
import UrlSyncFlat from '@jswork/url-sync-flat';
import { message, Table, TableProps } from 'antd';
import cx from 'classnames';
import React from 'react';
import nx from '@jswork/next';
import '@jswork/next-create-fetcher';

type NavigateFunction = import('react-router-dom').NavigateFunction;

declare global {
  interface NxStatic {
    $event: any;
    $nav: NavigateFunction;
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
  fetcher?: (params: {
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
   * When destroy success.
   * @param model
   */
  onDestroySuccess?: (model: any) => void;
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
  /**
   * The response data key.
   */
  dataPath?: string;
  /**
   * The response total key.
   */
  totalPath?: string;
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
  static events = ['refetch', 'reset', 'add', 'edit', 'destroy'];

  static defaultProps = {
    name: '@',
    module: 'admin',
    rowKey: 'id',
    defaultCurrent: 1,
    defaultPageSize: 10,
    dataPath: 'rows',
    totalPath: 'total',
  };

  public eventBus: EventMittNamespace.EventMitt = AcTable.event;
  public sync = new UrlSyncFlat();
  private defaultFetcher: Function;

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
    this.initFetcher();
  }

  private initFetcher() {
    const { name, dataPath, totalPath, fetcher } = this.props;
    const resourceId = `${name}_index`;
    this.defaultFetcher = fetcher || nx.createFetcher(resourceId, { dataPath, totalPath });
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
    const { params } = this.props;
    const { current, pageSize } = this.state;
    this.setState({ isLoading: true });
    this.sync.schedule({ page: current, size: pageSize, ...params });
    try {
      const result = await this.defaultFetcher({ current: page, pageSize: size, params });
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

  /* ----- public eventBus methods start ----- */
  public refetch = async () => {
    const { current, pageSize } = this.state;
    await this.fetchData(current, pageSize);
  };

  public reset = async () => {
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

  public destroy = (item) => {
    const { name, onDestroySuccess } = this.props;
    this.setState({ isLoading: true });
    nx.$api[`${name}_destroy`](item)
      .then(this.refetch)
      .finally(() => {
        onDestroySuccess?.(item);
        this.setState({ isLoading: false });
      });
  };

  public add = () => {
    const { module, name } = this.props;
    nx.$nav?.(`/${module}/${name}/add`);
  };

  public edit = (item: any) => {
    const { module, name, rowKey } = this.props;
    nx.$nav?.(`/${module}/${name}/${item[rowKey as string]}/edit`);
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
    const { className, pagination, onPageChange, params, fetcher, dataPath, totalPath, ...rest } = this.props;
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
          showSizeChanger: true,
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

