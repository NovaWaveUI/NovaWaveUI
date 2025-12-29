import baseConfig from './base.js';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	{
		extends: [baseConfig],
	},
	reactHooks.configs.flat.recommended,
	reactPlugin.configs.flat.recommended,
	{
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	reactPlugin.configs.flat['jsx-runtime'],
]);
