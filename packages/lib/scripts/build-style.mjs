import fs from 'node:fs';
import { compile } from 'sass';

const result = compile('src/style.scss', {
  style: 'compressed',
  loadPaths: ['node_modules'],
});
fs.writeFileSync('dist/style.css', result.css);
