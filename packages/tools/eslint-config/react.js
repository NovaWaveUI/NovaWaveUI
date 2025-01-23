import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';
import baseConfig from './base.js';

export default [
  ...baseConfig,
  {
    plugins: {
      ...baseConfig[0].plugins,
      reactPlugin,
    },
    languageOptions: {
      ...baseConfig[0].languageOptions,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...baseConfig[0].rules,
    },
  },
];
