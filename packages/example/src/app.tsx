import { AcEditTagGroup2 } from "@jswork/antd-components/src/main";

import "@jswork/antd-components/dist/style.css";

export default function App() {
  const fetcher = async ({ current, pageSize }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${current}&_limit=${pageSize}`);
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
      <div className="mb-4 space-y-4">
        <h3 className="text-lg font-semibold">AcEditTagGroup2 Demo</h3>
        <AcEditTagGroup2
          name="demo-tags"
          value={["标签1", "标签2"]}
          onChange={(e) => console.log("AcEditTagGroup2:", e.target.value)}
        />
      </div>
    </div>
  );
}
