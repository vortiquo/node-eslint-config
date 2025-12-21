#!/usr/bin/env node

/**
 * Validates all ESLint configurations before publishing.
 * Run with: node scripts/validate-configs.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

console.log('🔍 Validating @vortiquo/eslint-config...\n');

let hasErrors = false;

// 1. Check all config files exist
console.log('1️⃣  Checking config files exist...');
const configFiles = [
  'index.js',
  'base.js',
  'base-typescript.js',
  'react.js',
  'react-library.js',
  'react-library-js.js',
  'nextjs.js',
  'server.js',
  'nestjs.js',
  'node-library.js',
  'node-library-js.js',
];

for (const file of configFiles) {
  const exists = fs.existsSync(path.join(ROOT, file));
  if (!exists) {
    console.log(`   ❌ ${file} - MISSING`);
    hasErrors = true;
  } else {
    console.log(`   ✓ ${file}`);
  }
}

// 2. Import and validate all exports
console.log('\n2️⃣  Importing and validating exports...');
try {
  const indexModule = await import(path.join(ROOT, 'index.js'));
  const exports = Object.keys(indexModule);

  console.log(`   Found ${exports.length} exports: ${exports.join(', ')}`);

  for (const exportName of exports) {
    const config = indexModule[exportName];

    if (!Array.isArray(config)) {
      console.log(`   ❌ ${exportName} - Not an array!`);
      hasErrors = true;
      continue;
    }

    if (config.length === 0) {
      console.log(`   ❌ ${exportName} - Empty array!`);
      hasErrors = true;
      continue;
    }

    // Check each config object has valid structure
    for (let i = 0; i < config.length; i++) {
      const item = config[i];
      if (typeof item !== 'object' || item === null) {
        console.log(`   ❌ ${exportName}[${i}] - Not an object!`);
        hasErrors = true;
      }
    }

    console.log(`   ✓ ${exportName} - ${config.length} config(s)`);
  }
} catch (err) {
  console.log(`   ❌ Import failed: ${err.message}`);
  hasErrors = true;
}

// 3. Validate package.json exports match
console.log('\n3️⃣  Validating package.json...');
try {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')
  );

  // Check exports
  const pkgExports = Object.entries(pkg.exports || {});
  for (const [key, value] of pkgExports) {
    const filePath = value.replace('./', '');
    const exists = fs.existsSync(path.join(ROOT, filePath));
    if (!exists) {
      console.log(`   ❌ exports["${key}"] -> ${value} - File missing!`);
      hasErrors = true;
    } else {
      console.log(`   ✓ exports["${key}"] -> ${value}`);
    }
  }

  // Check files array
  console.log('\n4️⃣  Validating files array...');
  for (const file of pkg.files || []) {
    const exists = fs.existsSync(path.join(ROOT, file));
    if (!exists) {
      console.log(`   ❌ ${file} - File missing!`);
      hasErrors = true;
    } else {
      console.log(`   ✓ ${file}`);
    }
  }
} catch (err) {
  console.log(`   ❌ package.json error: ${err.message}`);
  hasErrors = true;
}

// 5. Check for common issues
console.log('\n5️⃣  Checking for common issues...');

// Check that dev files aren't in the files array
const pkg = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')
);
const devFiles = [
  '.releaserc.js',
  'commitlint.config.js',
  '.lintstagedrc.json',
];
for (const devFile of devFiles) {
  if ((pkg.files || []).includes(devFile)) {
    console.log(`   ❌ ${devFile} should not be in "files" array!`);
    hasErrors = true;
  }
}
console.log('   ✓ No dev files leaked to "files" array');

// Check peerDependencies
if (!pkg.peerDependencies?.eslint) {
  console.log('   ❌ Missing eslint in peerDependencies!');
  hasErrors = true;
} else {
  console.log('   ✓ eslint is in peerDependencies');
}

// Final result
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ VALIDATION FAILED - Fix issues before publishing!\n');
  process.exit(1);
} else {
  console.log('✅ ALL VALIDATIONS PASSED - Safe to publish!\n');
  process.exit(0);
}
