# Tasks: Accessibility Support

**Input**: Design documents from `/specs/004-accessibility-support/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md

**Tests**: Following constitution principle I (Test-First Development), tests are included and MUST be written before implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `src/__tests__/` at repository root
- Files to modify: `src/FontAwesomeIcon.tsx`, `src/__tests__/FontAwesomeIcon.test.tsx`

---

## Phase 1: Setup (Type Foundation)

**Purpose**: Establish the TypeScript types that enable prop passthrough

- [x] T001 Import `SvgProps` type from react-native-svg in `src/FontAwesomeIcon.tsx`
- [x] T002 Create `FontAwesomeIconOwnProps` interface for FA-specific props in `src/FontAwesomeIcon.tsx`
- [x] T003 Create `Props` type as intersection of `FontAwesomeIconOwnProps` and `Omit<SvgProps, conflicts>` in `src/FontAwesomeIcon.tsx`
- [x] T004 Remove standalone `testID` from Props (now covered by SvgProps) in `src/FontAwesomeIcon.tsx`

---

## Phase 2: Foundational (Rest Props Extraction)

**Purpose**: Core runtime change that enables all user stories - extract rest props for passthrough

**⚠️ CRITICAL**: No user story behavior works until this phase is complete

- [x] T005 Add `...restProps` to destructuring in FontAwesomeIcon function in `src/FontAwesomeIcon.tsx`
- [x] T006 Pass `restProps` to converter's extraProps parameter to bypass attribute stripping in `src/FontAwesomeIcon.tsx` and `src/converter.ts`

**Checkpoint**: Foundation ready - rest props now flow to Svg element, user story tests can verify behavior

---

## Phase 3: User Story 1 - Screen Reader Announces Icon Purpose (Priority: P1) 🎯 MVP

**Goal**: Enable screen reader users to understand icon purpose via accessibilityLabel, accessibilityRole, and accessibilityHint

**Independent Test**: Set `accessibilityLabel="Delete"` on a FontAwesomeIcon and verify the prop appears on the rendered Svg element

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation (Phase 2)**

- [x] T007 [P] [US1] Test that `accessibilityLabel` prop is forwarded to root Svg element in `src/__tests__/FontAwesomeIcon.test.tsx`
- [x] T008 [P] [US1] Test that `accessibilityRole` prop is forwarded to root Svg element in `src/__tests__/FontAwesomeIcon.test.tsx`
- [x] T009 [P] [US1] Test that `accessibilityHint` prop is forwarded to root Svg element in `src/__tests__/FontAwesomeIcon.test.tsx`

### Verification for User Story 1

- [x] T010 [US1] Run tests and verify T007-T009 pass after Phase 2 implementation in `src/__tests__/FontAwesomeIcon.test.tsx`

**Checkpoint**: User Story 1 complete - screen readers can announce icon purpose

---

## Phase 4: User Story 2 - Decorative Icons Are Hidden from Screen Readers (Priority: P1)

**Goal**: Enable decorative icons to be hidden from assistive technologies using `accessible={false}` or `aria-hidden`

**Independent Test**: Set `accessible={false}` or `aria-hidden={true}` on a FontAwesomeIcon and verify the prop appears on the rendered Svg element

### Tests for User Story 2

> **NOTE: These tests verify different props than US1, so they can be written in parallel**

- [x] T011 [P] [US2] Test that `accessible={false}` prop is forwarded to root Svg element in `src/__tests__/FontAwesomeIcon.test.tsx`
- [x] T012 [P] [US2] Test that `aria-hidden={true}` prop is forwarded to root Svg element in `src/__tests__/FontAwesomeIcon.test.tsx`

### Verification for User Story 2

- [x] T013 [US2] Run tests and verify T011-T012 pass after Phase 2 implementation in `src/__tests__/FontAwesomeIcon.test.tsx`

**Checkpoint**: User Story 2 complete - decorative icons can be hidden from screen readers

---

## Phase 5: User Story 3 - Pass Additional Props to Root SVG Element (Priority: P2)

**Goal**: Enable arbitrary View props (nativeID, pointerEvents, hitSlop) to be passed through to root Svg element

**Independent Test**: Pass `nativeID="test-icon"` and `pointerEvents="none"` to FontAwesomeIcon and verify they appear on the rendered Svg element

### Tests for User Story 3

- [x] T014 [P] [US3] Test that `nativeID` prop is forwarded to root Svg element in `src/__tests__/FontAwesomeIcon.test.tsx`
- [x] T015 [P] [US3] Test that `pointerEvents` prop is forwarded to root Svg element in `src/__tests__/FontAwesomeIcon.test.tsx`
- [x] T016 [P] [US3] Test that `testID` prop continues to work (backward compatibility) in `src/__tests__/FontAwesomeIcon.test.tsx`

### Edge Case Tests for User Story 3

- [x] T017 [P] [US3] Test that FA-specific props take precedence over passthrough (e.g., user passes `width`, FA's size wins) in `src/__tests__/FontAwesomeIcon.test.tsx`
- [x] T018 [P] [US3] Test that existing behavior unchanged when no passthrough props provided (backward compatibility) in `src/__tests__/FontAwesomeIcon.test.tsx`

### Verification for User Story 3

- [x] T019 [US3] Run tests and verify T014-T018 pass in `src/__tests__/FontAwesomeIcon.test.tsx`

**Checkpoint**: User Story 3 complete - arbitrary props pass through to Svg element

---

## Phase 6: User Story 4 - Icon State Communication (Priority: P3)

**Goal**: Enable screen readers to communicate icon state (selected, disabled) via accessibilityState and accessibilityValue

**Independent Test**: Set `accessibilityState={{ selected: true }}` on a FontAwesomeIcon and verify the prop appears on the rendered Svg element

### Tests for User Story 4

- [x] T020 [P] [US4] Test that `accessibilityState` prop is forwarded to root Svg element in `src/__tests__/FontAwesomeIcon.test.tsx`
- [x] T021 [P] [US4] Test that `accessibilityValue` prop is forwarded to root Svg element in `src/__tests__/FontAwesomeIcon.test.tsx`

### Verification for User Story 4

- [x] T022 [US4] Run tests and verify T020-T021 pass in `src/__tests__/FontAwesomeIcon.test.tsx`

**Checkpoint**: User Story 4 complete - screen readers can communicate icon state

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cleanup

- [x] T023 Run full test suite (`npm test`) to verify all tests pass
- [x] T024 Run TypeScript check (`npm run typecheck`) to verify no type errors
- [x] T025 Run linter (`npm run lint`) to verify code style compliance
- [x] T026 Validate quickstart.md examples compile (manual review)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - type changes only
- **Foundational (Phase 2)**: Depends on Phase 1 - runtime prop spreading
- **User Stories (Phases 3-6)**: All depend on Phase 2 completion
  - User stories can then proceed in parallel (tests verify passthrough behavior)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Phase 2 - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Phase 2 - No dependencies on other stories (parallel with US1)
- **User Story 3 (P2)**: Can start after Phase 2 - No dependencies on other stories
- **User Story 4 (P3)**: Can start after Phase 2 - No dependencies on other stories

### Within Each User Story

- Tests MUST be written and FAIL before Phase 2 implementation
- Phase 2 implementation enables all tests to pass
- Verification task confirms tests pass

### Parallel Opportunities

- T007, T008, T009 can run in parallel (different test cases, same file allowed)
- T011, T012 can run in parallel
- T014, T015, T016, T017, T018 can run in parallel
- T020, T021 can run in parallel
- All user story test phases (T007-T009, T011-T012, T014-T018, T020-T021) can be written in parallel BEFORE Phase 2

---

## Parallel Example: All Test Tasks

```bash
# Write all tests in parallel BEFORE Phase 2 implementation:
# User Story 1 tests:
Task: "Test accessibilityLabel forwarding in src/__tests__/FontAwesomeIcon.test.tsx"
Task: "Test accessibilityRole forwarding in src/__tests__/FontAwesomeIcon.test.tsx"
Task: "Test accessibilityHint forwarding in src/__tests__/FontAwesomeIcon.test.tsx"

