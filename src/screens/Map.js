import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, Dimensions, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import Modal from "react-native-modal";

import {changeCurrentRegion, changeCurrentLocation, getNearLocation, handleModalLocation } from '../actions/index.js';
import CustomMarker from '../components/CustomMarker';


// const window = Dimensions.get('window');
// const { width, height }  = window;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA + (width / height);

const origin = {latitude: 10.762864, longitude: 106.682229};
const destination = {latitude: 10.773831, longitude: 106.704895};
const GOOGLE_MAPS_APIKEY = 'AIzaSyAwixBpyJe3b4Xo1xg74UUa3LyHPN8OnXY';

class Map extends Component {

  // Lay dia diem xung quanh vi tri hien tai
  getNearMe(){
    // Lay ban kinh tuong ung voi chieu doc man hinh
    let {latitudeDelta, longitudeDelta } = this.props.region;
    let distance = 1.0;
    if (latitudeDelta !== 0.01){
      distance = latitudeDelta * 110;
    }

    return fetch('http://10.0.3.2:5000/location/getNearMe', {
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
                  // this.props.getNearLocation(responseJson.data, responseJson.itemCount);
              })
              .catch((error) => {
                console.error(error);
              });
  }

  // Lay toa do cua vi tri hien tai
  getCurrentLocation(){
    navigator.geolocation.getCurrentPosition(
      position => {
          this.props.changeCurrentLocation(position.coords.latitude, position.coords.longitude);
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  // Ham duoc goi khi nguoi dung di chuyen ban do
  _onRegionChange(e){
    this.props.changeCurrentRegion(e.latitude, e.longitude, e.latitudeDelta, e.longitudeDelta);
    this.getNearMe();
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
      }
    }
  }

  componentWillMount(){
    return this.getCurrentLocation();
  }

  componentDidMount(){
    return this.getNearMe();
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
        return (<CustomMarker key={key} val={val}></CustomMarker>);
    });


    return(
        <View style={styles.container}>
          <Modal
            isVisible={this.props.modalLocation.isVisible}
            onBackdropPress={()=>{this.props.handleModalLocation(false)}}
            style={styles.modal}
            animationIn="slideInDown"
            animationOut="slideOutUp"
            useNativeDriver={false}
            backdropOpacity={0.5}
          >
            <View style={styles.modalView}>
              <Text>TEST</Text>
              <Text>TEST</Text>
            </View>
          </Modal>
            <MapView style={styles.map}
                onRegionChange={e => {this._onRegionChange(e)}}
                showsUserLocation = {true}
                // toolbarEnabled = {true}
                moveOnMarkerPress = {true}
                initialRegion={this.props.region}
                ref={c => this.mapView = c}
            >
                {markers}
                {/*<MapViewDirections
                  origin={origin}
                  destination={destination}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={3}
                  strokeColor="blue"
                  onReady={(result) => {
                    this.mapView.fitToCoordinates(result.coordinates,{
                      edgePadding: { top: 50, right: 50, bottom: 120, left: 50 },
                    });
                  }}
                />*/}
            </MapView>
            <View style={styles.detail}>
                <View style={{flexDirection: 'row'}}>
                    <Image style={{flex: 0.4, width: undefined, height: undefined, marginRight: 6, borderRadius: 5}} source={{uri:'http://10.0.3.2:5000/assets/images/locationFeatured/SorrentoCafeHoaHung.jpg'}}/>
                    <View style={{flex: 0.6, marginLeft: 2}}>
                        <Text style={{fontWeight: 'bold'}}>Đại học Khoa Học Tự Nhiên Đại Học Quốc Gia, TPHCM</Text>
                        <Text>227 đường Nguyễn Văn Cừ, Phường 4, Quận 5, Hồ Chí Minh, Việt Nam</Text>
                    </View>
                </View>

            </View>
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
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    modal: {
      alignItems: 'flex-start',
      flexDirection: 'row',
    },
    modalView: {
      justifyContent: 'flex-start',
      backgroundColor: 'white',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderWidth: 1,
      flex: 1,
    },
    detail: {
      backgroundColor: 'white',
      justifyContent: 'center',
      margin: 10,
      elevation: 2,
      borderRadius: 5,
      padding: 8,

    }
})

function mapStateToProps(state){
  return{
    nearLocation: state.nearLocation,
    region: state.region,
    modalLocation: state.modalLocation,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    changeCurrentRegion: changeCurrentRegion,
    changeCurrentLocation: changeCurrentLocation,
    getNearLocation: getNearLocation,
    handleModalLocation: handleModalLocation,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
