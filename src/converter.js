import humps from 'humps'
import { Svg, Path, Rect, Defs, Mask, G, ClipPath } from 'react-native-svg'

const svgObjectMap = {
  svg: Svg,
  path: Path,
  rect: Rect,
  defs: Defs,
  mask: Mask,
  g: G,
  clipPath: ClipPath
}

function convert (createElement, element) {
  if (typeof element === 'string') {
    return element
  }

  const children = (element.children || []).map(
    (child, childIndex) => {
      return convert(createElement, child)
    }
  )

  const mixins = Object.keys(element.attributes || {}).reduce(
    (acc, key) => {
      const val = element.attributes[key]
      switch (key) {
        case 'class':
        case 'role':
        case 'xmlns':
          delete element.attributes[key]
          break
        case 'focusable':
          acc.attrs[key] = val === 'true'
          break
        default:
          if (key.indexOf('aria-') === 0 || key.indexOf('data-') === 0 || (key === 'fill' && val === 'currentColor')) {
            delete element.attributes[key]
          } else {
            acc.attrs[humps.camelize(key)] = val
          }
      }
      return acc
    },
    { attrs: {} }
  )

  return createElement(
    svgObjectMap[element.tag],
    { ...mixins.attrs },
    ...children
  )
}

export default convert
