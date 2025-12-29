import { defineConfig, mergeConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { defineViteConfig, ViteConfigOptions } from './vite.base';

export function defineReactViteConfig(options: ViteConfigOptions = {}) {
  const {
    root = process.cwd(),
    entry = 'src/index.ts',
    tsconfigPath = 'tsconfig.build.json',
    visualize = true,
  } = options;

  return mergeConfig(
    defineViteConfig({
      root,
      entry,
      tsconfigPath,
      visualize,
    }),
    defineConfig({
      plugins: [
        react({
          babel: {
            plugins: ['babel-plugin-react-compiler'],
          },
        }),
      ],
      build: {
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
      },
    })
  ) as UserConfig;
}
