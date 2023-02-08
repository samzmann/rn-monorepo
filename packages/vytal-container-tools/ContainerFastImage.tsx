import React from 'react'
import { ImageStyle, StyleProp } from 'react-native'
import FastImage from 'react-native-fast-image'

import { getContainerImageSource } from './containerTools'
import { ContainerTypeId } from './types'

type Props = {
  width: number | string;
  height: number | string;
  containerTypeId: ContainerTypeId | number;
  containerTypeImageUrl?: string;
  style?: StyleProp<ImageStyle>; // ⚠️ Actually inaccurate! In the RNFI typedefs, ImageStyle is a local type, not the RN ImageStyle type. We should update this when we fix the monorepo setup.
}

export const ContainerFastImage = ({
  width,
  height,
  containerTypeId,
  containerTypeImageUrl,
  style,
}: Props): JSX.Element => (
  <FastImage
    resizeMode={FastImage.resizeMode.contain}
    source={getContainerImageSource(containerTypeId, containerTypeImageUrl)}
    style={[{ width, height }, style]}
  />
)
