import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  format: ['cjs', 'esm'],
  target: 'es2020',
  sourcemap: false,
  clean: true,
  bundle: true,
  banner: {
    js: '"use client";',
  },
  ...options,
}));
