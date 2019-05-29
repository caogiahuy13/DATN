/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import bgMessaging from './src/services/bgMessaging';

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent('OneSignalExample', () => App);
// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); // <-- Add this line
