# Feature Specification: Port 0.3.x Codebase to 1.x Scaffold

**Feature Branch**: `001-port-0-3-x-codebase`
**Created**: 2026-02-02
**Status**: Draft
**Input**: User description: "Port existing 0.3.x functionality to newly created 1.x scaffold with passing tests"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Render Basic Icons (Priority: P1)

As a React Native developer, I want to render Font Awesome icons in my application so that I can display recognizable iconography to my users.

**Why this priority**: This is the core functionality of the library. Without icon rendering, no other features matter.

**Independent Test**: Can be verified by importing the component and rendering any Font Awesome icon (solid, regular, brands) and confirming visual output matches expected SVG.

**Acceptance Scenarios**:

1. **Given** a React Native application with the component installed, **When** a developer passes a valid icon object to FontAwesomeIcon, **Then** the corresponding SVG icon renders in the view.
2. **Given** a valid icon reference using array format `[prefix, iconName]`, **When** passed to the component, **Then** the icon renders correctly.
3. **Given** a valid icon reference using string format (if supported by fontawesome-svg-core version), **When** passed to the component, **Then** the icon renders correctly.
4. **Given** an invalid or non-existent icon reference, **When** passed to the component, **Then** an error is logged and the component handles gracefully without crashing.

---

### User Story 2 - Customize Icon Appearance (Priority: P2)

As a React Native developer, I want to customize icon size, color, and styles so that icons match my application's design system.

**Why this priority**: Customization is essential for real-world usage but requires basic rendering to work first.

**Independent Test**: Can be verified by rendering icons with various size, color, and style props and confirming visual output matches expectations.

**Acceptance Scenarios**:

1. **Given** a FontAwesomeIcon with a `size` prop, **When** rendered, **Then** the icon displays at the specified pixel dimensions.
2. **Given** a FontAwesomeIcon with a `color` prop, **When** rendered, **Then** the icon renders in the specified color.
3. **Given** a FontAwesomeIcon with a `style` prop containing a color, **When** rendered, **Then** the icon uses the style's color.
4. **Given** a FontAwesomeIcon with both `color` prop and `style.color`, **When** rendered, **Then** the `color` prop takes precedence.
5. **Given** a FontAwesomeIcon with a React Native StyleSheet array as the style prop, **When** rendered, **Then** styles are properly flattened and applied.

---

### User Story 3 - Render Duotone Icons (Priority: P3)

As a React Native developer using Font Awesome Pro, I want to render duotone icons with customizable primary and secondary colors so that I can use Font Awesome's duotone styling features.

**Why this priority**: Duotone is a Pro feature used by paying customers and requires basic rendering and color customization to work first.

**Independent Test**: Can be verified by rendering a duotone icon and confirming both layers display with correct colors and opacity.

**Acceptance Scenarios**:

1. **Given** a duotone icon with default settings, **When** rendered, **Then** the secondary layer displays at 40% opacity.
2. **Given** a duotone icon with a `secondaryColor` prop, **When** rendered, **Then** the secondary layer uses the specified color.
3. **Given** a duotone icon with a `secondaryOpacity` prop, **When** rendered, **Then** the secondary layer uses the specified opacity value.

---

### User Story 4 - Apply Transforms and Masks (Priority: P4)

As a React Native developer, I want to apply Font Awesome power transforms and icon masking so that I can create composite icon effects.

**Why this priority**: Advanced feature that builds on all previous functionality.

**Independent Test**: Can be verified by applying transforms (rotate, flip, grow/shrink) and masks to icons and confirming visual output.

**Acceptance Scenarios**:

1. **Given** a FontAwesomeIcon with a transform string (e.g., "rotate-90"), **When** rendered, **Then** the icon displays with the specified transformation applied.
2. **Given** a FontAwesomeIcon with a transform object, **When** rendered, **Then** the transformation is equivalent to the string form.
3. **Given** a FontAwesomeIcon with a `mask` prop referencing another icon, **When** rendered, **Then** the icon displays masked by the specified mask icon.

---

### Edge Cases

- What happens when an icon reference is undefined or null?
- What happens when fontawesome-svg-core returns no icon data for a valid-looking reference?
- What happens when deprecated `height` or `width` props are used instead of `size`?
- What happens when conflicting transform values are provided?
- What happens when the user has not added any icons to the library?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Component MUST render Font Awesome icons using react-native-svg
- **FR-002**: Component MUST accept icon references in object format `{prefix, iconName}`
- **FR-003**: Component MUST accept icon references in array format `[prefix, iconName]`
- **FR-004**: Component MUST accept icon references in string format when supported by fontawesome-svg-core
- **FR-005**: Component MUST support `size` prop to control icon dimensions (default: 16)
- **FR-006**: Component MUST support `color` prop to control icon color (default: '#000')
- **FR-007**: Component MUST support React Native `style` prop including StyleSheet arrays
- **FR-008**: Component MUST support `secondaryColor` prop for duotone icons
- **FR-009**: Component MUST support `secondaryOpacity` prop for duotone icons (default: 0.4)
- **FR-010**: Component MUST support `transform` prop (string or object format)
- **FR-011**: Component MUST support `mask` and `maskId` props for icon masking
- **FR-012**: Component MUST support `testID` prop for testing purposes
- **FR-013**: Component MUST log errors to console when icon lookup fails (non-production)
- **FR-014**: Component MUST emit deprecation warning when `height` or `width` props are used
- **FR-015**: Component MUST convert Font Awesome abstract SVG format to react-native-svg components
- **FR-016**: Component MUST filter out browser-specific SVG attributes (class, role, xmlns, aria-*, data-*)

### Key Entities

- **FontAwesomeIcon**: The main React component that renders icons
- **IconProp**: The icon reference input (object, array, or string format)
- **Transform**: Transformation specification (string like "rotate-90" or object with numeric values)
- **AbstractElement**: Font Awesome's intermediate SVG representation that gets converted to React Native

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All existing 0.3.x test cases pass in the new 1.x codebase
- **SC-002**: Component renders icons identically to the 0.3.x version (visual regression)
- **SC-003**: The example application from 0.3.x can run using the new component without code changes
- **SC-004**: All icon input formats (object, array, string) produce correct renders
- **SC-005**: Duotone icons render with correct primary/secondary color separation

## Assumptions

- The new 1.x scaffold uses `npm` for package management instead of `yarn`
- The project uses `mise` for Node version management
- TypeScript strict mode compliance will be addressed in a subsequent iteration (not this port)
- The react-native-builder-bob build system in the 1.x scaffold will be used instead of the babel-based dist build from 0.3.x
- Peer dependency version ranges may be updated to reflect current React Native ecosystem
- The example application structure may differ between 0.3.x (Expo-based) and 1.x scaffold

## Out of Scope

- TypeScript strict mode compliance (deferred to future iteration)
- New features not present in 0.3.x
- Changes to the public API
- Performance optimizations
- Documentation updates beyond what's needed for the port
