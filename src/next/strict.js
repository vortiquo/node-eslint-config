import { reactStrict } from '../react/strict.js';
import { tsStrictTypeAware } from '../ts/strict.js';
import { nextjs } from './index.js';

/** @type {import("eslint").Linter.Config[]} */
export const nextjsStrict = [...nextjs, ...reactStrict, ...tsStrictTypeAware];

export default nextjsStrict;
