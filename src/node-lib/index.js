import globals from 'globals';

import { base } from '../base/index.js';
import { baseTs, TS_FILES } from '../ts/index.js';

/** @type {import("eslint").Linter.Config[]} */
export const nodeLib = [
  ...base,
  ...baseTs,

  {
    name: '@vortiquo/node-lib:node-env',
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'error',
      'import/no-mutable-exports': 'error',
    },
  },

  {
    name: '@vortiquo/node-lib:scripts',
    files: ['**/scripts/**/*.{js,cjs,mjs}'],
    rules: {
      'no-console': 'off',
    },
  },

  {
    name: '@vortiquo/node-lib:ts',
    files: TS_FILES,
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'error',
    },
  },
];

export default nodeLib;
