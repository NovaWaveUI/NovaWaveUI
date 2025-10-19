import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import baseConfig from './base.js';

export default [
  ...baseConfig,
  reactHooks.configs.flat.recommended,
  reactPlugin.configs.flat.recommended,
  {
    plugins: {
      ...baseConfig[0].plugins,
      react: reactPlugin,
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
  },
];
