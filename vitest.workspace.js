import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  './packages/utils/dev-utils/vitest.config.js',
  './packages/utils/react-utils/vitest.config.js',
  './packages/components/button/vitest.config.js',
  './packages/components/icon/vitest.config.js',
  './packages/core/core/vitest.config.js',
]);
