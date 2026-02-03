import { Text, View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Font Awesome Icons</Text>

      <View style={styles.row}>
        <FontAwesomeIcon icon={faCoffee} size={32} color="#6f4e37" />
        <Text style={styles.label}>Coffee</Text>
      </View>

      <View style={styles.row}>
        <FontAwesomeIcon icon={faHeart} size={32} color="#e74c3c" />
        <Text style={styles.label}>Heart</Text>
      </View>

      <View style={styles.row}>
        <FontAwesomeIcon icon={faStar} size={32} color="#f1c40f" />
        <Text style={styles.label}>Star</Text>
      </View>

      <View style={styles.sizeDemo}>
        <Text style={styles.subtitle}>Different Sizes</Text>
        <View style={styles.row}>
          <FontAwesomeIcon icon={faStar} size={16} color="#3498db" />
          <FontAwesomeIcon icon={faStar} size={24} color="#3498db" />
          <FontAwesomeIcon icon={faStar} size={32} color="#3498db" />
          <FontAwesomeIcon icon={faStar} size={48} color="#3498db" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontSize: 16,
  },
  sizeDemo: {
    alignItems: 'center',
    marginTop: 20,
  },
});
