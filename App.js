/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, PermissionsAndroid} from 'react-native';
import {createAppContainer } from "react-navigation";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';
import Geolocation from 'react-native-geolocation-service';

console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

var socket = require('socket.io-client')('http://10.0.3.2:5000/', {
  transports: ['websocket'] // you need to explicitly tell it to use websockets
});

socket.on('connect', function(){
  console.log('Day la chuoi test!')
  socket.emit("test","day la chuoi test");
});
socket.on('test-01',function(data){
  console.log(data);
})

import AppNavigator from './src/navigators/AppNavigator';
import allReducers from './src/reducers/index';

const store = createStore(allReducers);

const AppContainer = createAppContainer(AppNavigator);

type Props = {};
export default class App extends Component<Props> {
  // watchID = null;
  //
  // async requestLocationPermission() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the location');
  //     } else {
  //       console.log('Camera permission location');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }
  //
  // componentWillMount(){
  //   BackgroundTimer.runBackgroundTimer(() => {
  //       this.requestLocationPermission()
  //           .then(()=>{
  //             Geolocation.getCurrentPosition(
  //                 (position) => {
  //                     console.log(position);
  //                     // this.setState({initialPosition: position},()=>{
  //                     //   this.callGetCurrentRoute();
  //                     // });
  //                 },
  //                 (error) => {
  //                     // See error code charts below.
  //                     console.log(error.code, error.message);
  //                 },
  //                 { enableHighAccuracy: false, timeout: 15000}
  //             );
  //           })
  //       // this.watchID = Geolocation.watchPosition(
  //       //   (position) => {
  //       //     // this.setState({ initialPosition: position },()=>{
  //       //     //   this.callGetCurrentRoute();
  //       //     // });
  //       //     console.log(position);
  //       //   },
  //       //   (error) => console.log(error.message),
  //       //   { enableHighAccuracy: false, timeout: 20000, distanceFilter: 1}
  //       // );
  //
  //       // navigator.geolocation.getCurrentPosition(
  //       //   position => {
  //       //       console.log(position);
  //       //   },
  //       //   error => console.log(error.message),
  //       //   { enableHighAccuracy: false, timeout: 20000}
  //       // );
  //       // this.watchID = navigator.geolocation.watchPosition(
  //       //   (position) => {
  //       //     // this.setState({ initialPosition: position },()=>{
  //       //     //   this.callGetCurrentRoute();
  //       //     // });
  //       //     console.log(position);
  //       //   },
  //       //   (error) => console.log(error.message),
  //       //   { enableHighAccuracy: false, timeout: 20000, distanceFilter: 1}
  //       // );
  //     },
  //   3000);
  // }
  //
  // componentWillUnMount(){
  //   BackgroundTimer.stopBackgroundTimer();
  // }

  render() {
    return (
      // <AppContainer/>
      <Provider store= {store}>
        <AppContainer/>
      </Provider>
    );
  }
}
