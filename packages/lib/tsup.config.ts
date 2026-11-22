import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  cjsInterop: true,

  // react
  minify: true,
  sourcemap: true,
  splitting: true,
  target: 'es6',
  bundle: true,
  external: [
    'react',
    'react-dom',
    'classnames',
    'lodash',
    'antd',
    'dayjs',
    '@ant-design/icons',
    '@jswork/next',
    '@jswork/antd-form-builder',
    '@jswork/antd-tpls',
    '@jswork/loadkit',
    '@jswork/next-dom-event',
    '@jswork/next-gpid',
    '@jswork/next-tree-walk',
    '@jswork/noop',
    '@jswork/react-codeflask',
    '@jswork/react-list',
    '@jswork/react-dynamic-list',
    '@jswork/weibo2res',
    'fast-deep-equal',
    'nanoid',
    'react-input-autosize',
    'sortablejs',
  ],
  loader: {
    '.svg': 'dataurl',
  },
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    };
  },
});
