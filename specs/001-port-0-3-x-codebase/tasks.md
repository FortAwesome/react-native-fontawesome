# Tasks: Port 0.3.x Codebase to 1.x Scaffold

**Input**: Design documents from `/specs/001-port-0-3-x-codebase/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Tests from 0.3.x are being ported. Per Constitution Check, tests will be ported FIRST and verified to fail before source is ported (TDD compliance for port scenario).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Source**: `src/` at repository root
- **Tests**: `src/__tests__/` co-located with source
- **0.3.x Reference**: `../react-native-fontawesome-0.3.x/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Convert scaffold from yarn to npm, install dependencies

- [x] T001 Remove yarn artifacts: delete yarn.lock and .yarnrc.yml
- [x] T002 Remove packageManager field from package.json
- [x] T003 Update package.json scripts to replace yarn with npm run
- [x] T004 Install dependencies with npm: run `npm install`
- [x] T005 Add runtime dependency humps: run `npm install humps`
- [x] T006 [P] Add dev dependency lodash for tests: run `npm install -D lodash @types/lodash`
- [x] T007 [P] Add dev dependency @types/humps: run `npm install -D @types/humps`
- [x] T008 Add peer dependencies to package.json: @fortawesome/fontawesome-svg-core (~1 || ~6 || ~7), react-native-svg (>=11)
- [x] T009 [P] Install peer deps for development: run `npm install -D @fortawesome/fontawesome-svg-core@6.7.2 react-native-svg`
- [x] T010 Verify npm scripts work: run `npm run lint` and `npm run typecheck`

**Checkpoint**: Environment ready - npm working, dependencies installed

---

## Phase 2: Foundational (Port Tests First - TDD)

**Purpose**: Port all test infrastructure BEFORE porting source code. Tests should FAIL until source is ported.

**⚠️ CRITICAL**: Tests must be ported and verified to fail before ANY source porting begins

- [x] T011 Create test directory structure: mkdir -p src/__tests__/__fixtures__ src/__tests__/__snapshots__
- [x] T012 Port test helpers from ../react-native-fontawesome-0.3.x/src/components/__fixtures__/helpers.js to src/__tests__/__fixtures__/helpers.ts
- [x] T013 Port snapshot file from ../react-native-fontawesome-0.3.x/src/components/__tests__/__snapshots__/FontAwesomeIcon.test.js.snap to src/__tests__/__snapshots__/FontAwesomeIcon.test.tsx.snap
- [x] T014 Port test file from ../react-native-fontawesome-0.3.x/src/components/__tests__/FontAwesomeIcon.test.js to src/__tests__/FontAwesomeIcon.test.tsx (update imports for new structure)
- [x] T015 Remove scaffold placeholder test at src/__tests__/index.test.tsx
- [x] T016 Verify tests fail: run `npm test` and confirm failure (source not yet ported)

**Checkpoint**: Tests ported - should fail because source doesn't exist yet

---

## Phase 3: User Story 1 - Render Basic Icons (Priority: P1) 🎯 MVP

**Goal**: Port core rendering functionality so basic icons can be displayed

**Independent Test**: Run `npm test` - snapshot tests for basic icon rendering should pass

### Implementation for User Story 1

- [ ] T017 [US1] Port logger utility from ../react-native-fontawesome-0.3.x/src/logger.js to src/logger.ts
- [ ] T018 [US1] Port converter utility from ../react-native-fontawesome-0.3.x/src/converter.js to src/converter.ts
- [ ] T019 [US1] Port FontAwesomeIcon component from ../react-native-fontawesome-0.3.x/src/components/FontAwesomeIcon.js to src/FontAwesomeIcon.tsx (basic icon rendering only)
- [ ] T020 [US1] Update src/index.tsx to export FontAwesomeIcon and constants (DEFAULT_SIZE, DEFAULT_COLOR, DEFAULT_SECONDARY_OPACITY)
- [ ] T021 [US1] Add TypeScript Props interface to src/FontAwesomeIcon.tsx based on ../react-native-fontawesome-0.3.x/index.d.ts
- [ ] T022 [US1] Run tests for basic icon rendering: `npm test` - verify snapshot tests pass

**Checkpoint**: Basic icon rendering works - tests for object and array icon formats pass

---

## Phase 4: User Story 2 - Customize Icon Appearance (Priority: P2)

**Goal**: Ensure size, color, and style customization works correctly

**Independent Test**: Run `npm test` - tests for size, color, and style handling should pass

### Implementation for User Story 2

- [ ] T023 [US2] Verify size prop handling in src/FontAwesomeIcon.tsx (already ported, verify tests pass)
- [ ] T024 [US2] Verify color prop handling in src/FontAwesomeIcon.tsx (already ported, verify tests pass)
- [ ] T025 [US2] Verify style prop and StyleSheet array flattening in src/FontAwesomeIcon.tsx
- [ ] T026 [US2] Verify color precedence (color prop > style.color) in tests
- [ ] T027 [US2] Run tests for customization: `npm test` - verify all color/size/style tests pass

**Checkpoint**: Icon customization works - size, color, and style tests pass

---

