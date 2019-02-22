import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default class Setting extends Component {
  render() {
    return (
      <MapView style={styles.map}
          initialRegion={{
            latitude: 10.762864,
            longitude: 106.682229,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }}>
            <Marker coordinate={{
              latitude: 10.762864,
              longitude: 106.682229,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,}}
            >
            </Marker>
        </MapView>


    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
      fontSize: 20,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
      },
})
