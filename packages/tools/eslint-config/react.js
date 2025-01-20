import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';
import baseConfig from './base';

export default [
  ...baseConfig,
  {
    plugins: {
      reactPlugin,
    },
    languageOptions: {
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
  },
];
