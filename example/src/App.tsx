import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Animated,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import PillToggle from './PillToggle';
import { ICON_COUNT } from './settings';
import {
  createIconItem,
  createInitialIcons,
  hasDuotoneIcons,
} from './iconFactory';
import type { FeatureFlags } from './iconFactory';
import { fas } from '@fortawesome/free-solid-svg-icons';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [icons, setIcons] = useState(createInitialIcons);
  const [rotateEnabled, setRotateEnabled] = useState(false);
  const [flipEnabled, setFlipEnabled] = useState(false);
  const [sizeVariationEnabled, setSizeVariationEnabled] = useState(false);
  const [maskEnabled, setMaskEnabled] = useState(false);
  const [duotoneEnabled, setDuotoneEnabled] = useState(false);
  const scaleValues = useRef(
    Array.from({ length: ICON_COUNT }, () => new Animated.Value(1))
  ).current;

  const getFlags = useCallback(
    (): FeatureFlags => ({
      rotate: rotateEnabled,
      flip: flipEnabled,
      size: sizeVariationEnabled,
      mask: maskEnabled,
      duotone: duotoneEnabled,
    }),
    [
      rotateEnabled,
      flipEnabled,
      sizeVariationEnabled,
      maskEnabled,
      duotoneEnabled,
    ]
  );

  const animateIcon = useCallback(
    (index: number) => {
      Animated.sequence([
        Animated.timing(scaleValues[index], {
          toValue: 0.7,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.spring(scaleValues[index], {
          toValue: 1,
          friction: 4,
          tension: 150,
          useNativeDriver: true,
        }),
      ]).start();
    },
    [scaleValues]
  );

  useEffect(() => {
    if (!isPlaying) return;

    const flags = getFlags();
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * icons.length);

      animateIcon(randomIndex);

      setIcons((prev) => {
        const newIcons = [...prev];
        newIcons[randomIndex] = createIconItem(flags, randomIndex);
        return newIcons;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isPlaying, icons.length, getFlags, animateIcon]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Font Awesome</Text>
        <Pressable onPress={() => setIsPlaying(!isPlaying)}>
          <FontAwesomeIcon
            icon={isPlaying ? fas.faPause : fas.faPlay}
            size={24}
            color="#000"
          />
        </Pressable>
      </View>
      <View style={styles.controlsRow}>
        <PillToggle
          label="Rotate"
          active={rotateEnabled}
          onPress={() => setRotateEnabled(!rotateEnabled)}
        />
        <PillToggle
          label="Flip"
          active={flipEnabled}
          onPress={() => setFlipEnabled(!flipEnabled)}
        />
        <PillToggle
          label="Size"
          active={sizeVariationEnabled}
          onPress={() => setSizeVariationEnabled(!sizeVariationEnabled)}
        />
        <PillToggle
          label="Mask"
          active={maskEnabled}
          onPress={() => setMaskEnabled(!maskEnabled)}
        />
        {hasDuotoneIcons && (
          <PillToggle
            label="Duotone"
            active={duotoneEnabled}
            onPress={() => setDuotoneEnabled(!duotoneEnabled)}
          />
        )}
      </View>
      <ScrollView contentContainerStyle={styles.iconGrid}>
        {icons.map((item, index) => (
          <View key={index} style={styles.iconCell}>
            <Animated.View
              style={{ transform: [{ scale: scaleValues[index] }] }}
            >
              <FontAwesomeIcon
                icon={item.icon}
                size={item.size}
                color={item.color}
                secondaryColor={item.secondaryColor || undefined}
                secondaryOpacity={item.secondaryOpacity || undefined}
                transform={item.transform || undefined}
                mask={item.mask || undefined}
                maskId={item.maskId || undefined}
              />
            </Animated.View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    gap: 8,
    backgroundColor: '#f5f5f5',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  iconCell: {
    width: '25%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
