import humps from 'humps'

function capitalize(val) {
  return val.charAt(0).toUpperCase() + val.slice(1)
}

function convert(createElement, element, extraProps = {}) {
  if (typeof element === 'string') {
    return element
  }
  const children = (element.children || []).map(
    convert.bind(null, createElement)
  )

  const mixins = Object.keys(element.attributes || {}).reduce(
    (acc, key) => {
      const val = element.attributes[key]
      switch(key){
        case 'style':
        case 'class':
        case 'role':
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
    humps.pascalize(element.tag),
    { ...mixins.attrs, ...extraProps },
    ...children
  )
}

export default convert
