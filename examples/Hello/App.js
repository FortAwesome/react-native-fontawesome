import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Svg, Path } from 'react-native-svg'

const { width, height } = Dimensions.get('window')
console.log("DEBUG: width, height", width, height)

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Svg height={ height * 0.1 } width={ width * 0.1 } viewBox="0 0 640 512" >
          <Path
            d="M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z"
          />
        </Svg>
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
