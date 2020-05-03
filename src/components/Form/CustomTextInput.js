import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

const CustomTextInput = ({
  label,
  value,
  keyboardType,
  onChangeText,
  placeholder,
}) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      style={styles.textInput}
      placeholder={placeholder}
      autoCapitalize={'none'}
      keyboardType={keyboardType || 'default'}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'transparent',
  },
});
export default CustomTextInput;
