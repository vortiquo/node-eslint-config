import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

import { base } from '../base/index.js';
import { baseTs } from '../ts/index.js';

/** @type {import("eslint").Linter.Config[]} */
export const react = [
  ...base,
  ...baseTs,

  {
    name: '@vortiquo/react',
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
      // React recommended + JSX runtime (React 17+)
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,

      // React Hooks recommended (ya incluye rules-of-hooks + exhaustive-deps)
      ...reactHooksPlugin.configs.recommended.rules,

      // Preferencias (opinionadas pero OK)
      'react/prop-types': 'off',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
      'react/self-closing-comp': 'error',

      // Esta es MUY opinionada; si no quieren ruido, muévanla a reactStrict
      'react/jsx-sort-props': [
        'warn',
        { callbacksLast: true, shorthandFirst: true, reservedFirst: true },
      ],

      // TS suele encargarse mejor de types de props / defaults
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',

      // En React components normalmente no quieres forzar return type
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
];

export default react;
