import globals from 'globals';

import { base } from '../base/index.js';

/** @type {import("eslint").Linter.Config[]} */
export const nodeLibJs = [
  ...base,

  {
    name: '@vortiquo/node-lib-js:files',
    files: ['**/*.{js,cjs,mjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // Librería: idealmente sin logs
      'no-console': 'error',
    },
  },

  // Permite console en scripts/ tooling
  {
    name: '@vortiquo/node-lib-js:scripts',
    files: ['**/scripts/**/*.{js,cjs,mjs}'],
    rules: {
      'no-console': 'off',
    },
  },

  // Si la lib usa CJS en algunos archivos
  {
    name: '@vortiquo/node-lib-js:cjs',
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
];

export default nodeLibJs;
