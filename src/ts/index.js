import tseslint from 'typescript-eslint';

export const TS_FILES = ['**/*.{ts,tsx,mts,cts}'];

/** @type {import("eslint").Linter.Config[]} */
export const baseTs = [
  {
    name: '@vortiquo/ts:core',
    files: TS_FILES,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          minimumDescriptionLength: 5,
        },
      ],
    },
  },

  {
    name: '@vortiquo/ts:style',
    files: TS_FILES,
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },

  // Relax rules for config files
  {
    name: '@vortiquo/ts:config-files',
    files: ['**/*.config.{ts,mts,cts}', '**/.*rc.{ts,mts,cts}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
      'import/no-default-export': 'off',
    },
  },
];

export default baseTs;
