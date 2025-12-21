import globals from 'globals';
import { baseTypescript } from './base-typescript.js';

/**
 * TypeScript file patterns - type-aware rules only apply to these
 */
const TS_FILES = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'];

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
      // No console in libraries (consumers should handle logging)
      'no-console': 'error',
    },
  },
  {
    name: 'vortiquo/node-library/typescript',
    files: TS_FILES,
    rules: {
      // Libraries should be strict
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',

      // Async handling
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/require-await': 'error',
    },
  },
];

export default nodeLibrary;
