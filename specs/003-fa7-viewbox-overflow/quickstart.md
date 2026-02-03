# Quickstart: Font Awesome 7 ViewBox Overflow Fix

**Feature**: 003-fa7-viewbox-overflow
**Date**: 2026-02-03

## Prerequisites

- Node.js 18+
- npm or yarn
- Xcode (for iOS simulator)
- Android Studio (for Android emulator)

## Setup

```bash
# Clone and checkout the feature branch
git clone https://github.com/FortAwesome/react-native-fontawesome.git
cd react-native-fontawesome
git checkout 003-fa7-viewbox-overflow

# Install dependencies
npm install

# Install example app dependencies
cd example
npm install
cd ..
```

## Development Workflow

### 1. Run Tests (TDD Red Phase)

```bash
# Run all tests
npm test

# Run tests in watch mode during development
npm test -- --watch

# Run specific test file
npm test -- FontAwesomeIcon.test.tsx
```

### 2. Type Checking

```bash
npm run typecheck
```

### 3. Linting

```bash
npm run lint
```

### 4. Run Example App

```bash
# Start the example app (Expo)
cd example
npm start

# Or directly for a platform
npm run ios
npm run android
```

## Key Files to Modify

| File | Purpose |
|------|---------|
| `src/FontAwesomeIcon.tsx` | Add viewBox expansion logic |
| `src/__tests__/FontAwesomeIcon.test.tsx` | Add viewBox expansion tests |
| `package.json` | Update peerDependencies to FA7 only |
| `README.md` | Document FA7 requirement |
| `example/src/App.tsx` or `iconFactory.ts` | Add overflow icon demonstration |

## Implementation Steps (TDD)

### Step 1: Write Failing Tests

Add to `src/__tests__/FontAwesomeIcon.test.tsx`:

```typescript
describe('viewBox expansion for FA7 overflow icons', () => {
  test('expands viewBox by subtracting 32 from minY and adding 64 to height', () => {
    // Test that rendered icon has expanded viewBox
  });

  test('handles icons with non-zero minY correctly', () => {
    // Test mathematical correctness
  });

  test('preserves minX and width unchanged', () => {
    // Test that horizontal dimensions are untouched
  });
});
```

### Step 2: Implement ViewBox Expansion

Add to `src/FontAwesomeIcon.tsx`:

```typescript
function expandViewBox(viewBox: string): string {
  const parts = viewBox.split(' ').map(Number);
  if (parts.length !== 4) return viewBox;

  const [minX, minY, width, height] = parts;
  // Expand for FA7 overflow icons
  return `${minX} ${minY - 32} ${width} ${height + 64}`;
}
```

### Step 3: Integrate into Render

In the `FontAwesomeIcon` function, after getting the abstract element:

```typescript
// Expand viewBox for FA7 overflow icon support
if (rootAttributes.viewBox) {
  rootAttributes.viewBox = expandViewBox(rootAttributes.viewBox as string);
}
```

### Step 4: Update Dependencies

In `package.json`:

```json
{
  "peerDependencies": {
    "@fortawesome/fontawesome-svg-core": "~7"
  }
}
```

### Step 5: Verify Example App

Run the example app and verify that overflow icons (like paperclip) render completely without clipping.

## Validation Commands

```bash
# Full validation suite
npm test && npm run typecheck && npm run lint

# Build the library
npm run prepare

# Verify example builds
cd example && npm run ios -- --no-install
```

## Troubleshooting

### Tests fail with "icon not found"
Ensure fontawesome.library is properly reset between tests (already handled in `afterEach`).

### Example app shows clipped icons
Verify the viewBox expansion is being applied. Check browser devtools (web) or React Native debugger.

### TypeScript errors
Run `npm run typecheck` to see all errors. Ensure `strict: true` requirements are met.
