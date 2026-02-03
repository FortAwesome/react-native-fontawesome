# Quickstart: Enable Strict TypeScript Compliance

**Feature**: 002-strict-typescript
**Date**: 2026-02-03

## Overview

This feature enables full TypeScript strict mode compliance by:
1. Fixing the `any` return type in `converter.ts`
2. Adding ESLint enforcement of `no-explicit-any` rule

## Prerequisites

- Node.js (managed via mise)
- npm dependencies installed (`npm install`)

## Verification Commands

```bash
# Verify TypeScript strict mode passes
npm run typecheck

# Verify ESLint passes (after changes)
npm run lint

# Verify tests still pass
npm test

# Check for any remaining `any` types in source files
grep -rn ": any" src/*.ts src/*.tsx

# Run full quality check
npm test && npm run typecheck && npm run lint
```

## Files to Modify

### 1. `src/converter.ts`

Change the return type of the `convert` function:

```typescript
// Before
function convert(
  createElement: CreateElementFn,
  element: AbstractElement | string
): any {

// After
function convert(
  createElement: CreateElementFn,
  element: AbstractElement | string
): React.ReactNode {
```

Optionally improve `svgObjectMap` typing:

```typescript
// Before
const svgObjectMap: Record<string, unknown> = {

// After
const svgObjectMap = {
  svg: Svg,
  path: Path,
  rect: Rect,
  defs: Defs,
  mask: Mask,
  g: G,
  clipPath: ClipPath,
} as const satisfies Record<string, React.ComponentType<unknown>>;
```

### 2. `eslint.config.mjs`

Add TypeScript-specific rules to enforce no-explicit-any:

```javascript
// Add to the rules section
'@typescript-eslint/no-explicit-any': ['warn', {
  fixToUnknown: true,
  ignoreRestArgs: false,
}],
```

Configure to allow `any` in test files with a separate config block if needed.

## Success Criteria Checklist

- [x] `npm run typecheck` passes with zero errors
- [x] `grep -rn ": any" src/*.ts src/*.tsx` returns no matches (only justified usage with eslint-disable comment)
- [x] `npm run lint` passes
- [x] `npm test` passes (all existing tests)
- [x] ESLint will warn on new `any` usage in source files

## Rollback

If issues arise, simply revert the changes:

```bash
git checkout -- src/converter.ts eslint.config.mjs
```

No database migrations or state changes to revert.
