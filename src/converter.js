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
  // console.log(`DEBUG: in convert. element.tag = ${element.tag} and extraProps = `, extraProps)
  // console.log(`DEBUG: in convert. element.attributes = `, element.attributes)

  if (typeof element === 'string') {
    return element
  }
  const children = (element.children || []).map(
    child => {
      return convert(createElement, child, extraProps)
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
          // In the meantime, we're manually peeling off specific style properties, namely color, and passing them down
          // to children as a fill prop
          // See: https://github.com/react-native-community/react-native-svg/commit/e7d0eb6df676d4f63f9eba7c0cf5ddd6c4c85fbe
        case 'xmlns':
          delete element.attributes[key]
          break
        case 'fill':
          // TODO: probably want to keep fill, but just translate 'currentColor' to 'black'
          // When react-native-svg supports currentColor, pass it through
          acc.attrs[key] = val === 'currentColor' ? 'black' : val
          break
        default:
          // console.log(`DEBUG: for element tag <${element.tag}>, setting prop key=val to ${key}=`, val)
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

  const {
    style, // get rid of this key
    ...modifiedExtraProps // store the result here
  } = extraProps

  // If a color was passed in as a style sheet on the style prop, set the fill attribute to its value
  if(extraProps.style && extraProps.style.color){
    modifiedExtraProps['fill'] = extraProps.style.color
  }

  // console.log(`DEBUG: while creating element with tag=${element.tag}, we have extraProps: `, extraProps )
  return createElement(
    svgObjectMap[element.tag],
    { ...mixins.attrs, ...modifiedExtraProps },
    ...children
  )
}

export default convert
