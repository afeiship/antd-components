import { AcTable, AcTableMain } from '@jswork/antd-components';

export default function App() {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 100 },
    { title: 'Title', dataIndex: 'title', key: 'title', width: 200 },
    { title: 'Body', dataIndex: 'body', key: 'body', width: 300 },
  ];

  const fetcher = async ({ current, pageSize }) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${current}&_limit=${pageSize}`,
    );
    const data = await res.json();
    return { data, total: 100 };
  };

  nx.$api = {
    posts_index: async ({ page, size }) => {
      return fetcher({ current: page, pageSize: size });
    },
  };

  return (
    <div className="border border-solid container mx-auto my-10 bg-gray-200 p-5" data-role="app-container">
      <AcTable fetcher={fetcher} columns={columns} />
      <hr />
      <AcTableMain size="large" name="posts" columns={columns} defaultPageSize={5} dataPath="data" />
    </div>
  );
}
