# Implementation Plan: Port 0.3.x Codebase to 1.x Scaffold

**Branch**: `001-port-0-3-x-codebase` | **Date**: 2026-02-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-port-0-3-x-codebase/spec.md`

## Summary

Port the existing react-native-fontawesome 0.3.x component to the new 1.x scaffold created with react-native-builder-bob. The port involves converting JavaScript source files to TypeScript (with relaxed strict mode initially), adapting the Jest test setup to work with the new build system, and ensuring all existing tests pass. The public API must remain unchanged.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode deferred), JavaScript ES2021 for source port
**Primary Dependencies**: react-native-svg (^12.x+), @fortawesome/fontawesome-svg-core (~1 || ~6), humps (^2.0.1), react (^17 || ^18 || ^19), react-native (>=0.67)
**Storage**: N/A
**Testing**: Jest with react-test-renderer
**Target Platform**: iOS and Android via React Native
**Project Type**: React Native library (single package)
**Performance Goals**: Equivalent to 0.3.x (no performance requirements for port)
**Constraints**: Must maintain API compatibility with 0.3.x
**Scale/Scope**: ~400 lines of source code, ~400 lines of tests

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Test-First Development | ⚠️ MODIFIED | Existing tests from 0.3.x will be ported first, then verified to fail before source is ported. This satisfies TDD spirit for a port scenario. |
| II. React Native Compatibility | ✅ PASS | Targeting current RN ecosystem via builder-bob scaffold |
| III. Font Awesome Feature Parity | ✅ PASS | Port maintains all existing 0.3.x features |
| IV. TypeScript Strictness | ⚠️ DEFERRED | Per spec, strict mode compliance deferred to future iteration. Initial port uses `.tsx` files but may use `any` types temporarily. |
| V. Simplicity | ✅ PASS | Direct port with no new abstractions |

**Gate Decision**: PROCEED - TypeScript strictness explicitly deferred in feature spec (Out of Scope section). TDD principle satisfied by porting tests first.

## Project Structure

### Documentation (this feature)

```text
specs/001-port-0-3-x-codebase/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── index.tsx                    # Main export (FontAwesomeIcon)
├── FontAwesomeIcon.tsx          # Main component (port from 0.3.x)
├── converter.ts                 # SVG converter (port from 0.3.x)
├── logger.ts                    # Error logger (port from 0.3.x)
├── __tests__/
│   ├── FontAwesomeIcon.test.tsx # Tests (port from 0.3.x)
│   ├── __fixtures__/
│   │   └── helpers.ts           # Test helpers (port from 0.3.x)
│   └── __snapshots__/
│       └── FontAwesomeIcon.test.tsx.snap  # Snapshots (port from 0.3.x)
```

**Structure Decision**: Using the react-native-builder-bob scaffold structure with flat `src/` directory. The 0.3.x nested `src/components/` structure is flattened since there's only one component. Tests remain co-located under `src/__tests__/`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| TypeScript strict mode disabled | Enables incremental port; strict mode is a separate feature | Strict mode first would require complete type definitions before any functional testing |

## Migration Strategy

### Files to Port

| Source (0.3.x) | Target (1.x) | Changes Required |
|----------------|--------------|------------------|
| `src/components/FontAwesomeIcon.js` | `src/FontAwesomeIcon.tsx` | Convert to TSX, add basic types |
| `src/converter.js` | `src/converter.ts` | Convert to TS |
| `src/logger.js` | `src/logger.ts` | Convert to TS |
| `src/components/__tests__/FontAwesomeIcon.test.js` | `src/__tests__/FontAwesomeIcon.test.tsx` | Update imports |
| `src/components/__fixtures__/helpers.js` | `src/__tests__/__fixtures__/helpers.ts` | Convert to TS |
| `src/components/__tests__/__snapshots__/*.snap` | `src/__tests__/__snapshots__/*.snap` | Copy directly |
| `index.d.ts` | `src/types.ts` (integrated) | Merge into component file |

### Dependencies to Add

| Package | Version | Purpose |
|---------|---------|---------|
| `humps` | ^2.0.1 | camelCase conversion for SVG attributes |
| `@fortawesome/fontawesome-svg-core` | ~1 \|\| ~6 | Peer dependency for icon resolution |
| `react-native-svg` | >=11.x | Peer dependency for SVG rendering |
| `lodash` | (dev only) | Test utility for `get()` |

### Dependencies to Remove

| Package | Reason |
|---------|--------|
| `prop-types` | TypeScript provides type checking |

### Build System Changes

The 0.3.x version uses a custom Babel build to `dist/`. The 1.x scaffold uses react-native-builder-bob which:
- Builds to `lib/` directory
- Generates TypeScript declarations automatically
- Supports ESM modules
- Handles React Native compatibility

No changes to builder-bob config needed for the port.

## Post-Design Constitution Re-Check

*Re-evaluated after Phase 1 design completion.*

| Principle | Status | Post-Design Notes |
|-----------|--------|-------------------|
| I. Test-First Development | ✅ PASS | Design confirms tests ported before source. Quickstart documents TDD workflow. |
| II. React Native Compatibility | ✅ PASS | Data model and dependencies align with current RN ecosystem |
| III. Font Awesome Feature Parity | ✅ PASS | All 0.3.x features documented in data model |
| IV. TypeScript Strictness | ⚠️ DEFERRED | Acknowledged in Complexity Tracking table |
| V. Simplicity | ✅ PASS | Flat structure chosen, minimal dependencies |

**Final Gate Decision**: PROCEED to task generation (`/speckit.tasks`)

## Phase Summary

### Phase 0: Research ✅ Complete
- **Output**: [research.md](./research.md)
- **Decisions**: npm, mise, relaxed TypeScript, Jest, flat structure

### Phase 1: Design ✅ Complete
- **Output**: [data-model.md](./data-model.md), [quickstart.md](./quickstart.md)
- **Agent Context**: CLAUDE.md updated

### Phase 2: Tasks (Next)
- **Command**: `/speckit.tasks`
- **Output**: tasks.md (to be generated)
