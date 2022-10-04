import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';

import {Carousel} from './src/components/Carousel';
import {CONTENT_TILES} from './src/mock';
import {COLORS} from './src/styles';
import {Header} from './src/components/header';

const App: () => Node = () => {
  return (
    <SafeAreaView style={styles.background}>
      <Header />
      <Carousel contentTiles={CONTENT_TILES} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.shade6,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
