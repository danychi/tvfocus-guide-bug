import React from 'react';
import {
  StyleSheet,
  FlexStyle,
  TransformsStyle,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from 'react-native';

import {COLORS} from '../styles';
import {scaleSize} from '../utils';
import {LinearGradient} from './LinearGradient';

type Props = Omit<React.ComponentProps<typeof TouchableOpacity>, 'style'> & {
  imageSource: React.ComponentProps<typeof ImageBackground>['source'];
  style?: React.ComponentProps<typeof Animated.View>['style'];
  contentContainerStyle?: FlexStyle & TransformsStyle;
};

export const Tile = React.forwardRef<
  TouchableOpacity,
  React.PropsWithChildren<Props>
>(
  (
    {
      imageSource,
      style,
      children,
      contentContainerStyle,
      ...touchableOpacityProps
    },
    ref,
  ) => {
    console.log(imageSource);
    return (
      <Animated.View style={style}>
        <TouchableOpacity
          activeOpacity={0.6}
          {...touchableOpacityProps}
          style={styles.container}
          ref={ref}>
          <ImageBackground style={styles.image} source={imageSource}>
            <LinearGradient
              style={[styles.linearGradient, contentContainerStyle]}
              colors={['transparent', COLORS.accentMidTone, COLORS.shade7]}
              locations={[0, 0.71, 1]}>
              {children}
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: scaleSize(8),
    backgroundColor: COLORS.shade6,
    flex: 1,
  },
  linearGradient: {
    height: '50%',
  },
  image: {
    justifyContent: 'flex-end',
    flex: 1,
    borderRadius: scaleSize(8),
  },
});
