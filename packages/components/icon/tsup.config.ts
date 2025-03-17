import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  format: ['cjs', 'esm'],
  target: 'es2020',
  entry: ['./src/index.ts'],
  sourcemap: false,
  clean: !options.clean,
  bundle: true,
  dts: true,
  banner: {
    js: '"use client";',
  },
  ...options,
}));
