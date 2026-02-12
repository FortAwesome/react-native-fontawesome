import type React from 'react';
import humps from 'humps';
import { Svg, Path, Rect, Defs, Mask, G, ClipPath } from 'react-native-svg';

interface AbstractElement {
  tag: string;
  attributes?: Record<string, unknown>;
  children?: (AbstractElement | string)[];
}

type CreateElementFn = typeof import('react').createElement;

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- required for dynamic component lookup from FA abstract elements
const svgObjectMap: Record<string, React.ComponentType<any>> = {
  svg: Svg,
  path: Path,
  rect: Rect,
  defs: Defs,
  mask: Mask,
  g: G,
  clipPath: ClipPath,
};

function convert(
  createElement: CreateElementFn,
  element: AbstractElement | string,
  extraProps?: Record<string, unknown>
): React.ReactNode {
  if (typeof element === 'string') {
    return element;
  }

  const children = (element.children || []).map((child) => {
    // extraProps only apply to root element, not children
    return convert(createElement, child);
  });

  const mixins = Object.keys(element.attributes || {}).reduce(
    (acc, key) => {
      const val = (element.attributes as Record<string, unknown>)[key];
      switch (key) {
        case 'class':
        case 'role':
        case 'xmlns':
          delete (element.attributes as Record<string, unknown>)[key];
          break;
        case 'focusable':
          acc.attrs[key] = val === 'true';
          break;
        default:
          if (
            key.indexOf('aria-') === 0 ||
            key.indexOf('data-') === 0 ||
            (key === 'fill' && val === 'currentColor')
          ) {
            delete (element.attributes as Record<string, unknown>)[key];
          } else {
            acc.attrs[humps.camelize(key)] = val;
          }
      }
      return acc;
    },
    { attrs: {} as Record<string, unknown> }
  );

  // Merge extraProps (user-provided props) with processed attributes
  // extraProps come first, then mixins.attrs override (FA attrs take precedence)
  const finalProps = extraProps
    ? { ...extraProps, ...mixins.attrs }
    : mixins.attrs;

  return createElement(
    svgObjectMap[element.tag] as React.ComponentType,
    finalProps,
    ...children
  );
}

export default convert;
