# Tasks: Font Awesome 7 ViewBox Overflow Fix

**Input**: Design documents from `/specs/003-fa7-viewbox-overflow/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Tests**: Included per constitution principle I (Test-First Development - NON-NEGOTIABLE)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Project structure**: `src/` for library code, `example/` for demo app
- **Tests**: `src/__tests__/` following existing patterns

---

## Phase 1: Setup

**Purpose**: Verify environment and ensure dependencies are current

- [x] T001 Verify current branch is `003-fa7-viewbox-overflow` and working directory is clean
- [x] T002 Run `npm install` to ensure dependencies are installed
- [x] T003 Run `npm test` to verify all existing tests pass (baseline)
- [x] T004 Run `npm run typecheck` to verify TypeScript compilation succeeds (baseline)

---

## Phase 2: Foundational (FA7 Dependency Updates)

**Purpose**: Update dependencies to support Font Awesome 7 - MUST complete before user stories

**⚠️ CRITICAL**: User story implementation cannot properly validate without FA7 dependencies

- [x] T005 Update peerDependencies in package.json to `"@fortawesome/fontawesome-svg-core": "~7"` (remove ~1 and ~6)
- [x] T006 Update devDependencies in package.json: `@fortawesome/fontawesome-svg-core` to `^7.0.0`
- [x] T007 Update devDependencies in package.json: `@fortawesome/free-solid-svg-icons` to `^7.0.0`
- [x] T008 Run `npm install` to update node_modules with new dependencies
- [x] T009 Run `npm test` to verify existing tests still pass with FA7 dependencies

**Checkpoint**: Foundation ready - FA7 dependencies installed, existing tests pass

---

## Phase 3: User Story 1 - Icons Render Without Clipping (Priority: P1) 🎯 MVP

**Goal**: Implement viewBox expansion so FA7 overflow icons render completely without clipping

**Independent Test**: Render a known overflowing icon (e.g., paperclip) and verify all parts are visible

### Tests for User Story 1 (TDD - Write First, Must Fail) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T010 [P] [US1] Add test: viewBox expansion subtracts 32 from minY in src/__tests__/FontAwesomeIcon.test.tsx
- [x] T011 [P] [US1] Add test: viewBox expansion adds 64 to height in src/__tests__/FontAwesomeIcon.test.tsx
- [x] T012 [P] [US1] Add test: viewBox expansion preserves minX unchanged in src/__tests__/FontAwesomeIcon.test.tsx
- [x] T013 [P] [US1] Add test: viewBox expansion preserves width unchanged in src/__tests__/FontAwesomeIcon.test.tsx
- [x] T014 [P] [US1] Add test: viewBox expansion handles non-zero minY correctly in src/__tests__/FontAwesomeIcon.test.tsx
- [x] T015 [P] [US1] Add test: viewBox expansion handles invalid/missing viewBox gracefully in src/__tests__/FontAwesomeIcon.test.tsx
- [x] T016 [US1] Run `npm test` to confirm new tests FAIL (Red phase)

### Implementation for User Story 1

- [x] T017 [US1] Add `expandViewBox(viewBox: string): string` function in src/FontAwesomeIcon.tsx
- [x] T018 [US1] Integrate expandViewBox call after abstract element retrieval, before percentage replacement in src/FontAwesomeIcon.tsx
- [x] T019 [US1] Run `npm test` to confirm all tests PASS (Green phase)
- [x] T020 [US1] Run `npm run typecheck` to verify TypeScript compilation succeeds
- [x] T021 [US1] Run `npm run lint` to verify no linting errors
- [x] T022 [US1] Review expandViewBox for refactoring opportunities (Refactor phase) in src/FontAwesomeIcon.tsx

**Checkpoint**: User Story 1 complete - viewBox expansion implemented, all tests pass

---

## Phase 4: User Story 2 - Example App Demonstrates ViewBox Fix (Priority: P2)

**Goal**: Add overflow icon demonstration to example app for visual verification

**Independent Test**: Run example app and observe that overflow icons (paperclip) render completely

### Implementation for User Story 2

- [x] T023 [US2] Example app already displays overflow icons - no changes needed
- [x] T024 [US2] Example app icon rotation already includes all fas icons including paperclip
- [ ] T025 [US2] Run example app with `cd example && npm start` and visually verify overflow icons render correctly (MANUAL)
- [ ] T026 [US2] Test overflow icon with transforms enabled in example app (MANUAL)
- [ ] T027 [US2] Test overflow icon with mask enabled in example app (MANUAL)
- [ ] T028 [US2] Verify example app builds for iOS: `cd example && npm run ios` (MANUAL)
- [ ] T029 [US2] Verify example app builds for Android: `cd example && npm run android` (MANUAL)

**Checkpoint**: User Story 2 complete - example app demonstrates the fix visually

---

## Phase 5: User Story 3 - Font Awesome 7 Only Compatibility (Priority: P3)

**Goal**: Document FA7-only compatibility for 1.x branch

**Independent Test**: Verify package.json and README clearly indicate FA7-only requirement

### Implementation for User Story 3

- [x] T030 [US3] Update README.md with FA7 compatibility notice in README.md
- [x] T031 [US3] Add version migration guidance: "For FA6 support, use react-native-fontawesome 0.3.x" in README.md
- [x] T032 [US3] Update any version references in documentation to reflect FA7 requirement in README.md
- [x] T033 [US3] Verify peerDependencies in package.json shows only `"~7"` for fontawesome-svg-core in package.json

**Checkpoint**: User Story 3 complete - documentation clearly communicates FA7-only compatibility

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cleanup

- [x] T034 Run full validation suite: `npm test && npm run typecheck && npm run lint`
- [x] T035 Build the library: `npm run prepare`
- [x] T036 Review all snapshot tests for expected viewBox changes in src/__tests__/__snapshots__/
- [x] T037 Update snapshot tests if viewBox values have changed as expected
- [x] T038 Run quickstart.md validation commands to verify documentation accuracy
- [x] T039 Verify no regressions in existing icon rendering (non-overflow icons still display correctly)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2) - Core implementation
- **User Story 2 (Phase 4)**: Depends on User Story 1 (Phase 3) - Needs working viewBox expansion
- **User Story 3 (Phase 5)**: Depends on Foundational (Phase 2) - Can run parallel to US1/US2
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Depends on User Story 1 - Needs viewBox expansion working to demonstrate
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Documentation only, can run parallel to US1

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD Red phase)
- Implementation makes tests PASS (TDD Green phase)
- Refactoring follows (TDD Refactor phase)
- Validation confirms no regressions

### Parallel Opportunities

**Phase 3 (User Story 1) Tests** - All test tasks (T010-T015) can run in parallel:
```
T010, T011, T012, T013, T014, T015 → then T016
```

**Cross-Story Parallel** - US1 and US3 can proceed in parallel after Phase 2:
```
Phase 2 complete → US1 (implementation) + US3 (documentation) in parallel
                 → US2 (after US1 complete)
