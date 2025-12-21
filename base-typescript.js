import tseslint from 'typescript-eslint';
import { base } from './base.js';

/**
 * TypeScript file patterns - type-aware rules only apply to these
 */
const TS_FILES = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'];

/**
 * Base TypeScript ESLint configuration.
 * Extends base config with TypeScript-specific rules.
 *
 * Type-aware rules are ONLY applied to TypeScript files (.ts, .tsx, .mts, .cts).
 * JavaScript files (including config files like eslint.config.js) are not affected.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const baseTypescript = [
  ...base,

  // Apply type-checked configs ONLY to TypeScript files
  // We need to filter out configs that don't have rules (plugin definitions)
  // and only add files restriction to configs that have rules
  ...tseslint.configs.strictTypeChecked.map((config) => {
    // If this config has rules, scope it to TS files only
    if (config.rules && Object.keys(config.rules).length > 0) {
      return { ...config, files: TS_FILES };
    }
    // Plugin/parser configs stay global but we add files to scope parsing
    if (config.languageOptions?.parser) {
      return { ...config, files: TS_FILES };
    }
    // Plugin registration stays global (no files restriction)
    return config;
  }),
  ...tseslint.configs.stylisticTypeChecked.map((config) => {
    if (config.rules && Object.keys(config.rules).length > 0) {
      return { ...config, files: TS_FILES };
    }
    if (config.languageOptions?.parser) {
      return { ...config, files: TS_FILES };
    }
    return config;
  }),

  // TypeScript-specific settings and rules (only for TS files)
  {
    name: 'vortiquo/typescript',
    files: TS_FILES,
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

  // Allow relative imports in config files (only applies to TS files since
  // no-restricted-imports is only defined in base-typescript)
  {
    name: 'vortiquo/typescript/config-files',
    files: ['**/*.config.ts', '**/*.config.mts', '**/*.config.cts'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
];

export default baseTypescript;
