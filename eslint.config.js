import globals from 'globals';

import { base } from './src/base/index.js';
import { baseTs } from './src/ts/index.js';

export default [
  ...base,
  ...baseTs,

  {
    name: '@vortiquo/repo:tests-node',
    files: [
      'tests/**/*.{js,mjs,cjs,ts}',
      'fixtures/**/*.{js,mjs,cjs,ts,tsx}',
      'scripts/**/*.{js,mjs,cjs,ts}',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },
  {
    name: '@vortiquo/repo:ignores',
    ignores: [
      '**/*.json',
      '**/*.jsonc',
      '**/*.json5',
      '.lintstagedrc.*',
      '.prettierrc.*',
      '.eslintrc.*',
    ],
  },
];
