import { server } from './server.js';

/**
 * ESLint configuration for NestJS applications.
 * Extends server config with NestJS-specific rules.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const nestjs = [
  ...server,
  {
    name: 'vortiquo/nestjs',
    rules: {
      // NestJS uses classes extensively
      '@typescript-eslint/consistent-type-definitions': 'off',

      // NestJS uses empty constructors for DI
      '@typescript-eslint/no-empty-function': [
        'error',
        { allow: ['constructors'] },
      ],

      // NestJS decorators often require classes
      '@typescript-eslint/no-extraneous-class': 'off',

      // NestJS uses parameter properties
      '@typescript-eslint/parameter-properties': 'off',

      // Allow unused vars in decorators (common pattern)
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          args: 'after-used',
        },
      ],
    },
  },
];

export default nestjs;
