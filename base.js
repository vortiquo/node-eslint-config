import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import onlyWarn from 'eslint-plugin-only-warn';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import turboPlugin from 'eslint-plugin-turbo';

/**
 * Base ESLint configuration for all projects.
 * This config provides JavaScript rules and general best practices.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const base = [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    name: 'vortiquo/base',
    plugins: {
      turbo: turboPlugin,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      onlyWarn,
    },
    rules: {
      // Turbo
      'turbo/no-undeclared-env-vars': 'warn',

      // Best practices
      curly: 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Style
      'prefer-const': 'error',
      'prefer-template': 'error',
      'object-shorthand': 'error',
      'no-var': 'error',

      // Import sorting (auto-fixable, great DX)
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // Import rules
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-mutable-exports': 'error',
    },
  },
  {
    name: 'vortiquo/base/ignores',
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/coverage/**',
      '**/.turbo/**',
      '**/public/**',
    ],
  },
];

export default base;
