import humps from 'humps';
import { Svg, Path, Rect, Defs, Mask, G, ClipPath } from 'react-native-svg';

interface AbstractElement {
  tag: string;
  attributes?: Record<string, unknown>;
  children?: (AbstractElement | string)[];
}

type CreateElementFn = typeof import('react').createElement;

const svgObjectMap: Record<string, unknown> = {
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
  element: AbstractElement | string
): any {
  if (typeof element === 'string') {
    return element;
  }

  const children = (element.children || []).map((child) => {
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

  return createElement(
    svgObjectMap[element.tag] as React.ComponentType,
    { ...mixins.attrs },
    ...children
  );
}

export default convert;
