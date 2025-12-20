import { react } from './react.js';

/**
 * ESLint configuration for React component libraries.
 * Extends React config with library-specific rules.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const reactLibrary = [
  ...react,
  {
    name: 'vortiquo/react-library',
    rules: {
      // Libraries should be stricter about exports
      '@typescript-eslint/explicit-module-boundary-types': 'error',

      // No console in libraries
      'no-console': 'error',

      // Prefer named exports for tree-shaking
      'import/no-default-export': 'error',
    },
  },
  {
    name: 'vortiquo/react-library/config-files',
    files: ['**/*.config.{js,ts,mjs}', '**/tsup.config.ts'],
    rules: {
      'import/no-default-export': 'off',
      'no-console': 'off',
    },
  },
];

export default reactLibrary;
