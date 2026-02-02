# Research: Port 0.3.x Codebase to 1.x Scaffold

**Date**: 2026-02-02
**Feature**: 001-port-0-3-x-codebase

## Research Topics

### 1. Package Manager Migration (yarn → npm)

**Decision**: Use npm as specified in user requirements

**Rationale**:
- User explicitly requested npm over yarn
- The 1.x scaffold was created with yarn but can be converted
- npm 9+ has equivalent features to yarn for this project's needs

**Migration Steps**:
1. Delete `yarn.lock` and `.yarnrc.yml`
2. Remove `packageManager` field from package.json
3. Run `npm install` to generate `package-lock.json`
4. Update any scripts that reference `yarn` to use `npm`

**Alternatives Considered**:
- Keep yarn: Rejected per user requirements
- Use pnpm: Not requested, adds complexity

---

### 2. Node Version Management (mise)

**Decision**: Use mise for Node version management

**Rationale**:
- User explicitly requested mise
- mise supports `.tool-versions` or `.mise.toml` config files
- Compatible with existing Node ecosystem

**Implementation**:
1. Create `.mise.toml` with Node version specification
2. Add `.tool-versions` for compatibility with other version managers
3. Document mise setup in contributing guide

**Alternatives Considered**:
- nvm: Common but user prefers mise
- asdf: mise is a faster alternative to asdf
- No version manager: Would cause inconsistency across environments

---

### 3. TypeScript Migration Strategy

**Decision**: Port with relaxed TypeScript, defer strict mode

**Rationale**:
- Spec explicitly puts TypeScript strict mode out of scope
- Allows faster port with functional verification
- Types can be incrementally improved

**Implementation**:
1. Keep `strict: true` in tsconfig.json (scaffold default)
2. Use `// @ts-expect-error` or `any` where needed for initial port
3. Add `@types/humps` for humps library types
4. Create follow-up issue for strict TypeScript compliance

**Alternatives Considered**:
- Full strict TypeScript from start: Would slow port significantly
- Keep as JavaScript: Loses type safety benefits, doesn't match scaffold

---

### 4. Test Framework Compatibility

**Decision**: Keep Jest with react-test-renderer (same as 0.3.x)

**Rationale**:
- The 1.x scaffold already uses Jest
- Tests from 0.3.x use react-test-renderer which is compatible
- Snapshot tests can be ported directly

**Implementation**:
1. Ensure jest config in package.json is compatible
2. Add dev dependencies: `@types/lodash`, `lodash`
3. Copy snapshot files with updated paths
4. Update test file imports for new structure

**Alternatives Considered**:
- React Native Testing Library: Would require test rewrites
- Vitest: Not standard for React Native projects

---

### 5. Directory Structure

**Decision**: Flatten component structure, keep tests co-located

**Rationale**:
- 0.3.x has `src/components/FontAwesomeIcon.js` but only one component exists
- Simpler structure aligns with Simplicity principle
- Tests under `src/__tests__/` follows React Native conventions

**Final Structure**:
```
src/
├── index.tsx              # Re-exports FontAwesomeIcon
├── FontAwesomeIcon.tsx    # Main component
├── converter.ts           # SVG → RN-SVG converter
├── logger.ts              # Error logging utility
└── __tests__/
    ├── FontAwesomeIcon.test.tsx
    ├── __fixtures__/
    │   └── helpers.ts
    └── __snapshots__/
        └── FontAwesomeIcon.test.tsx.snap
```

**Alternatives Considered**:
- Keep `components/` folder: Unnecessary for single component
- Move tests outside src: Not idiomatic for React Native

---

### 6. Peer Dependencies Version Ranges

**Decision**: Update peer dependency ranges for current ecosystem

**Rationale**:
- 0.3.x supports react-native >= 0.67
- Current scaffold created with react-native 0.81.5
- Should support wide range for library consumers

**Peer Dependencies**:
```json
{
  "peerDependencies": {
    "@fortawesome/fontawesome-svg-core": "~1 || ~6",
    "react": ">=17",
    "react-native": ">=0.67",
    "react-native-svg": ">=11"
  }
}
```

**Alternatives Considered**:
- Narrow version ranges: Would limit consumer flexibility
- Remove react-native-svg peer dep: Required for functionality

---

### 7. Build Output and Exports

**Decision**: Use react-native-builder-bob defaults

**Rationale**:
- Scaffold already configured correctly
- Generates ESM output to `lib/module/`
- Generates TypeScript declarations to `lib/typescript/`
- Package.json exports already correct

**No Changes Needed** to builder-bob configuration.

**Alternatives Considered**:
- Match 0.3.x dist/ structure: Would require custom config
- Add CommonJS output: Not needed for modern React Native

---

## Summary

All research topics resolved. No blockers identified. The port can proceed with:

1. npm package manager (user requirement)
2. mise for Node versioning (user requirement)
3. Relaxed TypeScript initially (per spec Out of Scope)
4. Jest + react-test-renderer (unchanged from 0.3.x)
5. Flattened src/ structure
6. Updated peer dependency ranges
7. Builder-bob defaults for build output
