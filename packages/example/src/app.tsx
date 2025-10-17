import { AcBreadcrumb } from '@jswork/antd-components';
import { Breadcrumb } from 'antd';

export default function App() {
  const navItems = [
    { label: '首页', value: 'home' },
    { label: '组件', value: 'components' },
    { label: '面包屑导航', value: 'nav' },
  ];

  return (
    <div className="border border-solid container mx-auto my-10 bg-gray-200 p-5" data-role="app-container">
      <AcBreadcrumb items={navItems} />
      <nav>
        <Breadcrumb>
          <Breadcrumb.Item><a href="#nav1">sample1</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href="#nav2">sample2</a></Breadcrumb.Item>
          <Breadcrumb.Item>sample3</Breadcrumb.Item>
        </Breadcrumb>
      </nav>
    </div>
  );
}
