import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faBeer, faCircle, faCheck } from '@fortawesome/free-solid-svg-icons'
import SampleRNSVGMaskedIcon from './SampleRNSVGMaskedIcon'
import SampleRNSVGPlainIcon from './SampleRNSVGPlainIcon'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to react-native-fontawesome!</Text>
      <Text style={styles.instructions}>To get started, edit App.js</Text>
      <Text style={styles.instructions}>{instructions}</Text>
      <Text style={styles.instructions}>And now, for some icons:</Text>

      <Text>Default style</Text>
      <FontAwesomeIcon icon={ faCoffee } />

      <Text>Icon with different color:</Text>
      <FontAwesomeIcon icon={ faBeer } style={ styles.icon } />

      <Text>Icon with mask and transform:</Text>
      <FontAwesomeIcon icon={ faCheck } mask={ faCircle } transform="shrink-5" />

      {
        // Uncomment to render an icon that uses the react-native-svg elements directly.
        // For comparison.
        // SampleRNSVGPlainIcon
      }
      {
        // Uncomment to render a masked icon with that uses the react-native-svg elements directly.
        // For comparison.
        // SampleRNSVGMaskedIcon
      }
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    color: 'green'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c7a3a5',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
