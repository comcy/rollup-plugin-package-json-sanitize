import { nodeResolve } from '@rollup/plugin-node-resolve'; // Beispielhaftes Rollup-Plugin, um externe Abhängigkeiten aufzulösen
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js', // Der Einstiegspunkt für das Plugin
  output: {
    file: 'dist/bundle.js', // Der Ausgabeort für das gebündelte Plugin
    format: 'cjs' // Das Format des Ausgabebundles (CommonJS in diesem Fall)
  },
  plugins: [
    // Weitere Plugins können hier hinzugefügt werden, je nach Bedarf für dein Rollup-Plugin
    nodeResolve(), // Beispielhaftes Plugin, um externe Abhängigkeiten aufzulösen
    terser()
  ]
};