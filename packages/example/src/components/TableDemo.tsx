import { AcTable } from '@jswork/antd-components';
import { FC, useEffect, useState } from 'react';

const Anonymous: FC = () => {
  // GET https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const fetchData = async (params) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${params.current}&_limit=${params.pageSize}`,
    );
    const data = await response.json();
    return { data, total: 100 };
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    fetchData({ current, pageSize }).then((data) => {
      console.log('data: ', data);
      setDataSource(data.data);
      setIsLoading(false);
    });
  }, [current, pageSize]);

  return (
    <div className="text-red-100">
      <AcTable rowKey="id" loading={isLoading} dataSource={dataSource} columns={columns} pagination={{
        total: 100,
        current,
        pageSize,
        onChange: (page, pageSize) => {
          setCurrent(page);
          setPageSize(pageSize);
        },
      }} />
    </div>
  );
};

export default Anonymous;
