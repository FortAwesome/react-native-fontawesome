# Data Model: Port 0.3.x Codebase to 1.x Scaffold

**Date**: 2026-02-02
**Feature**: 001-port-0-3-x-codebase

## Overview

This document describes the data structures and types used by the FontAwesomeIcon component. Since this is a stateless React component, the "data model" consists of prop types, internal data transformations, and the abstract SVG representation from fontawesome-svg-core.

## Type Definitions

### Props Interface

The public API for the FontAwesomeIcon component:

```typescript
import { StyleProp, ViewStyle } from 'react-native';
import { Transform, IconProp } from '@fortawesome/fontawesome-svg-core';

/**
 * Extended style type that includes color for icon styling
 */
export type FontAwesomeIconStyle = StyleProp<ViewStyle> & {
  color?: string;
};

/**
 * Props for the FontAwesomeIcon component
 */
export interface FontAwesomeIconProps {
  /** The icon to render (required) */
  icon: IconProp;

  /** @deprecated Use size instead */
  height?: number;

  /** @deprecated Use size instead */
  width?: number;

  /** Icon size in pixels (default: 16) */
  size?: number;

  /** Primary icon color (default: '#000') */
  color?: string;

  /** Secondary color for duotone icons */
  secondaryColor?: string;

  /** Secondary layer opacity for duotone icons (default: 0.4) */
  secondaryOpacity?: number;

  /** Mask icon for compositing */
  mask?: IconProp;

  /** ID for the mask element */
  maskId?: string;

  /** Transform string or object (e.g., "shrink-9 right-4") */
  transform?: string | Transform;

  /** React Native styles */
  style?: FontAwesomeIconStyle;

  /** Test ID for testing frameworks */
  testID?: string;
}
```

### Internal Types

Types used internally by the component:

```typescript
/**
 * Normalized icon lookup format
 * Produced by normalizeIconArgs from various input formats
 */
interface IconLookup {
  prefix: string;
  iconName: string;
}

/**
 * Abstract SVG element from fontawesome-svg-core
 * This is the intermediate representation before conversion to RN-SVG
 */
interface AbstractElement {
  tag: string;
  attributes: Record<string, any>;
  children?: (AbstractElement | string)[];
}

/**
 * Result from fontawesome-svg-core icon() function
 */
interface IconResult {
  abstract: AbstractElement[];
  // ... other properties not used by this component
}
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     FontAwesomeIcon Props                       │
│  icon, size, color, secondaryColor, transform, mask, style      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    normalizeIconArgs()                          │
│  Converts IconProp (object|array|string) → IconLookup          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│               fontawesome-svg-core icon()                       │
│  IconLookup + transform + mask → IconResult                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   replaceCurrentColor()                         │
│  Mutates abstract tree to apply primary/secondary colors        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      converter()                                │
│  AbstractElement → React Native SVG elements (Svg, Path, etc.) │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    React Native View                            │
│  <Svg><G><Path>...</Path></G></Svg>                            │
└─────────────────────────────────────────────────────────────────┘
```

## Constants

```typescript
/** Default icon size in pixels */
export const DEFAULT_SIZE = 16;

/** Default icon color */
export const DEFAULT_COLOR = '#000';

/** Default opacity for secondary layer in duotone icons */
export const DEFAULT_SECONDARY_OPACITY = 0.4;
```

## SVG Element Mapping

The converter maps Font Awesome's abstract SVG tags to react-native-svg components:

| Abstract Tag | RN-SVG Component |
|--------------|------------------|
| `svg`        | `Svg`           |
| `path`       | `Path`          |
| `rect`       | `Rect`          |
| `defs`       | `Defs`          |
| `mask`       | `Mask`          |
| `g`          | `G`             |
| `clipPath`   | `ClipPath`      |

## Attribute Transformations

The converter performs these attribute transformations:

1. **Removed attributes**: `class`, `role`, `xmlns`, `aria-*`, `data-*`
2. **Special handling**: `focusable` converted to boolean
3. **Camelization**: All other attributes converted via humps (e.g., `fill-opacity` → `fillOpacity`)
4. **Fill replacement**: `fill="currentColor"` removed (color applied separately)

## Color Resolution Priority

When determining icon color:

1. `color` prop (highest priority)
2. `style.color`
3. `DEFAULT_COLOR` ('#000')

For duotone secondary color:

1. `secondaryColor` prop
2. Falls back to primary color with `secondaryOpacity`
