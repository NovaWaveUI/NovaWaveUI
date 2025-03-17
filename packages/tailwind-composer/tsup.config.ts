import { defineConfig } from 'tsup';

export default defineConfig({
    clean: true,
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    target: 'es2020',
    dts: true,
    treeshake: true,
    external: ['@types/node', 'node:fs', 'node:path'],
});