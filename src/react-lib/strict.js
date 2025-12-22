import { TS_FILES } from '../ts/index.js';
import { tsStrictTypeAware } from '../ts/strict.js';
import { reactLib } from './index.js';

/** @type {import("eslint").Linter.Config[]} */
export const reactLibStrict = [
  ...reactLib,
  ...tsStrictTypeAware,

  {
    name: '@vortiquo/react-lib:strict',
    files: TS_FILES,
    rules: {
      // Promise safety (important even in UI libs)
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/await-thenable': 'error',

      // Catch subtle API bugs
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
];

export default reactLibStrict;
