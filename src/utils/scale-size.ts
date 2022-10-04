import {Dimensions, Platform} from 'react-native';

/**
 * Scale the size based on the resolution. The function assumes
 * the designs are created with a resolution of 1280 x 720.
 */
export const scaleSize = (size: number): number => {
  if (!Platform.isTV) return size;
  const defaultScreenWidth = 1280;
  const screenWidth = Dimensions.get('window').width;
  const modifier = screenWidth / defaultScreenWidth;
  return size * modifier;
};
