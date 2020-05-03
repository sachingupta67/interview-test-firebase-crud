import React from 'react';

import {View, SafeAreaView, StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import Header from '../Header';
import Loader from '../Loader';
import {connect} from 'react-redux';

const MasterLayout = props => {
  const {headerTitle, loading} = props;
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header title={headerTitle} />
      <View style={styles.container}>{props.children}</View>
      <Loader isLoading={loading || false} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: colors.white, height: '100%', width: '100%'},
  safeAreaView: {backgroundColor: colors.white},
});

const mapStateToProps = ({loading}) => {
  const {isLoading} = loading;
  return {loading: isLoading};
};
export default connect(
  mapStateToProps,
  null,
)(MasterLayout);
