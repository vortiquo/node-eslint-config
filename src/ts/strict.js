import tseslint from 'typescript-eslint';

import { TS_FILES } from './index.js';

/** @type {import("eslint").Linter.Config[]} */
export const tsStrictTypeAware = [
  {
    name: '@vortiquo/ts:type-aware',
    files: TS_FILES,
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },

  ...tseslint.configs.strictTypeChecked.map((cfg) => ({
    ...cfg,
    name: cfg.name ? `@vortiquo/ts:strict/${cfg.name}` : '@vortiquo/ts:strict',
    files: TS_FILES,
  })),

  ...tseslint.configs.stylisticTypeChecked.map((cfg) => ({
    ...cfg,
    name: cfg.name
      ? `@vortiquo/ts:stylistic/${cfg.name}`
      : '@vortiquo/ts:stylistic',
    files: TS_FILES,
  })),

  {
    name: '@vortiquo/ts:strict-extras',
    files: TS_FILES,
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
    },
  },
];

export default tsStrictTypeAware;