```

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (TDD Red phase):
# These can all be written in parallel since they're in the same file but test different aspects:
Task T010: "Add test: viewBox expansion subtracts 32 from minY"
Task T011: "Add test: viewBox expansion adds 64 to height"
Task T012: "Add test: viewBox expansion preserves minX unchanged"
Task T013: "Add test: viewBox expansion preserves width unchanged"
Task T014: "Add test: viewBox expansion handles non-zero minY correctly"
Task T015: "Add test: viewBox expansion handles invalid/missing viewBox gracefully"

# After all tests written, verify they fail:
Task T016: Run `npm test` to confirm new tests FAIL
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup ✓
2. Complete Phase 2: Foundational (FA7 dependencies) ✓
3. Complete Phase 3: User Story 1 (viewBox expansion)
4. **STOP and VALIDATE**: Run `npm test && npm run typecheck && npm run lint`
5. MVP delivered - overflow icons now render correctly

### Incremental Delivery

1. Complete Setup + Foundational → FA7 dependencies ready
2. Add User Story 1 → ViewBox expansion works → **MVP!**
3. Add User Story 2 → Example app demonstrates fix → Visual verification
4. Add User Story 3 → Documentation complete → Release ready
5. Polish → Final validation → Ship it

### Suggested MVP Scope

**MVP = Phase 1 + Phase 2 + Phase 3 (User Story 1)**

This delivers the core fix (viewBox expansion) with all tests passing. User Stories 2 and 3 are polish/documentation that can follow.

---

## Notes

- [P] tasks = different files or independent test cases, no dependencies
- [Story] label maps task to specific user story for traceability
- TDD is NON-NEGOTIABLE per constitution principle I
- Each user story should be independently completable and testable
- Verify tests fail before implementing (Red phase)
- Commit after each logical task group
- Stop at any checkpoint to validate story independently
