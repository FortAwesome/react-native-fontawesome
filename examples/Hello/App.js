import React from 'react'
import { Dimensions, StyleSheet, Text, ScrollView } from 'react-native'
import { Svg, Path, ClipPath, Defs, Mask, G, Rect } from 'react-native-svg'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faBeer } from '@fortawesome/free-solid-svg-icons'

const { width, height } = Dimensions.get('window')

export default class App extends React.Component {
  render() {
    return (
      <ScrollView style={styles.contentContainer}>
        <Text>Show me some icons:</Text>
        <FontAwesomeIcon icon={ faCoffee } />
        <FontAwesomeIcon icon={ faBeer } />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 50,
    marginLeft: 20
  },
})
