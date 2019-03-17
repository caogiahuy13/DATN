import React, { Component } from 'react';
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { Icon } from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { tourDetailChangeRoutes, tourDetailShowMarker } from '../actions/index.js';
import { getRouteByTour, getNearMe } from '../services/api';

import TourDetailMapDirection from './TourDetailMapDirection';
import TourDetailMapMarker from './TourDetailMapMarker';
import TourDetailMapLocationDetail from './TourDetailMapLocationDetail';

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
    this.callGetNearMeAPI();
  }

  _onShowMarkerPress(){
    this.props.tourDetailShowMarker(!this.props.tourDetail.showMarker);
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

  async callGetRouteByTour(id){
    return getRouteByTour(id)
            .then((response) => response.json())
            .then((responseJson) => {
              this.props.tourDetailChangeRoutes(responseJson.data);
            })
            .catch((error) => console.error(error));
  }

  componentWillUnmount(){
    this.state = false;
  }

  componentWillMount(){
    this.callGetRouteByTour(this.props.tourDetail.id);
  }

  render(){
    let markers = this.state.dataSource.map((val,key)=>{
        return (<TourDetailMapMarker key={key} val={val}></TourDetailMapMarker>);
    });

    return(
      <View style={{flex: 1}}>
          <MapView style={styles.map}
              onRegionChange={e => {this._onRegionChange(e)}}
              showsUserLocation = {true}
              moveOnMarkerPress = {true}
              initialRegion={this.state.region}
              ref={c => this.mapView = c}
          >
              {markers}
              <TourDetailMapDirection parent={()=>this.mapView}/>
          </MapView>

          <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{marginTop: 5}}>
                  <Icon
                    raised
                    containerStyle={{opacity: 0.6}}
                    size={18}
                    name={this.props.tourDetail.showMarker ? 'map-marker' : 'map-marker-off'}
                    type='material-community'
                    onPress={()=>{this._onShowMarkerPress()}}
                  />
              </View>
              { this.props.tourDetail.showLocation &&
                <View style={styles.locationDetail}>
                    <TourDetailMapLocationDetail/>
                </View>
              }
          </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  map: {
      ...StyleSheet.absoluteFillObject,
  },
  locationDetail: {
    marginVertical: 10,
    marginRight: 10,
    marginLeft: 5,
    flex: 1,
    justifyContent: 'flex-start',
  },
})

function mapStateToProps(state){
  return{
    tourDetail: state.tourDetail,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    tourDetailChangeRoutes: tourDetailChangeRoutes,
    tourDetailShowMarker: tourDetailShowMarker,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TourDetailMap);
