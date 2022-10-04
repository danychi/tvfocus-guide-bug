import React, {FC} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {COLORS} from '../../styles';
import {scaleSize} from '../../utils';

export const SectionTitle: FC<TextProps> = ({children, style}) => (
  <Text style={[styles.text, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: scaleSize(32),
    lineHeight: scaleSize(40),
    color: COLORS.shade1,
  },
});
