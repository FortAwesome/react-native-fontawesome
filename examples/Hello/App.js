/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';
import { Svg, Rect, G, Mask, ClipPath, Path, Defs } from 'react-native-svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faBeer, faCircle, faCheck } from '@fortawesome/free-solid-svg-icons'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to react-native-fontawesome!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.instructions}>And now, for some icons:</Text>

        <FontAwesomeIcon icon={ faCoffee } />

        <Text>Icon with different color:</Text>
        <FontAwesomeIcon icon={ faBeer } style={ styles.icon } />

        <Text>Icon with mask and transform:</Text>
        <FontAwesomeIcon icon={ faCheck } mask={ faCircle } transform="shrink-5" />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    color: 'green'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
