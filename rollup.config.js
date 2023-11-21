import { nodeResolve } from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import terser from '@rollup/plugin-terser';
import analyze from 'rollup-plugin-analyzer';
import del from 'rollup-plugin-delete';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json' assert { type: 'json' };

const EXEC_BANNER = '#!/usr/bin/env node';

const COPYRIGHT_BANNER = `/**
 * @copyright Copyright (c) 2023 Christian Silfang
 */`;

const BUILD_ARTIFACTS = [
  './index.d.ts',
  './index.js',
];


const PROJECT_ARTIFACTS = [
  'LICENSE',
  'README.md',
  'package.json'
];

const devMode = process.env.NODE_ENV === 'dev';
console.log(`${devMode ? 'dev' : 'prod'} mode bundle`);

export default {
  input: 'src/index.ts',
  output: {
    file: pkg.main, // ES module format
    format: 'esm',
    sourcemap: devMode ? 'inline' : false,
    plugins: [
      terser({
        ecma: 2020,
        compress: {
          module: true,
          unsafe_arrows: true,
          drop_console: devMode ? false : true, // DEBUG
          drop_debugger: devMode ? false : true, // DEBUG
        },
        output: { quote_style: 1 },
      }),
    ],
    banner: EXEC_BANNER + ' \n' + COPYRIGHT_BANNER,

  },
  external: [
    ...Object.keys(pkg.scripts || {}),
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    nodeResolve(),
    terser(),
    peerDepsExternal(),
    typescript(),
    analyze(),
    del({
      targets: ['index.js', 'index.d.ts'],
      hook: 'buildEnd',
      verbose: true
    }),
    copy({
      targets: [
        {
          src: PROJECT_ARTIFACTS,
          dest: './dist'
        },
        {
          src: BUILD_ARTIFACTS,
          dest: './dist'
        },
      ],
      hook: 'writeBundle',
      copyOnce: true,
      copySync: true,
    }),
  ],
};