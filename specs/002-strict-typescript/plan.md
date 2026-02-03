# Implementation Plan: Enable Strict TypeScript Compliance

**Branch**: `002-strict-typescript` | **Date**: 2026-02-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-strict-typescript/spec.md`

## Summary

Enable full TypeScript strict mode compliance as mandated by the project constitution. The codebase already has `strict: true` enabled and passes type checking. The remaining work is to eliminate the single `any` return type in `converter.ts` and configure ESLint to enforce `@typescript-eslint/no-explicit-any` rule to prevent future regressions.

## Technical Context

**Language/Version**: TypeScript 5.9.2 with `strict: true` enabled
**Primary Dependencies**: react-native-svg (^15.x), @fortawesome/fontawesome-svg-core (~1 || ~6 || ~7), humps (^2.0.1), React 19, React Native 0.81.x
**Storage**: N/A
**Testing**: Jest 29 with react-test-renderer
**Target Platform**: React Native (iOS and Android)
**Project Type**: Single library package
**Performance Goals**: N/A (type-only changes, no runtime impact)
**Constraints**: Must not change runtime behavior; must maintain existing test coverage
**Scale/Scope**: 4 source files (~250 lines of TypeScript)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Test-First Development | PASS | Existing tests verify behavior; type improvements won't require new tests as they're compile-time only |
| II. React Native Compatibility | PASS | No runtime changes affect compatibility |
| III. Font Awesome Feature Parity | PASS | No API changes |
| IV. TypeScript Strictness | IN PROGRESS | This feature directly addresses this principle |
| V. Simplicity | PASS | Minimal changes: fix one `any` type, add one ESLint rule |

**Gate Status**: PASS - No violations. Proceeding to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/002-strict-typescript/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # N/A (no data model changes)
├── quickstart.md        # Phase 1 output
├── contracts/           # N/A (no API changes)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── FontAwesomeIcon.tsx  # Main component (already well-typed)
├── converter.ts         # SVG converter (contains `any` return type to fix)
├── logger.ts            # Logger utility (already typed)
└── index.tsx            # Public exports (already typed)

tests/                   # Existing tests (no changes needed)

eslint.config.mjs        # ESLint config (add @typescript-eslint/no-explicit-any rule)
```

**Structure Decision**: Single library package structure. Only `converter.ts` and `eslint.config.mjs` require modifications.

## Complexity Tracking

No violations requiring justification. The changes are minimal and focused.

## Current State Analysis

### Files with Type Issues

1. **`src/converter.ts:25`** - `convert` function returns `any`
   - The function can return either a `string` (text nodes) or a React element
   - Proper return type: `React.ReactNode`

2. **`eslint.config.mjs`** - Missing `@typescript-eslint/no-explicit-any` rule
   - Need to add TypeScript ESLint plugin and configure the rule

### Existing Type Assertions

The codebase uses several type assertions (`as`) that are necessary for interfacing with external libraries:

- `element.attributes as Record<string, unknown>` - Required because FA's abstract element attributes are loosely typed
- `svgObjectMap[element.tag] as React.ComponentType` - Required to map string tags to component types
- `iconArg as FAIconDefinition` - Required after type narrowing
- `abstract[0] as AbstractElement` - Required because FA returns loosely typed abstract nodes

These assertions are acceptable per FR-005 as they handle external library interfaces where type narrowing is not possible.

### Test File Exceptions

- `src/__tests__/FontAwesomeIcon.test.tsx:333` uses `@ts-expect-error` for testing invalid props
- `src/__tests__/FontAwesomeIcon.test.tsx:336` uses `as any` for test output inspection
- `src/__tests__/FontAwesomeIcon.test.tsx:348` uses `as any` for mock inspection

These are acceptable per FR-006 for testing invalid input scenarios.

## Constitution Re-Check (Post Phase 1 Design)

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Test-First Development | PASS | No new runtime behavior to test; existing tests verify component works |
| II. React Native Compatibility | PASS | Design makes no runtime changes |
| III. Font Awesome Feature Parity | PASS | Design makes no API changes |
| IV. TypeScript Strictness | WILL PASS | Design directly achieves: `strict: true` verified, `any` eliminated, ESLint enforced |
| V. Simplicity | PASS | Design is minimal: 2 file changes, no new abstractions |

**Post-Design Gate Status**: PASS - Design aligns with all constitution principles.
