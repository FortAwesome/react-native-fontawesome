# Data Model: Font Awesome 7 ViewBox Overflow Fix

**Feature**: 003-fa7-viewbox-overflow
**Date**: 2026-02-03

## Overview

This feature does not introduce new data entities. It modifies existing data structures during icon rendering.

## Existing Entities (Reference)

### ViewBox

The SVG viewBox attribute as a string, defining the coordinate system for icon rendering.

**Format**: `"minX minY width height"` (space-separated numbers)

**Standard values**:
- Most icons: `"0 0 512 512"`
- Wide icons: `"0 0 640 512"`, `"0 0 576 512"`, etc.

**Modified values** (after this feature):
- Standard icon: `"0 -32 512 576"` (minY reduced by 32, height increased by 64)
- Wide icon: `"0 -32 640 576"` (same adjustment)

### AbstractElement

The intermediate representation returned by `@fortawesome/fontawesome-svg-core`'s `icon()` function.

```typescript
interface AbstractElement {
  tag: string;                              // "svg", "path", "g", etc.
  attributes: Record<string, unknown>;      // includes viewBox for root SVG
  children?: (AbstractElement | string)[];  // nested elements
}
```

**Relevant attribute**: `attributes.viewBox` on the root SVG element

## Data Transformations

### ViewBox Expansion

**Input**: Original viewBox from fontawesome-svg-core
**Output**: Expanded viewBox with overflow accommodation

| Field | Original | Transformation | Result |
|-------|----------|----------------|--------|
| minX | 0 | unchanged | 0 |
| minY | 0 | subtract 32 | -32 |
| width | 512 | unchanged | 512 |
| height | 512 | add 64 | 576 |

**Example**:
```
Input:  "0 0 512 512"
Output: "0 -32 512 576"

Input:  "0 0 640 512"
Output: "0 -32 640 576"

Input:  "0 -10 512 532"  (hypothetical pre-adjusted icon)
Output: "0 -42 512 596"
```

## Validation Rules

1. ViewBox MUST be a valid string with 4 space-separated numbers
2. All numbers MUST be parseable as integers or floats
3. Width and height MUST remain positive after transformation
4. The transformation MUST be idempotent when applied to already-expanded viewBox values (though in practice it's only applied once per render)

## State Transitions

N/A - This feature involves stateless transformation during render, not state management.
