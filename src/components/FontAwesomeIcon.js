import React from 'react'
import convert from '../converter'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { icon, parse } from '@fortawesome/fontawesome-svg-core'

function objectWithKey(key, value) {
  return (Array.isArray(value) && value.length > 0) ||
    (!Array.isArray(value) && value)
    ? { [key]: value }
    : {}
}

function classList(props) {
  let classes = {
    'fa-spin': props.spin,
    'fa-pulse': props.pulse,
    'fa-fw': props.fixedWidth,
    'fa-inverse': props.inverse,
    'fa-border': props.border,
    'fa-li': props.listItem,
    'fa-flip-horizontal': props.flip === 'horizontal' || props.flip === 'both',
    'fa-flip-vertical': props.flip === 'vertical' || props.flip === 'both',
    [`fa-${props.size}`]: props.size !== null,
    [`fa-rotate-${props.rotation}`]: props.rotation !== null,
    [`fa-pull-${props.pull}`]: props.pull !== null
  }

  return Object.keys(classes)
    .map(key => (classes[key] ? key : null))
    .filter(key => key)
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
  const { icon: iconArgs } = props

  const iconLookup = normalizeIconArgs(iconArgs)

  const renderedIcon = icon(iconLookup, {})

  if (!renderedIcon) {
    console.log("DEBUG: could not find icon")
    return null
  }

  const { abstract } = renderedIcon
  const extraProps = {}

  // Object.keys(props).forEach(key => {
  //   if (!FontAwesomeIcon.defaultProps.hasOwnProperty(key)) {
  //     extraProps[key] = props[key]
  //   }
  // })

  return convertCurry(abstract[0], extraProps)
  // return (
  //   <View>
  //     <Text>pure component Icon from JSX here</Text>
  //   </View>
  // )
}

const convertCurry = convert.bind(null, React.createElement)
