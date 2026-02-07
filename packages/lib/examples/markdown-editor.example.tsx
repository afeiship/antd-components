/**
 * AcMarkdownEditor Component Example
 *
 * This example demonstrates how to use the AcMarkdownEditor component.
 */

import React from 'react';
import { AcMarkdownEditor } from '@jswork/antd-components/main';

const MarkdownEditorExample: React.FC = () => {
  const [markdown, setMarkdown] = React.useState('# Hello World\n\nStart writing markdown...');

  return (
    <div style={{ padding: '20px' }}>
      <h2>Markdown Editor Example</h2>
      <AcMarkdownEditor
        value={markdown}
        onChange={({ target }) => setMarkdown(target.value)}
        placeholder="Write your markdown here..."
      />
      <div style={{ marginTop: '20px' }}>
        <h3>Preview:</h3>
        <pre>{markdown}</pre>
      </div>
    </div>
  );
};

export default MarkdownEditorExample;
