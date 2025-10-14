// RemoteTable.tsx
import { AcTable } from '@jswork/antd-components';
import { FC, useEffect, useState } from 'react';

interface RemoteTableProps {
  api: string; // 基础 API 地址，如 'https://jsonplaceholder.typicode.com/posts'
  columns: any[];
  rowKey?: string;
  pageParam?: string;   // 默认 '_page'
  limitParam?: string;  // 默认 '_limit'
  total?: number;       // 可选：如果后端不返回 total，可手动指定
  defaultPageSize?: number;
}

const RemoteTable: FC<RemoteTableProps> = ({
                                             api,
                                             columns,
                                             rowKey = 'id',
                                             pageParam = '_page',
                                             limitParam = '_limit',
                                             total = 100,
                                             defaultPageSize = 5,
                                           }) => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const fetchData = async (page: number, size: number) => {
    setIsLoading(true);
    try {
      const url = new URL(api);
      url.searchParams.set(pageParam, String(page));
      url.searchParams.set(limitParam, String(size));

      const response = await fetch(url.toString());
      const data = await response.json();
      setDataSource(data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setDataSource([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(current, pageSize);
  }, [current, pageSize, api, pageParam, limitParam]);

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
