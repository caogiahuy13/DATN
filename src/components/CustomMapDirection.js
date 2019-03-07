import React, { Component } from 'react';
import {Text, Button, View, Alert, Image, StyleSheet} from 'react-native';
import {Marker, Callout} from 'react-native-maps';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import MapViewDirections from 'react-native-maps-directions';

const origin = {latitude: 10.762864, longitude: 106.682229};
const destination = {latitude: 10.773831, longitude: 106.704895};
const GOOGLE_MAPS_APIKEY = 'AIzaSyAwixBpyJe3b4Xo1xg74UUa3LyHPN8OnXY';

class CustomMapDirection extends Component{

  render(){
    console.log(this.props.parent);
    console.log(typeof this.props.parent());

    return(
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="blue"
        onReady={(result) => {
          this.props.parent().fitToCoordinates(result.coordinates,{
            edgePadding: { top: 50, right: 50, bottom: 120, left: 50 },
          });
        }}
      />
    );
  }
}

export default CustomMapDirection;
