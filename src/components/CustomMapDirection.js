import React, { Component } from 'react';
import {Text, Button, View, Alert, Image, StyleSheet} from 'react-native';
import {Marker, Callout} from 'react-native-maps';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';

import {handleCurrentRoute} from '../actions/index.js';

const origin = {latitude: 10.762864, longitude: 106.682229};
const destination = {latitude: 10.773831, longitude: 106.704895};
// const GOOGLE_MAPS_APIKEY = 'AIzaSyAwixBpyJe3b4Xo1xg74UUa3LyHPN8OnXY';
const GOOGLE_MAPS_APIKEY = 'AIzaSyDL7sUf9bCXYdpq5RGDBvnxD1VG9C1619Q';

class CustomMapDirection extends Component{

  _getCoordinates(){
    return this.props.currentRoute.data.map((val,key)=>{
      return{
        latitude: val.location.latitude,
        longitude: val.location.longitude
      }
    });
  }

  render(){
    let coordinates = this._getCoordinates();

    return(
      <MapViewDirections
        origin={coordinates[0]}
        waypoints={(coordinates.length > 2) ? coordinates.slice(1, -1) : null}
        destination={coordinates[coordinates.length-1]}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={2}
        strokeColor="rgba(66,133,244,0.5)"
        onReady={(result) => {
          this.props.parent().fitToCoordinates(result.coordinates,{
            edgePadding: { top: 50, right: 50, bottom: 120, left: 50 },
          });
        }}
      />
    );
  }
}

function mapStateToProps(state){
  return{
    currentRoute: state.currentRoute,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    handleCurrentRoute: handleCurrentRoute,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomMapDirection);
