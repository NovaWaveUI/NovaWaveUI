const baseConfig = require('./jest.base.config');
const path = require('node:path');

// Resolve the path of the root of the monorepo
const rootDir = path.resolve(__dirname, '.');

/** @type {import('jest').Config} */
const jsdomConfig = {
  ...baseConfig,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    `${rootDir}/tests/test-setup.ts`,
  ],
};

module.exports = jsdomConfig;
