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
  if(extraProps.style && extraProps.style.color){
    modifiedExtraProps['color'] = extraProps.style.color
  } else {
    // Default to black
    modifiedExtraProps['color'] = 'black'
  }

  // We don't want to pass down height/width props to children: they're only intended for the
  // top-level element.
  // const {
  //   height,
  //   width,
  //   ...extraPropsForChildren
  // } = modifiedExtraProps

  const children = (element.children || []).map(
    child => {
      return convert(createElement, child, {})
    }
  )

  const mixins = Object.keys(element.attributes || {}).reduce(
    (acc, key) => {
      const val = element.attributes[key]
      switch(key){
        case 'class':
        case 'role':
        case 'style':
        case 'xmlns':
          delete element.attributes[key]
          break
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
