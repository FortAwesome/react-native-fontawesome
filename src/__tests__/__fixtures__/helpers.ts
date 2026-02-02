import { parse } from '@fortawesome/fontawesome-svg-core';

export const REFERENCE_ICON_BY_STYLE = 0x00;
export const ICON_ALIASES = 0x01;
export const REFERENCE_ICON_USING_STRING = 0x02;

export function coreHasFeature(feature: number): boolean {
  if (
    feature === REFERENCE_ICON_BY_STYLE ||
    feature === ICON_ALIASES ||
    feature === REFERENCE_ICON_USING_STRING
  ) {
    return !!(parse as { icon?: unknown }).icon;
  }
  return false;
}
