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
import OneSignal from 'react-native-onesignal';

// Bo qua yellow error
console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

import AppNavigator from './src/navigators/AppNavigator';
import allReducers from './src/reducers/index';

const store = createStore(allReducers);

const AppContainer = createAppContainer(AppNavigator);

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
      super(props);
      OneSignal.init("615afc3e-6d71-4e08-a4a7-7faeb8e42d0b");
      OneSignal.inFocusDisplaying(2);
      
      OneSignal.addEventListener('received', this.onReceived);
      OneSignal.addEventListener('opened', this.onOpened);
      OneSignal.addEventListener('ids', this.onIds);
      OneSignal.configure(); 	// triggers the ids event
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

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
