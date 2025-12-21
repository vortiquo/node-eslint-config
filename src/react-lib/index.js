import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

import { base } from '../base/index.js';
import { baseTs, TS_FILES } from '../ts/index.js';

/** @type {import("eslint").Linter.Config[]} */
export const reactLib = [
  ...base,
  ...baseTs,

  {
    name: '@vortiquo/react-lib:react',
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // React core
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,

      // Hooks
      ...reactHooksPlugin.configs.recommended.rules,

      // Libraries should not log
      'no-console': 'error',

      // No prop-types in TS libs
      'react/prop-types': 'off',

      // Clean JSX
      'react/self-closing-comp': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],

      // Allow spreads (very common in component APIs)
      'react/jsx-props-no-spreading': 'off',

      // TS handles this better
      'react/require-default-props': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },

  // TypeScript-specific expectations for libs
  {
    name: '@vortiquo/react-lib:ts',
    files: TS_FILES,
    rules: {
      // Exported APIs should be explicit
      '@typescript-eslint/explicit-module-boundary-types': 'error',

      // Types should be clean and reusable
      '@typescript-eslint/consistent-type-exports': [
        'error',
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],
    },
  },
];

export default reactLib;
