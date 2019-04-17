import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, Dimensions, AsyncStorage, Image, TouchableOpacity } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Icon } from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeCurrentRegion, changeCurrentLocation, filterType, handleCurrentRouteZoom } from '../actions/index.js';
import { getNearMe } from '../services/api';
import { GOOGLE_MAPS_APIKEY } from '../constants/index';

import CustomMarker from '../components/CustomMarker';
import LocationDetail from '../components/LocationDetail';
import TourCarousel from '../components/TourCarousel';
import CustomMapDirection from '../components/CustomMapDirection';

// const window = Dimensions.get('window');
// const { width, height }  = window;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA + (width / height);

class Map extends Component {
  static navigationOptions = {
    header: null,
  };

  callGetNearMeAPI(){
      // Lay ban kinh tuong ung voi chieu doc man hinh
      let {latitudeDelta, longitudeDelta } = this.props.region;
      let distance = 1.0;
      if (latitudeDelta !== 0.01){
        distance = latitudeDelta * 70;
      }

      return getNearMe(this.props.region.latitude, this.props.region.longitude, distance)
              .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                      isLoading: false,
                      dataSource: responseJson.data,
                      count: responseJson.itemCount,
                    });
                    // console.log(responseJson.itemCount);
                    // this.props.getNearLocation(responseJson.data, responseJson.itemCount);
                })
                .catch((error) => {
                  console.error(error);
                });
  }

  // Lay toa do cua vi tri hien tai
  getCurrentLocation(){
    Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                this.props.changeCurrentLocation(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    // navigator.geolocation.getCurrentPosition(
    //   position => {
    //       this.props.changeCurrentLocation(position.coords.latitude, position.coords.longitude);
    //   },
    //   error => Alert.alert(error.message),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // );
  }

  // Ham duoc goi khi nguoi dung di chuyen ban do
  _onRegionChangeComplete(e){
    this.props.changeCurrentRegion(e.latitude, e.longitude, e.latitudeDelta, e.longitudeDelta);
    this.callGetNearMeAPI();
  }
  // Ham duoc goi khi nguoi dung di chuyen ban do
  _onRegionChange(e){
    if (this.props.currentRoute.hasZoomed){
      this.props.changeCurrentRegion(e.latitude, e.longitude, e.latitudeDelta, e.longitudeDelta);
      this.callGetNearMeAPI();
      this.props.handleCurrentRouteZoom(false);
    }
  }

  moveToLocation(lat, lng){
    this.props.handleCurrentRouteZoom(true);
    this.mapView.animateToRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 1000)
  }

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      nearLocation: {
        data: [],
        count: 0,
      },
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
      modalLocation: {
        isVisible: false,
      },
    }
    this.mapView = React.createRef();
  }

  componentWillMount(){
    return this.getCurrentLocation();
  }

  componentDidMount(){
    return this.callGetNearMeAPI();
  }

  render() {
    const {navigation} = this.props;
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    let markers = this.state.dataSource.map((val,key)=>{
        return (<CustomMarker key={key} val={val}></CustomMarker>);
    });

    return(
        <View style={styles.container}>
            <MapView style={styles.map}
                onRegionChangeComplete={e => {this._onRegionChangeComplete(e)}}
                onRegionChange={e => {this._onRegionChange(e)}}
                showsUserLocation = {true}
                // toolbarEnabled = {true}
                moveOnMarkerPress = {true}
                initialRegion={this.props.region}
                ref={c => this.mapView = c}
            >
                {markers}
                {this.props.currentRoute.isVisible && <CustomMapDirection parent={()=>this.mapView}/>}
            </MapView>

            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{marginTop: 5}}>
                    <Icon raised containerStyle={styles.search} size={18} name='search' type='font-awesome' onPress={()=>{navigation.navigate("FindGooglePlaces",{move: this.moveToLocation.bind(this)})}}/>
                    <Icon raised containerStyle={styles.filter} size={18} name='filter' type='font-awesome' onPress={()=>{navigation.navigate("Filter")}}/>
                    <TouchableOpacity style={styles.luggage}>
                        <Image style={{width: 34, height: 34}} source={require('../assets/images/luggage.png')}/>
                    </TouchableOpacity>
                </View>
                {this.props.modalLocation.isVisible && <View style={styles.locationDetail}><LocationDetail/></View>}
            </View>
            {this.props.tourCarousel.isVisible && <View style={styles.tourCarousel}><TourCarousel/></View>}
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
      fontSize: 20,
    },
    filter: {
      opacity: 0.6,
    },
    search: {
      opacity: 0.6,
    },
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
    tourCarousel: {
      justifyContent: 'flex-end',
      marginBottom: 6,
    },
    luggage: {
      paddingHorizontal: 8,
      justifyContent: 'center',
      alignItems: 'center'
    }
})

function mapStateToProps(state){
  return{
    nearLocation: state.nearLocation,
    region: state.region,
    modalLocation: state.modalLocation,
    tourCarousel: state.tourCarousel,
    currentRoute: state.currentRoute,
    filterLocation: state.filterLocation,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    changeCurrentRegion: changeCurrentRegion,
    changeCurrentLocation: changeCurrentLocation,
    filterType: filterType,
    handleCurrentRouteZoom: handleCurrentRouteZoom,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
