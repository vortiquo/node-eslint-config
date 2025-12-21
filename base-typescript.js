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

  // Global TypeScript plugin registration (plugins must be defined globally)
  {
    name: 'vortiquo/typescript-plugins',
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
  },

  // Allow relative imports in config files (only applies to TS files since
  // no-restricted-imports is only defined in base-typescript)
  {
    name: 'vortiquo/typescript/config-files',
    files: ['**/*.config.ts', '**/*.config.mts', '**/*.config.cts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: false, // Config files don't need full project analysis
      },
    },
    rules: {
      // Inherit base config file rules
      'import/no-default-export': 'off',
      'no-console': 'off',
      // TypeScript-specific overrides
      'no-restricted-imports': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },

  // TypeScript parser and language options (scoped to TS files, excluding config files)
  {
    name: 'vortiquo/typescript-parser',
    files: TS_FILES,
    ignores: ['**/*.config.ts', '**/*.config.mts', '**/*.config.cts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
    },
  },

  // Apply type-checked rules ONLY to TypeScript files
  // Apply strict type-checked rules to TS files
  ...tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: TS_FILES,
  })),
  // Apply stylistic type-checked rules to TS files
  ...tseslint.configs.stylisticTypeChecked.map((config) => ({
    ...config,
    files: TS_FILES,
  })),

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
];

export default baseTypescript;
