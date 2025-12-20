import nextPlugin from '@next/eslint-plugin-next';
import { react } from './react.js';

/**
 * ESLint configuration for Next.js applications.
 * Extends React config with Next.js-specific rules.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const nextjs = [
  ...react,
  {
    name: 'vortiquo/nextjs',
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      // Next.js specific
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'error',
    },
  },
  {
    name: 'vortiquo/nextjs/relaxations',
    files: [
      '**/app/**/page.tsx',
      '**/app/**/layout.tsx',
      '**/app/**/loading.tsx',
      '**/app/**/error.tsx',
      '**/app/**/not-found.tsx',
      '**/app/**/route.ts',
      '**/app/**/default.tsx',
      '**/app/**/template.tsx',
      '**/app/**/opengraph-image.tsx',
      '**/app/**/twitter-image.tsx',
      '**/app/**/sitemap.ts',
      '**/app/**/robots.ts',
      '**/middleware.ts',
      '**/*.config.{js,ts,mjs}',
    ],
    rules: {
      // Next.js requires default exports for these files
      'import/no-default-export': 'off',
    },
  },
];

export default nextjs;
