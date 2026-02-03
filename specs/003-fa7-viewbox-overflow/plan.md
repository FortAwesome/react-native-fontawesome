# Implementation Plan: Font Awesome 7 ViewBox Overflow Fix

**Branch**: `003-fa7-viewbox-overflow` | **Date**: 2026-02-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-fa7-viewbox-overflow/spec.md`

## Summary

Fix GitHub issue #180 where Font Awesome 7 icons that overflow their standard viewBox (e.g., paperclip) get clipped in React Native. The solution modifies the viewBox after icon AST conversion by subtracting 32 from min-y and adding 64 to height. Additionally, update peerDependencies to FA7-only and enhance the example app to demonstrate the fix.

## Technical Context

**Language/Version**: TypeScript 5.9.2 with `strict: true`
**Primary Dependencies**: react-native-svg (^15.x), @fortawesome/fontawesome-svg-core (~7), humps (^2.0.1), React 19, React Native 0.81.x
**Storage**: N/A
**Testing**: Jest with react-test-renderer
**Target Platform**: iOS and Android via React Native + Expo for example app
**Project Type**: Single React Native library with example app
**Performance Goals**: Icon rendering must remain performant; viewBox modification is a simple string operation
**Constraints**: Must not break existing icons that fit within their viewBox
**Scale/Scope**: Single component library (~300 LOC in main component)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Status | Notes |
|-----------|-------------|--------|-------|
| I. Test-First Development | Tests MUST be written before implementation | ✅ WILL COMPLY | ViewBox modification tests will be written first |
| II. React Native Compatibility | Support latest stable RN | ✅ COMPLIANT | Using RN 0.81.x, react-native-svg 15.x |
| III. Font Awesome Feature Parity | Maintain parity with official implementations | ✅ COMPLIANT | This fix addresses a RN-specific limitation |
| IV. TypeScript Strictness | `strict: true`, explicit types | ✅ COMPLIANT | Already enabled in tsconfig.json |
| V. Simplicity | Minimal abstractions, focused changes | ✅ WILL COMPLY | Simple viewBox string modification |

**Gate Status**: ✅ PASSED - All principles satisfied or will be satisfied by implementation approach.

## Project Structure

### Documentation (this feature)

```text
specs/003-fa7-viewbox-overflow/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (minimal for this feature)
├── quickstart.md        # Phase 1 output
├── contracts/           # N/A - no API contracts needed
├── checklists/          # Quality validation
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (via /speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── FontAwesomeIcon.tsx  # Main component - viewBox modification here
├── converter.ts         # AST to React Native SVG converter
├── logger.ts            # Logging utility
├── index.tsx            # Public exports
└── __tests__/
    ├── FontAwesomeIcon.test.tsx  # Add viewBox tests
    └── __fixtures__/
        └── helpers.ts

example/
├── src/
│   ├── App.tsx          # Add overflow icon demonstration
│   ├── iconFactory.ts   # May add overflow icons to rotation
│   └── ...
└── package.json
```

**Structure Decision**: Single library project with nested example app. No structural changes needed; all modifications fit within existing architecture.

## Complexity Tracking

> No violations - all changes are straightforward and follow existing patterns.

| Aspect | Complexity | Justification |
|--------|------------|---------------|
| ViewBox Modification | Low | Simple string parsing and reassembly |
| Test Updates | Low | Follows existing test patterns |
| Example App Updates | Low | Add icons to existing grid |
| Dependency Update | Low | Change version constraint string |

## Constitution Check (Post-Design)

*Re-evaluated after Phase 1 design completion.*

| Principle | Status | Design Validation |
|-----------|--------|-------------------|
| I. Test-First Development | ✅ READY | TDD approach documented in quickstart.md; tests defined before implementation |
| II. React Native Compatibility | ✅ VERIFIED | Design uses standard react-native-svg viewBox handling |
| III. Font Awesome Feature Parity | ✅ VERIFIED | Addresses RN-specific limitation; no FA feature divergence |
| IV. TypeScript Strictness | ✅ VERIFIED | All new code will use explicit types, expandViewBox function typed |
| V. Simplicity | ✅ VERIFIED | Single pure function, no new abstractions, ~10 lines of new code |

**Post-Design Gate Status**: ✅ PASSED - Design validated against all constitution principles.

## Generated Artifacts

| Artifact | Path | Status |
|----------|------|--------|
| Feature Spec | `specs/003-fa7-viewbox-overflow/spec.md` | ✅ Complete |
| Implementation Plan | `specs/003-fa7-viewbox-overflow/plan.md` | ✅ Complete |
| Research | `specs/003-fa7-viewbox-overflow/research.md` | ✅ Complete |
| Data Model | `specs/003-fa7-viewbox-overflow/data-model.md` | ✅ Complete |
| Quickstart | `specs/003-fa7-viewbox-overflow/quickstart.md` | ✅ Complete |
| Requirements Checklist | `specs/003-fa7-viewbox-overflow/checklists/requirements.md` | ✅ Complete |
| Tasks | `specs/003-fa7-viewbox-overflow/tasks.md` | ⏳ Pending (`/speckit.tasks`) |

## Next Steps

Run `/speckit.tasks` to generate the implementation task list based on this plan.
