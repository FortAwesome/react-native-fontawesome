# Research: Font Awesome 7 ViewBox Overflow Fix

**Feature**: 003-fa7-viewbox-overflow
**Date**: 2026-02-03

## Research Questions

### 1. How does the viewBox work in SVG and what are the implications of modifying it?

**Decision**: Modify viewBox by subtracting 32 from min-y and adding 64 to height for all icons.

**Rationale**:
- SVG viewBox defines the coordinate system: `viewBox="minX minY width height"`
- Standard FA icons use `viewBox="0 0 512 512"` (or similar width values)
- Font Awesome 7 introduced overflow icons where paths extend beyond the declared viewBox
- Web browsers handle overflow via CSS `overflow: visible` but React Native clips to viewBox
- By expanding the viewBox vertically (-32 to min-y, +64 to height), we accommodate typical overflow while maintaining the icon's visual center

**Alternatives considered**:
- **Dynamic overflow detection**: Analyze each icon's path data to calculate exact bounds. Rejected because it adds complexity, requires SVG path parsing, and impacts performance.
- **CSS overflow property**: Not supported by react-native-svg in the same way as web.
- **Scaling icons down**: Would make icons smaller than intended and affect visual consistency.

### 2. Will negative min-y values work correctly in react-native-svg?

**Decision**: Yes, negative min-y values are supported.

**Rationale**:
- react-native-svg follows SVG spec which allows negative viewBox coordinates
- Tested internally: viewBox with negative min-y renders correctly
- The modification `0 0 512 512` → `0 -32 512 576` maintains the original visible area while extending above

**Alternatives considered**:
- **Positive offset with transform**: Could keep viewBox positive and translate content. Rejected because it adds transform complexity and could interfere with user transforms.

### 3. What icons are known to overflow in Font Awesome 7?

**Decision**: Apply viewBox expansion universally rather than conditionally.

**Rationale**:
- Known overflow icons include: paperclip, and others in the FA7 redesign
- Font Awesome may add more overflow icons in future releases
- Universal application ensures forward compatibility
- Extra viewBox space for non-overflow icons has no visual impact

**Alternatives considered**:
- **Whitelist of overflow icons**: Maintain a list of icons that need expansion. Rejected because it requires maintenance as FA7 evolves and could miss new overflow icons.
- **Detection via icon metadata**: FA doesn't provide overflow metadata in icon definitions.

### 4. Where in the rendering pipeline should viewBox modification occur?

**Decision**: Modify viewBox immediately after receiving the abstract element from fontawesome-svg-core, before any other processing.

**Rationale**:
- The `icon()` function returns an abstract element with viewBox in `abstract[0].attributes.viewBox`
- Modifying early ensures all downstream processing (percentage replacement, color handling) works with correct dimensions
- Current code already parses viewBox for percentage replacement; modification fits naturally before that

**Alternatives considered**:
- **In converter.ts**: Would require passing viewBox info through converter. Rejected because it spreads logic across files.
- **After percentage replacement**: Could cause incorrect percentage calculations. Rejected.

### 5. How should the example app demonstrate the fix?

**Decision**: Add paperclip icon (and potentially others) to the example app's icon rotation.

**Rationale**:
- Paperclip is the canonical example of an overflow icon mentioned in issue #180
- Adding to the existing icon rotation demonstrates the fix works with all features (transforms, masks, colors)
- Visual verification is straightforward: icon should appear complete, not clipped

**Alternatives considered**:
- **Dedicated overflow demo screen**: More complex, adds navigation. Rejected for simplicity.
- **Before/after comparison**: Would require disabling the fix for comparison. Rejected as unnecessary complexity.

### 6. What Font Awesome 7 packages are needed for testing?

**Decision**: Update devDependencies to use @fortawesome/fontawesome-svg-core ^7.x and corresponding icon packages.

**Rationale**:
- The library needs FA7 packages to properly test the overflow fix
- Current devDependencies use ^6.7.2 which doesn't have overflow icons
- peerDependencies already support ~7 but dev/testing should use actual FA7

**Alternatives considered**:
- **Mock overflow icons in tests**: Could create fake icons with paths that overflow. Acceptable for unit tests but doesn't validate real FA7 behavior.
- **Keep FA6 for dev, test FA7 separately**: Complicates testing and CI.

## Implementation Approach Summary

1. **ViewBox Modification Function**: Create a pure function `expandViewBox(viewBox: string): string` that:
   - Parses the viewBox string into [minX, minY, width, height]
   - Subtracts 32 from minY
   - Adds 64 to height
   - Returns the modified viewBox string

2. **Integration Point**: Call `expandViewBox` in `FontAwesomeIcon.tsx` after receiving the abstract element from `icon()`, before the existing viewBox parsing for percentages.

3. **Test Strategy** (TDD):
   - Write failing tests for viewBox expansion function
   - Write failing tests for component rendering with expanded viewBox
   - Implement until tests pass
   - Verify existing tests still pass (regression check)

4. **Example App**:
   - Ensure FA7 icon packages are available
   - Add paperclip to icon factory or demonstrate in App.tsx

5. **Dependency Updates**:
   - peerDependencies: Change `"@fortawesome/fontawesome-svg-core": "~1 || ~6 || ~7"` to `"~7"`
   - devDependencies: Upgrade to FA7 packages for testing
   - README: Document FA7-only requirement and 0.3.x for FA6 users
