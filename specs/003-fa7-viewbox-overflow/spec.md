# Feature Specification: Font Awesome 7 ViewBox Overflow Fix

**Feature Branch**: `003-fa7-viewbox-overflow`
**Created**: 2026-02-03
**Status**: Draft
**Input**: User description: "Fix issue #180 - modify viewBox after icon AST conversion to allow more space for icons that exceed the viewBox. Subtract 32 from min-y and add 64 to height. Update example app to illustrate the fix. Make 1.x branch Font Awesome 7 compatibility only."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Icons Render Without Clipping (Priority: P1)

A developer using Font Awesome 7 icons in their React Native application needs icons that overflow their standard viewBox (like the "paperclip" icon) to render completely without any visual clipping or cutoff.

**Why this priority**: This is the core problem being solved. Without this fix, certain FA7 icons appear truncated in React Native, breaking the visual integrity of the application.

**Independent Test**: Can be fully tested by rendering a known overflowing icon (paperclip) and visually verifying all parts of the icon are visible without clipping.

**Acceptance Scenarios**:

1. **Given** an icon that overflows its standard 512x512 viewBox (e.g., paperclip), **When** the icon is rendered using FontAwesomeIcon component, **Then** the complete icon is visible without any parts being clipped or cut off.
2. **Given** any Font Awesome 7 icon, **When** the icon is rendered, **Then** the viewBox is automatically expanded (min-y reduced by 32, height increased by 64) to accommodate potential overflow.
3. **Given** a duotone icon that overflows its viewBox, **When** the icon is rendered with both primary and secondary colors, **Then** both layers render completely without clipping.

---

### User Story 2 - Example App Demonstrates ViewBox Fix (Priority: P2)

A developer evaluating or testing the library needs to see concrete evidence that the viewBox fix works correctly by viewing icons in the example application.

**Why this priority**: The example app serves as both documentation and verification that the fix works. It provides a tangible way to test and demonstrate the solution.

**Independent Test**: Can be tested by running the example app and observing icons that are known to overflow render correctly.

**Acceptance Scenarios**:

1. **Given** the example application is running, **When** a developer views the icon grid, **Then** icons known to overflow (such as paperclip) appear complete without visible clipping.
2. **Given** the example application, **When** a developer toggles through various icon display options, **Then** overflowing icons continue to render correctly across all display modes (with/without transforms, masks, etc.).

---

### User Story 3 - Font Awesome 7 Only Compatibility (Priority: P3)

A developer using the 1.x branch of react-native-fontawesome understands that this version is designed specifically for Font Awesome 7, and older Font Awesome versions (6.x and earlier) should use previous library versions.

**Why this priority**: This is a policy/documentation concern rather than a functional requirement. It clarifies the library's compatibility scope and helps developers choose the correct version.

**Independent Test**: Can be tested by verifying package dependencies and documentation clearly indicate FA7-only compatibility.

**Acceptance Scenarios**:

1. **Given** the 1.x branch package.json, **When** a developer reviews the peerDependencies, **Then** only Font Awesome 7.x is listed as a compatible version (removing support for ~1 and ~6).
2. **Given** the library documentation (README), **When** a developer reads about version compatibility, **Then** they clearly understand that 1.x requires Font Awesome 7 and previous versions should be used for FA6 compatibility.

---

### Edge Cases

- What happens when an icon does not overflow its viewBox?
  - The expanded viewBox still accommodates the icon correctly; extra space does not negatively affect rendering.
- What happens when an icon is rendered with transforms (scale, rotate)?
  - The viewBox expansion should apply before transforms, ensuring the full icon is available for transformation.
- What happens when an icon is used as a mask?
  - The viewBox expansion should apply to masked icons as well.
- What happens when percentage-based dimensions are used in the icon SVG?
  - The existing percentage replacement logic continues to work with the expanded viewBox dimensions.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Library MUST modify the viewBox of every rendered icon by subtracting 32 from the min-y value and adding 64 to the height value.
- **FR-002**: Library MUST apply the viewBox modification after the icon is converted to its abstract syntax tree representation.
- **FR-003**: Library MUST preserve all other viewBox values (min-x, width) unchanged.
- **FR-004**: Library MUST handle icons that already have non-zero min-y values correctly (subtracting 32 from the existing value).
- **FR-005**: Example application MUST include icons known to overflow their viewBox to demonstrate the fix visually.
- **FR-006**: Package peerDependencies MUST be updated to support only Font Awesome 7.x (remove ~1 and ~6 compatibility).
- **FR-007**: README MUST be updated to document that 1.x is Font Awesome 7 only and users needing FA6 support should use 0.3.x versions.

### Key Entities

- **ViewBox**: The SVG coordinate system defined by four values: min-x, min-y, width, height. Controls the visible area of the icon.
- **Abstract Element**: The intermediate representation of an icon after parsing by fontawesome-svg-core but before conversion to React Native SVG components.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of Font Awesome 7 icons that overflow their standard viewBox render completely without visible clipping.
- **SC-002**: All existing unit tests continue to pass after the viewBox modification is implemented.
- **SC-003**: Example application displays at least one known overflowing icon (paperclip) correctly when run on iOS and Android simulators.
- **SC-004**: Zero visual regression for icons that do not overflow their viewBox (standard icons remain visually correct).

## Assumptions

- The viewBox expansion values (subtract 32 from min-y, add 64 to height) are sufficient to accommodate all current Font Awesome 7 overflowing icons.
- React Native SVG library correctly handles viewBox values with negative min-y coordinates.
- The viewBox modification does not introduce noticeable performance overhead for icon rendering.
- Developers using Font Awesome 6 will migrate to the 0.3.x branch rather than expecting 1.x to support both versions.
