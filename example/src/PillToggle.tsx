import { Text, StyleSheet, Pressable } from 'react-native';

interface PillToggleProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

export default function PillToggle({
  label,
  active,
  onPress,
}: PillToggleProps) {
  return (
    <Pressable
      style={[styles.button, active && styles.buttonActive]}
      onPress={onPress}
    >
      <Text style={[styles.text, active && styles.textActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  buttonActive: {
    backgroundColor: '#5B5FC7',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  textActive: {
    color: '#fff',
  },
});
