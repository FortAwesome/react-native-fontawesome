import humps from 'humps'
import { Svg, Path, Rect, Defs, Mask, G, ClipPath } from 'react-native-svg'

const svgObjectMap = {
  "svg": Svg,
  "path": Path,
  "rect": Rect,
  "defs": Defs,
  "mask": Mask,
  "g": G,
  "clipPath": ClipPath
}

function convert(createElement, element, extraProps = {}) {
  if (typeof element === 'string') {
    return element
  }

  const {
    style, // get rid of this key
    ...modifiedExtraProps // store the result here
  } = extraProps

  // If a color was passed in as a style sheet on the style prop, set the fill attribute to its value.
  // This is a prop we'll want to pass down to children as well.
  if(extraProps.style && extraProps.style.color){
    modifiedExtraProps['fill'] = extraProps.style.color
  }

  // We don't want to pass down height/width props to children: they're only intended for the
  // top-level element.
  const {
    height,
    width,
    ...extraPropsForChildren
  } = modifiedExtraProps

  const children = (element.children || []).map(
    child => {
      return convert(createElement, child, extraPropsForChildren)
    }
  )

  const mixins = Object.keys(element.attributes || {}).reduce(
    (acc, key) => {
      const val = element.attributes[key]
      switch(key){
        case 'class':
        case 'role':
        case 'style':
          // TODO: when react-native-svg supports the style prop, there may be a better way to do this.
          // In the meantime, (below) we'll manually peel off any color property passed in via the "style" prop
          // and assign it as the value of the "fill" attribute.
          // See: https://github.com/react-native-community/react-native-svg/commit/e7d0eb6df676d4f63f9eba7c0cf5ddd6c4c85fbe
        case 'xmlns':
          delete element.attributes[key]
          break
        // case 'fill':
        //   // TODO: When react-native-svg supports currentColor, pass it through
        //   // In the meantime, just translate 'currentColor' to 'black'
        //   // See: https://github.com/react-native-community/react-native-svg/commit/1827b918833efdaa25cfc1a76df2164cb2bcdd2b
        //   acc.attrs[key] = val === 'currentColor' ? 'black' : val
        //   break
        default:
          if (key.indexOf('aria-') === 0 || key.indexOf('data-') === 0) {
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
    { ...mixins.attrs, ...modifiedExtraProps },
    ...children
  )
}

export default convert
