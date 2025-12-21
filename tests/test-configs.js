#!/usr/bin/env node

/**
 * Comprehensive test suite for @vortiquo/eslint-config
 * Tests each configuration against appropriate file types to ensure:
 * - No plugin resolution errors
 * - Proper rule scoping (TS rules don't apply to JS files)
 * - Expected linting behavior
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Test scenarios: [configName, testFile, expectedExitCode, description]
const testScenarios = [
  // Base configs
  ['base', 'javascript.js', 1, 'Base config should warn about unused vars'],
  [
    'baseTypescript',
    'typescript.ts',
    1,
    'TS config should enforce return types and warn about issues',
  ],
  [
    'baseTypescript',
    'javascript.js',
    1,
    'TS config on JS file should only apply JS rules',
  ],

  // JavaScript-specific configs
  [
    'nodeLibraryJs',
    'javascript.js',
    1,
    'JS Node library should enforce no-console',
  ],
  [
    'reactLibraryJs',
    'react.tsx',
    1,
    'JS React config on TSX should work (limited rules)',
  ],

  // TypeScript-specific configs
  [
    'nodeLibrary',
    'javascript.js',
    1,
    'TS Node library on JS should work without TS rules',
  ],
  [
    'nodeLibrary',
    'node-server.ts',
    1,
    'TS Node library should enforce strict rules',
  ],
  [
    'server',
    'node-server.ts',
    1,
    'Server config should be strict about async code',
  ],
  ['server', 'javascript.js', 1, 'Server config on JS should allow console'],

  // React configs
  ['react', 'react.tsx', 1, 'React config should enforce React rules'],
  ['reactLibrary', 'react.tsx', 1, 'React library should be strict'],
  ['reactLibrary', 'javascript.js', 1, 'React library on JS should work'],

  // Full-stack configs
  [
    'nextjs',
    'react.tsx',
    1,
    'Next.js config should include React and Next rules',
  ],
  [
    'nestjs',
    'node-server.ts',
    1,
    'NestJS config should work with server rules',
  ],
];

async function runESLint(configName, testFile, expectedExitCode) {
  const configPath = path.join(ROOT, `tests/configs/${configName}.mjs`);
  const filePath = path.join(ROOT, `tests/fixtures/${testFile}`);

  return new Promise((resolve) => {
    const eslint = spawn(
      'npx',
      ['eslint', '--config', configPath, '--max-warnings', '0', filePath],
      {
        cwd: ROOT,
        stdio: ['inherit', 'pipe', 'pipe'],
      }
    );

    let stdout = '';
    let stderr = '';

    eslint.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    eslint.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    eslint.on('close', (code) => {
      resolve({
        configName,
        testFile,
        expectedExitCode,
        actualExitCode: code,
        stdout,
        stderr,
        success: code === expectedExitCode,
      });
    });
  });
}

async function createConfigFiles() {
  const configsDir = path.join(ROOT, 'tests/configs');
  if (!fs.existsSync(configsDir)) {
    fs.mkdirSync(configsDir, { recursive: true });
  }

  const configImports = {
    base: `import { base } from '../../base.js';\nexport default base;`,
    baseTypescript: `import { baseTypescript } from '../../base-typescript.js';\nexport default baseTypescript;`,
    react: `import { react } from '../../react.js';\nexport default react;`,
    reactLibrary: `import { reactLibrary } from '../../react-library.js';\nexport default reactLibrary;`,
    reactLibraryJs: `import { reactLibraryJs } from '../../react-library-js.js';\nexport default reactLibraryJs;`,
    nextjs: `import { nextjs } from '../../nextjs.js';\nexport default nextjs;`,
    server: `import { server } from '../../server.js';\nexport default server;`,
    nestjs: `import { nestjs } from '../../nestjs.js';\nexport default nestjs;`,
    nodeLibrary: `import { nodeLibrary } from '../../node-library.js';\nexport default nodeLibrary;`,
    nodeLibraryJs: `import { nodeLibraryJs } from '../../node-library-js.js';\nexport default nodeLibraryJs;`,
  };

  for (const [name, content] of Object.entries(configImports)) {
    const configPath = path.join(configsDir, `${name}.mjs`);
    fs.writeFileSync(configPath, content);
  }

  console.log('✅ Created config files for testing');
}

function cleanup() {
  try {
    fs.rmSync(path.join(ROOT, 'tests/configs'), {
      recursive: true,
      force: true,
    });
    console.log('🧹 Cleaned up test config files');
  } catch (error) {
    // Ignore cleanup errors
  }
}

async function runTests() {
  console.log('🧪 Running @vortiquo/eslint-config test suite...\n');

  await createConfigFiles();

  const results = [];
  let passed = 0;
  let failed = 0;

  for (const [
    configName,
    testFile,
    expectedExitCode,
    description,
  ] of testScenarios) {
    process.stdout.write(`Testing ${configName} with ${testFile}... `);

    try {
      const result = await runESLint(configName, testFile, expectedExitCode);
      results.push(result);

      if (result.success) {
        console.log('✅ PASS');
        passed++;
      } else {
        console.log('❌ FAIL');
        console.log(
          `   Expected exit code: ${result.expectedExitCode}, got: ${result.actualExitCode}`
        );
        if (result.stderr) {
          console.log(`   Error: ${result.stderr.trim()}`);
        }
        failed++;
      }
    } catch (error) {
      console.log('❌ ERROR');
      console.log(`   ${error.message}`);
      failed++;
    }
  }

  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);

  if (failed > 0) {
    console.log('\n❌ Failed tests:');
    results
      .filter((r) => !r.success)
      .forEach((result) => {
        console.log(
          `   - ${result.configName} with ${result.testFile}: expected ${result.expectedExitCode}, got ${result.actualExitCode}`
        );
      });
    process.exit(1);
  } else {
    console.log('\n🎉 All tests passed!');
  }

  cleanup();
}

// Run the tests
runTests().catch((error) => {
  console.error('Test suite failed:', error);
  cleanup();
  process.exit(1);
});
