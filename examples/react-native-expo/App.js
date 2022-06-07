import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMugSaucer as solidFaMugSaucer, faAsterisk as solidFaAsterisk, faSquare as solidFaSquare } from '@fortawesome/pro-solid-svg-icons';
import { faMugSaucer as regularFaMugSaucer } from '@fortawesome/pro-regular-svg-icons';
import { faMugSaucer as lightFaMugSaucer } from '@fortawesome/pro-light-svg-icons';
import { faMugSaucer as thinFaMugSaucer } from '@fortawesome/pro-thin-svg-icons';
import { faMugSaucer as duotoneFaMugSaucer, faCoffeeBean as duotoneFaCoffeeBean } from '@fortawesome/pro-duotone-svg-icons';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}><Text>Solid</Text></View>
        <View style={styles.cell}>
          <FontAwesomeIcon icon={solidFaMugSaucer} />
          <FontAwesomeIcon icon={regularFaMugSaucer} />
          <FontAwesomeIcon icon={lightFaMugSaucer} />
          <FontAwesomeIcon icon={thinFaMugSaucer} />
          <FontAwesomeIcon icon={duotoneFaMugSaucer} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.cell}><Text>Color</Text></View>
        <View style={styles.cell}>
          <FontAwesomeIcon icon={solidFaMugSaucer} color="red" />
          <FontAwesomeIcon icon={solidFaMugSaucer} color="red" style={{ color: "blue" }} />
          <FontAwesomeIcon icon={solidFaMugSaucer} style={{ color: "blue" }} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.cell}><Text>Size</Text></View>
        <View style={styles.cell}>
          <FontAwesomeIcon icon={solidFaMugSaucer} size={ 32 } />
          <FontAwesomeIcon icon={solidFaMugSaucer} size={ 16 } />
          <FontAwesomeIcon icon={solidFaMugSaucer} size={ 8 } />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.cell}><Text>Duotone</Text></View>
        <View style={styles.cell}>
          <FontAwesomeIcon icon={duotoneFaCoffeeBean} />
          <FontAwesomeIcon icon={duotoneFaCoffeeBean} secondaryOpacity={0.5} />
          <FontAwesomeIcon icon={duotoneFaCoffeeBean} secondaryColor="blue" />
          <FontAwesomeIcon icon={duotoneFaCoffeeBean} secondaryColor="blue" secondaryOpacity={0.5} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.cell}><Text>Masking and Power Transform</Text></View>
        <View style={styles.cell}>
          <FontAwesomeIcon icon={solidFaAsterisk} mask={solidFaSquare} size={ 32 } />
          <FontAwesomeIcon icon={solidFaAsterisk} mask={solidFaSquare} size={ 32 } transform={{ rotate: 60, size: 8 }} />
          <FontAwesomeIcon icon={solidFaAsterisk} mask={solidFaSquare} color="blue" size={ 32 } transform={{ rotate: 60, size: 8 }} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.cell}><Text>Style</Text></View>
        <View style={styles.cell}>
          <FontAwesomeIcon icon={solidFaAsterisk} style={{ backgroundColor: 'yellow' }} />
          <FontAwesomeIcon icon={solidFaAsterisk} style={[{ backgroundColor: 'grey' }, { color: 'purple' }]} />
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12
  },
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  cell: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row'
  }
});
