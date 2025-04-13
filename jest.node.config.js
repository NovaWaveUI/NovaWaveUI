const baseConfig = require('./jest.base.config');

/** @type {import('jest').Config} */
const nodeConfig = {
  ...baseConfig,
  testEnvironment: 'node',
};

module.exports = nodeConfig;
