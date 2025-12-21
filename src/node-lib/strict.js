import { TS_FILES } from '../ts/index.js';
import { tsStrictTypeAware } from '../ts/strict.js';
import { nodeLib } from './index.js';

/** @type {import("eslint").Linter.Config[]} */
export const nodeLibStrict = [
  ...nodeLib,
  ...tsStrictTypeAware,

  {
    name: '@vortiquo/node-lib:strict',
    files: TS_FILES,
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/await-thenable': 'error',

      '@typescript-eslint/no-unnecessary-condition': 'error',
    },
  },
];

export default nodeLibStrict;
