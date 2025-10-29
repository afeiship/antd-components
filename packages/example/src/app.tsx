import {
  AcTable,
  BtnCreate,
  BtnDelete,
  BtnEdit,
  BtnExport,
  BtnImport,
  BtnRefresh,
  BtnSave,
  BtnBack,
  BtnView, BtnSubmit, BtnCancel, BtnSync, AcTableLinks, AcTableExtras,
} from '@jswork/antd-components';
import { Space } from 'antd';
import { useRef } from 'react';

export default function App() {
  const tbRef = useRef<any>(null);
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 100 },
    { title: 'Title', dataIndex: 'title', key: 'title', width: 200 },
    { title: 'Body', dataIndex: 'body', key: 'body', width: 300 },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_, record) => (<AcTableLinks name="versions" model={record} />),
    },
  ];

  const fetcher = async ({ current, pageSize }) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${current}&_limit=${pageSize}`,
    );
    const rows = await res.json();
    return { rows, total: 100 };
  };

  nx.$api = {
    posts_index: async ({ page, size }) => {
      return fetcher({ current: page, pageSize: size });
    },
  };

  return (
    <div className="rounded-2xl container mx-auto my-10 bg-gray-200 p-5">
      <Space wrap className="btns" direction="horizontal">
        <BtnCreate />
        <BtnEdit />
        <BtnDelete />
        <BtnView />
        <BtnSave />
        <BtnExport />
        <BtnImport />
        <BtnRefresh />
        <BtnBack />
        <BtnSubmit />
        <BtnCancel />
        <BtnSync />
      </Space>
      <div className="debug">
        <AcTableExtras name="posts" />
      </div>
      <AcTable ref={tbRef} size="large" name="posts" columnsFields={columns} defaultPageSize={5} />
      <BtnSave type="primary" onClick={() => {
        console.log(
          'tbRef state: ', tbRef.current.state,
        );
      }}>Get State</BtnSave>
    </div>
  );
}
