import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {COLORS} from '../../styles';
import {scaleSize} from '../../utils';

type Props = {
  text: string;
};

export const HeaderButton: FC<Props> = ({text}) => {
  return (
    <TouchableOpacity>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: scaleSize(26),
    marginRight: scaleSize(16),
    color: COLORS.shade1,
  },
});
