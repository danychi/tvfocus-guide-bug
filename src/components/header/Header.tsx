import React from 'react';
import {View, StyleSheet} from 'react-native';
import {scaleSize} from '../../utils';
import {HeaderButton} from './HeaderButton';

export const Header = () => (
  <View style={styles.container}>
    <HeaderButton text="Home" />
    <HeaderButton text="Discover" />
    <HeaderButton text="My profile" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaleSize(64),
    marginBottom: scaleSize(40),
  },
});
