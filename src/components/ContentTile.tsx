import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  Animated,
  TargetedEvent,
  NativeSyntheticEvent,
  View,
  FlexStyle,
  TransformsStyle,
} from 'react-native';
import {BORDER_RADIUS, COLORS} from '../styles';
import {scaleSize} from '../utils';
import {Tile} from './Tile';

type Props = Omit<
  React.ComponentProps<typeof Tile>,
  'children' | 'imageSource' | 'contentContainerStyle'
> & {
  image: React.ComponentProps<typeof Tile>['imageSource'];
  focusedScale: number;
  layoutStyle?: FlexStyle & TransformsStyle;
  setExternalRef?: any;
};

export const ContentTile: FC<Props> = ({
  image,
  style,
  focusedScale,
  onFocus,
  onBlur,
  layoutStyle,
  setExternalRef,
  ...tileProps
}) => {
  const ref = useRef();
  const [raiseContentTileAnimationValue] = useState(
    () => new Animated.Value(1),
  );
  const [isFocused, setIsFocused] = useState(false);

  const onFocusedTile = useCallback(
    (e: NativeSyntheticEvent<TargetedEvent>) => {
      setIsFocused(true);
      onFocus?.(e);
    },
    [setIsFocused, onFocus],
  );

  const onBlurredTile = useCallback(
    (e: NativeSyntheticEvent<TargetedEvent>) => {
      setIsFocused(false);
      onBlur?.(e);
    },
    [setIsFocused, onBlur],
  );
  useEffect(() => {
    const animationDuration = 200;
    Animated.timing(raiseContentTileAnimationValue, {
      toValue: isFocused ? focusedScale : 1,
      useNativeDriver: true,
      duration: animationDuration,
    }).start();
  }, [focusedScale, isFocused, raiseContentTileAnimationValue]);

  const mountedComponentRef = useRef(false);
  useLayoutEffect(() => {
    if (!mountedComponentRef?.current && setExternalRef) {
      setExternalRef?.(ref);
    }
    mountedComponentRef.current = true;
  }, [ref, setExternalRef]);

  return (
    <View style={layoutStyle}>
      <Tile
        activeOpacity={1}
        {...tileProps}
        imageSource={image}
        onFocus={onFocusedTile}
        onBlur={onBlurredTile}
        style={[
          style,
          isFocused ? styles.focused : undefined,
          {
            transform: [
              {
                scale: raiseContentTileAnimationValue,
              },
            ],
          },
        ]}
        contentContainerStyle={styles.logoContainer}
        accessibilityLabel="Show tile"
        ref={ref}></Tile>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    marginBottom: scaleSize(16),
  },
  focused: {
    borderWidth: scaleSize(4),
    padding: scaleSize(4),
    borderColor: COLORS.shade2,
    borderRadius: BORDER_RADIUS.small,
    elevation: scaleSize(6),
    shadowOffset: {
      height: scaleSize(6),
      width: 0,
    },
    shadowOpacity: 0.3,
    shadowColor: COLORS.shade7,
    shadowRadius: scaleSize(6),
  },
});
