import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import importXPlugin from 'eslint-plugin-import-x';
import jestDOMPlugin from 'eslint-plugin-jest-dom';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default defineConfig([
	eslint.configs.recommended,
	{
		ignores: [
			'node_modules/',
			'dist/',
			'build/',
			'stories/',
			'coverage/',
			'*.config.*',
		],
	},
	tseslint.configs.recommendedTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	importXPlugin.flatConfigs.typescript,
	eslintPluginUnicorn.configs.recommended,
	jestDOMPlugin.configs['flat/recommended'],
	{
		languageOptions: {
			parser: tseslint.parser,
			globals: {
				...globals.browser,
				...globals.node,
				...globals.builtin,
			},
		},
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
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
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
	eslintConfigPrettier,
]);
