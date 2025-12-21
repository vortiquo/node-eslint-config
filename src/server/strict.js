import { TS_FILES } from '../ts/index.js';
import { tsStrictTypeAware } from '../ts/strict.js';
import { server } from './index.js';

/** @type {import("eslint").Linter.Config[]} */
export const serverStrict = [
  ...server,
  ...tsStrictTypeAware,

  {
    name: '@vortiquo/server:strict-extras',
    files: TS_FILES,
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/await-thenable': 'error',
    },
  },
];

export default serverStrict;
