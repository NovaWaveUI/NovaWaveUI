import nodeConfig from '../../jest.node.config.js';

/** @type {import('jest').Config} */
export default {
  ...nodeConfig,
  displayName: 'tailwind-composer',
  testMatch: ['<rootDir>/src/**/*.test.{js,jsx,ts,tsx}'],
  transformIgnorePatterns: [
    '/node_modules/(?!@testing-library/react|@testing-library/jest-dom)',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
