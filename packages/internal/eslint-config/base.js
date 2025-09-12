/**
 * @fileoverview Base ESLint configuration for the project.
 * All other ESLint configurations should extend this configuration.
 * Since all packages are written in TypeScript, this configuration extends the recommended TypeScript configuration.
 * Each package will have its own ESLint file, but will extend from one of the configurations in this directory.
 *
 * @see https://eslint.org/docs/user-guide/configuring
 */
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import importXPlugin from 'eslint-plugin-import-x';
import jestDOMPlugin from 'eslint-plugin-jest-dom';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';
import vitest from '@vitest/eslint-plugin';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginUnicorn.configs['recommended'],
  importXPlugin.flatConfigs.recommended,
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'stories/',
      'coverage/',
      '*.config.*',
      '*.d.ts',
    ],
  },
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      reactPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    ...jestDOMPlugin.configs['flat/recommended'],
    ...vitest.configs['recommended'],
    files: [
      'src/**/*.ts',
      'src/**/*.tsx',
      '**/__tests__/**/*.ts',
      '**/__tests__/**/*.tsx',
      '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    rules: {
      /**
       * @justification This rule is allowed because it is sometimes necessary to use the `any` type.
       */
      '@typescript-eslint/no-explicit-any': 'off',
      /**
       * @justification This rule is allowed because it is sometimes necessary to have unused variables.
       * Example: Destructuring an object and only using a few properties.
       *
       * Variables that are intentionally unused should be prefixed with an underscore.
       * Example: `const { _id } = user;`
       */
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
      /**
       * @justification This is more of a personal preference rule disable.
       * Abbreviations can be used as long as the abbreviation is well-known and understood.
       */
      'unicorn/prevent-abbreviations': 'off',
      /**
       * @justification This rule will enforce the use of camelCase for filenames.
       * CamelCase is preferred most of the time. There are some exceptions, but this rule will enforce the most common case.
       */
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
            kebabCase: true,
          },
        },
      ],
      'import-x/no-unresolved': 'off',
      'import-x/named': 'off',
      'import-x/order': 'error',
    },
  },
  eslintPluginPrettier
);
