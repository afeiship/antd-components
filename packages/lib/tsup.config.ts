import { defineConfig } from 'tsup';
import { copy } from 'esbuild-plugin-copy';

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
  external: ['react', 'react-dom', 'antd', '@ant-design-icons'],
  loader: {
    '.svg': 'dataurl',
  },
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    };
  },
  esbuildPlugins: [
    copy({
      // this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
      // if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
      resolveFrom: 'cwd',
      assets: {
        from: ['./src/styles/*'],
        to: ['./dist/styles'],
      },
    }),
  ],
});
