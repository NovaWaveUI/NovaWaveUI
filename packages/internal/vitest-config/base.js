import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: [
      'src/**/*.{test,spec}.{js,ts,jsx,tsx}',
      '__tests__/*.{test,spec}.{js,ts,jsx,tsx}',
    ],
    exclude: ['node_modules', '**/*.d.ts', 'dist', 'build'],
    reporters: ['default', 'verbose'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
