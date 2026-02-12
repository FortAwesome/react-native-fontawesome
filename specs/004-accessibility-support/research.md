# Research: Accessibility Support

**Feature**: 004-accessibility-support
**Date**: 2026-02-03

## Research Questions

### Q1: How does react-native-svg handle accessibility props?

**Decision**: react-native-svg's `Svg` component inherits from React Native's `ViewProps`, which includes all accessibility props.

**Rationale**: Examined `node_modules/react-native-svg/lib/typescript/elements/Svg.d.ts`:
```typescript
export interface SvgProps extends GProps, ViewProps, HitSlop {
  // SvgProps includes ViewProps which has all RN accessibility props
}
```

The `ViewProps` type (from `react-native-svg/lib/typescript/fabric/utils.d.ts`) is derived from React Native's `ViewProps`:
```typescript
type ViewProps = Omit<VP, 'pointerEvents' | 'hitSlop'>;
```

This means any accessibility props passed to an `Svg` component will be forwarded to the native view.

**Alternatives considered**: None - this is the only path through react-native-svg.

---

### Q2: What props does the current FontAwesomeIcon component explicitly extract?

**Decision**: The current component extracts these props via destructuring:
- `icon` (required)
- `mask`
- `maskId`
- `height` (deprecated)
- `width` (deprecated)
- `size`
- `style`
- `color`
- `secondaryColor`
- `secondaryOpacity`
- `transform`
- `testID` (defined in interface but not destructured)

**Rationale**: From `src/FontAwesomeIcon.tsx` lines 101-113:
```typescript
const {
  icon: iconArgs,
  mask: maskArgs,
  maskId = null,
  height,
  width,
  size = DEFAULT_SIZE,
  style: styleInput = {},
  color: colorInput = null,
  secondaryColor: secondaryColorInput = null,
  secondaryOpacity: secondaryOpacityInput = null,
  transform: transformInput = null,
} = props;
```

**Alternatives considered**: N/A - factual code analysis.

---

### Q3: What is the best TypeScript pattern for prop passthrough while maintaining type safety?

**Decision**: Use intersection type with `Omit` to extend `SvgProps` while avoiding conflicts with FontAwesomeIcon's own props.

**Rationale**: The pattern is:
```typescript
import type { SvgProps } from 'react-native-svg';

// Props FontAwesomeIcon manages internally
interface FontAwesomeIconOwnProps {
  icon: IconProp;
  size?: number;
  color?: string;
  // ... other FA-specific props
}

// Omit conflicting props from SvgProps (like width, height, color)
type PassthroughProps = Omit<SvgProps, keyof FontAwesomeIconOwnProps | 'width' | 'height' | 'color'>;

// Final exported props type
export interface Props extends FontAwesomeIconOwnProps, PassthroughProps {}
```

Then in the component:
```typescript
function FontAwesomeIcon(props: Props) {
  const { icon, size, color, /* other FA props */, ...restProps } = props;
  // ...
  rootAttributes = { ...restProps, ...rootAttributes };
  // or spread restProps first so FA props take precedence
}
```

**Alternatives considered**:
1. **Generic passthrough with `Record<string, unknown>`**: Rejected - loses type safety
2. **Explicit enumeration of all accessibility props**: Rejected - maintenance burden, doesn't solve general passthrough
3. **Separate `svgProps` prop**: Rejected - poor DX, non-standard pattern

---

### Q4: Does the converter.ts currently strip accessibility-related attributes?

**Decision**: Yes, the converter strips `aria-*` and `data-*` attributes from the abstract elements.

**Rationale**: From `src/converter.ts` lines 49-54:
```typescript
if (
  key.indexOf('aria-') === 0 ||
  key.indexOf('data-') === 0 ||
  (key === 'fill' && val === 'currentColor')
) {
  delete (element.attributes as Record<string, unknown>)[key];
}
```

**Action required**: This stripping is for attributes coming from Font Awesome's SVG-to-abstract conversion, NOT for user-provided props. User-provided accessibility props should be passed directly to the root Svg element, bypassing the converter's attribute processing.

**Alternatives considered**:
1. Modify converter to preserve aria-* attributes: Not recommended - the abstract element comes from fontawesome-svg-core and shouldn't have user accessibility props
2. Pass user props separately to root element: **Selected** - clean separation of concerns

---

### Q5: How should conflicting props be handled (e.g., user passes `viewBox`)?

**Decision**: FontAwesomeIcon's internally computed props take precedence over passthrough props by spreading passthrough props first.

**Rationale**: The implementation pattern:
```typescript
const rootAttributes = {
  ...restProps,           // User's passthrough props (lowest precedence)
  ...(abstract[0].attributes),  // FA-generated attributes
  height: resolvedHeight,       // FA-computed (highest precedence)
  width: resolvedWidth,
  style: modifiedStyle,
};
```

This ensures:
1. Accessibility props (from restProps) are applied
2. FA-generated attributes override any conflicting passthrough
3. Explicitly computed values (height, width, style) have highest precedence

**Alternatives considered**:
1. User props override FA props: Rejected - could break icon rendering
2. Error on conflicting props: Rejected - overly restrictive, poor DX
3. Deep merge: Rejected - complexity not warranted

---

### Q6: What about the `testID` prop currently defined but not used?

**Decision**: Remove explicit `testID` from the Props interface since it will be covered by `SvgProps` passthrough.

**Rationale**: `testID` is a standard React Native prop that's part of `ViewProps`, which is included in `SvgProps`. With the passthrough pattern, `testID` will work automatically.

**Alternatives considered**: Keep explicit `testID` for documentation purposes - rejected as redundant.

---

## Summary of Implementation Approach

1. **Type changes in FontAwesomeIcon.tsx**:
   - Import `SvgProps` from react-native-svg
   - Create `FontAwesomeIconOwnProps` for FA-specific props
   - Create `Props` as intersection, omitting conflicting keys from `SvgProps`
   - Remove standalone `testID` (covered by SvgProps)

2. **Runtime changes in FontAwesomeIcon.tsx**:
   - Destructure known props, collect rest into `...restProps`
   - Spread `restProps` into root element attributes (before FA-computed values)
   - Ensure `testID` from restProps reaches the Svg element

3. **No changes needed in converter.ts**:
   - The aria-* stripping is for FA abstract elements, not user props
   - User props bypass the converter entirely

4. **Test additions**:
   - Test accessibility props are forwarded (accessibilityLabel, accessibilityRole, etc.)
   - Test arbitrary props are forwarded (nativeID, pointerEvents)
   - Test FA-specific props take precedence over passthrough
   - Test existing behavior unchanged (backward compatibility)
