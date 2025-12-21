import nextPlugin from '@next/eslint-plugin-next';

import { react } from '../react/index.js';

/** @type {import("eslint").Linter.Config[]} */
export const nextjs = [
  ...react,

  {
    name: '@vortiquo/nextjs',
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-img-element': 'error',
      '@next/next/no-html-link-for-pages': 'error',
    },
  },

  {
    name: '@vortiquo/nextjs:relax-default-export',
    files: [
      // App Router
      '**/app/**/page.{js,jsx,ts,tsx}',
      '**/app/**/layout.{js,jsx,ts,tsx}',
      '**/app/**/loading.{js,jsx,ts,tsx}',
      '**/app/**/error.{js,jsx,ts,tsx}',
      '**/app/**/not-found.{js,jsx,ts,tsx}',
      '**/app/**/route.{js,ts}',
      '**/app/**/default.{js,jsx,ts,tsx}',
      '**/app/**/template.{js,jsx,ts,tsx}',
      '**/app/**/opengraph-image.{js,jsx,ts,tsx}',
      '**/app/**/twitter-image.{js,jsx,ts,tsx}',
      '**/app/**/sitemap.{js,ts}',
      '**/app/**/robots.{js,ts}',
      // Pages Router
      '**/pages/**/*.{js,jsx,ts,tsx}',
      // Middleware
      '**/middleware.{js,ts}',
      // Config
      '**/*.config.{js,ts,mjs,cjs}',
    ],
    rules: {
      'import/no-default-export': 'off',
    },
  },
];

export default nextjs;
