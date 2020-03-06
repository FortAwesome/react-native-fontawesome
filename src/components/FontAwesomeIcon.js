import React from 'react'
import convert from '../converter'
import PropTypes from 'prop-types'
import { Dimensions, ViewPropTypes, StyleSheet } from 'react-native'
import { icon, parse } from '@fortawesome/fontawesome-svg-core'
import log from '../logger'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export const DEFAULT_SIZE = 16
export const DEFAULT_COLOR = '#000'

// Deprecated height and width defaults
const DEFAULT_HEIGHT = windowHeight * 0.1
const DEFAULT_WIDTH = windowWidth * 0.1

function objectWithKey(key, value) {
  return (Array.isArray(value) && value.length > 0) ||
    (!Array.isArray(value) && value)
    ? { [key]: value }
    : {}
}

function normalizeIconArgs(icon) {
  if (icon === null) {
    return null
  }

  if (typeof icon === 'object' && icon.prefix && icon.iconName) {
    return icon
  }

  if (Array.isArray(icon) && icon.length === 2) {
    return { prefix: icon[0], iconName: icon[1] }
  }

  if (typeof icon === 'string') {
    return { prefix: 'fas', iconName: icon }
  }
}

export default function FontAwesomeIcon(props) {
  const { icon: iconArgs, mask: maskArgs, height, width, size } = props
  const style = StyleSheet.flatten(props.style)

  const iconLookup = normalizeIconArgs(iconArgs)
  const transform = objectWithKey(
    'transform',
    typeof props.transform === 'string'
      ? parse.transform(props.transform)
      : props.transform
  )
  const mask = objectWithKey('mask', normalizeIconArgs(maskArgs))
  const renderedIcon = icon(iconLookup, {
    ...transform,
    ...mask
  })

  if (!renderedIcon) {
    log("ERROR: icon not found for icon = ", iconArgs)
    return null
  }

  const { abstract } = renderedIcon

  // This is the color that will be passed to the "fill" prop of the Svg element
  const color = props.color || style.color || DEFAULT_COLOR

  // To avoid confusion down the line, we'll remove properties from the StyleSheet, like color, that are being overridden
  // or resolved in other ways, to avoid ambiguity as to which inputs cause which outputs in the underlying rendering process.
  // In other words, we don't want color (for example) to be specified via two different inputs.
  const { color: styleColor, ...modifiedStyle} = style

  let resolvedHeight, resolvedWidth

  if(height || width){
    if(size) {
      console.warn(`DEPRECATION: height and width props on ${FontAwesomeIcon.displayName} have been deprecated.  ` +
        `Since you've also provided a size prop, we'll use it to override the height and width props given.  ` +
        `You should probably go ahead and remove the height and width props to avoid confusion and resolve this warning.`)
      resolvedHeight = resolvedWidth = size
    } else {
      console.warn(`DEPRECATION: height and width props on ${FontAwesomeIcon.displayName} have been deprecated.  ` +
        `Use the size prop instead.`)
      resolvedHeight = height || DEFAULT_HEIGHT
      resolvedWidth = width || DEFAULT_WIDTH
    }
  } else {
    resolvedHeight = resolvedWidth = size || DEFAULT_SIZE
  }

  const extraProps = { height: resolvedHeight, width: resolvedWidth, fill: color, style: modifiedStyle }

  Object.keys(props).forEach(key => {
    if (!FontAwesomeIcon.defaultProps.hasOwnProperty(key)) {
      extraProps[key] = props[key]
    }
  })

  return convertCurry(abstract[0], extraProps)
}

FontAwesomeIcon.displayName = 'FontAwesomeIcon'

FontAwesomeIcon.propTypes = {

  height: PropTypes.number,

  width: PropTypes.number,

  size: PropTypes.number,

  color: PropTypes.string,

  style: PropTypes.oneOfType([
    PropTypes.shape({ ...ViewPropTypes.style }),
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

  transform: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

FontAwesomeIcon.defaultProps = {
  icon: null,
  mask: null,
  transform: null,
  style: {},
  color: null,
  height: undefined,
  width: undefined,
  // Once the deprecation of height and width props is complete, let's put the real default prop value for size here.
  // For now, adding it breaks the default/override logic for height/width/size.
}

const convertCurry = convert.bind(null, React.createElement)
