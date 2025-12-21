import tseslint from 'typescript-eslint';
import { base } from './base.js';

/**
 * Base TypeScript ESLint configuration.
 * Extends base config with TypeScript-specific rules.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const baseTypescript = [
  ...base,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    name: 'vortiquo/typescript',
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      // Override base no-unused-vars with TypeScript version
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Type imports (enforces `import type` for types - better tree-shaking)
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/consistent-type-exports': [
        'error',
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],

      // Strictness - catch bugs early
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: false, classes: true, variables: true },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',

      // Preferences
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',

      // Relaxations (good DX without sacrificing safety)
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true, allowBoolean: true },
      ],
      // This one is too strict - TS already handles this well
      '@typescript-eslint/require-await': 'off',

      // Enforce absolute imports (use tsconfig paths instead of relative)
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['src/**/*', '../**/*'],
              message:
                'Usage of src/* and ../**/* imports is not allowed, use paths defined in tsconfig',
            },
          ],
        },
      ],
    },
  },
  // Disable type-aware linting for config files (typically not in tsconfig)
  {
    // Spread disableTypeChecked FIRST, then override with our settings
    ...tseslint.configs.disableTypeChecked,
    name: 'vortiquo/typescript/config-files',
    files: [
      '**/*.config.{js,ts,mjs,cjs}',
      '**/.*rc.{js,ts,mjs,cjs}',
      'eslint.config.*',
      '.lintstagedrc.*',
      'tsup.config.*',
      'vitest.config.*',
      'jest.config.*',
      'tailwind.config.*',
      'postcss.config.*',
      'next.config.*',
      'commitlint.config.*',
      'prettier.config.*',
    ],
    languageOptions: {
      parserOptions: {
        projectService: false,
      },
    },
    rules: {
      // Spread the disableTypeChecked rules first, then add our overrides
      ...tseslint.configs.disableTypeChecked.rules,
      // Relax strictness for config files
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // Config files require default exports
      'import/no-default-export': 'off',
      // Allow console in config files
      'no-console': 'off',
      // Allow relative imports in config files (they often need it)
      'no-restricted-imports': 'off',
    },
  },
];

export default baseTypescript;
