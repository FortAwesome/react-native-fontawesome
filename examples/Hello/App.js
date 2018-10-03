import React from 'react'
import { Dimensions, StyleSheet, Text, ScrollView } from 'react-native'
import { Svg, Path } from 'react-native-svg'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { fas } from '@fortawesome/pro-solid-svg-icons'
import { far } from '@fortawesome/pro-regular-svg-icons'
import { fal } from '@fortawesome/pro-light-svg-icons'

const { width, height } = Dimensions.get('window')

export default class App extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Show me the icons:</Text>
        {
         Object.keys(fas).map(icon => {
           return <FontAwesomeIcon key={`fas-${fas[icon].iconName}`} icon={ fas[icon] }/>
         })
        }
        {
         Object.keys(far).map(icon => {
           return <FontAwesomeIcon key={`far-${far[icon].iconName}`} icon={ far[icon] }/>
         })
        }
        {
         Object.keys(fal).map(icon => {
           return <FontAwesomeIcon key={`fal-${fal[icon].iconName}`} icon={ fal[icon] }/>
         })
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  },
})