## Phase 5: User Story 3 - Render Duotone Icons (Priority: P3)

**Goal**: Ensure duotone icons render with correct primary/secondary color handling

**Independent Test**: Run `npm test` - duotone-specific tests should pass

### Implementation for User Story 3

- [ ] T028 [US3] Verify replaceCurrentColor function handles duotone layers in src/FontAwesomeIcon.tsx
- [ ] T029 [US3] Verify secondaryColor prop in src/FontAwesomeIcon.tsx
- [ ] T030 [US3] Verify secondaryOpacity prop with default 0.4 in src/FontAwesomeIcon.tsx
- [ ] T031 [US3] Run tests for duotone: `npm test` - verify all duotone tests pass

**Checkpoint**: Duotone icons work - primary/secondary color separation verified

---

## Phase 6: User Story 4 - Apply Transforms and Masks (Priority: P4)

**Goal**: Ensure power transforms and icon masking work correctly

**Independent Test**: Run `npm test` - transform and mask tests should pass

### Implementation for User Story 4

- [ ] T032 [US4] Verify transform prop (string and object) handling in src/FontAwesomeIcon.tsx
- [ ] T033 [US4] Verify mask and maskId props in src/FontAwesomeIcon.tsx
- [ ] T034 [US4] Run tests for transforms/masks: `npm test` - verify snapshot tests for mask/transform pass

**Checkpoint**: Transforms and masks work - all feature tests pass

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, build validation, cleanup

- [ ] T035 Run full test suite: `npm test` - ALL tests must pass
- [ ] T036 Run TypeScript check: `npm run typecheck` - verify compilation succeeds
- [ ] T037 Run linter: `npm run lint` - verify no errors
- [ ] T038 Run build: `npm run prepare` - verify lib/ output is generated
- [ ] T039 Verify package.json exports point to correct lib/ paths
- [ ] T040 Remove scaffold placeholder code from src/index.tsx (multiply function)
- [ ] T041 Update snapshot files if react-native-svg version differences cause changes: `npm test -- -u`

**Checkpoint**: Port complete - all tests pass, build succeeds, ready for review

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Setup - ports tests FIRST
- **User Story 1 (Phase 3)**: Depends on Foundational - ports core source
- **User Story 2 (Phase 4)**: Depends on US1 - verifies customization (code already ported in US1)
- **User Story 3 (Phase 5)**: Depends on US1 - verifies duotone (code already ported in US1)
- **User Story 4 (Phase 6)**: Depends on US1 - verifies transforms (code already ported in US1)
- **Polish (Phase 7)**: Depends on all user stories complete

### User Story Dependencies

- **User Story 1 (P1)**: Independent - core port
- **User Story 2 (P2)**: Can run after US1 (verification only)
- **User Story 3 (P3)**: Can run after US1 (verification only)
- **User Story 4 (P4)**: Can run after US1 (verification only)

Note: For this port, US2-US4 are primarily verification phases since the 0.3.x code implements all features in a single component. The separation allows incremental test verification.

### Within Each User Story

- Port utilities before component (logger, converter)
- Port component implementation
- Verify related tests pass
- Document any TypeScript workarounds needed

### Parallel Opportunities

- T006, T007, T009 can run in parallel (different packages)
- US2, US3, US4 verification can run in parallel after US1 completes

---

## Parallel Execution Examples

### Phase 1 Parallel Tasks

```bash
# These can run in parallel:
Task: T006 "Add dev dependency lodash for tests"
Task: T007 "Add dev dependency @types/humps"
Task: T009 "Install peer deps for development"
```

### Phase 3 Sequential Flow

```bash
# Must run in order:
Task: T017 "Port logger utility" → T018 "Port converter utility" → T019 "Port FontAwesomeIcon"
# Then:
Task: T020 "Update index.tsx exports"
Task: T021 "Add TypeScript Props interface"
Task: T022 "Run tests - verify pass"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (npm, dependencies)
2. Complete Phase 2: Port tests (TDD - tests fail)
3. Complete Phase 3: User Story 1 (core port)
4. **STOP and VALIDATE**: Run `npm test` - basic icon tests should pass
5. If passing, MVP complete - icon rendering works

### Incremental Delivery

1. Setup + Foundational → Tests ported, failing
2. User Story 1 → Core port complete → Tests should pass
3. User Story 2-4 → Verify remaining tests pass
4. Polish → Build validation, cleanup

### Single Developer Strategy

Since this is a port (not new development), work sequentially:

1. Phase 1: Setup environment
2. Phase 2: Port all tests (verify they fail)
3. Phase 3: Port all source files
4. Phase 4-6: Verify test categories pass
5. Phase 7: Final validation

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- This is a PORT - most source code is copied and converted, not written new
- TypeScript strict mode is DEFERRED - use `any` or `// @ts-expect-error` as needed
- Snapshots may need updating due to react-native-svg version differences
- Reference 0.3.x codebase at ../react-native-fontawesome-0.3.x/ for all ports
- Node version managed via existing mise.toml (requires mise)
- Using @fortawesome/fontawesome-svg-core@6.7.2 for port compatibility; upgrade to v7 is a separate task
