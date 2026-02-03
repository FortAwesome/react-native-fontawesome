import React from 'react';
import convert from './converter';
import { StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { icon, parse } from '@fortawesome/fontawesome-svg-core';
import type {
  Transform,
  IconProp,
  IconPrefix,
  IconName,
  IconLookup as FAIconLookup,
  IconDefinition as FAIconDefinition,
} from '@fortawesome/fontawesome-svg-core';
import log from './logger';

export const DEFAULT_SIZE = 16;
export const DEFAULT_COLOR = '#000';
export const DEFAULT_SECONDARY_OPACITY = 0.4;

export type FontAwesomeIconStyle = StyleProp<ViewStyle> & {
  color?: string;
};

export interface Props {
  icon: IconProp;
  /** @deprecated Use size instead */
  height?: number;
  /** @deprecated Use size instead */
  width?: number;
  size?: number;
  color?: string;
  secondaryColor?: string;
  secondaryOpacity?: number;
  mask?: IconProp;
  maskId?: string;
  transform?: string | Transform;
  style?: FontAwesomeIconStyle;
  testID?: string;
}

type IconLookupOrDefinition = FAIconLookup | FAIconDefinition;

interface AbstractElement {
  tag: string;
  attributes: Record<string, unknown>;
  children?: (AbstractElement | string)[];
}

function objectWithKey(
  key: string,
  value: unknown
): Record<string, unknown> | Record<string, never> {
  return (Array.isArray(value) && value.length > 0) ||
    (!Array.isArray(value) && value)
    ? { [key]: value }
    : {};
}

function normalizeIconArgs(
  iconArg: IconProp | null | undefined
): IconLookupOrDefinition | null {
  // If it's a full icon definition object (with prefix, iconName, and icon array),
  // return it as-is so icon() can use it directly
  if (
    iconArg &&
    typeof iconArg === 'object' &&
    'prefix' in iconArg &&
    'iconName' in iconArg &&
    'icon' in iconArg
  ) {
    return iconArg as FAIconDefinition;
  }

  if ((parse as { icon?: (icon: IconProp) => FAIconLookup }).icon) {
    return (parse as { icon: (icon: IconProp) => FAIconLookup }).icon(
      iconArg as IconProp
    );
  }

  if (iconArg === null) {
    return null;
  }

  if (Array.isArray(iconArg) && iconArg.length === 2) {
    return {
      prefix: iconArg[0] as IconPrefix,
      iconName: iconArg[1] as IconName,
    };
  }

  if (typeof iconArg === 'string') {
    return { prefix: 'fas' as IconPrefix, iconName: iconArg as IconName };
  }

  return null;
}

export default function FontAwesomeIcon(
  props: Props
): React.ReactElement | null {
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
  const style = StyleSheet.flatten(styleInput) as Record<
    string,
    unknown
  > | null;

  const iconLookup = normalizeIconArgs(iconArgs);
  const transform = objectWithKey(
    'transform',
    typeof transformInput === 'string'
      ? parse.transform(transformInput)
      : transformInput
  );
  const mask = objectWithKey('mask', normalizeIconArgs(maskArgs));

  const renderedIcon = icon(iconLookup as IconLookupOrDefinition, {
    ...transform,
    ...mask,
    maskId: maskId ?? undefined,
  });

  if (!renderedIcon) {
    log('ERROR: icon not found for icon = ', iconArgs);
    return null;
  }

  const { abstract } = renderedIcon;

  // This is the color that will be passed to the "fill" prop of the Svg element
  const color = colorInput || (style || {}).color || DEFAULT_COLOR;

  // This is the color that will be passed to the "fill" prop of the secondary Path element child (in Duotone Icons)
  // `null` value will result in using the primary color, at 40% opacity
  const secondaryColor = secondaryColorInput || color;

  // Secondary layer opacity should default to 0.4, unless a specific opacity value or a specific secondary color was given
  const secondaryOpacity = secondaryOpacityInput || DEFAULT_SECONDARY_OPACITY;

  // To avoid confusion down the line, we'll remove properties from the StyleSheet, like color, that are being overridden
  // or resolved in other ways, to avoid ambiguity as to which inputs cause which outputs in the underlying rendering process.
  // In other words, we don't want color (for example) to be specified via two different inputs.
  // Intentionally extract and discard color from style to avoid ambiguity
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { color: _styleColor, ...modifiedStyle } = style || {};

  let resolvedHeight: number;
  let resolvedWidth: number;

  if (height || width) {
    throw new Error(
      `Prop height and width for component ${FontAwesomeIcon.displayName} have been deprecated. ` +
        `Use the size prop instead like <${FontAwesomeIcon.displayName} size={${width}} />.`
    );
  } else {
    resolvedHeight = resolvedWidth = size || DEFAULT_SIZE;
  }

  const rootAttributes = (abstract[0] as AbstractElement).attributes;

  rootAttributes.height = resolvedHeight;
  rootAttributes.width = resolvedWidth;
  rootAttributes.style = modifiedStyle;

  replaceCurrentColor(
    abstract[0] as AbstractElement,
    color as string,
    secondaryColor as string,
    secondaryOpacity
  );

  // Parse viewBox to get dimensions for percentage replacement
  // viewBox format: "minX minY width height" e.g., "0 0 512 512"
  const viewBox = rootAttributes.viewBox as string | undefined;
  if (viewBox) {
    const parts = viewBox.split(' ').map(Number);
    if (parts.length === 4) {
      const vbWidth = parts[2];
      const vbHeight = parts[3];
      if (vbWidth !== undefined && vbHeight !== undefined) {
        replacePercentages(abstract[0] as AbstractElement, vbWidth, vbHeight);
      }
    }
  }

  return convertCurry(abstract[0] as AbstractElement);
}

FontAwesomeIcon.displayName = 'FontAwesomeIcon';

const convertCurry = convert.bind(null, React.createElement);

function replaceCurrentColor(
  obj: AbstractElement,
  primaryColor: string,
  secondaryColor: string,
  secondaryOpacity: number
): void {
  (obj.children || []).forEach((child) => {
    if (typeof child === 'string') return;

    replaceFill(child, primaryColor, secondaryColor, secondaryOpacity);

    if (Object.prototype.hasOwnProperty.call(child, 'attributes')) {
      replaceFill(
        child.attributes,
        primaryColor,
        secondaryColor,
        secondaryOpacity
      );
    }

    if (Array.isArray(child.children) && child.children.length > 0) {
      replaceCurrentColor(
        child,
        primaryColor,
        secondaryColor,
        secondaryOpacity
      );
    }
  });
}

function replaceFill(
  obj: Record<string, unknown> | AbstractElement,
  primaryColor: string,
  secondaryColor: string,
  secondaryOpacity: number
): void {
  if (hasPropertySetToValue(obj, 'fill', 'currentColor')) {
    if (hasPropertySetToValue(obj, 'class', 'fa-primary')) {
      (obj as Record<string, unknown>).fill = primaryColor;
    } else if (hasPropertySetToValue(obj, 'class', 'fa-secondary')) {
      (obj as Record<string, unknown>).fill = secondaryColor;
      (obj as Record<string, unknown>).fillOpacity = secondaryOpacity;
    } else {
      (obj as Record<string, unknown>).fill = primaryColor;
    }
  }
}

function hasPropertySetToValue(
  obj: Record<string, unknown> | AbstractElement,
  property: string,
  value: unknown
): boolean {
  return (
    Object.prototype.hasOwnProperty.call(obj, property) &&
    (obj as Record<string, unknown>)[property] === value
  );
}

/**
 * react-native-svg has issues with percentage values like "100%" in masks and rects.
 * This function replaces percentage values with actual numeric values based on the viewBox.
 */
function replacePercentages(
  obj: AbstractElement,
  viewBoxWidth: number,
  viewBoxHeight: number
): void {
  const attrs = obj.attributes as Record<string, unknown> | undefined;
  if (attrs) {
    if (attrs.width === '100%') {
      attrs.width = viewBoxWidth;
    }
    if (attrs.height === '100%') {
      attrs.height = viewBoxHeight;
    }
  }

  (obj.children || []).forEach((child) => {
    if (typeof child !== 'string') {
      replacePercentages(child, viewBoxWidth, viewBoxHeight);
    }
  });
}
