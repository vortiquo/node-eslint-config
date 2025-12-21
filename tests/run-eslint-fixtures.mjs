import { spawnSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const FIXTURES_DIR = new URL('../fixtures', import.meta.url).pathname;

function listDirs(dir) {
  return readdirSync(dir)
    .map((name) => join(dir, name))
    .filter((p) => statSync(p).isDirectory());
}

const fixtureDirs = listDirs(FIXTURES_DIR);

if (fixtureDirs.length === 0) {
  console.error('No fixtures found in ./fixtures');
  process.exit(1);
}

let failed = 0;

for (const fixtureDir of fixtureDirs) {
  const name = fixtureDir.split('/').pop();

  console.log(`\n▶ Run ESLint fixture: ${name}`);

  // Use local eslint from node_modules via pnpm exec (or npx)
  const result = spawnSync(
    process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm',
    ['exec', 'eslint', '.', '--max-warnings=0'],
    {
      cwd: fixtureDir,
      stdio: 'inherit',
      env: process.env,
    }
  );

  if (result.status !== 0) {
    failed += 1;
  }
}

if (failed > 0) {
  console.error(`\n❌ ${failed} fixture(s) failed ESLint.`);
  process.exit(1);
}

console.log('\n✅ All ESLint fixtures passed.');
