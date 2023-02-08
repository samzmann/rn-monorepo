import React from 'react'
import { StyleProp } from 'react-native'
import FastImage, { ImageStyle } from 'react-native-fast-image'

type Props = {
  width: number | string;
  height: number | string;
  style?: StyleProp<ImageStyle>;
}

export const SharedBowlImage = ({
  width,
  height,
  style,
}: Props): JSX.Element => (
  <FastImage
    resizeMode={FastImage.resizeMode.contain}
    source={require('./Bowl.webp')}
    style={[{ width, height }, style]}
  />
)
