# Tasks: Enable Strict TypeScript Compliance

**Input**: Design documents from `/specs/002-strict-typescript/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, quickstart.md

**Tests**: No new test tasks required - this feature makes compile-time type improvements with no runtime behavior changes. Existing tests verify the component continues to function correctly.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below use the established project structure from plan.md

---

## Phase 1: Setup (Verification)

**Purpose**: Verify current state and establish baseline

- [x] T001 Verify `strict: true` is enabled in tsconfig.json
- [x] T002 Run `npm run typecheck` to confirm current baseline passes
- [x] T003 Run `npm test` to confirm existing tests pass

---

## Phase 2: Foundational (No blocking prerequisites)

**Purpose**: This feature has no foundational tasks that block user stories. The tsconfig already has `strict: true` enabled.

**✅ No blocking prerequisites - proceed directly to User Story implementation**

---

## Phase 3: User Story 1 - Type-Safe Component Usage (Priority: P1) 🎯 MVP

**Goal**: Ensure the FontAwesomeIcon component provides accurate type checking for all props

**Independent Test**: Run `npm run typecheck` - should pass with zero errors; attempt to pass incorrect prop types in test code and verify TypeScript catches them

### Implementation for User Story 1

- [x] T004 [US1] Verify Props interface in src/FontAwesomeIcon.tsx has explicit types for all props (icon, size, color, style, etc.)
- [x] T005 [US1] Verify FontAwesomeIconStyle type in src/FontAwesomeIcon.tsx is properly defined
- [x] T006 [US1] Verify all public exports in src/index.tsx have explicit type annotations
- [x] T007 [US1] Run `npm run typecheck` to confirm public API types are correct

**Checkpoint**: User Story 1 complete - public API is fully typed for consumers

---

## Phase 4: User Story 2 - Library Maintainers Have Confidence in Type Safety (Priority: P2)

**Goal**: All internal code passes strict TypeScript checks with no `any` types

**Independent Test**: Run `npm run typecheck` with zero errors; run `grep -rn ": any" src/*.ts src/*.tsx` and confirm no matches in source files

### Implementation for User Story 2

- [x] T008 [US2] Change `convert` function return type from `any` to `React.ReactNode` in src/converter.ts
- [x] T009 [US2] Improve `svgObjectMap` typing with justified inline disable comment in src/converter.ts
- [x] T010 [US2] Run `npm run typecheck` to verify changes compile correctly
- [x] T011 [US2] Run `npm test` to verify no runtime behavior changed
- [x] T012 [P] [US2] Add `@typescript-eslint/no-explicit-any` rule with `warn` severity in eslint.config.mjs
- [x] T013 [US2] Configure ESLint to allow `any` in test files (__tests__/**) in eslint.config.mjs
- [x] T014 [US2] Run `npm run lint` to verify ESLint configuration works

**Checkpoint**: User Story 2 complete - internal code has no `any` types and ESLint prevents regression

---

## Phase 5: User Story 3 - Correct Return Types from Internal Functions (Priority: P3)

**Goal**: Internal functions have explicit return types for safer refactoring

**Independent Test**: Code review to confirm all significant internal functions have explicit return type annotations

### Implementation for User Story 3

- [x] T015 [US3] Verify `convert` function has explicit return type `React.ReactNode` in src/converter.ts (completed in T008)
- [x] T016 [US3] Verify `objectWithKey` function has explicit return type in src/FontAwesomeIcon.tsx
- [x] T017 [US3] Verify `normalizeIconArgs` function has explicit return type in src/FontAwesomeIcon.tsx
- [x] T018 [US3] Verify `replaceCurrentColor` function has explicit return type `void` in src/FontAwesomeIcon.tsx
- [x] T019 [US3] Verify `replaceFill` function has explicit return type `void` in src/FontAwesomeIcon.tsx
- [x] T020 [US3] Verify `hasPropertySetToValue` function has explicit return type `boolean` in src/FontAwesomeIcon.tsx
- [x] T021 [US3] Verify `log` function has explicit return type `void` in src/logger.ts

**Checkpoint**: User Story 3 complete - all internal functions have explicit return types

---

## Phase 6: Polish & Validation

**Purpose**: Final validation and cleanup

- [x] T022 Run full validation: `npm test && npm run typecheck && npm run lint`
- [x] T023 Run `grep -rn ": any" src/*.ts src/*.tsx` to confirm zero matches (only justified usage with comment)
- [x] T024 Update spec.md status from "Draft" to "Complete" in specs/002-strict-typescript/spec.md
- [x] T025 Run quickstart.md validation checklist in specs/002-strict-typescript/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: N/A - no blocking prerequisites for this feature
- **User Stories (Phase 3-5)**: Can proceed immediately after Setup
  - User stories are interdependent in this feature (US2 builds on US1, US3 builds on US2)
  - Recommend sequential execution: US1 → US2 → US3
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Setup - Verification only, no code changes
- **User Story 2 (P2)**: Includes the core code changes (T008, T009, T012, T013)
- **User Story 3 (P3)**: Verification that return types are explicit (most already are)

### Within Each User Story

- T008 must complete before T009 (same file)
- T012 can run in parallel with T008-T011 (different file)
- T013 must complete after T012 (same file, depends on rule being added)

### Parallel Opportunities

- T012 [P] can run in parallel with T008-T011 (different files)
- All verification tasks (T004-T007, T015-T021) can run in parallel as they only read files

---

## Parallel Example: User Story 2

```bash
# These can run in parallel (different files):
# Group A - src/converter.ts changes:
Task T008: "Change convert function return type"
Task T009: "Improve svgObjectMap typing"

# Group B - eslint.config.mjs changes (parallel with Group A):
Task T012: "Add @typescript-eslint/no-explicit-any rule"
Task T013: "Configure ESLint to allow any in test files"
```

---

## Implementation Strategy

### MVP First (User Story 1 + User Story 2)

1. Complete Phase 1: Setup (verification)
2. Complete Phase 3: User Story 1 (public API verification)
3. Complete Phase 4: User Story 2 (eliminate `any`, add ESLint rule)
4. **STOP and VALIDATE**: Run full test suite + typecheck + lint
5. This achieves SC-001, SC-002, SC-004, SC-005 from success criteria

### Full Implementation

1. Complete Setup → Foundation ready (immediate)
2. Complete User Story 1 → Public API verified
3. Complete User Story 2 → Core changes complete, ESLint enforced
4. Complete User Story 3 → All return types verified
5. Complete Polish → Final validation

### Critical Path

The critical path for this feature is:

```
T001-T003 (Setup) → T008-T009 (converter.ts changes) → T010-T011 (verify) → T012-T014 (ESLint) → T022 (final validation)
```

Total: 8 tasks on critical path, ~6 parallelizable tasks

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Most verification tasks (US1, US3) are confirming existing code is correct
- Core changes are in US2: converter.ts and eslint.config.mjs
- No new tests required - existing tests verify runtime behavior unchanged
- Commit after T009 (converter changes) and T014 (ESLint changes) as logical groups
