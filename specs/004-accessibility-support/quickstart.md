# Quickstart: Accessibility Support

## Overview

This feature adds accessibility support to FontAwesomeIcon by allowing React Native accessibility props and arbitrary passthrough props to be forwarded to the root SVG element.

## Usage Examples

### Basic Accessibility

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';

// Accessible action icon
<FontAwesomeIcon
  icon={faTrash}
  accessibilityLabel="Delete item"
  accessibilityHint="Removes this item from your cart"
  accessibilityRole="button"
/>

// Decorative icon (hidden from screen readers)
<FontAwesomeIcon
  icon={faStar}
  accessible={false}
/>

// Or using ARIA props
<FontAwesomeIcon
  icon={faStar}
  aria-hidden={true}
/>
```

### Stateful Icons

```tsx
// Toggle/checkbox icon with state
<FontAwesomeIcon
  icon={faHeart}
  accessibilityLabel="Favorite"
  accessibilityRole="checkbox"
  accessibilityState={{ checked: isFavorited }}
/>

// Disabled state
<FontAwesomeIcon
  icon={faTrash}
  accessibilityLabel="Delete"
  accessibilityState={{ disabled: true }}
/>
```

### Passthrough Props

```tsx
// For testing frameworks
<FontAwesomeIcon
  icon={faHeart}
  nativeID="favorite-icon"
  testID="favorite-icon-test"
/>

// Touch handling disabled
<FontAwesomeIcon
  icon={faStar}
  pointerEvents="none"
/>

// Custom hit slop
<FontAwesomeIcon
  icon={faTrash}
  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
/>
```

### iOS-Specific

```tsx
// Large content viewer support
<FontAwesomeIcon
  icon={faHeart}
  accessibilityLabel="Favorite"
  accessibilityShowsLargeContentViewer={true}
  accessibilityLargeContentTitle="Add to Favorites"
/>

// Modal context (VoiceOver ignores siblings)
<FontAwesomeIcon
  icon={faClose}
  accessibilityLabel="Close modal"
  accessibilityViewIsModal={true}
/>
```

### Android-Specific

```tsx
// Live region for dynamic updates
<FontAwesomeIcon
  icon={faSpinner}
  accessibilityLabel="Loading"
  accessibilityLiveRegion="polite"
/>

// Exclude from accessibility tree
<FontAwesomeIcon
  icon={faStar}
  importantForAccessibility="no"
/>
```

## Key Points

1. **All React Native accessibility props are supported** - anything that works on a `View` works on `FontAwesomeIcon`

2. **FontAwesomeIcon-specific props take precedence** - if you pass `width` or `height`, the component's internal size handling wins

3. **Backward compatible** - existing code continues to work without changes

4. **Type-safe** - TypeScript provides autocomplete for all accessibility props

## Props Reference

### FontAwesomeIcon-Specific Props (managed internally)

| Prop | Type | Description |
|------|------|-------------|
| `icon` | `IconProp` | Required. The icon to render |
| `size` | `number` | Icon size (default: 16) |
| `color` | `string` | Primary icon color |
| `secondaryColor` | `string` | Duotone secondary color |
| `secondaryOpacity` | `number` | Duotone secondary opacity |
| `mask` | `IconProp` | Masking icon |
| `maskId` | `string` | Mask element ID |
| `transform` | `string \| Transform` | Icon transforms |
| `style` | `ViewStyle` | Style object |

### Passthrough Props (forwarded to SVG)

All props from React Native's `ViewProps` are accepted, including:

- `accessible`, `accessibilityLabel`, `accessibilityHint`, `accessibilityRole`, `accessibilityState`, `accessibilityValue`
- `aria-*` props (`aria-label`, `aria-hidden`, etc.)
- `testID`, `nativeID`
- `pointerEvents`, `hitSlop`
- iOS: `accessibilityLanguage`, `accessibilityViewIsModal`, `accessibilityElementsHidden`
- Android: `accessibilityLabelledBy`, `accessibilityLiveRegion`, `importantForAccessibility`
