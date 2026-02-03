# Research: Enable Strict TypeScript Compliance

**Feature**: 002-strict-typescript
**Date**: 2026-02-03

## Research Questions

### 1. What is the correct return type for the `convert` function?

**Decision**: `React.ReactNode`

**Rationale**: The `convert` function can return:
- A `string` when the input element is a text node
- A `React.ReactElement` when the input is an SVG element

`React.ReactNode` is the union type that encompasses both of these cases, plus other valid React children (null, undefined, boolean, arrays). This is the idiomatic return type for functions that produce renderable content.

**Alternatives considered**:
- `string | React.ReactElement` - More specific but doesn't account for the recursive nature where children could be mixed
- `JSX.Element | string` - Similar to above, less idiomatic
- `React.ReactElement | null` - Incorrect, doesn't account for string returns

### 2. How should ESLint be configured to enforce no-explicit-any?

**Decision**: Add `@typescript-eslint/no-explicit-any` rule with `warn` severity for source files, disabled for test files

**Rationale**:
- The `@react-native` ESLint config already includes TypeScript ESLint, so no new dependencies are needed
- Using `warn` initially allows gradual adoption without breaking CI
- Test files legitimately use `any` for testing edge cases and mock inspection
- The rule should use `fixToUnknown: true` to provide auto-fix capability

**Alternatives considered**:
- `error` severity - Too strict for initial adoption; would fail CI immediately
- No rule - Doesn't prevent regression
- Disable entirely in tests - Could hide legitimate issues; better to allow case-by-case `@ts-expect-error`

### 3. Are there any dependency type issues that need addressing?

**Decision**: No additional type dependencies needed

**Rationale**:
- `@types/humps` is already installed (^2.0.6)
- `@types/react` is already installed (^19.1.12)
- `@fortawesome/fontawesome-svg-core` includes its own type definitions
- `react-native-svg` includes its own type definitions
- All peer dependencies have adequate type coverage

**Alternatives considered**: N/A

### 4. Should the `svgObjectMap` type be improved?

**Decision**: Yes, change from `Record<string, unknown>` to a proper typed map

**Rationale**: The current typing of `Record<string, unknown>` loses type information about which SVG components are available. A const assertion or explicit type would preserve the mapping.

**Implementation**:
```typescript
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

**Alternatives considered**:
- Keep as `Record<string, unknown>` - Works but loses type safety
- Explicit interface - More verbose without additional benefit

## Summary

The research confirms that the implementation is straightforward:

1. Fix `convert` return type to `React.ReactNode`
2. Optionally improve `svgObjectMap` typing with `as const satisfies`
3. Add ESLint rule `@typescript-eslint/no-explicit-any` with appropriate configuration
4. No new dependencies required

All NEEDS CLARIFICATION items from Technical Context are resolved.
