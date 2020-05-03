import React from 'react';
import MapView from 'react-native-maps';

const CustomMapView = props => {
  const {latitude, longitude, onRegionChangeCompleteHandler, refmap} = props;

  const coordinate = {
    latitude: latitude ? latitude : 37.78825,
    longitude: longitude ? longitude : -122.4324,
  };
  return (
    <MapView
      initialRegion={{
        latitude: latitude ? latitude : 37.78825,
        longitude: longitude ? longitude : -122.4324,
        longitudeDelta: 0.078,
        latitudeDelta: 0.028,
      }}
      ref={refmap}
      onRegionChangeComplete={e => {
        onRegionChangeCompleteHandler(e);
      }}
      showsMyLocationButton={true}
      showsUserLocation={true}
      style={{width: '100%', height: '100%'}}>
      <MapView.Marker draggable={false} coordinate={coordinate} />
    </MapView>
  );
};

export default CustomMapView;
