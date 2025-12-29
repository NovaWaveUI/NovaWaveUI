import { defineConfig, UserConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';

export interface ViteConfigOptions {
  /**
   * Root directory of the consuming package (defaults to process.cwd())
   */
  root?: string;
  /**
   * Entry file path relative to root (defaults to 'src/index.ts')
   */
  entry?: string;
  /**
   * TSConfig path relative to root (defaults to 'tsconfig.build.json')
   */
  tsconfigPath?: string;
  /**
   * Whether to enable bundle visualization (defaults to false)
   */
  visualize?: boolean;
}

export function defineViteConfig(options: ViteConfigOptions = {}) {
  const {
    root = process.cwd(),
    entry = 'src/index.ts',
    tsconfigPath = 'tsconfig.build.json',
    visualize = true,
  } = options;

  // Dynamically import package.json from the consuming package
  const pkg = require(resolve(root, 'package.json'));

  return defineConfig({
    plugins: [
      dts({
        tsconfigPath: resolve(root, tsconfigPath),
      }),
      visualize &&
        visualizer({
          emitFile: true,
          filename: 'bundle-stats.html',
          open: true,
        }),
    ].filter(Boolean),
    build: {
      sourcemap: false,
      lib: {
        entry: resolve(root, entry),
        formats: ['es'],
        fileName: 'index',
      },
      rollupOptions: {
        external: [
          ...Object.keys(pkg.peerDependencies || {}),
          ...Object.keys(pkg.dependencies || {}),
        ],
        output: {
          preserveModules: true,
        },
      },
    },
  } as UserConfig);
}
