import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import analyze from "rollup-plugin-analyzer";
import copy from "rollup-plugin-copy";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";

import modifyPackageJSON from "./build/index.js"; // Passe den Pfad entsprechend an

const EXEC_BANNER = "#!/usr/bin/env node";
const PROJECT_ARTIFACTS = ["LICENSE", "README.md", "package.json"];

const devMode = process.env.NODE_ENV === "dev";
console.log(`${devMode ? "dev" : "prod"} mode bundle`);

export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "esm",
    sourcemap: devMode ? "inline" : false,
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
    banner: EXEC_BANNER,
  },
  plugins: [
    nodeResolve(),
    peerDepsExternal(),
    typescript(),
    terser(),
    analyze(),
    modifyPackageJSON({
      test: "test",
    }),
    copy({
      targets: [
        {
          src: PROJECT_ARTIFACTS,
          dest: "./dist",
        },
      ],
      hook: "writeBundle",
      copyOnce: true,
      copySync: true,
    }),
  ],
};
