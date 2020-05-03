import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';

const CustomButton = ({handler, title, containerStyle}) => {
  return (
    <TouchableOpacity
      style={[styles.container, {...containerStyle}]}
      onPress={handler}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: colors.danger,
  },
  title: {
    padding: '10%',
    color: colors.white,
  },
});

export default CustomButton;
