import globals from 'globals';
import { baseTypescript } from './base-typescript.js';

/**
 * ESLint configuration for Node.js libraries/packages.
 * Extends TypeScript config for shared backend packages.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const nodeLibrary = [
  ...baseTypescript,
  {
    name: 'vortiquo/node-library',
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // Libraries should be strict
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',

      // No console in libraries (consumers should handle logging)
      'no-console': 'error',

      // Async handling
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/require-await': 'error',
    },
  },
  {
    name: 'vortiquo/node-library/config-files',
    files: ['**/*.config.{js,ts,mjs}', '**/tsup.config.ts'],
    rules: {
      'import/no-default-export': 'off',
      'no-console': 'off',
    },
  },
];

export default nodeLibrary;
