import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert, AsyncStorage} from 'react-native';
import { Button } from 'react-native-elements';
import Moment from 'moment';
import Geolocation from 'react-native-geolocation-service';
import BackgroundTimer from 'react-native-background-timer';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { tourDetailCurrentRoute, currentLocationChange } from '../actions/index.js';
import { getRouteByTour, getCurrentRoute } from '../services/api';
import { COLOR_MAIN, COLOR_GRAY_BACKGROUND } from '../constants/index';
import { } from '../services/function';
import localized from '../localization/index';

import ScheduleCard from '../components/ScheduleCard';
import InfoText from '../components/InfoText';
import ScheduleMap from '../components/ScheduleMap';
import PushNotification from '../components/PushNotification';

class Schedule extends Component {
  static navigationOptions = {
    title: localized.schedule,
  };

  watchID = null;

  constructor(props){
    super(props);
    this.state = {
      route: [],
      curLocation: null,

      watchID: null,
    }
  }

  async callGetRouteByTour(id){
    return getRouteByTour(id)
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({route: responseJson.data})
            })
            .catch((error) => console.error(error));
  }

  async callGetCurrentRoute(){
    const {currentLocation} = this.props;

    let date = new Date();

    let data = {
      // id: this.props.navigation.getParam("id"),
      // lat: 37.948509,
      // lng: 27.368055,
      // cur_time: "2019-04-20T10:10:00.000"
      id: this.props.navigation.getParam("idTourTurn"),
      lat: currentLocation.lat,
      lng: currentLocation.lng,
      cur_time: date,
    }
    console.log(data);

    let status;
    return getCurrentRoute(data)
            .then((response) => {
                status = response.status;
                return response.json();
              })
            .then((responseJson) => {
              if (status != 200){
                Alert.alert(responseJson.msg);
              } else if (status == 200){
                console.log(responseJson);
                if (responseJson.data != null){
                  this.setState({curLocation: responseJson.data})
                  AsyncStorage.setItem("curLocation",JSON.stringify(responseJson.data));
                  this.props.tourDetailCurrentRoute(responseJson.data);
                } else {
                  this.setState({curLocation: null});
                  this.props.tourDetailCurrentRoute(null);
                }
              }
            })
            .catch((error) => console.error(error));
  }

  async callGetCurrentRouteBackground(){
    const {currentLocation} = this.props;

    let date = new Date();

    let data = {
      id: this.props.navigation.getParam("idTourTurn"),
      lat: currentLocation.lat,
      lng: currentLocation.lng,
      cur_time: date,
    }
    console.log(data);

    let status;
    return getCurrentRoute(data)
            .then((response) => {
                status = response.status;
                return response.json();
              })
            .then((responseJson) => {
              if (status != 200){
                Alert.alert(responseJson.msg);
              } else if (status == 200){
                console.log(responseJson);
                if (responseJson.data != null){
                  this.setState({curLocation: responseJson.data})
                  let curLocation;
                  AsyncStorage.getItem("curLocation")
                              .then((value)=>{
                                if (value !== null){
                                  curLocation = JSON.parse(value);

                                  if (curLocation.id != responseJson.data.id){
                                    this.pushNotification(responseJson.data);
                                    console.log("KHAC");
                                    console.log(curLocation.id + "-" + responseJson.data.id);
                                  } else {
                                    console.log(curLocation.id + "-" + responseJson.data.id);
                                  }
                                }
                              })
                              .then(()=>{
                                AsyncStorage.setItem("curLocation",JSON.stringify(responseJson.data));
                              })
                  this.props.tourDetailCurrentRoute(responseJson.data);
                } else {
                  // this.setState({curLocation: null});
                  this.props.tourDetailCurrentRoute(null);
                }
              }
            })
            .catch((error) => console.error(error));
  }

  getScheduleCard(){
    const {route, curLocation} = this.state;

    let curDay = 0;

    let scheduleCards = route.map((val,key)=>{
      let isActive = curLocation ? (curLocation.id == val.id) : false;
      if (val.day > curDay){
        curDay += 1;

        return(
          <View key={key}>
              <InfoText text={localized.day + " " + val.day}/>
              <ScheduleCard data={val} active={isActive}/>
          </View>
        )
      } else {
        return(<ScheduleCard key={key} data={val} active={isActive}/>)
      }
    })
    return scheduleCards;
  }

  updatePositionAndRoute(position){
    console.log(position);
    this.props.currentLocationChange(position.coords.latitude, position.coords.longitude);
    this.callGetCurrentRoute();
  }

  updatePositionAndRouteBackground(position){
    console.log(position);
    this.callGetCurrentRouteBackground();
  }

  pushNotification(data){
    PushNotification.checkPermissions(permission => {
      if (permission.alert){
        PushNotification.localNotification({
          /* Android Only Properties */
          id: Math.random () * 10000, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
          largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
          smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
          bigText: data.location.description, // (optional) default: "message" prop
          vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000

          /* iOS and Android properties */
          title: localized.newLocation, // (optional)
          message: data.location.name, // (required)
          playSound: true, // (optional) default: true
          soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
          repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
        });
      }
    })
  }

  componentWillMount(){
    Geolocation.getCurrentPosition(
        (position) => this.updatePositionAndRoute(position),
        (error) => console.log(error.code, error.message),
        { enableHighAccuracy: false, timeout: 15000 }
    );

    BackgroundTimer.runBackgroundTimer(() => {
        Geolocation.getCurrentPosition(
            (position) => this.updatePositionAndRouteBackground(position),
            (error) => console.log(error.code, error.message),
            { enableHighAccuracy: false, timeout: 15000}
        );
        this.watchID = Geolocation.watchPosition(
          (position) => this.updatePositionAndRouteBackground(position),
          (error) => console.log(error.code, error.message),
          { enableHighAccuracy: false, timeout: 20000, distanceFilter: 1}
        );
      },
    3000);

    const idTour = this.props.navigation.getParam("idTour");
    // this.callGetCurrentRoute();
    this.callGetRouteByTour(idTour);
  }

  // componentDidMount(){
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //         console.log(position);
  //         this.setState({initialPosition: position},()=>{
  //           this.callGetCurrentRoute();
  //         });
  //     },
  //     (error) => console.log(new Date(), error),
  //     {enableHighAccuracy: false, timeout: 10000}
  //   );
  //
  //   this.watchID = navigator.geolocation.watchPosition(
  //     (position) => {
  //       this.setState({ initialPosition: position },()=>{
  //         this.callGetCurrentRoute();
  //       });
  //       console.log(position);
  //     },
  //     (error) => console.log(error.message),
  //     { enableHighAccuracy: false, timeout: 20000, distanceFilter: 1}
  //   );
  // }
  componentDidMount(){
    Geolocation.getCurrentPosition(
      (position) => this.updatePositionAndRoute(position),
      (error) => console.log(error.code, error.message),
      { enableHighAccuracy: false, timeout: 15000 }
    );

    this.watchID = Geolocation.watchPosition(
      (position) => this.updatePositionAndRoute(position),
      (error) => console.log(error.message),
      { enableHighAccuracy: false, timeout: 20000, distanceFilter: 1}
    );
  }

  componentWillUnmount(){
      // navigator.geolocation.clearWatch(this.watchID);
      Geolocation.clearWatch(this.watchID);
   }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{height: 400, marginBottom: 10}}>
            <ScheduleMap/>
        </View>
          {this.getScheduleCard()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_GRAY_BACKGROUND,
  },
})

function mapStateToProps(state){
  return{
    bookedTour: state.bookedTour,
    currentLocation: state.currentLocation,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    tourDetailCurrentRoute: tourDetailCurrentRoute,
    currentLocationChange: currentLocationChange,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
