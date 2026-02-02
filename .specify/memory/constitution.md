<!--
  Sync Impact Report
  ==================
  Version change: 0.0.0 → 1.0.0 (MAJOR - initial constitution establishment)

  Modified principles: N/A (initial creation)

  Added sections:
  - Core Principles (5 principles: Test-First, RN Compatibility, FA Parity, TypeScript, Simplicity)
  - Development Workflow
  - Quality Gates
  - Governance

  Removed sections: N/A (initial creation)

  Templates requiring updates:
  - .specify/templates/plan-template.md ✅ compatible (Constitution Check section exists)
  - .specify/templates/spec-template.md ✅ compatible (user stories and requirements align)
  - .specify/templates/tasks-template.md ✅ compatible (TDD workflow supported)

  Follow-up TODOs: None
-->

# react-native-fontawesome Constitution

## Core Principles

### I. Test-First Development (NON-NEGOTIABLE)

All feature development MUST follow strict Test-Driven Development (TDD):

- Tests MUST be written before implementation code
- Tests MUST fail before implementation begins (Red phase)
- Implementation MUST only add enough code to pass tests (Green phase)
- Refactoring MUST NOT change test outcomes (Refactor phase)
- Pull requests without corresponding tests MUST NOT be merged for new features or bug fixes

**Rationale**: TDD ensures correctness, prevents regressions, and produces maintainable code.
The React Native ecosystem's complexity (iOS + Android + JS) demands rigorous testing to catch
platform-specific issues early.

### II. React Native Compatibility

The component MUST remain current with React Native ecosystem:

- Support the latest stable React Native version within 60 days of release
- Maintain compatibility with react-native-svg as the rendering foundation
- Test on both iOS and Android platforms before any release
- Document any platform-specific behavior differences explicitly
- Breaking changes in React Native MUST be addressed in a timely manner

**Rationale**: React Native evolves rapidly. Falling behind creates technical debt and abandons
users who upgrade their applications and pay for Font Awesome subscriptions.

### III. Font Awesome Feature Parity

The component MUST maintain reasonable feature parity with Font Awesome's official implementations:

- SVG with JavaScript features SHOULD be supported where technically feasible in React Native
- Consistency with the React component (react-fontawesome) MUST be prioritized for API design
- Icon rendering, transforms, masking, and layering MUST work as documented
- New Font Awesome features SHOULD be evaluated for inclusion within 90 days of release

**Rationale**: Users expect consistent behavior across Font Awesome implementations. Divergent
behavior creates confusion and support burden.

### IV. TypeScript Strictness

All code MUST be written in TypeScript with strict type safety:

- `strict: true` MUST be enabled in tsconfig.json
- Explicit types MUST be provided for all public API surfaces
- `any` type MUST NOT be used except with explicit justification in comments
- Props interfaces MUST be exported for consumer type safety
- Generic types SHOULD be used where they improve type inference

**Rationale**: Strong typing catches errors at compile time, improves IDE support, and serves
as living documentation for the API.

### V. Simplicity

The implementation MUST remain simple and focused:

- No abstractions without at least two concrete use cases
- Prefer composition over inheritance
- Avoid premature optimization; profile before optimizing
- Dependencies MUST be minimal and justified
- Code SHOULD be readable without extensive comments

**Rationale**: Complexity is the enemy of reliability. A simple codebase is easier to maintain,
debug, and contribute to.

## Development Workflow

All contributions MUST follow this workflow:

1. **Issue First**: Create or reference a GitHub issue before starting work
2. **Branch**: Create a feature branch from the main development branch
3. **TDD Cycle**: Write failing tests → Implement → Refactor
4. **Type Check**: Run `yarn typecheck` and resolve all errors
5. **Lint**: Run `yarn lint` and resolve all issues
6. **Test**: Run `yarn test` and ensure all tests pass
7. **PR**: Submit pull request with clear description linking to issue

## Quality Gates

Pull requests MUST pass these gates before merge:

- [ ] All tests pass on CI
- [ ] TypeScript compilation succeeds with no errors
- [ ] ESLint reports no errors
- [ ] Code coverage does not decrease for modified files
- [ ] Both iOS and Android example app builds succeed
- [ ] Changes are documented if they affect public API

## Governance

This constitution supersedes all other development practices for this repository.

**Amendment Process**:
1. Propose changes via GitHub issue with rationale
2. Allow 7 days for community discussion
3. Core maintainers vote; majority required for approval
4. Document changes with version bump per semantic versioning

**Version Policy**:
- MAJOR: Principle removal or fundamental redefinition
- MINOR: New principle added or existing principle materially expanded
- PATCH: Clarifications, wording improvements, non-semantic changes

**Compliance Review**:
- All PRs SHOULD be checked against constitution principles
- Violations MUST be justified in PR description or rejected
- Quarterly review of constitution relevance recommended

**Version**: 1.0.0 | **Ratified**: 2026-02-02 | **Last Amended**: 2026-02-02
