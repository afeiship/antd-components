// RemoteTable.tsx
import { AcTable } from '@jswork/antd-components';
import { FC, useEffect, useState, useRef } from 'react';

interface RemoteTableProps {
  /**
   * 自定义数据获取函数
   * @param params { current: number; pageSize: number }
   * @returns Promise<{ data: any[]; total: number }>
   */
  fetcher: (params: { current: number; pageSize: number }) => Promise<{ data: any[]; total: number }>;
  columns: any[];
  rowKey?: string;
  defaultPageSize?: number;
  total?: number; // 如果 fetcher 不返回 total，可在此固定（不推荐）
}

const RemoteTable: FC<RemoteTableProps> = ({
                                             fetcher,
                                             columns,
                                             rowKey = 'id',
                                             defaultPageSize = 5,
                                           }) => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [total, setTotal] = useState(0);

  // 用于取消过期请求（防抖/防内存泄漏）
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = async (page: number, size: number) => {
    // 取消上一次请求
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    try {
      const result = await fetcher({ current: page, pageSize: size });
      if (!controller.signal.aborted) {
        setDataSource(result.data || []);
        setTotal(result.total ?? 0);
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        console.error('RemoteTable fetch error:', error);
        setDataSource([]);
        setTotal(0);
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData(current, pageSize);
  }, [current, pageSize, fetcher]);

  return (
    <AcTable
      rowKey={rowKey}
      loading={isLoading}
      dataSource={dataSource}
      columns={columns}
      pagination={{
        total,
        current,
        pageSize,
        onChange: (page, size) => {
          setCurrent(page);
          setPageSize(size);
        },
      }}
    />
  );
};

export default RemoteTable;
