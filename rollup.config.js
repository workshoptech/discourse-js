import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

import ts from 'typescript';

import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.ts',
    output: {
      name: 'DiscourseJS',
      file: pkg.browser,
      format: 'umd',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      typescript({
        typescript: ts,
      }),
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.ts',
    external: [...Object.keys(pkg.dependencies || {})],
    output: [
      { file: pkg.main, format: 'cjs', exports: 'named', sourcemap: true },
      { file: pkg.module, format: 'es', exports: 'named', sourcemap: true },
    ],
    plugins: [
      resolve(),
      typescript({
        typescript: ts,
      }),
      babel({ babelHelpers: 'bundled' }),
    ],
  },
];
