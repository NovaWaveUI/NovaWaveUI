import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  format: ['cjs', 'esm'],
  target: 'es2020',
  entry: ['./src/**'],
  sourcemap: false,
  clean: !options.clean,
  bundle: true,
  minify: !options.watch,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  dts: true,
  banner: {
    js: '"use client";',
  },
  ...options,
}));
