import baseConfig from '@novawaveui/vite-config/vite.config';
import { defineConfig } from 'vite';

export default defineConfig({
  ...baseConfig,
  build: {
    ...(baseConfig.build ?? {}),
    lib: {
      ...(baseConfig.build?.lib ?? {}),
      entry: 'src/index.ts',
    },
  },
});
