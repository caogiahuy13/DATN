/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, PermissionsAndroid, Alert, AsyncStorage} from 'react-native';
import {createAppContainer } from "react-navigation";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';
import Geolocation from 'react-native-geolocation-service';
import OneSignal from 'react-native-onesignal';
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';
import type { RemoteMessage } from 'react-native-firebase';

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

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line
  }

    //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
  }

    //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
  }

    //2
  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }

  //Remove listeners allocated in createNotificationListeners()
  componentWillUnmount() {
   this.notificationListener();
   this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
        console.log("FOREGROUND");
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
        console.log("OPEN");
        console.log(notificationOpen.notification);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
        console.log("CLOSE");
    }

    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
      console.log("PAYLOAD");
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }



  // componentDidMount() {
  //     this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
  //       console.log("DISPLAY");
  //       console.log(notification);
  //         // Process your notification as required
  //         // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
  //     });
  //     this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
  //       console.log("NOTIFI");
  //       console.log(notification);
  //         // Process your notification as required
  //     });
  //     this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
  //       console.log("FOREGROUND BACKGROUND");
  //       console.log(notificationOpen);
  //
  //       // Get the action triggered by the notification being opened
  //       const action = notificationOpen.action;
  //       // Get information about the notification that was opened
  //       const notification: Notification = notificationOpen.notification;
  //     });
  //     firebase.notifications().getInitialNotification()
  //             .then((notificationOpen: NotificationOpen) => {
  //               if (notificationOpen) {
  //                 console.log("CLOSE");
  //                 console.log(notificationOpen);
  //                 // App was opened by a notification
  //                 // Get the action triggered by the notification being opened
  //                 const action = notificationOpen.action;
  //                 // Get information about the notification that was opened
  //                 const notification: Notification = notificationOpen.notification;
  //               }
  //             });
  // }
  //
  // componentWillUnmount() {
  //     this.getToken();
  //     this.notificationDisplayedListener();
  //     this.notificationListener();
  //     this.notificationOpenedListener();
  // }
  //
  // async getToken(){
  //   const fcmToken = await firebase.messaging().getToken();
  //   if (fcmToken) {
  //       // user has a device token
  //       console.log(fcmToken);
  //   } else {
  //       // user doesn't have a device token yet
  //   }
  // }

  // constructor(props){
  //     super(props);
  //     OneSignal.init("615afc3e-6d71-4e08-a4a7-7faeb8e42d0b");
  //     OneSignal.inFocusDisplaying(2);
  //
  //     OneSignal.addEventListener('received', this.onReceived);
  //     OneSignal.addEventListener('opened', this.onOpened);
  //     OneSignal.addEventListener('ids', this.onIds);
  //     OneSignal.configure(); 	// triggers the ids event
  // }
  //
  // componentWillUnmount() {
  //   OneSignal.removeEventListener('received', this.onReceived);
  //   OneSignal.removeEventListener('opened', this.onOpened);
  //   OneSignal.removeEventListener('ids', this.onIds);
  // }
  //
  // onReceived(notification) {
  //   console.log("Notification received: ", notification);
  //   console.log(Math.random());
  // }
  //
  // onOpened(openResult) {
  //   console.log('Message: ', openResult.notification.payload.body);
  //   console.log('Data: ', openResult.notification.payload.additionalData);
  //   console.log('isActive: ', openResult.notification.isAppInFocus);
  //   console.log('openResult: ', openResult);
  // }
  //
  // onIds(device) {
  //   console.log('Device info: ', device);
  // }

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
