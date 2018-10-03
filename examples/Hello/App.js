import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Svg, Path } from 'react-native-svg'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faCoffee)
const { width, height } = Dimensions.get('window')
// console.log("DEBUG: width, height", width, height)

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Show me coffee:</Text>
        <FontAwesomeIcon icon={ ['fas', 'coffee'] } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
