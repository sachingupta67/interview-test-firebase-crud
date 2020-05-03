import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Header = ({title}) => {
  return <Text style={styles.header}> {title}</Text>;
};

const styles = StyleSheet.create({
  header: {
    borderWidth: 1,
    padding: '4%',
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    margin: '2%',
    borderRadius: 10,
  },
});
export default Header;
