import domConfig from '../../../jest.jsdom.config.js';

/** @type {import('jest').Config} */
const config = {
  ...domConfig,
  displayName: '@novawaveui/button',
  testMatch: ['<rootDir>/__tests__/**/*.test.{js,jsx,ts,tsx}'],
  transformIgnorePatterns: [
    '/node_modules/(?!@testing-library/react|@testing-library/jest-dom)',
  ],
};
export default config;
