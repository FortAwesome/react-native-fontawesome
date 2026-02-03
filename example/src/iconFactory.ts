import { fas } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { colors, maskShapes, ICON_COUNT } from './settings';

// Try to load pro duotone icons if available
let fad: Record<string, IconDefinition> | null = null;
try {
  fad = require('@fortawesome/pro-duotone-svg-icons').fad;
} catch {
  // Pro duotone icons not available
}

export const hasDuotoneIcons = fad !== null;
const duotoneIcons = fad ? Object.values(fad) : [];
const allIcons = Object.values(fas);

export interface IconItem {
  icon: IconDefinition;
  color: string;
  secondaryColor: string | null;
  secondaryOpacity: number | null;
  transform: string;
  size: number;
  mask: IconDefinition | null;
  maskId: string;
}

export interface FeatureFlags {
  rotate: boolean;
  flip: boolean;
  size: boolean;
  mask: boolean;
  duotone: boolean;
}

const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
const randomIcon = () => allIcons[Math.floor(Math.random() * allIcons.length)];
const randomDuotoneIcon = () =>
  duotoneIcons[Math.floor(Math.random() * duotoneIcons.length)];

const generateTransform = (flags: FeatureFlags): string => {
  const parts: string[] = [];
  if (flags.rotate) {
    const rotation = [0, 90, 180, 270][Math.floor(Math.random() * 4)];
    if (rotation) parts.push(`rotate-${rotation}`);
  }
  if (flags.flip) {
    const flip = ['', 'flip-h', 'flip-v'][Math.floor(Math.random() * 3)];
    if (flip) parts.push(flip);
  }
  return parts.join(' ');
};

const generateSize = (flags: FeatureFlags): number => {
  if (flags.size) {
    return 24 + Math.floor(Math.random() * 17); // 24-40
  }
  return 32;
};

const generateMask = (
  flags: FeatureFlags,
  index: number
): {
  mask: IconDefinition | null;
  maskId: string;
  transform: string | null;
} => {
  if (flags.mask) {
    return {
      mask: maskShapes[Math.floor(Math.random() * maskShapes.length)],
      transform: 'shrink-6',
      maskId: `mask-${index}-${Date.now()}`,
    };
  }
  return { mask: null, maskId: '', transform: null };
};

export const createIconItem = (
  flags: FeatureFlags,
  index: number
): IconItem => {
  const { mask, maskId, transform: maskTransform } = generateMask(flags, index);
  const useDuotone = flags.duotone && hasDuotoneIcons;
  return {
    icon: useDuotone ? randomDuotoneIcon() : randomIcon(),
    color: randomColor(),
    secondaryColor: useDuotone ? randomColor() : null,
    secondaryOpacity: useDuotone ? 0.4 + Math.random() * 0.4 : null, // 0.4-0.8
    transform: maskTransform || generateTransform(flags),
    size: generateSize(flags),
    mask,
    maskId,
  };
};

export const defaultFlags: FeatureFlags = {
  rotate: false,
  flip: false,
  size: false,
  mask: false,
  duotone: false,
};

export const createInitialIcons = (): IconItem[] =>
  Array.from({ length: ICON_COUNT }, (_, index) =>
    createIconItem(defaultFlags, index)
  );
