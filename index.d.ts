import { StyleProp, ViewStyle } from "react-native";
import { Transform, IconProp } from "@fortawesome/fontawesome-svg-core";

export type FontAwesomeIconStyle = StyleProp<ViewStyle> & {
  color?: string;
};

export interface Props {
  icon: IconProp;
  /**
   * @deprecated
   */
  height?: number;
  /**
   * @deprecated
   */
  width?: number;
  size?: number;
  color?: string;
  secondaryColor?: string;
  secondaryOpacity?: number;
  mask?: IconProp;
  transform?: string | Transform;
  style?: FontAwesomeIconStyle;
}

export function FontAwesomeIcon(props: Props): JSX.Element;