# User Story 2 tests:
Task: "Test accessible={false} forwarding in src/__tests__/FontAwesomeIcon.test.tsx"
Task: "Test aria-hidden forwarding in src/__tests__/FontAwesomeIcon.test.tsx"

# User Story 3 tests:
Task: "Test nativeID forwarding in src/__tests__/FontAwesomeIcon.test.tsx"
Task: "Test pointerEvents forwarding in src/__tests__/FontAwesomeIcon.test.tsx"
Task: "Test testID backward compatibility in src/__tests__/FontAwesomeIcon.test.tsx"
Task: "Test FA props precedence in src/__tests__/FontAwesomeIcon.test.tsx"
Task: "Test backward compatibility with no passthrough props in src/__tests__/FontAwesomeIcon.test.tsx"

# User Story 4 tests:
Task: "Test accessibilityState forwarding in src/__tests__/FontAwesomeIcon.test.tsx"
Task: "Test accessibilityValue forwarding in src/__tests__/FontAwesomeIcon.test.tsx"
```

---

## Implementation Strategy

### TDD Approach (Constitution Principle I)

1. **Write all tests first** (T007-T009, T011-T012, T014-T018, T020-T021)
2. **Run tests** - all should FAIL (no implementation yet)
3. **Complete Phase 1** (type changes) - tests still FAIL
4. **Complete Phase 2** (runtime changes) - tests should PASS
5. **Verify each user story** (T010, T013, T019, T022)

### MVP First (User Stories 1 & 2)

1. Complete Phase 1: Setup (types)
2. Write tests for US1 and US2 (T007-T012)
3. Complete Phase 2: Foundational (runtime)
4. **STOP and VALIDATE**: Verify US1 and US2 tests pass
5. Screen readers can now announce icons and hide decorative icons (MVP!)

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. US1 + US2 tests → Verify → Deploy/Demo (Core Accessibility MVP!)
3. US3 tests → Verify → Deploy/Demo (Prop Passthrough)
4. US4 tests → Verify → Deploy/Demo (Advanced Accessibility)
5. Each story adds value without breaking previous stories

---

## Notes

- [P] tasks = can run in parallel within their phase
- [Story] label maps task to specific user story for traceability
- All implementation is in Phase 1-2; user story phases are verification
- The actual passthrough behavior is enabled by Phase 2 for ALL user stories
- Tests verify specific prop types work correctly
- Commit after each phase for clean history
- Constitution Principle I (TDD) requires tests written first

---

## Implementation Complete

**Date**: 2026-02-03

**Summary**: All 26 tasks completed successfully.

### Files Modified

1. `src/FontAwesomeIcon.tsx` - Added SvgProps import, created intersection Props type, added restProps extraction
2. `src/converter.ts` - Added extraProps parameter to pass user props directly without attribute stripping
3. `src/__tests__/FontAwesomeIcon.test.tsx` - Added 12 new tests for accessibility and prop passthrough

### Test Results

- All 45 tests pass
- TypeScript check passes
- Lint check passes

### Breaking Change Note

The behavior change from "extra props are omitted" to "extra props are passed through" is intentional and enables the accessibility support feature. One existing test was updated to reflect this new expected behavior.
