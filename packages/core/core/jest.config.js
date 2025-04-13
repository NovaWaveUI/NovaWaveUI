import nodeConfig from '../../../jest.jsdom.config.js';

/** @type {import('jest').Config} */
export default {
  ...nodeConfig,
  displayName: '@novawaveui/core',
  testMatch: ['<rootDir>/__tests__/**/*.test.{js,jsx,ts,tsx}'],
  transformIgnorePatterns: [
    '/node_modules/(?!@testing-library/react|@testing-library/jest-dom)',
  ],
};
