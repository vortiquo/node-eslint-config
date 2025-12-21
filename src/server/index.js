import globals from 'globals';

import { base } from '../base/index.js';
import { baseTs, TS_FILES } from '../ts/index.js';

/** @type {import("eslint").Linter.Config[]} */
export const server = [
  ...base,
  ...baseTs,

  {
    name: '@vortiquo/server:node-env',
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
      'no-process-exit': 'off',
    },
  },

  {
    name: '@vortiquo/server:ts-rules',
    files: TS_FILES,
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',

      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/promise-function-async': 'error',
    },
  },
];

export default server;
