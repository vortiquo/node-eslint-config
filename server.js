import globals from 'globals';
import { baseTypescript } from './base-typescript.js';

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
  {
    name: 'vortiquo/server/config-files',
    files: ['**/*.config.{js,ts,mjs}'],
    rules: {
      // Config files often use default exports
      'import/no-default-export': 'off',
    },
  },
];

export default server;
