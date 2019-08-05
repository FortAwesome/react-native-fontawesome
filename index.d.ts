import * as React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

declare module '@fortawesome/react-native-fontawesome' {
  export interface FontAwesomeProps {
    height?: number;
    width?: number;
    size?: number;
    color?: string;
    style?: any;
    icon?: Array<string> | string | IconDefinition;
    mask?: Array<string> | string | IconDefinition;
    transform?: string | any;
  }
  export class FontAwesomeIcon extends React.Component<FontAwesomeProps> {}
}
