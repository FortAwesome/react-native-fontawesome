# Quickstart: Port 0.3.x Codebase to 1.x Scaffold

**Date**: 2026-02-02
**Feature**: 001-port-0-3-x-codebase

## Prerequisites

- Node.js 18+ (managed via mise)
- npm 9+
- Access to the 0.3.x codebase at `../react-native-fontawesome-0.3.x`

## Setup

### 1. Install mise (if not already installed)

```bash
# macOS
brew install mise

# Or via curl
curl https://mise.run | sh
```

### 2. Configure Node version

```bash
# From the repo root
mise install
```

### 3. Convert from yarn to npm

```bash
# Remove yarn artifacts
rm -f yarn.lock .yarnrc.yml

# Remove packageManager from package.json (done via edit)

# Install dependencies with npm
npm install
```

### 4. Install additional dependencies

```bash
# Runtime dependencies
npm install humps

# Dev dependencies for tests
npm install -D lodash @types/lodash @types/humps

# Peer dependencies (for development)
npm install -D @fortawesome/fontawesome-svg-core react-native-svg
```

## Development Workflow

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- FontAwesomeIcon.test.tsx

# Update snapshots
npm test -- -u
```

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

### Building

```bash
npm run prepare
```

This builds the library to `lib/` using react-native-builder-bob.

## Porting Steps Summary

1. **Setup environment** (mise, npm)
2. **Port tests first** (TDD compliance)
   - Copy test files from 0.3.x
   - Update imports for new structure
   - Verify tests fail (no implementation yet)
3. **Port source files**
   - converter.ts
   - logger.ts
   - FontAwesomeIcon.tsx
   - Update index.tsx exports
4. **Run tests** - all should pass
5. **Verify build** - `npm run prepare` succeeds
6. **Type check** - `npm run typecheck` passes (with allowed relaxations)

## Verification Checklist

After completing the port:

- [ ] `npm test` - All tests pass
- [ ] `npm run typecheck` - No blocking errors
- [ ] `npm run lint` - No errors
- [ ] `npm run prepare` - Build succeeds
- [ ] Example app runs (if applicable)

## File Mapping Reference

| 0.3.x Path | 1.x Path |
|------------|----------|
| `src/components/FontAwesomeIcon.js` | `src/FontAwesomeIcon.tsx` |
| `src/converter.js` | `src/converter.ts` |
| `src/logger.js` | `src/logger.ts` |
| `src/components/__tests__/FontAwesomeIcon.test.js` | `src/__tests__/FontAwesomeIcon.test.tsx` |
| `src/components/__fixtures__/helpers.js` | `src/__tests__/__fixtures__/helpers.ts` |
| `src/components/__tests__/__snapshots__/*.snap` | `src/__tests__/__snapshots__/*.snap` |
| `index.d.ts` | (integrated into TypeScript source) |

## Troubleshooting

### Tests fail with "Cannot find module"

Ensure all dependencies are installed:
```bash
npm install
npm install -D @fortawesome/fontawesome-svg-core react-native-svg
```

### TypeScript errors about missing types

Install type definitions:
```bash
npm install -D @types/humps @types/lodash
```

### Snapshot mismatch

If snapshots differ due to react-native-svg version changes:
```bash
npm test -- -u
```

Review the diff carefully before accepting.

### Build fails

Ensure the source files compile:
```bash
npm run typecheck
```

Fix any TypeScript errors before building.
