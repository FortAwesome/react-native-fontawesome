import React from 'react'
import convert from '../converter'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { icon, parse } from '@fortawesome/fontawesome-svg-core'
import log from '../logger'

export const DEFAULT_SIZE = 16
export const DEFAULT_COLOR = '#000'
export const DEFAULT_SECONDARY_OPACITY = 0.4

function objectWithKey (key, value) {
  return (Array.isArray(value) && value.length > 0) ||
    (!Array.isArray(value) && value)
    ? { [key]: value }
    : {}
}

function normalizeIconArgs (icon) {
  if (icon && typeof icon === 'object' && icon.prefix && icon.iconName && icon.icon) {
    return icon
  }

  if (parse.icon) {
    return parse.icon(icon)
  }

  if (icon === null) {
    return null
  }

  if (Array.isArray(icon) && icon.length === 2) {
    return { prefix: icon[0], iconName: icon[1] }
  }

  if (typeof icon === 'string') {
    return { prefix: 'fas', iconName: icon }
  }
}

export default function FontAwesomeIcon (props) {
  const _props = {
    icon: null,
    mask: null,
    maskId: null,
    transform: null,
    style: {},
    color: null,
    secondaryColor: null,
    secondaryOpacity: null,
    size: DEFAULT_SIZE,
    ...props
  }

  const { icon: iconArgs, mask: maskArgs, maskId, height, width, size } = _props
  const style = StyleSheet.flatten(_props.style)

  const iconLookup = normalizeIconArgs(iconArgs)
  const transform = objectWithKey(
    'transform',
    typeof _props.transform === 'string'
      ? parse.transform(_props.transform)
      : _props.transform
  )
  const mask = objectWithKey('mask', normalizeIconArgs(maskArgs))

  const renderedIcon = icon(iconLookup, {
    ...transform,
    ...mask,
    maskId
  })

  if (!renderedIcon) {
    log('ERROR: icon not found for icon = ', iconArgs)
    return null
  }

  const { abstract } = renderedIcon

  // This is the color that will be passed to the "fill" prop of the Svg element
  const color = _props.color || (style || {}).color || DEFAULT_COLOR

  // This is the color that will be passed to the "fill" prop of the secondary Path element child (in Duotone Icons)
  // `null` value will result in using the primary color, at 40% opacity
  const secondaryColor = _props.secondaryColor || color

  // Secondary layer opacity should default to 0.4, unless a specific opacity value or a specific secondary color was given
  const secondaryOpacity = _props.secondaryOpacity || DEFAULT_SECONDARY_OPACITY

  // To avoid confusion down the line, we'll remove properties from the StyleSheet, like color, that are being overridden
  // or resolved in other ways, to avoid ambiguity as to which inputs cause which outputs in the underlying rendering process.
  // In other words, we don't want color (for example) to be specified via two different inputs.
  const { color: styleColor, ...modifiedStyle } = (style || {})

  let resolvedHeight, resolvedWidth

  if (height || width) {
    throw new Error(`Prop height and width for component ${FontAwesomeIcon.displayName} have been deprecated. ` +
      `Use the size prop instead like <${FontAwesomeIcon.displayName} size={${width}} />.`)
  } else {
    resolvedHeight = resolvedWidth = size || DEFAULT_SIZE
  }

  const rootAttributes = abstract[0].attributes

  rootAttributes.height = resolvedHeight
  rootAttributes.width = resolvedWidth
  rootAttributes.style = modifiedStyle

  replaceCurrentColor(abstract[0], color, secondaryColor, secondaryOpacity)

  return convertCurry(abstract[0])
}

FontAwesomeIcon.displayName = 'FontAwesomeIcon'

FontAwesomeIcon.propTypes = {

  height: PropTypes.number,

  width: PropTypes.number,

  size: PropTypes.number,

  color: PropTypes.string,

  secondaryColor: PropTypes.string,

  secondaryOpacity: PropTypes.number,

  style: PropTypes.oneOfType([
    PropTypes.shape({ style: PropTypes.any }),
    PropTypes.array
  ]),

  icon: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string
  ]),

  mask: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string
  ]),

  maskId: PropTypes.string,

  transform: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

const convertCurry = convert.bind(null, React.createElement)

function replaceCurrentColor (obj, primaryColor, secondaryColor, secondaryOpacity) {
  (obj.children).forEach((child, childIndex) => {
    replaceFill(child, primaryColor, secondaryColor, secondaryOpacity)

    if (Object.prototype.hasOwnProperty.call(child, 'attributes')) {
      replaceFill(child.attributes, primaryColor, secondaryColor, secondaryOpacity)
    }

    if (Array.isArray(child.children) && child.children.length > 0) {
      replaceCurrentColor(child, primaryColor, secondaryColor, secondaryOpacity)
    }
  })
}

function replaceFill (obj, primaryColor, secondaryColor, secondaryOpacity) {
  if (hasPropertySetToValue(obj, 'fill', 'currentColor')) {
    if (hasPropertySetToValue(obj, 'class', 'fa-primary')) {
      obj.fill = primaryColor
    } else if (hasPropertySetToValue(obj, 'class', 'fa-secondary')) {
      obj.fill = secondaryColor
      obj.fillOpacity = secondaryOpacity
    } else {
      obj.fill = primaryColor
    }
  }
}

function hasPropertySetToValue (obj, property, value) {
  return Object.prototype.hasOwnProperty.call(obj, property) && obj[property] === value
}
