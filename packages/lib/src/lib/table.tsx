/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-10-03 07:11:26
 * @LastEditors: aric.zheng 1290657123@qq.com
 * @LastEditTime: 2025-10-29 08:14:01
 *
 *
 * 路由风格: /{module}/{name} eg: /admin/staff-roles
 * API资源风格: {module}_{name}_index eg: admin_staff-roles_index
 */
import type { EventMittNamespace } from '@jswork/event-mitt';
import { ReactHarmonyEvents } from '@jswork/harmony-events';
import UrlSyncFlat from '@jswork/url-sync-flat';
import { Table, TableProps } from 'antd';
import cx from 'classnames';
import React from 'react';
import nx from '@jswork/next';
import '@jswork/next-create-fetcher';
import { tableAction } from './table-links';

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
  name: string;
  /**
   * The language.
   * @default 'zh-CN'
   */
  lang?: string;
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
   * The extra params when redirect to add page.
   * `paramsAdd` will merge with `params` when redirect to add page.
   */
  paramsAdd?: Record<string, any>;
  /**
   * The extra params when redirect to edit page.
   * `paramsEdit` will merge with `paramsAdd` when redirect to edit page.
   */
  paramsEdit?: Record<string, any>;

  /**
   * The extra params when reset.
   * `paramsReset` will merge with `params` when reset.
   */
  paramsReset?: Record<string, any>;
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
   * When destroy complete.
   * @param model
   */
  onDestroyComplete?: (model: any) => void;
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

  /**
   * Column fields for table.
   */
  columnsFields?: TableProps['columns'];
  /**
   * Column fields for table action.
   */
  columnsAction?: TableProps['columns'];
  /**
   * The table action params.
   */
  columnsActionParams?: Record<string, any>;
  /**
   * The table columns.
   */
  columns?: TableProps['columns'];
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
  static events = ['refetch', 'reset', 'add', 'edit', 'destroy', 'draft'];
  static defaultProps = {
    name: '@',
    lang: 'zh-CN',
    module: 'admin',
    rowKey: 'id',
    defaultCurrent: 1,
    defaultPageSize: 10,
    dataPath: 'rows',
    totalPath: 'total',
    columnsFields: [],
  };

  public eventBus: EventMittNamespace.EventMitt = AcTable.event;
  public sync = new UrlSyncFlat();
  private defaultFetcher: Function;

  get routerKey() {
    const { name } = this.props;
    return name.replace(/_/g, '-');
  }

  get calculateColumnsAction() {
    const { name, columnsAction, columnsActionParams, lang } = this.props;
    if (typeof columnsAction !== 'undefined') return columnsAction;
    return tableAction({ name, lang, ...columnsActionParams });
  }

  get calculateColumns() {
    const { columnsFields, columns } = this.props;
    if (columns && columns.length > 0) return columns;
    return [...columnsFields!, this.calculateColumnsAction] as TableProps['columns'];
  }

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

  private toQueryString(params?: Record<string, any>) {
    return params ? `?${new URLSearchParams(params).toString()}` : '';
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

  fetchData = async (page: number, size: number, overrideParams?: Record<string, any>) => {
    const abortController = new AbortController();
    const { params } = this.props;
    const lastParams = { ...params, ...overrideParams };
    this.setState({ isLoading: true });
    this.sync.schedule({ page, size, ...lastParams });
    try {
      const result = await this.defaultFetcher({ current: page, pageSize: size, params: lastParams });
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
  /**
   * Refresh data use current state.
   */
  public refetch = async () => {
    const { current, pageSize } = this.state;
    await this.fetchData(current, pageSize);
  };

  /**
   * Reset to default state, and fetch data.
   */
  public reset = async () => {
    const { defaultCurrent, defaultPageSize, paramsReset } = this.props;
    this.setState(
      {
        current: defaultCurrent,
        pageSize: defaultPageSize,
      },
      () => {
        void this.fetchData(defaultCurrent!, defaultPageSize!, paramsReset);
      },
    );
  };

  /**
   * CURD(local): optimisticUpdate data before data fetch.
   */
  public draft = async (payload: Record<string, any>) => {
    const { rowKey } = this.props;
    const id = payload[rowKey as string];
    const dataSource = this.state.dataSource!.slice();
    const index = dataSource.findIndex((item) => item[rowKey as string] === id);
    if (index !== -1) {
      dataSource[index] = {
        ...dataSource[index],
        ...payload,
      };
      this.setState({ dataSource });
    }
  };

  /**
   * CURD(action): Delete data from backend.
   */
  public destroy = (item) => {
    const { name, onDestroyComplete } = this.props;
    this.setState({ isLoading: true });
    nx.$api[`${name}_destroy`](item)
      .then(this.refetch)
      .finally(() => {
        onDestroyComplete?.(item);
        this.setState({ isLoading: false });
      });
  };

  /**
   * CURD(page): Redirect to add page.
   */
  public add = () => {
    const { module, paramsAdd } = this.props;
    const qs = this.toQueryString(paramsAdd);
    nx.$nav?.(`/${module}/${this.routerKey}/add${qs}`);
  };

  /**
   * CURD(page): Redirect to edit page.
   */
  public edit = (item: any) => {
    const { module, rowKey, paramsEdit } = this.props;
    const qs = this.toQueryString(paramsEdit);
    nx.$nav?.(`/${module}/${this.routerKey}/${item[rowKey as string]}/edit${qs}`);
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
    const {
      className,
      pagination,
      onPageChange,
      params,
      paramsAdd,
      paramsEdit,
      paramsReset,
      fetcher,
      dataPath,
      totalPath,
      columnsFields,
      columnsAction,
      columns,
      ...rest
    } = this.props;
    const { dataSource, isLoading, current, pageSize, total } = this.state;

    return (
      <Table
        className={cx(className, CLASS_NAME)}
        loading={isLoading}
        dataSource={dataSource}
        onRow={this.handleOnRow}
        columns={this.calculateColumns}
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

