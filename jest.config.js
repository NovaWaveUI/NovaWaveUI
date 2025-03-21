/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/packages/**/__tests__/**/*.test.ts',
    '<rootDir>/packages/**/__tests__/**/*.test.tsx',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  modulePaths: ['<rootDir>/packages/**/dist'],
  collectCoverageFrom: ['<rootDir>/packages/**/src/*.{ts,tsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  coverageReporters: ['json', 'text'],
  setupFilesAfterEnv: ['@testing-library/jest-dom', './tests/test-setup.ts'],
};

module.exports = config;
