import React from 'react'
import convert from '../converter'
import PropTypes from 'prop-types'
import { Dimensions, Text, View, ViewPropTypes } from 'react-native'
import { icon, parse } from '@fortawesome/fontawesome-svg-core'
import log from '../logger'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

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

function resolveColor(style = {}) {
  const {
    // default to black
    color = 'black'
  } = style === null ? {} : style

  return color
}

export default function FontAwesomeIcon(props) {
  const { icon: iconArgs, mask: maskArgs, height, width, style } = props

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

  // This is the color that will be passed to the "color" prop of the Svg element
  const color = resolveColor(style)

  const extraProps = { height, width, color, style }

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

  style: PropTypes.shape({ ...ViewPropTypes.style }),

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
  style: null,
  height: windowHeight * 0.1,
  width: windowWidth * 0.1
}

const convertCurry = convert.bind(null, React.createElement)
