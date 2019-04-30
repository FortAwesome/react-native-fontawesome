import { StyleProp, ViewStyle } from "react-native";
import { Transform, IconProp } from "@fortawesome/fontawesome-svg-core";

export function FontAwesomeIcon(props: Props): JSX.Element;

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
  mask?: IconProp;
  transform?: string | Transform;
  style?: StyleProp<ViewStyle>;
}
