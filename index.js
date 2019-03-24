/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import TourDetailMap from './src/components/TourDetailMap';
import BookingInfo from './src/screens/BookingInfo';
import History2 from './src/screens/History2';
import HistoryDetail from './src/screens/HistoryDetail';

AppRegistry.registerComponent(appName, () => App);
