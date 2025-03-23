const baseConfig = require('./jest.base.config');

/** @type {import('jest').Config} */
const jsdomConfig = {
  ...baseConfig,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom', './tests/test-setup.ts'],
};

export default jsdomConfig;
