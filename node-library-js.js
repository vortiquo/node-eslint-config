import globals from 'globals';
import { base } from './base.js';

/**
 * ESLint configuration for JavaScript Node.js libraries/packages.
 * For projects without TypeScript - extends base config only.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const nodeLibraryJs = [
  ...base,
  {
    name: 'vortiquo/node-library-js',
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
];

export default nodeLibraryJs;
