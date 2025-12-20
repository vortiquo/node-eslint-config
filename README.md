# @vortiquo/eslint-config

[![npm version](https://img.shields.io/npm/v/@vortiquo/eslint-config.svg)](https://www.npmjs.com/package/@vortiquo/eslint-config)
[![license](https://img.shields.io/npm/l/@vortiquo/eslint-config.svg)](https://github.com/vortiquo/configs/blob/main/LICENSE)

Modern ESLint v9 flat configurations with TypeScript, React, and Node.js
support.

## Features

- ⚡ **ESLint v9** - Modern flat config format
- 🔒 **Strict TypeScript** - Uses `strictTypeChecked` preset
- 📦 **Ready-to-use presets** - Next.js, React, Node.js, NestJS
- 🎨 **Prettier compatible** - No formatting conflicts
- 📝 **Import sorting** - Auto-fixable with `simple-import-sort`
- 🏎️ **Turbo support** - Monorepo cache awareness

## Installation

```bash
npm install -D @vortiquo/eslint-config eslint typescript
# or
pnpm add -D @vortiquo/eslint-config eslint typescript
# or
yarn add -D @vortiquo/eslint-config eslint typescript
```

## Available Configs

| Config          | Use Case                              |
| --------------- | ------------------------------------- |
| `nextjs`        | Next.js applications                  |
| `server`        | Backend APIs (Fastify, Express, Hono) |
| `nestjs`        | NestJS applications                   |
| `react`         | React applications                    |
| `react-library` | React/UI component libraries          |
| `node-library`  | Shared Node.js packages               |

## Usage

Create an `eslint.config.js` in your project:

### Next.js

```js
import { nextjs } from '@vortiquo/eslint-config/nextjs';

export default [
  ...nextjs,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
];
```

### Backend API (Fastify/Express/Hono)

```js
import { server } from '@vortiquo/eslint-config/server';

export default [
  ...server,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
];
```

### NestJS

```js
import { nestjs } from '@vortiquo/eslint-config/nestjs';

export default [
  ...nestjs,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
];
```

### React Component Library

```js
import { reactLibrary } from '@vortiquo/eslint-config/react-library';

export default [
  ...reactLibrary,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
];
```

### Node.js Library

```js
import { nodeLibrary } from '@vortiquo/eslint-config/node-library';

export default [
  ...nodeLibrary,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
];
```

## Extending Configs

All configs are arrays that can be spread and extended:

```js
import { nextjs } from '@vortiquo/eslint-config/nextjs';

export default [
  ...nextjs,
  {
    rules: {
      'no-console': 'off',
    },
  },
  {
    ignores: ['generated/**'],
  },
];
```

## What's Included

### Base Rules

- Prettier integration (formatting handled by Prettier)
- Turbo plugin (monorepo cache awareness)
- Import sorting (auto-fixable)
- Best practices (curly, eqeqeq, prefer-const)

### TypeScript Rules

- Strict type checking (`strictTypeChecked`)
- Consistent type imports/exports
- No explicit `any`
- Promise handling (`no-floating-promises`)

### React Rules

- React recommended + JSX runtime
- React Hooks rules
- Self-closing components
- Prop sorting

### Next.js Rules

- Core Web Vitals
- Image optimization
- App Router support

## Config Hierarchy

```
base (JS rules, Prettier, Turbo)
└── base-typescript (TS strict rules)
    ├── react (React + Hooks)
    │   ├── react-library (stricter)
    │   └── nextjs (Next.js specific)
    ├── server (Node.js APIs)
    │   └── nestjs (decorators)
    └── node-library (Node.js packages)
```

## License

MIT © [Vortiquo](https://vortiquo.com)
