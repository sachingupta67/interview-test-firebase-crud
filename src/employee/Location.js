import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import CustomMapView from '../components/Maps';
import Geolocation from '@react-native-community/geolocation';
class Location extends React.Component {
  constructor() {
    super();
    this.state = {
      coordinate: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
      longitudeDelta: 0.078,
      latitudeDelta: 0.028,
    };
  }
  componentDidMount() {
    this.gotToMyLocation();
  }
  getCurrentLocation = () => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      position => {
        this.setState(
          {
            coordinate: {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            },
          },
          () =>
            this.props.handler({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
        );
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  markerHandler = ({nativeEvent}) => {
    this.setState({coordinate: nativeEvent.coordinate});
  };

  getDraggableMapLocation = ({latitude, longitude}) => {
    this.setState(
      {coordinate: {latitude: latitude, longitude: longitude}},
      () => {
        this.props.handler({latitude: latitude, longitude: longitude});
      },
    );
  };

  gotToMyLocation = () => {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        if (this.map) {
          this.map.animateToRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        }
      },
      error => Alert.alert('Error: Are location services on?'),
      {enableHighAccuracy: true},
    );
  };

  render() {
    // console.log('state======', this.state);

    const {latitude, longitude} = this.state.coordinate;
    return (
      <View>
        <View style={styles.locationContainer}>
          <CustomMapView
            refmap={map => {
              this.map = map;
            }}
            latitude={latitude}
            longitude={longitude}
            markerHandler={() => this.markerHandler()}
            onRegionChangeCompleteHandler={this.getDraggableMapLocation}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  location: {
    width: '70%',
    height: '25%',
  },
  locationContainer: {
    height: '50%',
    borderRadius: 10,
    marginHorizontal: '10%',
  },
});
export default Location;
