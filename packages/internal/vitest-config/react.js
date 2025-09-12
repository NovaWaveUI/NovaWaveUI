import { defineConfig, mergeConfig } from 'vitest/config';
import base from './base.js';

export default mergeConfig(
  base,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: import.meta.resolve('./setup/react.ts'),
    },
  })
);
