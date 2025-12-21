import { react } from './index.js';

/** @type {import("eslint").Linter.Config[]} */
export const reactStrict = [
  ...react,
  {
    name: '@vortiquo/react:strict',
    files: ['**/*.{jsx,tsx}'],
    rules: {
      'react-hooks/exhaustive-deps': 'error',
    },
  },
];

export default reactStrict;
