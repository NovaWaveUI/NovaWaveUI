import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig(({ mode: _ }) => ({
  build: {
    lib: {
      entry: path.resolve(process.cwd() + '/src/index.ts'),
      name: process.env.npm_package_name,
      formats: ['es', 'cjs'],
      fileName: format => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  plugins: [react(), dts()],
}));
