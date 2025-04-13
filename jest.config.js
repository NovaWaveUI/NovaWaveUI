/** @type {import('jest').Config} */
const projectConfig = {
  projects: [
    '<rootDir>/packages/components/button/jest.config.js',
    '<rootDir>/packages/core/core/jest.config.js',
    '<rootDir>/packages/tailwind-composer/jest.config.js',
  ],
  collectCoverageFrom: [
    '**/src/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/build/**',
    '!**/coverage/**',
    '!**/__tests__/**',
  ],
};

module.exports = projectConfig;
