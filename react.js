import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import { baseTypescript } from './base-typescript.js';

/**
 * ESLint configuration for React projects (libraries, components).
 * Extends TypeScript config with React-specific rules.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const react = [
  ...baseTypescript,
  {
    name: 'vortiquo/react',
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

      // TypeScript handles these
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',

      // Allow explicit return types to be optional for React components
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
];

export default react;
