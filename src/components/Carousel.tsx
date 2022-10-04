import React, {FC, useCallback, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  FlatList,
  FlexStyle,
  TransformsStyle,
  TouchableOpacity,
  TVFocusGuideView,
} from 'react-native';
import {COLORS} from '../styles';
import {scaleSize} from '../utils';
import {ContentTile} from './ContentTile';
import {LinearGradient} from './LinearGradient';
import {SectionTitle} from './typography';

type ContentType = 'watch-now' | 'upcoming' | 'past';

type Props = {
  contentTiles: string[];
  contentType: ContentType;
  layoutStyle?: FlexStyle & TransformsStyle;
  onChangedTile?: (tile: TouchableOpacity | null) => void;
};

const LEFT_MARGIN = scaleSize(64);

function getCarouselConfiguration() {
  const tileStyle = styles.largeTile;
  const focusScaleFactor = 1.08;
  const carouseTitle = 'Watch now';
  return {tileStyle, focusScaleFactor, carouseTitle};
}

export const Carousel: FC<Props> = ({
  contentTiles,
  layoutStyle,
  onChangedTile,
}) => {
  const [selectedTile, setSelectedTile] = useState(0);
  const carouselList = useRef<FlatList>(null);
  const {tileStyle, focusScaleFactor, carouseTitle} =
    getCarouselConfiguration();
  const tileWidth = tileStyle.width;
  const tiles = useRef<(TouchableOpacity | null)[]>([]);

  // space between tiles based on how much the tiles are scaled
  const tileMargin = scaleSize(30 + 6 * (2 - focusScaleFactor));
  const gradientWidth = scaleSize(64);

  const animateScrollTo = useCallback(
    (tileIndex: number) => {
      carouselList.current?.scrollToIndex({
        animated: true,
        viewOffset: gradientWidth + tileMargin / 2,
        index: tileIndex,
      });
    },
    [carouselList, tileMargin, gradientWidth],
  );

  const onFocus = (index: number) => {
    animateScrollTo(index);
    onChangedTile?.(tiles.current[index]);
    setSelectedTile(index);
  };

  const firstTileRef = useRef(null);

  const setFirstItemRef = useCallback(ref => {
    firstTileRef.current = ref.current;
  }, []);

  if (contentTiles.length === 0) return <></>;

  const destinations = firstTileRef?.current ? [firstTileRef?.current] : [];

  return (
    <View style={layoutStyle}>
      <SectionTitle style={styles.title}>{carouseTitle}</SectionTitle>
      <TVFocusGuideView destinations={destinations}>
        <FlatList
          disableScrollViewPanResponder
          scrollEnabled={false}
          horizontal
          ref={carouselList}
          contentContainerStyle={styles.carousel}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={contentTiles}
          getItemLayout={(_, index) => ({
            index,
            length: tileWidth,
            offset: (tileWidth + tileMargin) * index + LEFT_MARGIN,
          })}
          renderItem={({item, index}) => {
            return (
              <ContentTile
                image={item}
                style={[
                  tileStyle,
                  {
                    opacity: index === selectedTile - 1 ? 0.6 : 1,
                  },
                ]}
                key={index}
                onFocus={() => onFocus(index)}
                focusedScale={focusScaleFactor}
                layoutStyle={{
                  marginRight: tileMargin,
                }}
                setExternalRef={index === 0 ? setFirstItemRef : undefined}
              />
            );
          }}
          onEndReachedThreshold={1}
          // Allows the selected tile to be positioned correctly at the start and end
          ListFooterComponent={() => <View style={styles.carouselFooter} />}
          ListHeaderComponent={() => <View style={styles.carouselHeader} />}
        />
        {selectedTile !== 0 && (
          <LinearGradient
            style={[styles.linearGradient, {width: gradientWidth}]}
            colors={[COLORS.shade6, COLORS.accentMidTone, COLORS.shade6Opaque]}
            locations={[0, 0.25, 1]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          />
        )}
      </TVFocusGuideView>
    </View>
  );
};

const LARGE_TILE_WIDTH = scaleSize(564);

const styles = StyleSheet.create({
  carousel: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scaleSize(16),
    paddingBottom: scaleSize(40),
  },
  largeTile: {
    height: scaleSize(304),
    width: LARGE_TILE_WIDTH,
  },
  carouselFooter: {
    width: Dimensions.get('window').width,
  },
  carouselHeader: {
    width: LEFT_MARGIN,
  },
  title: {
    marginLeft: LEFT_MARGIN,
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
