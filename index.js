/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Setting from './src/screens/Setting';
import ChangePassword from './src/screens/ChangePassword';
import TourCarousel from './src/components/TourCarousel';

AppRegistry.registerComponent(appName, () => App);
