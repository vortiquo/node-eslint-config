# ESLint Config Test Suite

This directory contains comprehensive tests for all `@vortiquo/eslint-config`
configurations to ensure they work correctly across different file types and
scenarios.

## Test Structure

### Fixtures (`tests/fixtures/`)

Sample files used for testing different scenarios:

- `javascript.js` - Basic JavaScript file with common patterns
- `typescript.ts` - TypeScript file with type annotations
- `react.tsx` - React component with hooks and JSX
- `node-server.ts` - Node.js server code with async patterns

### Config Files (`tests/configs/`)

Generated ESM files that export each configuration for testing.

### Test Script (`tests/test-configs.js`)

Comprehensive test runner that validates:

- ✅ **Plugin Resolution**: No "could not find plugin" errors
- ✅ **Rule Scoping**: TypeScript rules don't apply to JavaScript files
- ✅ **Expected Behavior**: Configurations produce expected lint results
- ✅ **Cross-Compatibility**: JavaScript configs work on TypeScript files (with
  limited rules)

## Test Scenarios

The test suite covers these scenarios:

| Config           | File Type  | Expected Result                                       |
| ---------------- | ---------- | ----------------------------------------------------- |
| `base`           | JavaScript | Warns about unused variables                          |
| `baseTypescript` | TypeScript | Enforces return types and strict rules                |
| `baseTypescript` | JavaScript | Applies only JavaScript rules (no TS errors)          |
| `nodeLibraryJs`  | JavaScript | Enforces no-console for libraries                     |
| `reactLibraryJs` | TSX        | Works with limited rules (no TS-specific enforcement) |
| `nodeLibrary`    | JavaScript | Works without TypeScript rules                        |
| `nodeLibrary`    | TypeScript | Enforces strict library rules                         |
| `server`         | TypeScript | Strict async handling, explicit returns               |
| `server`         | JavaScript | Allows console, applies JS rules                      |
| `react`          | TSX        | React-specific rules and hooks                        |
| `reactLibrary`   | TSX        | Strict React library rules                            |
| `nextjs`         | TSX        | Next.js specific rules                                |
| `nestjs`         | TypeScript | NestJS-specific overrides                             |

## Running Tests

```bash
# Run all tests (validation + config tests)
npm test

# Run only config tests
npm run test:configs

# Run validation only
node scripts/validate-configs.js
```

## CI/CD Integration

Tests run automatically in CI via the `test` script, which includes:

1. Configuration validation
2. Plugin and export checks
3. Comprehensive linting tests

This ensures that configuration changes don't break existing setups and catch
plugin resolution issues before they reach users.

## Adding New Tests

To add a new test scenario:

1. Add a new fixture file to `tests/fixtures/`
2. Update the `testScenarios` array in `tests/test-configs.js`
3. Ensure the expected exit code matches your lint expectations

The test framework will automatically handle config file generation and test
execution.
