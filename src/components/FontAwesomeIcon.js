import React from 'react'
import convert from '../converter'
import PropTypes from 'prop-types'
import { Dimensions, Text, View } from 'react-native'
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

export default function FontAwesomeIcon(props) {
  const { icon: iconArgs, height = windowHeight * 0.1, width  = windowWidth * 0.1 } = props

  const iconLookup = normalizeIconArgs(iconArgs)

  const renderedIcon = icon(iconLookup, {})

  if (!renderedIcon) {
    log("ERROR: icon not found for icon = ", iconArgs)
    return null
  }

  const { abstract } = renderedIcon
  const extraProps = { height, width }

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

  icon: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string
  ])
}

FontAwesomeIcon.defaultProps = {
  icon: null
}

const convertCurry = convert.bind(null, React.createElement)
