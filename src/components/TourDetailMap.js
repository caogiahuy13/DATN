import React, { Component } from 'react';
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { tourDetailChangeId } from '../actions/index.js';
import { getRouteByTour, getNearMe } from '../services/api';

import TourDetailMapDirection from './TourDetailMapDirection';

class TourDetailMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: [],
      count: 0,
      region: {
        latitude:  10.762864,
        longitude: 106.682229,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
    }
  }

  // Ham duoc goi khi nguoi dung di chuyen ban do
  _onRegionChange(e){
    this.setState({
      region: {
        latitude: e.latitude,
        longitude: e.longitude,
        latitudeDelta: e.latitudeDelta,
        longitudeDelta: e.longitudeDelta,
      }
    });
    // this.callGetNearMeAPI();
  }

  callGetNearMeAPI(){
      // Lay ban kinh tuong ung voi chieu doc man hinh
      let {latitudeDelta, longitudeDelta } = this.state.region;
      let distance = 1.0;
      if (latitudeDelta !== 0.01){
        distance = latitudeDelta * 70;
      }

      return getNearMe(this.state.region.latitude, this.state.region.longitude, distance)
              .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                      dataSource: responseJson.data,
                      count: responseJson.itemCount,
                    });
                })
                .catch((error) => console.error(error));
  }

  componentWillUnmount(){
    this.state = false;
  }

  render(){
    return(
      <MapView style={styles.map}
          onRegionChange={e => {this._onRegionChange(e)}}
          showsUserLocation = {true}
          moveOnMarkerPress = {true}
          initialRegion={this.state.region}
          ref={c => this.mapView = c}
      >
          {/*<TourDetailMapDirection id={this.props.id} parent={()=>this.mapView}/>*/}
      </MapView>
    )
  }

}

const styles = StyleSheet.create({
  map: {
      ...StyleSheet.absoluteFillObject,
  },
})

function mapStateToProps(state){
  return{
    tourDetail: state.tourDetail,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TourDetailMap);
