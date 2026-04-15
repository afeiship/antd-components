import {
  AcCardExtras,
  AcColorPicker,
  AcInputCopyable,
  AcInputToken,
  AcMarkdownEditor,
  AcTable,
  AcTableLinks,
  BtnSave,
  AcEditableTagGroupFc,
} from "@jswork/antd-components/src/main";
import { useRef, useState } from "react";

import "@jswork/antd-components/dist/style.css";

export default function App() {
  const tbRef = useRef<any>(null);
  const [color, setColor] = useState("#FFCC00");
  const [markdown, setMarkdown] = useState(`# Welcome to AcMarkdownEditor

This is a **markdown editor** with live preview.

## Features

- Real-time preview
- Syntax highlighting
- Toolbar with common formatting options
- Auto-save on changes

## Code Example

\`\`\`typescript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

## Lists

1. First item
2. Second item
3. Third item

## Try it out!

Start editing to see the magic happen!`);
  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 100 },
    { title: "Title", dataIndex: "title", key: "title", width: 200 },
    { title: "Body", dataIndex: "body", key: "body", width: 300 },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, record) => <AcTableLinks name="versions" model={record} />,
    },
  ];

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
        <h3 className="text-lg font-semibold">AcEditableTagGroupFc Demo</h3>
        <AcEditableTagGroupFc />
      </div>
      <div className="mb-4 space-y-4">
        <h3 className="text-lg font-semibold">AcInputCopyable Demo</h3>
        <div>
          <label className="mb-1 block text-sm font-medium">Text Type (default):</label>
          <AcInputCopyable value="https://example.com" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Link Type:</label>
          <AcInputCopyable value="https://github.com" valueType="link" />
        </div>
      </div>
      <div className="debug">
        <AcCardExtras name="posts" />
      </div>
      <nav className="debug-green">{/*<AcExtraSearch name="posts" />*/}</nav>
      <AcTable ref={tbRef} size="large" name="posts" columnsFields={columns} defaultPageSize={5} />
      <BtnSave
        type="primary"
        onClick={() => {
          console.log("tbRef state: ", tbRef.current.state);
        }}
      >
        Get State
      </BtnSave>
      <AcInputToken />
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold">AcMarkdownEditor Demo</h3>
        <div className="rounded-lg border border-gray-300 bg-white p-4">
          <AcMarkdownEditor
            value={markdown}
            onChange={({ target }) => setMarkdown(target.value)}
            placeholder="Start writing your markdown here..."
          />
        </div>
        <details className="mt-4">
          <summary className="cursor-pointer font-semibold text-gray-700 hover:text-gray-900">
            View Raw Markdown (Debug)
          </summary>
          <pre className="mt-2 rounded bg-gray-100 p-4 text-sm">{markdown}</pre>
        </details>
      </div>
      <div className="mt-4">
        <h3 className="mb-2 text-lg font-semibold">ColorPicker Demo</h3>
        <AcColorPicker
          value={color}
          onChange={(e) => {
            console.log("Color changed:", e.target.value);
            setColor(e.target.value);
          }}
          allowClear
        />
        <p className="mt-2 text-sm text-gray-600">Selected: {color}</p>
      </div>
    </div>
  );
}
