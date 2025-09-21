import { defineConfig, Options } from 'tsup';
import path from 'path';

export default defineConfig((options: Options) => ({
  format: ['cjs', 'esm'],
  target: 'es2020',
  clean: true,
  sourcemap: true,
  banner: {
    js: '"use client";',
  },
  entry: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*.test.ts',
    '!src/**/*.test.tsx',
  ],
  tsconfig: path.resolve(__dirname, 'tsconfig.json'),
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  ...options,
}));
