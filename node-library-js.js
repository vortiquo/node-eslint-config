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
  {
    name: 'vortiquo/node-library-js/config-files',
    files: ['**/*.config.{js,mjs,cjs}', '**/.*rc.{js,mjs,cjs}'],
    rules: {
      'import/no-default-export': 'off',
      'no-console': 'off',
    },
  },
];

export default nodeLibraryJs;
