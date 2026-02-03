# Feature Specification: Enable Strict TypeScript Compliance

**Feature Branch**: `002-strict-typescript`
**Created**: 2026-02-03
**Status**: Complete
**Input**: User description: "Our constitution mentions strict TypeScript. We deferred this in our last spec and now it's time to come back and complete it."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Type-Safe Component Usage (Priority: P1)

As a React Native developer using TypeScript, I want the FontAwesomeIcon component to provide accurate type checking for all props so that my IDE catches prop errors at development time rather than at runtime.

**Why this priority**: Type safety is the primary value proposition of TypeScript strictness. Developers using this library expect proper TypeScript support to catch errors early.

**Independent Test**: Can be verified by attempting to pass incorrect prop types and confirming TypeScript reports compile-time errors with helpful messages.

**Acceptance Scenarios**:

1. **Given** a developer passes an invalid `icon` prop type, **When** TypeScript compiles, **Then** a clear error message indicates the expected type.
2. **Given** a developer passes an invalid `size` prop (e.g., a string instead of number), **When** TypeScript compiles, **Then** a type error is reported.
3. **Given** a developer uses the component correctly, **When** TypeScript compiles, **Then** no type errors are reported.

---

### User Story 2 - Library Maintainers Have Confidence in Type Safety (Priority: P2)

As a library maintainer, I want all internal code to pass strict TypeScript checks so that I can be confident the library is type-safe and maintainable.

**Why this priority**: Internal type safety enables maintainability and reduces bugs, but only matters after external type safety is established.

**Independent Test**: Can be verified by running `npm run typecheck` with `strict: true` enabled and confirming zero errors.

**Acceptance Scenarios**:

1. **Given** the full codebase including source files, **When** `npm run typecheck` is run, **Then** TypeScript reports zero errors.
2. **Given** the tsconfig.json has `strict: true`, **When** any new code uses `any` type without justification, **Then** the code fails type checking or linting.
3. **Given** all public API surfaces, **When** reviewed, **Then** explicit type annotations are present for all exports.

---

### User Story 3 - Correct Return Types from Internal Functions (Priority: P3)

As a library maintainer, I want internal functions to have explicit return types so that refactoring is safer and type inference is predictable.

**Why this priority**: Return type annotations improve maintainability but are less critical than eliminating `any` types.

**Independent Test**: Can be verified by checking that all exported functions and significant internal functions have explicit return type annotations.

**Acceptance Scenarios**:

1. **Given** the `convert` function in converter.ts, **When** reviewed, **Then** it has an explicit return type instead of `any`.
2. **Given** any function that creates React elements, **When** reviewed, **Then** the return type is `React.ReactElement` or an appropriate React type.

---

### Edge Cases

- What happens when Font Awesome types from `@fortawesome/fontawesome-svg-core` are incomplete or use `any`?
- How should the codebase handle type assertions (`as`) that are necessary for interfacing with external libraries?
- What happens when `@ts-expect-error` is legitimately needed for testing invalid inputs?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: tsconfig.json MUST have `strict: true` enabled (already enabled, verify maintained)
- **FR-002**: Source files MUST NOT use explicit `any` type without justification comment
- **FR-003**: All public API types (Props, FontAwesomeIconStyle, exports) MUST have explicit type annotations
- **FR-004**: The `convert` function MUST return a proper React element type instead of `any`
- **FR-005**: Type assertions (`as`) MUST be limited to cases where type narrowing is not possible
- **FR-006**: Test files MAY use `@ts-expect-error` when testing invalid input scenarios
- **FR-007**: All function parameters and return types in public API MUST be explicitly typed
- **FR-008**: Generic types SHOULD be used where they improve type inference for consumers
- **FR-009**: ESLint TypeScript rules MUST enforce no-explicit-any (with exceptions for justified cases)

### Key Entities

- **Props**: The public interface for FontAwesomeIcon component props - must be fully typed
- **FontAwesomeIconStyle**: The style type that extends React Native's StyleProp - must be properly typed
- **AbstractElement**: Internal representation of SVG elements from Font Awesome - must be properly typed
- **convert function**: Converts Font Awesome abstract elements to React Native SVG - must have proper return type

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `npm run typecheck` passes with zero errors and `strict: true` enabled
- **SC-002**: Zero explicit `any` types in source files (excluding test files and justified exceptions)
- **SC-003**: All public exports have explicit type annotations
- **SC-004**: ESLint passes with no-explicit-any rule enabled (with configured exceptions)
- **SC-005**: Existing test suite continues to pass after type improvements

## Assumptions

- The current `strict: true` setting in tsconfig.json is already working and passes type checking
- Font Awesome's type definitions from `@fortawesome/fontawesome-svg-core` are adequate for typing
- React Native SVG types from `react-native-svg` are compatible with strict mode
- The `@ts-expect-error` in test files for testing invalid inputs is acceptable and intentional
- Type improvements should not change runtime behavior

## Out of Scope

- Adding new features or functionality
- Changing the public API
- Performance optimizations
- Adding stricter TypeScript options beyond `strict: true` (like `noPropertyAccessFromIndexSignature`)
- Rewriting existing logic - only adding/improving type annotations
