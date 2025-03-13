import baseReactConfig from './vite.config.js';
import { defineConfig, mergeConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) =>
  mergeConfig(baseReactConfig(mode), {
    plugins: [...baseReactConfig(mode).plugins, tailwindcss()],
  })
);
