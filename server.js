import globals from 'globals';
import { baseTypescript } from './base-typescript.js';

/**
 * TypeScript file patterns - type-aware rules only apply to these
 */
const TS_FILES = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'];

/**
 * ESLint configuration for backend APIs (Fastify, Express, Hono).
 * Extends TypeScript config with Node.js-specific rules.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const server = [
  ...baseTypescript,
  {
    name: 'vortiquo/server',
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // Allow console in backend
      'no-console': 'off',

      // Backend-specific rules
      'no-process-exit': 'off',
    },
  },
  {
    name: 'vortiquo/server/typescript',
    files: TS_FILES,
    rules: {
      // Stricter for backend code
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',

      // Async handling
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/promise-function-async': 'error',
    },
  },
];

export default server;
