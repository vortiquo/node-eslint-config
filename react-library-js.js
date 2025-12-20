import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import { base } from './base.js';

/**
 * ESLint configuration for JavaScript React libraries/components.
 * For projects without TypeScript - extends base config only.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const reactLibraryJs = [
  ...base,
  {
    name: 'vortiquo/react-library-js',
    files: ['**/*.{js,jsx,mjs,cjs}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React recommended
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,

      // React Hooks
      ...reactHooksPlugin.configs.recommended.rules,

      // React preferences
      'react/prop-types': 'off',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
      'react/self-closing-comp': 'error',
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          reservedFirst: true,
        },
      ],

      // Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Not needed without TypeScript
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
    },
  },
  {
    name: 'vortiquo/react-library-js/config-files',
    files: ['**/*.config.{js,mjs,cjs}', '**/.*rc.{js,mjs,cjs}'],
    rules: {
      'import/no-default-export': 'off',
      'no-console': 'off',
    },
  },
];

export default reactLibraryJs;
