import { AcTable } from '@jswork/antd-components';

export default function App() {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 100, },
    { title: 'Title', dataIndex: 'title', key: 'title', width: 200, },
    { title: 'Body', dataIndex: 'body', key: 'body', width: 300 },
  ];

  const fetcher = async ({ current, pageSize }) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${current}&_limit=${pageSize}`,
    );
    const data = await res.json();
    return { data, total: 100 };
  };


  return (
    <div className="border border-solid container mx-auto my-10 bg-gray-200 p-5" data-role="app-container">
      <AcTable
        fetcher={fetcher}
        columns={columns}
        // 可选：如果后端用 page/size 而不是 _page/_limit
        // pageParam="page"
        // limitParam="size"
        // total={200}
        // defaultPageSize={10}
      />
    </div>
  );
}
