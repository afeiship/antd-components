import TableDemo from '@/components/TableDemo.tsx';

export default function App() {
  return (
    <div className="debug container mx-auto my-10 bg-gray-200 p-5" data-role="app-container">
      <h1 className="text-3xl font-bold">Hello world!</h1>
      <img src="/static/images/vite.svg" alt="Vite" />
      <TableDemo />
    </div>
  );
}
