import React from 'react'
import { Svg, Rect, G, Mask, ClipPath, Path, Defs } from 'react-native-svg'
import { Dimensions, Text, View } from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default <View>
  <Text>Icon with mask, directly without react-native-fontawesome</Text>

  <Svg width={ windowWidth * 0.1 } height={ windowHeight * 0.1 } xmlns="http://www.w3.org/2000/Svg" viewBox="0 0 512 512">
    <Defs>
      <ClipPath id="clip-1">
        <Path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></Path>
      </ClipPath>
      <Mask x="0" y="0" width="100%" height="100%" id="Mask-1" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
        <Rect x="0" y="0" width="100%" height="100%" fill="white"></Rect>
        <G >
          <G>
            <Path fill="black" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></Path>
          </G>
        </G>
      </Mask>

    </Defs>
    <Rect clipPath="url(#clip-1)" mask="url(#Mask-1)" x="0" y="0" width="100%" height="100%"></Rect>
  </Svg>
</View>
