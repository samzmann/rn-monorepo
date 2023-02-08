import React from 'react';
import FastImage from 'react-native-fast-image';

type Props = {};

export const SomeAppSpecificImage = ({}: Props): JSX.Element => (
  <FastImage
    resizeMode={FastImage.resizeMode.contain}
    source={{uri: 'https://www.gstatic.com/webp/gallery/1.sm.webp'}}
    style={{width: 150, height: 150}}
  />
);
