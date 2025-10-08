import { AcTable } from '@jswork/antd-components';
import { FC, useEffect, useState } from 'react';

const Anonymous: FC = () => {
  // GET https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10
  const [dataSource, setDataSource] = useState([]);
  const fetchData = async (params) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${params.current}&_limit=${params.pageSize}`,
    );
    const data = await response.json();
    return { data, total: 100 };
  };

  useEffect(() => {
    fetchData({ current: 1, pageSize: 10 }).then((data) => {
      setDataSource(data.data);
    });
  }, []);

  return (
    <div className="text-red-100">
      <AcTable rowKey="id" dataSource={dataSource} />
    </div>
  );
};

export default Anonymous;
