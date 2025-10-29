/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-10-03 07:11:26
 * @LastEditors: aric.zheng 1290657123@qq.com
 * @LastEditTime: 2025-10-29 13:17:17
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
import '@jswork/next-compact-object';
import { tableAction } from './table-links';
import deepEqual from 'fast-deep-equal';

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
  static events = ['load', 'refetch', 'reset', 'add', 'edit', 'destroy', 'draft'];
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

  // params update
  async componentDidUpdate(prevProps: AcTableProps) {
    const { params } = this.props;
    if (!deepEqual(prevProps.params, params)) {
      void this.refetch();
    }
  }

  componentWillUnmount() {
    this.harmonyEvents?.destroy();
    this.sync.cancel();
  }

  fetchData = async (page: number, size: number, overrideParams?: Record<string, any>) => {
    const abortController = new AbortController();
    const { params: propsParams } = this.props; // 将 props.params 重命名以避免与局部变量冲突

    // 1. 获取当前 URL 中的所有参数作为基础
    const currentUrlParams = this.sync.readInitialState();

    // 2. 合并所有过滤/搜索参数：
    // 优先级：overrideParams > propsParams > currentUrlParams
    // 注意：这里不包含 page 和 size，它们将作为独立参数处理
    const filterParams = nx.compactObject({
      ...currentUrlParams, // 从 URL 读取的现有参数
      ...propsParams,     // 组件 props 中定义的固定参数
      ...overrideParams,  // 动态传入的覆盖参数（例如搜索关键字）
    });

    // 3. 确保 page 和 size 是明确的，并从 filterParams 中移除它们，
    // 以便传递给 fetcher 的 params 字段时不会重复
    const finalPage = page;
    const finalSize = size;
    const { page: _, size: __, ...fetcherFilterParams } = filterParams;


    // 4. 更新组件状态：加载中、当前页和每页大小
    this.setState({
      isLoading: true,
      current: finalPage,
      pageSize: finalSize,
    });

    // 5. 同步 URL 参数：合并所有过滤参数，并明确设置 page 和 size
    this.sync.schedule({
      ...filterParams, // 所有过滤参数
      page: finalPage,   // 明确的当前页
      size: finalSize,   // 明确的每页大小
    });

    try {
      // 6. 调用数据获取器，传递明确的 page/size 和过滤参数
      const result = await this.defaultFetcher({
        current: finalPage,
        pageSize: finalSize,
        params: fetcherFilterParams, // 仅传递过滤参数
      });

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
   * Load data from backend.
   */
  public load = async (payload: Record<string, any>) => {
    const { page, size, ...rest } = payload;
    const _page = page || this.state.current;
    const _size = size || this.state.pageSize;
    await this.fetchData(_page, _size, rest);
  };
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
        total: 0,
        dataSource: [],
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

