import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, Dimensions } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeCurrentLocation } from '../actions/index.js';

const window = Dimensions.get('window');
const { width, height }  = window;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA + (width / height);


class Map extends Component {
  // Lay dia diem xung quanh minh
  getNearMe(){
    let {latitudeDelta, longitudeDelta } = this.state.region;
    let distance = 1.0;
    if (latitudeDelta !== 0.01)
    {
      distance = longitudeDelta * 110;
      console.log("Khac");
      console.log(latitudeDelta);
    }
    console.log(distance);
    return fetch('http://10.0.3.2:5000/location/getNearMe?&tour=true', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                lat: this.props.region.latitude,
                lng: this.props.region.longitude,
                distance: distance,
              }),
            }).then((response) => response.json())
              .then((responseJson) => {
                  this.setState({
                    isLoading: false,
                    dataSource: responseJson.data,
                    count: responseJson.itemCount,
                  });
              })
              .catch((error) => {
                console.error(error);
              });
  }

  getCurrentLocation(){
    navigator.geolocation.getCurrentPosition(
      position => {
          this.props.changeCurrentLocation(position.coords.latitude, position.coords.longitude);
          console.log(JSON.stringify(position));
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  _onRegionChange(e){
    this.props.changeCurrentLocation(e.latitude, e.longitude);
    this.setState({
      region: {
        ...this.state.region,
        latitudeDelta: e.latitudeDelta,
        longitudeDelta: e.longitudeDelta,
      }
    });
    console.log(this.state.region);
    this.getNearMe();
    console.log("count: " + this.state.count);
  }

  constructor(props)
  {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      count: 0,
      region: {
        // latitude:  10.762864,
        // longitude: 106.682229,
        latitude:  10,
        longitude: 100,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
    }
  }

  componentWillMount(){
    return this.getCurrentLocation();
  }

  componentDidMount(){
    return this.getNearMe(this.state.region.latitude, this.state.region.longitude);
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    let markers = this.state.dataSource.map((val,key)=>{
        return <Marker key={key} coordinate={{
                  latitude: val.latitude,
                  longitude: val.longitude,}}
                  title={val.name}
                  description={val.description}
                  onCalloutPress = {()=>{Alert.alert(val.address)}}
                >
                </Marker>
    });
    return(
        <MapView style={styles.map}
            // onRegionChangeComplete = {Alert.alert("ABC")}
            onRegionChange={e => this._onRegionChange(e)}
            showsUserLocation = {true}
            // toolbarEnabled = {true}
            moveOnMarkerPress = {true}
            initialRegion={{
              latitude: this.props.region.latitude,
              longitude: this.props.region.longitude,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
          }}>
              {markers}
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

function mapStateToProps(state){
  return{
    region: state.region,
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({
    changeCurrentLocation: changeCurrentLocation,
  }, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(Map);
