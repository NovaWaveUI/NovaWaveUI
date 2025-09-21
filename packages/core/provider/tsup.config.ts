import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  format: ['cjs', 'esm'],
  target: 'es2020',
  clean: true,
  ...options,
}));
