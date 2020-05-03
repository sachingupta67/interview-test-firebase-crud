import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    position: 'absolute',
    top: '35%',
    left: '35%',
    borderRadius: 5,
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
const Loader = props => {
  const {isLoading} = props;
  return (
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator
          animating={isLoading}
          color={'#000'}
          size={'large'}
        />
      </View>
    </View>
  );
};

export default Loader;
